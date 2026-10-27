# Akodefy website rebuild

React + Vite + TypeScript, Tailwind v4, shadcn, GSAP (ScrollTrigger, SplitText), Lenis, Framer Motion, React Bits.
Green is the identity: bright green for actions, deep bottle green for hero, process and footer, cool white for reading surfaces.

## 1. Setup

Copy this folder's contents over your project (root config files and all of `src/`). Delete the old
`src/App.css`, `components/CustomCursor.tsx`, `components/TechMarquee.tsx` and `components/TestimonialsSection.tsx`.

```bash
npm rm @types/react-router-dom
npm i lenis clsx tailwind-merge class-variance-authority tailwindcss @tailwindcss/vite tw-animate-css

# shadcn primitives used by the navbar and contact form
npx shadcn@latest add button input label textarea select sheet

# React Bits components used by the site (TypeScript + Tailwind variants)
npx shadcn@latest add @react-bits/Silk-TS-TW @react-bits/ScrollVelocity-TS-TW @react-bits/ScrollReveal-TS-TW @react-bits/DotGrid-TS-TW @react-bits/TargetCursor-TS-TW @react-bits/Magnet-TS-TW @react-bits/DecryptedText-TS-TW

# your pro component
npx shadcn@latest add @reactbits-pro/skill-corporate-trust
```

If shadcn asks to overwrite `src/index.css`, answer no. If a React Bits name is not found, copy the command from that component's page on reactbits.dev (choose TypeScript + Tailwind).
`src/components/rb.ts` is the only file that points at the installed React Bits files. If they landed outside `src/components/ui`, fix the paths there.

Optional contact form endpoint (Formspree, Web3Forms, your own API): create `.env` with `VITE_FORM_ENDPOINT=https://...`.
Without it the form opens the visitor's mail app with the enquiry filled in, and says so. It no longer fakes a successful send.

## 2. Where each React Bits piece is used

| Component | Where |
|---|---|
| Silk | Hero background |
| ScrollVelocity | Services marquee under the hero |
| ScrollReveal | Company statement on home |
| DecryptedText | Tool list on each service card, on hover |
| DotGrid | Closing call to action |
| Magnet | Closing call to action button |
| TargetCursor | Site-wide cursor, targets anything with `.cursor-target` |

GSAP: hero scroll tilt, stacked service cards, process line, footer wordmark, loader, masked headline reveals.
Framer Motion: route curtain, nav active indicator, floating CTA.

## 3. Content to confirm

All copy lives in `src/content/site.ts`. It uses the text from your current site. These items were **left out** because they could not be verified, and the site renders fine without them:

- Projects (all six). Add real ones to `projects` and the Portfolio page, nav link and home section appear on their own.
- Testimonials (all six, with named people and company names).
- Stats: 150+ projects, 98% retention, 8+ years, 50+ clients, "most clients stay 3+ years".
- "6-month post-launch support included", "Free consultation", "No upfront costs", "Response within 4 hours".
- Technology marquee list.

