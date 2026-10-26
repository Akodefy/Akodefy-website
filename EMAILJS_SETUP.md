# EmailJS Setup Guide

This guide will help you integrate EmailJS with your contact and careers forms.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (up to 200 emails/month on free tier)
3. Verify your email address

## Step 2: Add an Email Service

1. Go to the **Email Services** section in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps for your chosen provider
5. Note down your **Service ID** (e.g., `service_abc1234`)

## Step 3: Create Email Templates

### Contact Form Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Set template name: `Contact Form Submission`
4. **Subject Line**: `New Project Enquiry from {{from_name}}`
5. Switch to **HTML Editor** and paste the complete HTML template from `contact-form-template.html` (see Templates section below)
6. In the **Settings** tab, note down your **Template ID** (e.g., `template_contact123`)

### Careers Form Template

1. Create another new template
2. Set template name: `Job Application`
3. **Subject Line**: `New Application: {{role}} — {{from_name}}`
4. Switch to **HTML Editor** and paste the complete HTML template from `careers-form-template.html` (see Templates section below)
5. Note down your **Template ID** (e.g., `template_careers123`)

## Step 4: Get Your Public Key

1. Go to **Account** > **General** in your dashboard
2. Find your **Public Key** (e.g., `AbCdEfGhIjKlMnOp`)
3. This is used to initialize EmailJS in your app

## Step 5: Configure Environment Variables

1. Open your `.env` file (create one if it doesn't exist by copying `.env.example`)
2. Add these values with your actual EmailJS credentials:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_contact123
VITE_EMAILJS_CAREERS_TEMPLATE_ID=template_careers123
```

3. **Important**: Never commit your `.env` file to git. It's already in `.gitignore`.

## Step 6: Test Your Forms

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your contact page and submit a test form
3. Check your email inbox for the test submission
4. Do the same for the careers form

## Template Variable Reference

### Contact Form Variables
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{service}}` - Selected service
- `{{timeline}}` - Selected timeline
- `{{message}}` - User's message
- `{{to_email}}` - Your company email (hello@akodefy.com)

### Careers Form Variables
- `{{from_name}}` - Applicant's name
- `{{from_email}}` - Applicant's email
- `{{role}}` - Applied role
- `{{linkedin}}` - LinkedIn URL
- `{{portfolio}}` - Portfolio/GitHub URL
- `{{message}}` - Application message
- `{{to_email}}` - Your company email (hello@akodefy.com)

## Troubleshooting

### Emails not sending?
1. Check that all environment variables are set correctly
2. Verify your email service is connected in EmailJS dashboard
3. Check browser console for error messages
4. Ensure you haven't exceeded your monthly quota (200 for free tier)

### Wrong email format?
1. Edit your template in the EmailJS dashboard
2. Make sure variable names match exactly (case-sensitive)
3. Test with the EmailJS template tester before deployment

### Fallback Behavior
If EmailJS is not configured:
- The forms will fall back to opening the user's default email client
- This ensures users can still contact you even without EmailJS

## Security Notes

- Your Public Key is safe to expose in frontend code
- Never expose your Private Key (not used in this setup)
- EmailJS automatically prevents spam with reCAPTCHA
- Consider enabling reCAPTCHA in EmailJS settings for production

## Email Template Files

Two beautiful, modern HTML email templates have been created that match your website's design:

### Contact Form Template (`contact-form-template.html`)
**Features:**
- Dark theme with forest green (#0C140F) background
- Neon green (#2BFF88) brand accents and CTAs
- Clean card-based layout with contact info
- Service and timeline displayed in grid format
- Gradient buttons with hover effects
- Responsive design for mobile devices

**Variables Used:**
- `{{from_name}}` - Contact's name
- `{{from_email}}` - Contact's email
- `{{service}}` - Selected service
- `{{timeline}}` - Project timeline
- `{{message}}` - Project details
- `{{to_email}}` - Your email (optional)

### Careers Form Template (`careers-form-template.html`)
**Features:**
- Premium gradient header with application badge
- Candidate profile card with avatar
- Quick-access links to LinkedIn and portfolio
- Cover letter section with elegant typography
- Dual CTA buttons (Reply + View LinkedIn)
- Hiring policy reminder bar
- Modern, professional aesthetic

**Variables Used:**
- `{{from_name}}` - Applicant's name
- `{{from_email}}` - Applicant's email
- `{{role}}` - Position applied for
- `{{linkedin}}` - LinkedIn profile URL
- `{{portfolio}}` - Portfolio/GitHub URL
- `{{message}}` - Cover letter/application message
- `{{to_email}}` - Your email (optional)

### How to Use the Templates

1. **Copy the HTML**: Open the template files in your code editor
2. **Paste in EmailJS**: 
   - Go to your EmailJS dashboard
   - Click on your template
   - Switch to **HTML Editor** mode (not plain text)
   - Paste the entire HTML code
3. **Preview**: Use EmailJS's preview feature to test
4. **Customize**: Feel free to adjust colors, text, or layout

### Design Philosophy

Both templates are inspired by your website's design system:
- **Colors**: Forest greens (#0C140F, #121C16, #16221B) with neon green accent (#2BFF88)
- **Typography**: Clean, modern sans-serif fonts matching your brand
- **Layout**: Card-based design with gradients and shadows
- **CTA**: Bold neon green buttons that demand attention
- **Professional**: Serious but modern, matching your company's ethos

## Upgrading EmailJS Plan

Free tier includes 200 emails/month. If you need more:
- **Personal**: $7/month for 1,000 emails
- **Professional**: $15/month for 10,000 emails

Visit [EmailJS Pricing](https://www.emailjs.com/pricing/) for details.
