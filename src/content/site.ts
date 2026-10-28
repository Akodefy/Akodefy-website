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
  { label: 'Pricing', to: '/pricing' },
  ...(projects.length ? [{ label: 'Portfolio', to: '/portfolio' }] : []),
]

export const hero = {
  headline: 'We Build Digital Excellence That Converts',
  sub: 'From strategy to deployment - we craft high-performance web apps, mobile products, and growth systems for ambitious businesses.',
  secondary: projects.length
    ? { label: 'Our Work', to: '/portfolio' }
    : { label: 'Our Services', to: '/services' },
}

export const statement =
  'Akodefy is a technology company built by engineers and designers who care about outcomes. We partner with ambitious businesses to build web products, mobile apps, and growth systems that compound over time. Every product we ship is built to perform, retain, and grow.'

export const services: Service[] = [
  {
    title: 'Web Development',
    desc: 'Fast, scalable web applications engineered for performance, security, and compound growth. From interactive MVPs to enterprise platforms, we craft robust full-stack architectures using React, Next.js, and modern API ecosystems.',
    tools: ['React', 'Next.js', 'Node.js'],
    visual: '/assets/service-web.webp',
  },
  {
    title: 'Mobile App Development',
    desc: 'Native-quality cross-platform applications for iOS and Android that users love returning to. Performant, polished, and built with fluid 60fps animations, offline-first reliability, and seamless backend integrations.',
    tools: ['React Native', 'Flutter'],
    visual: '/assets/service-mobile.webp',
  },
  {
    title: 'Digital Marketing',
    desc: 'Revenue-obsessed campaigns designed to acquire, activate, and retain high-intent customers. We orchestrate data-backed SEO, targeted paid media across search and social, and relentless conversion rate optimization.',
    tools: ['SEO', 'Google Ads', 'Meta'],
    visual: '/assets/service-marketing.webp',
  },
  {
    title: 'Growth & Analytics',
    desc: 'Turn raw interaction data into clear, compounding business decisions. We design custom KPI dashboards, cohort retention funnels, and continuous multivariate experimentation that remove guesswork from your growth trajectory.',
    tools: ['Analytics', 'BigQuery'],
    visual: '/assets/service-analytics.webp',
  },
  {
    title: 'UI/UX Design',
    desc: 'Digital interfaces that feel intuitive, elegant, and inevitable. We design for maximum conversion, user retention, and brand loyalty - backed by in-depth user research and pixel-precise design systems built in Figma.',
    tools: ['Figma', 'Design Systems'],
    visual: '/assets/service-design.webp',
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic technology counsel, cloud architecture design, and comprehensive security audits for ambitious teams. We help modern businesses modernize legacy stacks, streamline DevOps CI/CD pipelines, and scale infrastructure predictably.',
    tools: ['Cloud', 'Security'],
    visual: '/assets/service-consulting.webp',
  },
]

export const process = {
  title: 'From idea to launch, systematically.',
  steps: [
    { no: '01', title: 'Discover', desc: 'We map your goals, constraints, users, and competitive landscape. No assumptions - just sharp strategy.' },
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
    'Transparent pricing - no hidden costs',
  ],
  pillars: [
    { title: 'Ship Fast', text: 'Biweekly deliverables, Friday demos. You always know where your product is - no black-box sprints.' },
    { title: 'Outcome Obsessed', text: 'We measure success by your revenue, retention, and conversion - not our delivery count.' },
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
    title: 'Letâ€™s start building together',
    sub: 'Tell us about your project and weâ€™ll respond with a tailored plan.',
    services: ['Web Development', 'Mobile App', 'Digital Marketing', 'UI/UX Design', 'Analytics', 'IT Consulting'],
    timelines: ['Immediately', 'In 1 week', 'In 1 month', 'In 2-3 months'],
  },
  portfolio: { title: 'Work that speaks for itself' },
}

export const cta = {
  title: "Let's build your next big thing.",
  sub: 'No templates, no guesswork. Precise digital solutions built for your goals.',
}

// â”€â”€â”€ APPEND THIS TO THE END OF src/content/site.ts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type Testimonial = { quote: string; name: string; role: string; company: string }
export type Stat = { value: number; suffix?: string; label: string }

export const testimonialsHeading = 'Words from people who trust us'

