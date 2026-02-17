import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { addHours, parse, format, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

// GET /api/public/vessels/:code/availability
// Query params: date (YYYY-MM-DD), duration_hours
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const searchParams = request.nextUrl.searchParams;
    const dateStr = searchParams.get('date');
    const durationStr = searchParams.get('duration_hours');

    if (!dateStr || !durationStr) {
      return NextResponse.json(
        { error: 'Missing required parameters: date, duration_hours' },
        { status: 400 }
      );
    }

    const durationHours = parseInt(durationStr, 10);
    if (isNaN(durationHours) || durationHours < 1) {
      return NextResponse.json(
        { error: 'Invalid duration_hours' },
        { status: 400 }
      );
    }

    // Get vessel
    const { data: vessel, error: vesselError } = await supabase
      .from('public_vessels')
      .select('id, allowed_durations')
      .eq('public_code', code)
      .eq('is_active', true)
      .single();

    if (vesselError || !vessel) {
      return NextResponse.json(
        { error: 'Vessel not found' },
        { status: 404 }
      );
    }

    // Validate duration is allowed
    if (!vessel.allowed_durations.includes(durationHours)) {
      return NextResponse.json(
        { error: `Duration ${durationHours} hours not allowed for this vessel` },
        { status: 400 }
      );
    }

    // Get schedule rules
    const { data: schedule } = await supabase
      .from('public_schedule_rules')
      .select('*')
      .eq('public_vessel_id', vessel.id)
      .single();

    if (!schedule) {
      return NextResponse.json(
        { error: 'Schedule not configured for this vessel' },
        { status: 500 }
      );
    }

    // Parse date
    const requestedDate = parse(dateStr, 'yyyy-MM-dd', new Date());
    const dayStart = startOfDay(requestedDate);
    const dayEnd = endOfDay(requestedDate);

    // Get all availability blocks for this vessel on this date
    const { data: blocks, error: blocksError } = await supabase
      .from('public_availability_blocks')
      .select('start_time, end_time')
      .eq('public_vessel_id', vessel.id)
      .gte('start_time', dayStart.toISOString())
      .lte('end_time', dayEnd.toISOString());

    if (blocksError) {
      console.error('Error fetching blocks:', blocksError);
      return NextResponse.json(
        { error: 'Failed to fetch availability' },
        { status: 500 }
      );
    }

    // Generate time slots based on schedule rules
    const slots: { start_time: string; available: boolean }[] = [];
    
    let currentTime: Date;
    if (schedule.fixed_start_times && schedule.fixed_start_times.length > 0) {
      // Use fixed start times
      schedule.fixed_start_times.forEach((timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const slotStart = new Date(requestedDate);
        slotStart.setHours(hours, minutes, 0, 0);
        
        const slotEnd = addHours(slotStart, durationHours);
        const available = !blocks?.some(block => {
          const blockStart = new Date(block.start_time);
          const blockEnd = new Date(block.end_time);
          return slotStart < blockEnd && slotEnd > blockStart;
        });

        slots.push({
          start_time: slotStart.toISOString(),
          available,
        });
      });
    } else {
      // Use rolling increments
      const [earliestHour, earliestMin] = schedule.earliest_departure.split(':').map(Number);
      const [latestHour, latestMin] = schedule.latest_return.split(':').map(Number);
      
      currentTime = new Date(requestedDate);
      currentTime.setHours(earliestHour, earliestMin, 0, 0);

      const latestReturnTime = new Date(requestedDate);
      latestReturnTime.setHours(latestHour, latestMin, 0, 0);

      while (currentTime < latestReturnTime) {
        const slotEnd = addHours(currentTime, durationHours);
        
        // Check if slot end time exceeds latest return
        if (slotEnd > latestReturnTime) {
          break;
        }

        // Check if slot overlaps with any blocks
        const available = !blocks?.some(block => {
          const blockStart = new Date(block.start_time);
          const blockEnd = new Date(block.end_time);
          return currentTime < blockEnd && slotEnd > blockStart;
        });

        slots.push({
          start_time: currentTime.toISOString(),
          available,
        });

        // Increment by slot_increment_minutes
        currentTime = new Date(currentTime.getTime() + schedule.slot_increment_minutes * 60 * 1000);
      }
    }

    return NextResponse.json({
      date: dateStr,
      duration_hours: durationHours,
      slots,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
