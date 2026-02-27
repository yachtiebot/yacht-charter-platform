# 🚀 Airtable Automation Setup (5 Minutes)

**Copy these exact settings into Airtable.**

---

## Step 1: Open Automations

1. Go to your **Yacht Brain Master** base in Airtable
2. Click **Automations** button (top right, next to "Share")
3. Click **Create automation** (blue button)

---

## Step 2: Name It

Name: **Process Hero Images**

---

## Step 3: Set Up Trigger

Click **Add trigger** → Choose **When record matches conditions**

**Settings:**
- Table: **Catering**
- Conditions: **All conditions must be met**

**Add these conditions:**

1. **First condition:**
   - Field: `Hero Image`
   - Condition: `is not empty`

2. Click **Add condition**
   - Field: `Image URL`
   - Condition: `is empty`

This ensures images only process once (when Hero Image exists but Image URL doesn't).

---

## Step 4: Set Up Action

Click **Add action** → Choose **Send a request to a URL**

**Settings:**

**URL:**
```
https://yacht-charter-platform-ten.vercel.app/api/webhooks/airtable-image-process
```

**Method:**
```
POST
```

**Headers:**

Click **Add header** twice and enter:

Header 1:
- Key: `Authorization`
- Value: `Bearer YOUR_WEBHOOK_SECRET_HERE` ⚠️ (see below for secret)

Header 2:
- Key: `Content-Type`
- Value: `application/json`

**Body:**

Choose **JSON** (dropdown on left)

Paste this (replace the placeholders by clicking and selecting from dropdown):

```json
{
  "recordId": "{{Record ID}}",
  "baseId": "{{Base ID}}",
  "tableId": "{{Table ID}}"
}
```

To add these fields:
1. Click where it says `{{Record ID}}`
2. A dropdown appears - select **Record ID**
3. Repeat for Base ID and Table ID

---

## Step 5: Get Webhook Secret

You need to replace `YOUR_WEBHOOK_SECRET_HERE` with the actual secret.

**Option A: I can get it for you**
- Tell me and I'll fetch it from Vercel environment variables

**Option B: Get it yourself**
1. Go to Vercel dashboard
2. Select **yacht-charter-platform** project
3. Go to **Settings** → **Environment Variables**
4. Find `AIRTABLE_WEBHOOK_SECRET`
5. Click **Show** to reveal
6. Copy and paste into Airtable header

---

## Step 6: Turn It On

1. Toggle the automation **ON** (top right)
2. Click **Done**

---

## ✅ Test It!

1. Open **Catering** table
2. Find a record with NO "Image URL"
3. Drag any image into "Hero Image" field
4. Wait 10-30 seconds
5. Watch:
   - ✅ "Image URL" appears with Supabase link
   - ✅ "Hero Image" attachment disappears
   - ✅ Go to website → image shows!

---

## 🐛 If It Doesn't Work:

### Check Automation History:
1. Click your automation
2. Click **Activity** tab
3. Look for runs and errors

### Common Fixes:

**No runs showing up:**
- Make sure automation is turned ON
- Check trigger conditions are met (Hero Image not empty, Image URL empty)

**Error in response:**
- Check webhook secret matches
- Check URL is correct
- Look at error message in Activity log

---

## 📋 Quick Reference

**Webhook URL:**
```
https://yacht-charter-platform-ten.vercel.app/api/webhooks/airtable-image-process
```

**Authorization Header:**
```
Bearer <WEBHOOK_SECRET>
```

**Body Template:**
```json
{
  "recordId": "{{Record ID}}",
  "baseId": "{{Base ID}}",
  "tableId": "{{Table ID}}"
}
```

---

**Time to set up:** ~5 minutes  
**Time to train team:** "Just drag the image into Hero Image field"  
**Difficulty:** Copy/paste 😊