// Carried over from the previous akodefy.com. Several quotes cite figures: confirm each with the client.
export const testimonials: Testimonial[] = [
  {
    quote: 'Akodefy built our Kreativ Studio website from scratch. The attention to detail and the animations they delivered were beyond what we imagined. Every client who visits compliments the site.',
    name: 'Karthikeyan',
    role: 'Creative Director',
    company: 'Kreativ Studio',
  },
  {
    quote: 'Our Dumbledore Travel booking platform now converts at 3.6%. Akodefy understood the travel business deeply and built something that genuinely moves people to book.',
    name: 'Thirunavukkarasu',
    role: 'Founder',
    company: 'Dumbledore Travel',
  },
  {
    quote: 'They redesigned our entire Hydra Water Tech product catalogue site in under three weeks. Clean, fast, and our sales team finally has something they are proud to share.',
    name: 'Senthilkumar',
    role: 'Managing Director',
    company: 'Hydra Water Tech',
  },
  {
    quote: 'The Priya Homes Interiors website Akodefy delivered tripled our enquiry rate in 60 days. The portfolio layout they designed showcases our work better than any brochure ever could.',
    name: 'Vijayalakshmi',
    role: 'CEO',
    company: 'Priya Homes Interiors',
  },
  {
    quote: 'Two other agencies failed to deliver a working mobile app. Akodefy launched Galaxy Sports in 8 weeks with a 4.7-star rating on day one. They are the only team we trust now.',
    name: 'Mohammed Ali',
    role: 'Operations Director',
    company: 'Galaxy Sports',
  },
  {
    quote: 'Akodefy rebuilt the RM Infotech platform and integrated our CRM in a single sprint. The handoff documentation was so thorough our in-house team could maintain it immediately.',
    name: 'Balasubramanian',
    role: 'CTO',
    company: 'RM Infotech',
  },
]

// Animated counters. Empty on purpose: the section stays hidden until you add numbers you can stand behind.
// Example: { value: 8, suffix: '+', label: 'Years building' }
export const stats: Stat[] = []

export const techHeading = 'Technologies we ship with'
 
// Carried over from the previous akodefy.com. Edit so it lists only what you genuinely use.
export const techRows: string[][] = [
  ['React', 'Next.js', 'TypeScript', 'Node.js', 'React Native', 'Flutter', 'Figma', 'Python', 'AWS', 'Firebase', 'GSAP', 'Framer'],
  ['PostgreSQL', 'MongoDB', 'GraphQL', 'Docker', 'Tailwind', 'Stripe', 'TensorFlow', 'Redis', 'Cloudflare', 'Supabase', 'Prisma', 'Vercel'],
]

export type PricingPlan = {
  name: string
  blurb: string
  price: string
  unit: string
  featured?: boolean
  features: string[]
  cta: { label: string; to: string }
}
export type PricingRow = { label: string; values: [boolean | string, boolean | string, boolean | string] }
export type PricingSection = { title: string; rows: PricingRow[] }
 
/**
 * Draft. The three budget ranges are the ones already on your contact form.
 * The plan names, what sits in each plan and the table rows are a first structure built
 * from your existing services and process copy: confirm or edit every row before launch.
 */