Please also confirm: the six services (the site's meta description names four: web development, mobile app development, digital marketing, growth analytics), the dollar budget ranges in the contact form, the sprint and Friday demo wording, and the LinkedIn address `company/ak-edumasters`.

## 4. Assets to generate

Save into `public/assets/` as WebP. Every slot shows a quiet pattern until its file exists, so nothing breaks while you generate them.

Shared style, add to every prompt:
> Matte studio render, deep bottle-green background (#072A1E), a single soft emerald rim light (#19C46B), fine film grain, shallow depth of field, generous empty space, premium editorial feel. No text, no letters, no numbers, no logos, no people, no watermarks.

1. `hero-frame.webp`, 2400x1350
   > Straight-on render of an abstract dark-mode desktop application window, cropped at the bottom edge. The interface is made only of abstract placeholder shapes: a left rail of plain squares, a row of tab bars, a grid of panels holding smooth area curves, ring segments and horizontal bars in emerald (#19C46B) and white on deep green-black (#06201A). Crisp vector-like edges, faint glass reflection along the top edge. Absolutely no readable text or numbers.

2. `service-web.webp`, 1600x1200
   > Several translucent browser windows floating at slight angles, stacked in depth. Wireframe blocks inside, one component highlighted in emerald. Soft contact shadows.

3. `service-mobile.webp`, 1600x1200
   > Two smartphones at opposing angles, screens showing abstract card layouts and one emerald button, thin metal edges catching the rim light.

4. `service-marketing.webp`, 1600x1200
   > Beams of emerald light converging through stacked glass slabs into one bright point, suggesting a funnel narrowing.

5. `service-analytics.webp`, 1600x1200
   > Sculptural frosted-glass bar and ring charts floating over a faint grid, one bar in solid emerald. No axis labels.

6. `service-design.webp`, 1600x1200
   > A single bezier curve with handles and anchor points over a fine grid, one emerald circle and one square as construction shapes.

7. `service-consulting.webp`, 1600x1200
   > Isometric cluster of geometric glass primitives (cloud-like form, shield-like form, cube) joined by thin emerald lines.

8. `og-image.png`, 1200x630 (then reference it in `index.html`)
   > Large soft emerald light bloom on deep green, left third kept empty for the wordmark added afterwards. Shared style above.

9. Logo: `Logo.tsx` currently draws "akodefy" as text. Replace its contents with your SVG logo when you have one.

## 5. Status

This was written without network access, so `npm install` and `npm run build` have not been run on it. Expect to resolve a few small items on first run, most likely the React Bits install paths. Send me the error output and I will fix it.

---

## 🎯 New Features: Dynamic Blog System

The site now includes a full-featured blog CMS with:

### ✨ Features
- 📝 **Admin Portal**: Create, edit, and manage blog posts
- ☁️ **Cloudinary Integration**: Upload and optimize images
- 🔥 **Firebase/Firestore**: Real-time content storage
- ✏️ **Rich Content**: Support for paragraphs, headings, quotes, lists
- 🎨 **Draft/Publish Workflow**: Control when content goes live
- ⭐ **Featured Posts**: Highlight important articles
- 🏷️ **Category Filtering**: Organize by topics
- 📱 **Fully Responsive**: Beautiful on all devices

### 🚀 Quick Start

1. **Setup Cloudinary**
   ```bash
   # Get credentials from cloudinary.com
   # Add to .env:
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
   ```

2. **Migrate Existing Posts**
   ```bash
   npm run migrate:blog
   ```

3. **Access Admin Portal**
   ```
   Navigate to /admin
   Sign in with Firebase credentials
   Click "Blog Articles" tab
   ```

### 📚 Documentation

- **Quick Start**: [QUICK_START_BLOG.md](./QUICK_START_BLOG.md) - 15-minute setup
- **Cloudinary Setup**: [CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md) - Image upload config
- **Complete Guide**: [BLOG_SETUP.md](./BLOG_SETUP.md) - Full documentation
- **Existing Docs**: [EMAILJS_SETUP.md](./EMAILJS_SETUP.md), [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)

### 🗂️ Project Structure

```
src/
├── components/
│   ├── admin/
│   │   └── BlogManager.tsx         # Admin blog management UI
│   └── blog/
│       ├── BlogFeatured.tsx        # Featured post hero
│       ├── PostGrid.tsx            # Post listings
│       └── CategoryFilter.tsx      # Category navigation
├── lib/
│   ├── blogService.ts              # Firestore blog operations
│   └── cloudinary.ts               # Image upload utilities
├── pages/
│   ├── BlogPage.dynamic.tsx        # Public blog listing
│   ├── BlogPostPage.dynamic.tsx    # Individual post view
│   └── AdminPage.tsx               # Admin portal with tabs
└── scripts/
    └── migrateBlogToFirestore.ts   # One-time migration
```

### 🎨 Content Management

**Creating Posts:**
1. Go to `/admin` > Blog Articles
2. Click "Create New Article"
3. Fill in title, category, excerpt
4. Upload cover image via Cloudinary
5. Add body content (JSON format)
6. Publish or save as draft

**Content Format:**
```json
[
  {"type": "p", "text": "Paragraph content..."},
  {"type": "h2", "text": "Section Heading"},
  {"type": "quote", "text": "Quote text", "attribution": "Source"},
  {"type": "ul", "items": ["Item 1", "Item 2"]}
]
```

### 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
npm run migrate:blog # Migrate blog posts to Firestore (one-time)
```

### 🌐 Environment Variables

```env
# Firebase (already configured)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...

# Cloudinary (new)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name

# EmailJS (existing)
VITE_EMAILJS_SERVICE_ID=...
```

### 🔒 Security

Firestore security rules control access:
- Public: Read published posts only
- Admin: Full CRUD on all posts
- See `BLOG_SETUP.md` for rule configuration

### 📊 Tech Stack

**Blog System:**
- **Frontend**: React 19, TypeScript 6
- **Styling**: Tailwind CSS 4
- **Animation**: GSAP, Framer Motion
- **Backend**: Firebase/Firestore
- **Media**: Cloudinary
- **Build**: Vite 8

### 🎉 What's Included

- ✅ 7 pre-written blog posts ready to migrate
- ✅ Admin portal with career & blog management
- ✅ Image upload and optimization
- ✅ Category filtering and search
- ✅ Featured post highlighting
- ✅ Draft/publish workflow
- ✅ Responsive design
- ✅ SEO-friendly URLs

---

**Need help?** Check the documentation files or review the browser console for errors.
