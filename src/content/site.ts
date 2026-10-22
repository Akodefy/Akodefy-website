/**
 * Single source of truth for site copy.
 * Everything here comes from the current akodefy.com content (meta tags, services,
 * process, about, contact details, social links). Quantified claims and anything
 * that could not be verified are intentionally NOT included: see README, "Content to confirm".
 */

export type Service = { title: string; desc: string; tools: string[]; visual: string }
export type Step = { no: string; title: string; desc: string }
export type Project = {
  title: string
  category: string
  year?: string
  summary?: string
  image: string
  href?: string
}

export const site = {
  name: 'Akodefy',
  legalName: 'Akodefy Info Tech',
  description:
    'Transform your business with cutting-edge IT solutions and digital marketing services. Expert services in web development, mobile app development, digital marketing, and growth analytics.',
  contact: {
    email: 'hello@akodefy.com',
    phone: '+91 90804 45315',
    phoneHref: 'tel:+919080445315',
    location: 'Coimbatore, Tamil Nadu, India',
  },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/akodefyinfotech' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/ak-edumasters' },
    { label: 'WhatsApp', href: 'https://wa.me/919080445315' },
  ],
}

// Add real, approved projects here. While this list is empty the Portfolio
// page, nav link and home section are hidden automatically.
export const projects: Project[] = []

export const nav = [
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  ...(projects.length ? [{ label: 'Portfolio', to: '/portfolio' }] : []),
]

export const hero = {
  headline: 'We Build Digital Excellence That Converts',
  sub: 'From strategy to deployment — we craft high-performance web apps, mobile products, and growth systems for ambitious businesses.',
  secondary: projects.length
    ? { label: 'Our Work', to: '/portfolio' }
    : { label: 'Our Services', to: '/services' },
}

export const statement =
  'Akodefy is a technology company built by engineers and designers who care about outcomes. We partner with ambitious businesses to build web products, mobile apps, and growth systems that compound over time.'

export const services: Service[] = [
  {
    title: 'Web Development',
    desc: 'Fast, scalable web applications — from lean MVPs to enterprise platforms using React, Next.js, and modern API architectures.',
    tools: ['React', 'Next.js', 'Node.js'],
    visual: '/assets/service-web.webp',
  },
  {
    title: 'Mobile App Development',
    desc: 'Native-quality cross-platform apps for iOS and Android. Performant, polished, and built to retain users from first tap.',
    tools: ['React Native', 'Flutter'],
    visual: '/assets/service-mobile.webp',
  },
  {
    title: 'Digital Marketing',
    desc: 'Revenue-obsessed campaigns. SEO, paid media, and conversion optimization tied to your actual business metrics — not vanity.',
    tools: ['SEO', 'Google Ads', 'Meta'],
    visual: '/assets/service-marketing.webp',
  },
  {
    title: 'Growth & Analytics',
    desc: 'Custom dashboards, funnel analysis, and A/B testing that turn raw data into compounding growth decisions.',
    tools: ['Analytics', 'BigQuery'],
    visual: '/assets/service-analytics.webp',
  },
  {
    title: 'UI/UX Design',
    desc: 'Interfaces that feel inevitable. We design for conversion, retention, and delight — with pixel-precise execution in Figma.',
    tools: ['Figma', 'Design Systems'],
    visual: '/assets/service-design.webp',
  },
  {
    title: 'IT Consulting',
    desc: 'Cloud architecture, security audits, and digital transformation roadmapping. Strategic technology counsel for ambitious teams.',
    tools: ['Cloud', 'Security'],
    visual: '/assets/service-consulting.webp',
  },
]

export const process = {
  title: 'From idea to launch, systematically.',
  steps: [
    { no: '01', title: 'Discover', desc: 'We map your goals, constraints, users, and competitive landscape. No assumptions — just sharp strategy.' },
    { no: '02', title: 'Design', desc: 'Wireframes to high-fidelity in Figma. You shape it before a line of code is written.' },
    { no: '03', title: 'Build', desc: 'Clean, tested, documented code. Two-week sprints. Friday demos. Full transparency.' },
    { no: '04', title: 'Launch', desc: 'Zero-downtime deployment, post-launch monitoring, and KPI benchmarking.' },
  ] as Step[],
}

