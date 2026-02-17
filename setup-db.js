const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://wojjcivzlxsbinbmblhy.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSchema() {
  const sql = fs.readFileSync('./DATABASE_SCHEMA.sql', 'utf8');
  
  // Split by semicolons and execute each statement
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`Running ${statements.length} SQL statements...`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    if (!statement) continue;
    
    try {
      const { data, error } = await supabase.rpc('exec', { sql: statement });
      if (error) {
        console.error(`Error on statement ${i + 1}:`, error.message);
      } else {
        console.log(`✓ Statement ${i + 1} executed`);
      }
    } catch (err) {
      console.error(`Error on statement ${i + 1}:`, err.message);
    }
  }

  console.log('Done!');
}

runSchema();