export const pricing = {
  title: 'Transparent pricing, no hidden costs',
  sub: 'Pick the budget range closest to your project and weâ€™ll respond with a tailored plan.',
  info: {
    title: 'Budget',
    points: [
      'Transparent pricing, no hidden costs',
      'Two-week sprints with Friday demos',
      'A dedicated PM and dev lead on every project',
    ],
    note: 'Ranges are in US dollars.',
  },
  plans: [
    {
      name: 'Launch',
      blurb: 'A focused build to get you to market',
      price: '$5kâ€“$10k',
      unit: 'per project',
      features: [
        'One service area',
        'Lean MVP scope',
        'Dedicated PM and dev lead',
        'Two-week sprints with Friday demos',
        'Zero-downtime deployment',
      ],
      cta: { label: 'Start a project', to: '/contact' },
    },
    {
      name: 'Growth',
      blurb: 'For products and campaigns that need to scale',
      price: '$10kâ€“$25k',
      unit: 'per project',
      featured: true,
      features: [
        'Up to two service areas',
        'Production-ready product',
        'Dedicated PM and dev lead',
        'Two-week sprints with Friday demos',
        'SEO and Core Web Vitals built in',
        'KPI benchmarking after launch',
      ],
      cta: { label: 'Start a project', to: '/contact' },
    },
    {
      name: 'Scale',
      blurb: 'Enterprise platforms and multi-service programmes',
      price: '$25k+',
      unit: 'letâ€™s talk',
      features: [
        'Multiple service areas',
        'Enterprise platforms',
        'Cloud architecture and security audits',
        'Digital transformation roadmapping',
        'Dedicated PM and dev lead',
        'KPI benchmarking after launch',
      ],
      cta: { label: 'Talk to us', to: '/contact' },
    },
  ] as PricingPlan[],
  sections: [
    {
      title: 'Scope',
      rows: [
        { label: 'Service areas', values: ['One', 'Up to two', 'Multiple'] },
        { label: 'Typical project size', values: ['Lean MVP', 'Production product', 'Enterprise platform'] },
        { label: 'Web and mobile products', values: [true, true, true] },
        { label: 'UI/UX design in Figma', values: [true, true, true] },
        { label: 'SEO, paid media and conversion work', values: [false, true, true] },
        { label: 'Growth analytics and A/B testing', values: [false, true, true] },
        { label: 'Cloud architecture and security audits', values: [false, false, true] },
        { label: 'Digital transformation roadmapping', values: [false, false, true] },
      ],
    },
    {
      title: 'How we work',
      rows: [
        { label: 'Dedicated PM and dev lead', values: [true, true, true] },
        { label: 'Two-week sprints with Friday demos', values: [true, true, true] },
        { label: 'Discover, Design, Build, Launch', values: [true, true, true] },
        { label: 'SEO and Core Web Vitals built in', values: [true, true, true] },
        { label: 'Zero-downtime deployment', values: [true, true, true] },
        { label: 'Post-launch monitoring', values: [true, true, true] },
        { label: 'KPI benchmarking', values: [false, true, true] },
      ],
    },
    {
      title: 'Budget and next step',
      rows: [
        { label: 'Budget range (USD)', values: ['$5kâ€“$10k', '$10kâ€“$25k', '$25k+'] },
        { label: 'A tailored plan from our team', values: [true, true, true] },
        { label: 'Transparent pricing, no hidden costs', values: [true, true, true] },
      ],
    },
  ] as PricingSection[],
  faqTitle: 'Questions about pricing',
  faq: [
    {
      q: 'How do I get an exact quote?',
      a: 'Tell us about your project through the contact form and weâ€™ll respond with a tailored plan. The ranges above are budget guides.',
    },
    {
      q: 'Are there any hidden costs?',
      a: 'No. Our pricing is transparent, with no hidden costs.',
    },
    {
      q: 'What does a project look like week to week?',
      a: 'Work runs in two-week sprints with a demo every Friday, so you always know where your product is. A dedicated PM and dev lead stay with your project throughout.',
    },
    {
      q: 'What is included at launch?',
      a: 'Zero-downtime deployment, post-launch monitoring, and KPI benchmarking.',
    },
    {
      q: 'Can I combine services?',
      a: 'Yes. We cover web development, mobile app development, digital marketing, growth and analytics, UI/UX design and IT consulting, and a plan can span more than one of them.',
    },
    {
      q: 'Is SEO included?',
      a: 'SEO and Core Web Vitals are built in from day one.',
    },
  ],
}

export type JobRole = {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  responsibilities: string[]
  requirements: string[]
}

