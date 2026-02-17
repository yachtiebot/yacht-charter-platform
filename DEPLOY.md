# 🚀 Deployment Guide

Quick guide to deploy your yacht charter platform to Vercel.

## Prerequisites

1. GitHub account
2. Vercel account (sign up with GitHub at vercel.com)
3. Supabase account (sign up at supabase.com)

---

## Step 1: Create GitHub Repository

```bash
cd /root/clawd/yacht-charter-platform

# Initialize git
git init
git add .
git commit -m "Initial commit: Yacht Charter Platform"

# Create repo on GitHub (via web interface):
# 1. Go to github.com/new
# 2. Name: yacht-charter-platform
# 3. Keep it private
# 4. Don't add README, .gitignore, or license (we have them)
# 5. Click "Create repository"

# Push to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/yacht-charter-platform.git
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up Supabase Database

### Create Project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New project"
3. Name: `yacht-charter-platform`
4. Database password: Generate a strong password (save it!)
5. Region: Choose closest to Miami (e.g., `us-east-1`)
6. Click "Create new project" (takes ~2 minutes)

### Run Schema
1. Once project is ready, go to **SQL Editor** in left sidebar
2. Click "+ New query"
3. Copy entire contents of `DATABASE_SCHEMA.sql`
4. Paste into SQL editor
5. Click "Run" (bottom right)
6. Should see "Success. No rows returned"

### Get Connection Details
1. Go to **Project Settings** (gear icon in left sidebar)
2. Click **API** tab
3. Copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`, click "Reveal" first)

---

## Step 3: Deploy to Vercel

### Connect GitHub
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your `yacht-charter-platform` repository
4. Click "Import"

### Configure Project
1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `./` (keep default)
3. **Build Command**: `npm run build` (auto-set)
4. **Output Directory**: `.next` (auto-set)

### Add Environment Variables
Click "Environment Variables" and add these:

```env
# Supabase (from Step 2)
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe (get these from stripe.com/dashboard/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # (leave empty for now, add after webhook setup)

# NextAuth
NEXTAUTH_SECRET=your_random_secret_here  # Generate with: openssl rand -base64 32
NEXTAUTH_URL=https://your-domain.vercel.app  # Will update after deployment

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app  # Will update after deployment
```

### Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like `yacht-charter-platform-xxx.vercel.app`

### Update Environment Variables
1. Go to your Vercel project settings
2. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
3. Click "Redeploy" to apply changes

---

## Step 4: Set Up Stripe (For Later - Phase 2)

When you're ready to accept payments:

### Get API Keys
1. Go to [stripe.com/dashboard](https://stripe.com/dashboard)
2. Get your test keys from **Developers** → **API keys**
3. Add to Vercel environment variables (already done above)

### Set Up Webhook
1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click "+ Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"
6. Copy **Signing secret** (starts with `whsec_`)
7. Add as `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
8. Redeploy

---

## Step 5: Verify Deployment

Visit your site: `https://your-domain.vercel.app`

You should see:
- ✅ Beautiful homepage with luxury design
- ✅ Navigation working
- ✅ Fleet page (will be empty until you add vessels)

---

## Step 6: Add Sample Vessel (Optional)

To test the design with real data, add a sample vessel to Supabase:

1. Go to Supabase dashboard → **Table Editor**
2. Select `public_vessels` table
3. Click "+ Insert row"
4. Fill in sample data:

```
public_code: sunseeker-68-miami-beach
make: Sunseeker
model: null
length_ft: 68
category: luxury yacht
location_tag: Miami Beach
capacity_guests: 12
min_hours: 4
max_hours: 8
allowed_durations: [4, 6, 8]
toys: ["Jet ski", "Seabob", "Inflatables"]
amenities: ["Air conditioning", "Sound system", "Full galley"]
is_active: true
```

5. Click "Save"
6. Refresh your fleet page!

---

## 🎉 Done!

Your site is live. You can now:

1. **Share the URL** to see the design
2. **Add real vessel data** in Supabase
3. **Continue building** Phase 2 (booking flow)
4. **Set up custom domain** in Vercel settings

---

## Need Help?

If anything fails, share the error message and I'll help debug.

**Common issues:**
- **Build failed**: Check environment variables are set correctly
- **Database errors**: Verify `DATABASE_SCHEMA.sql` ran successfully in Supabase
- **Page shows but no vessels**: Add sample data to `public_vessels` table
