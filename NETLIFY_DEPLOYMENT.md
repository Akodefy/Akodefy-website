# 🚀 Netlify Deployment Guide

Complete guide to deploy your Akodefy website to Netlify with environment variables.

---

## 📋 Table of Contents

1. [Build Your Site Locally](#1-build-your-site-locally)
2. [Manual Deployment via Drag & Drop](#2-manual-deployment-via-drag--drop)
3. [Configure Environment Variables](#3-configure-environment-variables)
4. [Rebuild with Environment Variables](#4-rebuild-with-environment-variables)
5. [Automatic Deployment via Git (Optional)](#5-automatic-deployment-via-git-optional)
6. [Troubleshooting](#troubleshooting)

---

## 1. Build Your Site Locally

Before deploying, you need to build your site with production environment variables.

### Step 1.1: Set Up Local Environment Variables

1. **Copy your `.env` file** (make sure it has all your EmailJS credentials):

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact123
VITE_EMAILJS_CAREERS_TEMPLATE_ID=template_careers456

# Firebase (if using)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 1.2: Build for Production

Open your terminal in the project directory and run:

```bash
npm run build
```

This will create a `dist` folder with your production-ready files.

**✅ Check that `dist` folder exists with these files:**
- `index.html`
- `assets/` folder
- `_redirects` file

---

## 2. Manual Deployment via Drag & Drop

### Step 2.1: Go to Netlify

1. Visit **https://app.netlify.com/**
2. **Sign up** or **Log in** (can use GitHub, GitLab, or email)

### Step 2.2: Deploy Your Site

**Option A: Drag & Drop (Easiest)**

1. On Netlify dashboard, scroll down to **"Want to deploy a new site without connecting to Git?"**
2. **Drag and drop** your `dist` folder into the drop zone
3. Wait for deployment (usually 10-30 seconds)
4. ✅ Your site is live!

**Option B: Manual Upload**

1. Click **"Add new site"** → **"Deploy manually"**
2. Click **"Browse to upload"**
3. Select your **entire `dist` folder**
4. Click **"Deploy site"**

### Step 2.3: Get Your Site URL

After deployment, you'll get a random URL like:
```
https://random-name-123456.netlify.app
```

You can customize this later!

---

## 3. Configure Environment Variables

**⚠️ Important:** The build you just uploaded uses your local `.env` file. For automatic rebuilds or Git deployments, you need to add environment variables to Netlify.

### Step 3.1: Go to Site Settings

1. Click on your deployed site
2. Click **"Site configuration"** (or "Site settings" in older UI)
3. In the left sidebar, click **"Environment variables"**

### Step 3.2: Add Environment Variables

Click **"Add a variable"** → **"Add a single variable"** for each:

| Key (Variable name) | Value (Your actual value) | Scopes |
|---------------------|---------------------------|--------|
| `VITE_EMAILJS_SERVICE_ID` | `service_abc1234` | All |
| `VITE_EMAILJS_PUBLIC_KEY` | `AbCdEfGhIjKlMnOp` | All |
| `VITE_EMAILJS_CONTACT_TEMPLATE_ID` | `template_contact123` | All |
| `VITE_EMAILJS_CAREERS_TEMPLATE_ID` | `template_careers456` | All |

**If you're using Firebase, add these too:**

| Key | Value | Scopes |
|-----|-------|--------|
| `VITE_FIREBASE_API_KEY` | `your_api_key` | All |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your_project.firebaseapp.com` | All |
| `VITE_FIREBASE_PROJECT_ID` | `your_project_id` | All |
| `VITE_FIREBASE_STORAGE_BUCKET` | `your_project_id.appspot.com` | All |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `your_sender_id` | All |
| `VITE_FIREBASE_APP_ID` | `your_app_id` | All |

### Step 3.3: Save Variables

1. Click **"Save"** after adding each variable
2. All variables should be listed in the Environment variables section

**✅ Screenshot your variables list** (without values showing) for reference!

---

## 4. Rebuild with Environment Variables

If you want to trigger a rebuild using Netlify's environment variables:

### Option 1: Through Netlify UI

1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Option 2: Upload New Build

Just repeat the manual deployment process with a fresh build.

---

## 5. Automatic Deployment via Git (Optional)

For automatic deployments whenever you push code changes.

### Step 5.1: Push Your Code to Git

```bash
# Initialize git (if not already)
git init

# Add remote repository
git remote add origin https://github.com/yourusername/akodefy.git

# Add and commit files
git add .
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

### Step 5.2: Connect Netlify to Git

1. Go to **Netlify Dashboard**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub, GitLab, Bitbucket)
4. **Authorize Netlify** to access your repositories
5. **Select your repository**

### Step 5.3: Configure Build Settings

Netlify should auto-detect, but verify:

```
Build command:    npm run build
Publish directory: dist
```

### Step 5.4: Deploy

1. Click **"Deploy site"**
2. Netlify will:
   - Clone your repo
   - Install dependencies (`npm install`)
   - Run build command (`npm run build`)
   - Use your environment variables
   - Deploy the `dist` folder

**✅ Now every git push will auto-deploy!**

---

## 📝 Environment Variables Reference

### For Netlify UI

When adding variables in Netlify, use these exact names:

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_PUBLIC_KEY
VITE_EMAILJS_CONTACT_TEMPLATE_ID
VITE_EMAILJS_CAREERS_TEMPLATE_ID
```

**Optional (Firebase):**
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### Scopes Explanation

- **All** = Used in all contexts (builds, functions, etc.)
- **Builds** = Only during build time
- **Functions** = Only for serverless functions
- **Post processing** = Only for deploy processing

**For this project, use "All" for all variables.**

---

## 🎨 Custom Domain Setup

### Step 1: Add Custom Domain

1. Go to **"Domain management"**
2. Click **"Add domain"** or **"Add custom domain"**
3. Enter your domain: `akodefy.com`
4. Click **"Verify"**

### Step 2: Configure DNS

Netlify will show you DNS records to add. Two options:

**Option A: Netlify DNS (Recommended)**

1. Click **"Use Netlify DNS"**
2. Update nameservers at your domain registrar:
   ```
   dns1.p05.nsone.net
   dns2.p05.nsone.net
   dns3.p05.nsone.net
   dns4.p05.nsone.net
   ```

**Option B: External DNS**

Add these records at your domain registrar:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

### Step 3: Enable HTTPS

1. Wait for DNS to propagate (can take 24-48 hours)
2. Netlify will auto-provision SSL certificate
3. Enable **"Force HTTPS"** in domain settings

---

## ✅ Deployment Checklist

Before deploying:

- [ ] `.env` file has all EmailJS credentials
- [ ] `npm run build` runs successfully
- [ ] `dist` folder exists and has content
- [ ] `netlify.toml` file exists (for redirects)
- [ ] Tested locally with `npm run preview`

After deploying:

- [ ] Site loads at Netlify URL
- [ ] Contact form works (sends emails)
- [ ] Careers form works (sends emails)
- [ ] All pages load correctly
- [ ] No console errors (F12)
- [ ] Environment variables added in Netlify
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled

---

## 🆘 Troubleshooting

### "Forms not working after deployment"

**Problem:** Forms work locally but not on Netlify.

**Solution:**
1. Check browser console (F12) for errors
2. Verify environment variables in Netlify:
   - Go to Site configuration → Environment variables
   - Ensure all `VITE_EMAILJS_*` variables are set
3. Check EmailJS dashboard for failed sends
4. Verify your EmailJS domain is allowed (add your Netlify URL)

---

### "Build failed on Netlify"

**Problem:** Git deployment fails during build.

**Solution:**
1. Check the build log for errors
2. Verify `package.json` has all dependencies
3. Make sure Node version is compatible:
   ```toml
   # Add to netlify.toml
   [build.environment]
     NODE_VERSION = "18"
   ```
4. Try building locally first: `npm run build`

---

### "Environment variables not working"

**Problem:** Variables show as `undefined`.

**Solution:**
1. **Must start with `VITE_`** - Vite only exposes variables with this prefix
2. Rebuild after adding variables (trigger new deploy)
3. Check variable names match exactly (case-sensitive)
4. Scopes should be set to "All"

---

### "404 errors on page refresh"

**Problem:** Direct URLs or page refresh returns 404.

**Solution:**
Your `netlify.toml` should have:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Check that this file is in your project root and gets included in the `dist` folder.

---

### "Redirect file not working"

**Problem:** `_redirects` file in `public/` folder not being applied.

**Solution:**
Check your `netlify.toml`:
```toml
[build]
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The `netlify.toml` method is preferred over `_redirects` file.

---

## 📱 Mobile Testing

After deployment, test on mobile:

1. Visit site on your phone
2. Test contact form submission
3. Test careers form submission
4. Check email templates render correctly
5. Verify all pages are responsive

---

## 🔒 Security Notes

### What to Keep Secret:
- ❌ Don't commit `.env` to Git (it's in `.gitignore`)
- ❌ Don't share Firebase API keys publicly
- ✅ EmailJS Public Key is safe to expose (it's client-side)
- ✅ EmailJS Service ID is safe to expose

### Safe to Expose:
- `VITE_EMAILJS_PUBLIC_KEY` ✅
- `VITE_EMAILJS_SERVICE_ID` ✅
- `VITE_EMAILJS_CONTACT_TEMPLATE_ID` ✅
- `VITE_EMAILJS_CAREERS_TEMPLATE_ID` ✅
- `VITE_FIREBASE_API_KEY` ✅ (if restricted properly)

### Keep Private:
- Never expose Firebase private keys
- Never expose server-side API keys

---

## 📊 Monitoring Your Site

### Netlify Analytics

1. Go to **"Analytics"** tab
2. Enable analytics (paid feature)
3. View traffic, pageviews, bandwidth

### Free Alternatives

- **Google Analytics**: Add tracking code
- **Plausible**: Privacy-friendly analytics
- **Vercel Analytics**: If you switch to Vercel

### EmailJS Usage

1. Go to EmailJS dashboard
2. Check **"History"** for sent emails
3. Monitor monthly quota (200 free/month)

---

## 🎯 Quick Commands Reference

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Check build output
ls dist

# Git deployment
git add .
git commit -m "Deploy to Netlify"
git push origin main
```

---

## 📚 Additional Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Vite Env Variables**: https://vitejs.dev/guide/env-and-mode.html
- **EmailJS Docs**: https://www.emailjs.com/docs/
- **Custom Domain Setup**: https://docs.netlify.com/domains-https/custom-domains/

---

## ✨ You're Done!

Your Akodefy website is now live on Netlify with:
- ✅ Professional email forms (EmailJS)
- ✅ Environment variables configured
- ✅ Automatic HTTPS
- ✅ Custom domain (optional)
- ✅ Auto-deploy from Git (optional)

**Need help?** Check the troubleshooting section or open an issue!

---

**Last Updated:** January 2025