export const careers = {
  title: 'Build the future with us.',
  sub: 'We are a team of engineers, designers, and strategists who care about craft, outcomes, and each other.',

  why: {
    title: 'Why Akodefy',
    points: [
      {
        label: 'Meaningful work',
        text: 'Every project we take on solves a real problem for a real business. You will see the impact of your work within weeks, not years.',
      },
      {
        label: 'Craft-first culture',
        text: 'We believe in doing things properly. Code is reviewed, designs are iterated, and shipping something mediocre is not an option.',
      },
      {
        label: 'Ownership and trust',
        text: 'You own your domain. No micromanagement - just clear goals, the resources you need, and the autonomy to get there.',
      },
      {
        label: 'Transparent growth',
        text: 'Biannual reviews with clear levelling criteria. No hidden ladders, no politics - just consistent performance and visible progress.',
      },
    ],
  },

  perks: [
    { label: 'Flexible hours', text: 'Core overlap, async-friendly. We care about output, not clock-in times.' },
    { label: 'Remote-first', text: 'Work from anywhere. We have team members across India and beyond.' },
    { label: 'Learning budget', text: 'Annual budget for courses, books, and conferences of your choice.' },
    { label: 'Health cover', text: 'Comprehensive health insurance for you and your immediate family.' },
    { label: 'Equity potential', text: 'Tenured team members are eligible for an equity programme as we scale.' },
    { label: 'Friday demos', text: 'The whole company ships and shows work every two weeks. No silos, full context.' },
  ],

  values: [
    { label: 'Relentless quality', text: 'Good enough is not in our vocabulary.' },
    { label: 'Radical candour', text: 'Honest feedback, delivered with care.' },
    { label: 'Client obsession', text:"We measure success by the client's outcomes." },
    { label: 'Continuous learning', text: 'Curiosity is a core competency here.' },
  ],

  openRoles: [
    {
      id: 'sr-frontend-engineer',
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      location: 'Coimbatore / Remote',
      type: 'Full-time',
      experience: '4+ years',
      description:
        'You will be the technical lead on client-facing web products - from architecture decisions to pixel-level implementation. You care about performance, accessibility, and a codebase that the next person will enjoy inheriting.',
      responsibilities: [
        'Architect and build high-performance React and Next.js applications',
        'Set and uphold frontend code quality standards across the team',
        'Collaborate with designers to deliver pixel-precise, accessible interfaces',
        'Optimise Core Web Vitals and SEO technical requirements from day one',
        'Mentor mid-level engineers through code review and pair programming',
        'Contribute to tooling, CI pipelines, and engineering documentation',
      ],
      requirements: [
        'Deep expertise in React, TypeScript, and modern CSS',
        'Strong understanding of browser performance and Core Web Vitals',
        'Experience with Next.js App Router and server components',
        'Familiarity with animation libraries such as GSAP or Framer Motion',
        'Track record of owning features end-to-end in a product environment',
        'Clear written and verbal communication skills',
      ],
    },
    {
      id: 'product-designer',
      title: 'Product Designer',
      department: 'Design',
      location: 'Coimbatore / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description:
        'You will own the design of client products from discovery through delivery. You are equally comfortable in a whiteboard session and pixel-pushing in Figma, and you understand that great design is measured by business outcomes, not Dribbble likes.',
      responsibilities: [
        'Lead UX research, user journey mapping, and information architecture',
        'Produce wireframes, prototypes, and high-fidelity Figma deliverables',
        'Define and maintain component libraries and design systems',
        'Work directly with clients to gather feedback and iterate quickly',
        'Collaborate with engineers to ensure pixel-precise implementation',
        'Advocate for the user in every product and business decision',
      ],
      requirements: [
        'A strong portfolio demonstrating shipped product work',
        'Advanced Figma skills including auto-layout, variables, and prototyping',
        'Experience conducting user research and synthesising findings',
        'Understanding of frontend development constraints and possibilities',
        'Ability to design for accessibility (WCAG 2.1 AA)',
        'Excellent taste and a passion for interaction details',
      ],
    },
    {
      id: 'digital-marketing-strategist',
      title: 'Digital Marketing Strategist',
      department: 'Growth',
      location: 'Coimbatore / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description:
        'You will design and execute data-driven digital marketing strategies for our clients across SEO, paid media, and conversion optimisation. You connect campaigns directly to revenue, and you are as comfortable in a spreadsheet as you are writing a brief.',
      responsibilities: [
        'Build and manage SEO, Google Ads, and Meta campaigns for multiple clients',
        'Conduct market and competitor analysis to shape growth strategy',
        'Define KPIs, set up tracking, and report on performance with full transparency',
        'Run A/B and multivariate tests to continuously improve conversion rates',
        'Brief the design and content teams to produce campaign assets',
        'Stay current with algorithm changes, platform updates, and industry trends',
      ],
      requirements: [
        'Proven track record driving measurable revenue growth through digital channels',
        'Deep expertise in Google Ads, Meta Business Suite, and SEO tools',
        'Strong analytical skills with experience in GA4, Search Console, and Looker Studio',
        'Experience with conversion rate optimisation and landing page testing',
        'Excellent written communication and client-facing skills',
        'Google Ads and Meta Blueprint certifications are a plus',
      ],
    },
    {
      id: 'react-native-engineer',
      title: 'React Native Engineer',
      department: 'Engineering',
      location: 'Coimbatore / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description:
        'You will build native-quality cross-platform mobile applications that users return to. Performance, polish, and reliability are non-negotiable - you understand how to make React Native feel genuinely native.',
      responsibilities: [
        'Build and ship cross-platform iOS and Android applications in React Native',
        'Implement performant animations and gesture-driven interactions',
        'Integrate REST and GraphQL APIs, push notifications, and device APIs',
        'Write automated tests and maintain a CI/CD pipeline for mobile releases',
        'Conduct App Store and Play Store release management',
        'Collaborate closely with designers to achieve native interaction quality',
      ],
      requirements: [
        'Production experience with React Native and Expo',
        'Understanding of native modules and bridging when required',
        'Familiarity with Reanimated 3 and Gesture Handler',
        'Experience submitting apps to the App Store and Google Play',
        'Strong TypeScript skills',
        'Attention to performance profiling and memory management',
      ],
    },
  ] as JobRole[],

  applicationProcess: [
    { no: '01', title: 'Apply', desc: 'Submit your application below. We read every submission personally - no automated filters.' },
    { no: '02', title: 'Intro call', desc: 'A 30-minute conversation with the hiring manager to learn about each other and align on expectations.' },
    { no: '03', title: 'Skills review', desc: 'A relevant, paid work sample or technical interview - scoped to two hours maximum.' },
    { no: '04', title: 'Team meet', desc: 'You meet the team you would work with day-to-day and ask every question you need to ask.' },
    { no: '05', title: 'Offer', desc: 'A clear, transparent offer with no negotiation games. We make our best offer first.' },
  ],

  openToAll: {
    title: 'Not the right role?',
    text: 'We are always open to exceptional people. If you do not see a role that fits but believe you belong at Akodefy, send a speculative application.',
  },
}
export const partnersHeading = 'Our trusted partners'
export type PartnerTile = 'dark' | 'black' | 'navy' | 'light'
export type PartnerMode = 'mono' | 'gray'
export type Partner = { name: string; logo: string; tile: PartnerTile; mode: PartnerMode }
export const partners: Partner[] = [
  { name: 'Aachi Agencies',          logo: '/assets/partners/aachi-agencies.webp',        tile: 'light', mode: 'mono' },
  { name: 'AGS Interiors',           logo: '/assets/partners/ags-interiors.webp',          tile: 'dark',  mode: 'gray' },
  { name: 'AVFX Trade',              logo: '/assets/partners/avfx-trade.webp',             tile: 'black', mode: 'gray' },
  { name: 'Big Mishra',              logo: '/assets/partners/big-mishra.webp',             tile: 'light', mode: 'mono' },
  { name: 'DJ MD',                   logo: '/assets/partners/dj-md.webp',                  tile: 'black', mode: 'gray' },
  { name: 'Dumbledore Travel',       logo: '/assets/partners/dumbledore-travel.webp',      tile: 'black', mode: 'gray' },
  { name: 'Galaxy Sports',           logo: '/assets/partners/galaxy-sports.webp',          tile: 'navy',  mode: 'mono' },
  { name: 'Hipple Travels',          logo: '/assets/partners/hipple-travels.webp',         tile: 'light', mode: 'mono' },
  { name: 'Hydra Water Tech',        logo: '/assets/partners/hydra-water-tech.webp',       tile: 'light', mode: 'mono' },
  { name: 'Infantry Automak',        logo: '/assets/partners/infantry-automak.webp',       tile: 'navy',  mode: 'gray' },
  { name: 'Kreativ Studio',          logo: '/assets/partners/kreativ-studio.webp',         tile: 'light', mode: 'mono' },
  { name: 'Nexus FX',               logo: '/assets/partners/nexus-fx.webp',               tile: 'navy',  mode: 'mono' },
  { name: 'Prema Boutique',          logo: '/assets/partners/prema-botique.webp',          tile: 'light', mode: 'gray' },
  { name: 'Priya Homes Interiors',   logo: '/assets/partners/priya-homes-interiors.webp', tile: 'black', mode: 'gray' },
  { name: 'RM Infotech',             logo: '/assets/partners/rm-infotech.webp',            tile: 'dark',  mode: 'mono' },
  { name: 'The Beautology',          logo: '/assets/partners/the-beautology.webp',         tile: 'black', mode: 'gray' },
  { name: 'Thirumalai',              logo: '/assets/partners/thirumalai.webp',             tile: 'black', mode: 'gray' },
  { name: 'Works Mania',             logo: '/assets/partners/works-mania.webp',            tile: 'navy',  mode: 'mono' },
  { name: 'WOW',                     logo: '/assets/partners/wow.webp',                    tile: 'light', mode: 'mono' },
  { name: 'YoYo',                    logo: '/assets/partners/yoyo.webp',                   tile: 'black', mode: 'gray' },
  { name: 'Zentra',                  logo: '/assets/partners/zentra.webp',                 tile: 'black', mode: 'gray' },
]