export const about = {
  title: 'A team obsessed with digital craft.',
  heroTitle: 'Crafting digital futures, one project at a time',
  heroSub:
    "We're a team of developers, designers, and strategists obsessed with building exceptional digital experiences.",
  checks: [
    'Full-stack delivery, strategy to deployment',
    '2-week sprint cadence with Friday demos',
    'Dedicated PM and dev lead per project',
    'SEO & Core Web Vitals built in from day one',
    'Transparent pricing — no hidden costs',
  ],
  pillars: [
    { title: 'Ship Fast', text: 'Biweekly deliverables, Friday demos. You always know where your product is — no black-box sprints.' },
    { title: 'Outcome Obsessed', text: 'We measure success by your revenue, retention, and conversion — not our delivery count.' },
    { title: 'Long-Term Partners', text: 'We grow with your business, not just through kickoff.' },
  ],
  values: [
    { title: 'Mission', text: 'To empower businesses through innovative digital solutions that drive measurable, lasting growth.' },
    { title: 'Vision', text: 'To be the most trusted technology partner for ambitious brands building the future.' },
    { title: 'Values', text: 'Integrity, excellence, creativity, and relentless client focus guide everything we do.' },
  ],
}

export const pages = {
  services: {
    title: 'Services built to scale',
    sub: 'From concept to launch, we deliver end-to-end digital solutions that grow your business and delight your users.',
  },
  contact: {
    title: 'Let’s start building together',
    sub: 'Tell us about your project and we’ll respond with a tailored plan.',
    services: ['Web Development', 'Mobile App', 'Digital Marketing', 'UI/UX Design', 'Analytics', 'IT Consulting'],
    budgets: ['$5k–$10k', '$10k–$25k', '$25k–$50k', '$50k+'],
  },
  portfolio: { title: 'Work that speaks for itself' },
}

export const cta = {
  title: 'Let’s build your next big thing.',
  sub: 'No templates, no guesswork. Precise digital solutions built for your goals.',
}

// ─── APPEND THIS TO THE END OF src/content/site.ts ───────────────────────────

export type Testimonial = { quote: string; name: string; role: string; company: string }
export type Stat = { value: number; suffix?: string; label: string }

export const testimonialsHeading = 'Words from people who trust us'

// Carried over from the previous akodefy.com. Several quotes cite figures: confirm each with the client.
export const testimonials: Testimonial[] = [
  {
    quote: 'Akodefy rebuilt our platform into something we’re genuinely proud to show clients. On time, no drama, real results.',
    name: 'Rajesh Kumar',
    role: 'CEO',
    company: 'Tech Solutions India',
  },
  {
    quote: 'Our e-commerce conversion went from 1.2% to 3.8% in two months. They actually understood our business, not just the code.',
    name: 'Priya Sharma',
    role: 'Founder',
    company: 'Fashion Hub',
  },
  {
    quote: 'The analytics dashboard surfaced a $1.2M revenue gap we’d been blind to for years. Exceptional ROI.',
    name: 'Vikram Singh',
    role: 'Operations Director',
    company: 'AutoZone India',
  },
  {
    quote: 'Our mobile app launched with a 4.8-star rating. The UI craftsmanship alone justified the whole engagement.',
    name: 'Anita Verma',
    role: 'Product Lead',
    company: 'EduLearn Academy',
  },
  {
    quote: 'Two other agencies failed before Akodefy. They’re the first team that actually moved our revenue needle.',
    name: 'Mohammed Ali',
    role: 'Managing Director',
    company: 'Gulf Trading Co',
  },
  {
    quote: 'Rebuilt our entire IT infrastructure in 6 weeks, ran staff workshops too. Way beyond the brief.',
    name: 'Lakshmi N.',
    role: 'CTO',
    company: 'Sri Balaji Motors',
  },
]

// Animated counters. Empty on purpose: the section stays hidden until you add numbers you can stand behind.
// Example: { value: 8, suffix: '+', label: 'Years building' }
export const stats: Stat[] = []