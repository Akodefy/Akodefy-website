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
