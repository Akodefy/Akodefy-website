/**
 * Blog content — single source of truth.
 * Body blocks render as a reading-column in BlogPostPage.
 */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'ul'; items: string[] }

export type Post = {
  slug: string
  title: string
  category: string
  date: string
  readTime: number
  excerpt: string
  cover: string
  coverGradient: string
  featured: boolean
  body: PostBlock[]
}

export const posts: Post[] = [
  {
    slug: 'website-performance-is-your-marketing-strategy',
    title: 'Your Website Performance IS Your Marketing Strategy',
    category: 'Performance',
    date: '2025-10-15',
    readTime: 10,
    excerpt:
      'A one-second delay in page load reduces conversions by 7%. That makes Core Web Vitals the highest-leverage marketing channel most businesses are actively ignoring.',
    cover: '/assets/blog/performance.jpg',
    coverGradient: 'linear-gradient(135deg, #0a2e1a 0%, #0c4d2a 40%, #1a6b3a 70%, #2BFF88 100%)',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'Marketing teams spend months A/B-testing button colours and rewriting ad copy. Meanwhile the site they send traffic to loads in 4.8 seconds on a mid-range Android device. The maths simply does not work out. You cannot buy attention and then squander it on a slow page.',
      },
      {
        type: 'p',
        text: 'This is not a new problem, and it is not a secret. Google has published performance benchmarks for years. The data is consistent, it is public, and it is almost universally ignored by the teams who most need to act on it.',
      },
      {
        type: 'h2',
        text: 'The numbers people keep ignoring',
      },
      {
        type: 'p',
        text: 'Sites that load in under one second convert at three times the rate of sites that take five seconds. The BBC found that every additional second of load time caused them to lose 10% of users. Walmart recorded a 2% increase in conversions for every one-second improvement in load time. These are not edge cases — they are the median outcome across every business category that has measured it.',
      },
      {
        type: 'p',
        text: 'For e-commerce this translates directly to revenue. For SaaS, it affects trial activation rates. For service businesses, it affects whether a contact form ever gets submitted. The cost of a slow site is invisible on a balance sheet — which is precisely why it is so rarely prioritised.',
      },
      {
        type: 'quote',
        text: 'Performance is not a developer concern. It is a revenue concern. When you treat it as the former, it never gets prioritised by the people who control the budget.',
        attribution: 'Akodefy Engineering',
      },
      {
        type: 'h2',
        text: 'What actually slows sites down',
      },
      {
        type: 'p',
        text: 'Most performance problems are caused by the same short list of issues repeated across thousands of sites. Understanding this list is half the battle — once you know what to look for, most audits take less than an hour.',
      },
      {
        type: 'ul',
        items: [
          'Unoptimised images — the single biggest culprit we find in 80% of audits. A JPEG uploaded at 3840px wide served in a 400px container wastes ten times the bandwidth it needs to.',
          'Third-party scripts loaded synchronously — chat widgets, analytics, tracking pixels. Each one adds its own round-trip and blocks the main thread.',
          'No caching strategy — every page visit re-fetches the same CSS, JavaScript, and images that have not changed in weeks.',
          'Render-blocking JavaScript that sits in the document head and prevents the page from painting until it downloads and executes.',
          'Web fonts without font-display: swap — the browser renders invisible text until the custom font loads, creating a blank reading experience.',
          'Unused CSS shipped in a monolithic bundle — a common consequence of using large component libraries and not tree-shaking them properly.',
        ],
      },
      {
        type: 'h2',
        text: 'The fix is not always a rebuild',
      },
      {
        type: 'p',
        text: 'The assumption we hear most often is that fixing a slow site requires a complete frontend rewrite. In our experience, this is almost never true. The majority of performance wins come from changes that touch configuration, assets, and loading strategy — not application code.',
      },
      {
        type: 'p',
        text: 'Converting images to WebP or AVIF format alone routinely reduces image payload by 30–50%. Adding proper cache headers on static assets means repeat visitors pay almost nothing in load time. Deferring non-critical JavaScript until after the page has painted removes most render-blocking delays without changing any functionality.',
      },
      {
        type: 'h3',
        text: 'Where to start',
      },
      {
        type: 'p',
        text: 'Run a Lighthouse audit in Chrome DevTools. Look at your Largest Contentful Paint — this is the image or text block that takes longest to appear. Fix that first. Then look at Total Blocking Time. Then look at your waterfall chart in the Network tab and identify the three largest assets. In most cases, addressing those five things will move your score from the red zone into the green.',
      },
      {
        type: 'p',
        text: 'Performance is not a one-time fix. It degrades as new features, new analytics tools, and new third-party integrations are added. The teams that maintain fast sites treat performance as an ongoing discipline with a budget — every new addition must justify its weight.',
      },
    ],
  },
  {
    slug: 'the-case-against-generic-ui',
    title: 'The Case Against Generic UI: Why Craft Wins Clients',
    category: 'Design',
    date: '2025-09-28',
    readTime: 8,
    excerpt:
      'Template-based design optimises for launch speed. But the moment a visitor compares your site to a competitor built on the same Webflow template, the trust deficit is immediate and hard to recover.',
    cover: '/assets/blog/design.jpg',
    coverGradient: 'linear-gradient(145deg, #0c0e1f 0%, #1a1040 45%, #2d1b6b 75%, #7c4dff 100%)',
    featured: false,
    body: [
      {
        type: 'p',
        text: 'There is a point in every project where someone says "just use a template, it is faster." They are right — it is faster. And that shortcut compounds over time in exactly the ways you would expect. The product is launched. The template is live. Six months later the client is in a competitive category where four of their closest competitors are running the same Webflow theme with different logos.',
      },
      {
        type: 'p',
        text: 'Templates exist to get businesses to a live site quickly and cheaply. That is their job, and for the right situation they are appropriate. But a template is, by definition, designed for nobody in particular. It cannot make a claim about who you are.',
      },
      {
        type: 'h2',
        text: 'Trust is a design output',
      },
      {
        type: 'p',
        text: 'Research in web credibility — including studies from Stanford, Nielsen Norman Group, and others — consistently finds that visual design is the primary factor in whether a first-time visitor trusts a site. Not copy. Not reviews. Not credentials. Design. The judgement is made in under seven seconds, and it is largely unconscious.',
      },
      {
        type: 'p',
        text: 'This does not mean you need to spend a fortune. It means you need intentionality. A site that is clearly considered — where the typography is chosen deliberately, the spacing feels purposeful, and the colour palette is owned rather than borrowed — communicates competence before a single word is read.',
      },
      {
        type: 'quote',
        text: 'Generic design does not just look average. It communicates that your business could not be bothered to invest in the first thing a customer sees.',
      },
      {
        type: 'h2',
        text: 'What craft actually means in practice',
      },
      {
        type: 'p',
        text: 'Craft is not complexity. Some of the most effective websites are extremely simple. What they are not is generic. Every decision has been made — not defaulted. The font was selected because of what it says about the brand. The whitespace is deliberate, not a padding default. The hover state on a button was considered.',
      },
      {
        type: 'ul',
        items: [
          'Typography that reflects brand personality — not the system default or the most popular Google Font of the year',
          'Spacing that feels considered at every level: between letters, between paragraphs, between sections',
          'Colour that is owned — a palette that exists nowhere else, designed for this brand specifically',
          'Motion that communicates hierarchy and invites interaction, rather than animation added because a library made it easy',
          'Responsive behaviour that was designed, not just made to technically work at 375px',
        ],
      },
      {
        type: 'h2',
        text: 'The business case for investing in design',
      },
      {
        type: 'p',
        text: 'We track conversion rates on sites we build and redesign. The difference between a crafted design and a template, holding all other variables constant, is consistently measurable. We see improvements in time-on-site, scroll depth, and form completion rates that template sites simply do not achieve.',
      },
      {
        type: 'p',
        text: 'More importantly: a well-designed site changes how a business is perceived in conversations. Clients we work with regularly report that prospects mention their website unprompted. That does not happen with templates. It happens when something is clearly made.',
      },
      {
        type: 'h3',
        text: 'Where to begin',
      },
      {
        type: 'p',
        text: 'If you are redesigning: start with typography and colour before you touch layout. Get those two things right and the rest follows. If you are building fresh: resist the temptation to start with a template and "customise." Start with brand, then design, then build. The sequence matters more than the tools.',
      },
    ],
  },
  {
    slug: 'seo-in-2025-what-actually-moves-rankings',
    title: 'SEO in 2025: What Actually Moves Rankings',
    category: 'Growth',
    date: '2025-09-10',
    readTime: 9,
    excerpt:
      'Keyword stuffing is dead. Backlink farming is diminishing. What Google actually rewards in 2025 is simpler — and harder — than most SEO guides will tell you.',
    cover: '/assets/blog/growth.jpg',
    coverGradient: 'linear-gradient(120deg, #001f3f 0%, #003366 40%, #0055aa 70%, #4da6ff 100%)',
    featured: false,
    body: [
      {
        type: 'p',
        text: 'The SEO industry has a persistent problem: it sells complexity. The more complex the system, the more clients believe they need ongoing retainer services to manage it. The reality of what actually moves rankings in 2025 is considerably more straightforward — and considerably more demanding in the ways that cannot be gamed.',
      },
      {
        type: 'h2',
        text: 'What Google actually evaluates',
      },
      {
        type: 'p',
        text: "Google's Helpful Content system, which became a core part of its ranking infrastructure over the past two years, rewards content that demonstrates genuine first-hand expertise, satisfies the user's actual intent, and is clearly produced for people rather than crawlers. The algorithm is getting measurably better at distinguishing between these categories.",
      },
      {
        type: 'p',
        text: 'This means that content produced by someone who does not actually know the subject — regardless of how well it is optimised for target keywords — is increasingly likely to underperform. The era of outsourcing blog posts to people with no domain expertise and expecting them to rank is ending.',
      },
      {
        type: 'h2',
        text: 'The technical floor you need to clear',
      },
      {
        type: 'p',
        text: 'Technical SEO is necessary but no longer sufficient. Think of it as the floor you need to clear before content quality becomes the differentiator. If your technical foundation is broken, no amount of good content will help. If your technical foundation is solid, content quality and authority become the competitive moat.',
      },
      {
        type: 'ul',
        items: [
          'Core Web Vitals passing thresholds — especially INP (Interaction to Next Paint), which replaced FID in 2024',
          'A crawlable site structure that puts your most important pages within two or three clicks of the homepage',
          'Clean XML sitemap submitted to Search Console with no errors or excluded URLs that should be indexed',
          'Internal linking that deliberately passes authority to your highest-value pages',
          'Structured data applied where it genuinely applies — products, articles, FAQs, local business',
          'Mobile performance that matches or beats your desktop performance',
        ],
      },
      {
        type: 'quote',
        text: 'Content quality is table stakes. Technical hygiene is what separates you from everyone else publishing on the same topic with the same quality of writing.',
        attribution: 'Akodefy Growth Team',
      },
      {
        type: 'h2',
        text: 'What is actually working right now',
      },
      {
        type: 'p',
        text: 'The sites we see consistently gaining ground in competitive categories share a common profile: they publish less frequently than their competitors but with substantially more depth. They answer questions that their target audience actually asks — not questions that keyword research tools suggest are high volume.',
      },
      {
        type: 'p',
        text: 'Original research and proprietary data are disproportionately effective. If your business has data that no one else can access — customer surveys, internal benchmarks, industry-specific metrics — publishing that data creates content that cannot be replicated, which earns links and authority that commodity content never will.',
      },
      {
        type: 'h3',
        text: 'Local SEO is more important than most businesses realise',
      },
      {
        type: 'p',
        text: 'For businesses serving specific geographies, local SEO drives a disproportionate share of high-intent traffic. Keep your Google Business Profile complete and current. Respond to reviews. Ensure your NAP (Name, Address, Phone) is consistent across every directory. These fundamentals are unsexy and effective.',
      },
    ],
  },
  {
    slug: 'building-for-indias-next-100m-users',
    title: "Building for India's Next 100 Million Users",
    category: 'Strategy',
    date: '2025-08-22',
    readTime: 11,
    excerpt:
      'The next wave of Indian internet users does not look like the urban professional market that most product teams design for. Building for them requires different assumptions about devices, connectivity, and trust.',
    cover: '/assets/blog/strategy.jpg',
    coverGradient: 'linear-gradient(150deg, #1a0a00 0%, #3d1f00 40%, #7a3d00 70%, #ff8c42 100%)',
    featured: false,
    body: [
      {
        type: 'p',
        text: "Most product managers design for a user who looks like them. Urban, English-comfortable, on a relatively recent smartphone, connected to Wi-Fi or stable 4G. That user represents maybe 15% of India's online population. The next 100 million users coming online look nothing like this profile.",
      },
      {
        type: 'p',
        text: "India added over 80 million new internet users in 2023 alone, and the growth is concentrated in tier-2 and tier-3 cities, in rural areas, and in demographics that have never had reliable internet access before. Designing for this population is not a charitable exercise — it is the single largest growth opportunity in technology right now.",
      },
      {
        type: 'h2',
        text: 'What the actual device landscape looks like',
      },
      {
        type: 'p',
        text: "The median new Indian internet user is on a device that cost between ₹6,000 and ₹12,000 — a Redmi A-series, a Samsung Galaxy A-series, or a Realme number-series phone. These devices have 2–3 GB of RAM, limited internal storage, and a camera that serves double duty as a document scanner, payment tool, and communication device. They are not 'budget' devices to their owners — they are primary computers.",
      },
      {
        type: 'ul',
        items: [
          'Average device: mid-range or entry-level Android (2–4 GB RAM) from 2–3 years ago',
          'Connectivity: intermittent 4G that regularly drops to 2G or 3G, especially indoors',
          'Language: prefers vernacular — Hindi, Tamil, Telugu, Kannada — even if they can read English',
          'Data sensitivity: acutely aware of data usage, often on limited prepaid plans',
          'Trust patterns: built through social proof from known contacts, not from design sophistication',
          'Shared devices: phone frequently shared with family members across age groups',
        ],
      },
      {
        type: 'h2',
        text: 'Performance is accessibility for this market',
      },
      {
        type: 'p',
        text: 'A site that loads in six seconds on a flagship iPhone on Wi-Fi might take thirty seconds on a Redmi A3 on a 3G connection. That is not a slow experience — it is a non-functional product for that user. When we talk about performance for this market, we are not talking about optimisation. We are talking about whether your product is accessible at all.',
      },
      {
        type: 'p',
        text: 'Progressive loading — showing meaningful content as quickly as possible and loading the rest asynchronously — is not just good practice. It is the difference between a product that works and one that does not. The above-the-fold content should be visible within two seconds on a 3G connection. Everything else loads after.',
      },
      {
        type: 'quote',
        text: 'The apps and websites that win the next decade in India will be built by teams who have actually used their product on a budget Android on a 3G connection — not tested it on a throttled MacBook.',
      },
      {
        type: 'h2',
        text: 'Trust architecture is different',
      },
      {
        type: 'p',
        text: 'Trust for this user does not come from polished design. It comes from recognisability — familiar logos of known payment systems, phone numbers that can be called, addresses that can be visited. A sophisticated dark-mode website with micro-animations might actively reduce trust for a first-time internet user who has learned to associate that aesthetic with scams.',
      },
      {
        type: 'h3',
        text: 'What this means for product decisions',
      },
      {
        type: 'p',
        text: "Localization is not just translation. It means understanding that the mental models, colour associations, and information hierarchies that work for a metro user may be actively confusing for someone using a smartphone for the first time. If you are serious about this market, you need to do ethnographic research with actual users — not user personas built from analytics data that over-represents your existing customer base.",
      },
    ],
  },
  {
    slug: 'the-stack-we-use-and-why',
    title: 'The Stack We Use and Why',
    category: 'Engineering',
    date: '2025-08-05',
    readTime: 12,
    excerpt:
      'We have rebuilt this stack three times in four years. What we run today is the most boring version of it — and boring is a feature, not a limitation.',
    cover: '/assets/blog/engineering.jpg',
    coverGradient: 'linear-gradient(130deg, #001a1a 0%, #003333 40%, #005555 70%, #00ccaa 100%)',
    featured: false,
    body: [
      {
        type: 'p',
        text: "The engineering decisions that matter most are rarely the interesting ones. They are the decisions that reduce surprises at 2am, that make onboarding a new developer take hours instead of weeks, and that make the codebase readable by the client's internal team two years after handoff. Boring, in engineering, is usually a compliment.",
      },
      {
        type: 'p',
        text: "We have rebuilt our stack three times. The first version was ambitious and clever. The second was a reaction to the problems the first version created. The third — what we use today — is the most conservative and the most successful. Every item on it was chosen because it was the right tool, not because it was new or interesting.",
      },
      {
        type: 'h2',
        text: 'Frontend',
      },
      {
        type: 'p',
        text: "React remains our default for client-facing interfaces. Not because it is the most innovative option — it isn't — but because it has the largest ecosystem, the deepest hiring pool, and the most battle-tested patterns for the kinds of applications we build. We use Next.js when we need server-side rendering, edge functions, or the App Router's nested layouts. We do not reach for it by default.",
      },
      {
        type: 'p',
        text: "For styling, we use Tailwind CSS with a design token layer. Every project starts with a set of semantic tokens — brand, surface, muted, border — that map to the client's palette. These tokens are the only things that change between projects. The utility classes stay consistent, which means developers can move between client codebases without relearning the styling system.",
      },
      {
        type: 'h2',
        text: 'Animation',
      },
      {
        type: 'p',
        text: 'GSAP for scroll-driven sequences, complex timelines, and anything that needs frame-perfect control. Framer Motion for component-level transitions — things that are tied to React component lifecycle, like modal open/close, route transitions, or element presence. We never use both on the same element. The choice between them is architectural, not a matter of preference.',
      },
      {
        type: 'ul',
        items: [
          'GSAP ScrollTrigger for parallax, pin, and scroll-linked animations',
          'Lenis for smooth scrolling that integrates with GSAP timeline',
          'Framer Motion for AnimatePresence (route transitions, conditional renders)',
          'CSS transitions for simple hover states — no library needed',
        ],
      },
      {
        type: 'quote',
        text: 'Every dependency has a carrying cost. The question is never "can we use this" — it is "does the value justify what we carry in every project indefinitely."',
        attribution: 'Akodefy Engineering',
      },
      {
        type: 'h2',
        text: 'Backend and infrastructure',
      },
      {
        type: 'p',
        text: 'Node.js with Fastify for API layers where we control the backend. PostgreSQL as the default database — it is mature, feature-rich, and has solved every problem we have thrown at it. Redis for session management and caching layers where query volume justifies it.',
      },
      {
        type: 'p',
        text: 'Deployment depends on the project shape. Vercel for Next.js applications where the platform integration is worth the cost. Railway for full-stack Node applications and for projects where we need more infrastructure control. Cloudflare in front of everything — CDN, WAF, and DDoS protection are non-negotiable on every client site we deliver.',
      },
      {
        type: 'h3',
        text: 'What we deliberately avoid',
      },
      {
        type: 'p',
        text: "Monorepos for projects below a certain scale — the tooling overhead is not justified. GraphQL when REST is sufficient — it adds a layer of abstraction that has to be maintained and understood by everyone who touches the API. Microservices for anything that can be a monolith — premature distribution creates distributed systems problems without distributed systems benefits.",
      },
    ],
  },
  {
    slug: 'from-pitch-to-production',
    title: 'From Pitch to Production: How We Run Client Projects',
    category: 'Process',
    date: '2025-07-18',
    readTime: 8,
    excerpt:
      'Most project delays are not engineering problems. They are process problems that manifest as engineering problems. Here is the system we built to prevent them.',
    cover: '/assets/blog/process.jpg',
    coverGradient: 'linear-gradient(140deg, #0f0f0f 0%, #1f1f2e 40%, #2d2d4a 70%, #6b6baa 100%)',
    featured: false,
    body: [
      {
        type: 'p',
        text: 'We have been doing this long enough to know that most project failures are predictable. The warning signs are almost always present in the first conversation. The fix is not better engineers or more discipline mid-project — it is in how you structure the work before a single line of code is written.',
      },
      {
        type: 'h2',
        text: 'Phase 0: Discovery',
      },
      {
        type: 'p',
        text: "Every project begins with a paid discovery phase — typically five to seven working days depending on project complexity. This is not a formality. It is the most valuable work we do, and it changes the project fundamentally. By the end of discovery, we have a scope document, a technical architecture outline, a design direction deck, and a timeline built bottom-up from actual task estimates — not top-down from the client's deadline.",
      },
      {
        type: 'p',
        text: 'Discovery also surfaces requirements the client did not know they had. We regularly find that what was described as a "simple website" involves payment processing, user authentication, third-party API integrations, or complex content management needs that were not mentioned in the initial brief. Finding these in discovery costs an order of magnitude less than finding them in production.',
      },
      {
        type: 'h2',
        text: 'Design before code — without exception',
      },
      {
        type: 'p',
        text: 'We do not write production code until the design has been reviewed and approved. This sounds obvious. It is violated constantly in practice — usually because a client is in a hurry or because the design phase feels less tangible than working code.',
      },
      {
        type: 'quote',
        text: 'The cheapest bug to fix is the one you catch in the design file. The most expensive is the one you discover after launch.',
      },
      {
        type: 'p',
        text: 'Every design change after the engineering phase begins costs three to five times as much as the equivalent change in Figma. A layout that takes thirty minutes to adjust in design takes half a day to adjust in code, requires testing, may have knock-on effects in other components, and frequently uncovers adjacent issues that then need to be addressed.',
      },
      {
        type: 'h2',
        text: 'How we communicate',
      },
      {
        type: 'ul',
        items: [
          'Weekly progress update — a short asynchronous video walkthrough, never more than seven minutes',
          'Shared Notion workspace with live project status, decisions log, and open questions',
          'Staging environment refreshed after every merge to main — clients can review real progress, not screenshots',
          'Single point of contact on our side — one person who knows every detail of the project',
          'Written decisions only — verbal approvals are not approvals. Everything significant is confirmed in writing.',
          'Change requests logged separately from the original scope — so scope creep is visible rather than absorbed',
        ],
      },
      {
        type: 'h2',
        text: 'What usually goes wrong — and how we prevent it',
      },
      {
        type: 'p',
        text: "The most common failure mode is unclear ownership of decisions on the client side. When the person who signs off on design is different from the person who reviews the live site, and both have different mental models of what was agreed, you get late-stage revisions that derail timelines. We address this by insisting on a single named decision-maker before the project starts.",
      },
      {
        type: 'p',
        text: 'The second most common failure is scope expansion without corresponding timeline or budget adjustment. Features added mid-project are not free. We track scope changes formally and communicate their impact clearly as they arise — not at the end when everything is overdue.',
      },
    ],
  },
  {
    slug: 'why-your-website-isnt-converting',
    title: "Why Your Website Isn't Converting — And It's Probably Not What You Think",
    category: 'Conversion',
    date: '2025-07-02',
    readTime: 9,
    excerpt:
      'Traffic is not the problem. Most businesses chasing more visitors already have enough of them. The problem is that the site is failing to turn those visitors into enquiries, trials, or purchases — and the reason is almost never what the team suspects.',
    cover: '/assets/blog/conversion.jpg',
    coverGradient: 'linear-gradient(135deg, #1a0a0a 0%, #3d1515 40%, #7a2d2d 70%, #cc4444 100%)',
    featured: false,
    body: [
      {
        type: 'p',
        text: 'The conversation about a website that is not performing usually starts in the wrong place. The instinct is to run more ads, post more on social media, hire an SEO agency. More traffic. But traffic is not the constraint for most businesses we work with. The constraint is what happens when that traffic arrives.',
      },
      {
        type: 'p',
        text: 'A site converting at 1% that gets 10,000 visitors a month produces 100 leads. The same site at 3% produces 300. Doubling your ad spend to get 20,000 visitors at 1% produces 200 leads and costs twice as much. Conversion rate optimisation is almost always the higher-leverage investment — and it is almost always the last thing businesses consider.',
      },
      {
        type: 'h2',
        text: 'The most common conversion killers',
      },
      {
        type: 'p',
        text: "We have audited hundreds of sites across every business category. The problems that kill conversions are not exotic. They appear in the same forms repeatedly, which means that fixing them is considerably more straightforward than most teams expect — once you know what you are looking for.",
      },
      {
        type: 'ul',
        items: [
          'No clear primary action — the page has five things it wants the visitor to do and achieves none of them',
          'Value proposition buried below the fold — the visitor has to scroll to understand what the business actually does',
          'Form friction — asking for ten fields when three would convert at the same quality',
          'Social proof in the wrong place — testimonials after the CTA, not before it where they reduce hesitation',
          'Mobile experience treated as an afterthought — layout works on desktop, collapses on the phone where 60% of visits happen',
          'Page speed — every second of load time reduces the probability that the visitor stays long enough to convert',
          'Generic copy that could describe any business in the category — nothing that makes a specific claim or takes a clear position',
        ],
      },
      {
        type: 'h2',
        text: 'Trust is the conversion bottleneck nobody measures',
      },
      {
        type: 'p',
        text: "Every conversion is a micro-decision about trust. The visitor is asking: 'Is this business credible? Will they deliver what they're promising? Is this worth my money, my time, or my contact details?' Your site either answers those questions convincingly or it does not.",
      },
      {
        type: 'quote',
        text: "Traffic tells you people are finding you. Conversion rate tells you whether they believe you. Most businesses measure the first obsessively and ignore the second entirely.",
        attribution: 'Akodefy Growth Team',
      },
      {
        type: 'p',
        text: 'Trust signals include: specific client names and results, recognisable logos, verifiable credentials, a phone number that actually gets answered, a physical address, photographs of real people (not stock), and copy that takes clear positions rather than hedging everything.',
      },
      {
        type: 'h2',
        text: 'How to diagnose where you are losing people',
      },
      {
        type: 'p',
        text: 'Before changing anything, understand where people are dropping off. Install a session recording tool — Hotjar and Microsoft Clarity are both free. Watch twenty recordings of real visitors on your most important page. You will learn more in an hour of watching recordings than in a week of reading analytics reports.',
      },
      {
        type: 'p',
        text: 'Then check your funnel in Google Analytics. Where is the biggest drop between page view and conversion? If 80% of visitors leave without scrolling past the hero, the problem is in the first screen. If they scroll but do not click the CTA, the problem is in the offer or the CTA design. If they click but do not complete the form, the form is the problem.',
      },
      {
        type: 'h3',
        text: 'The one-page rule',
      },
      {
        type: 'p',
        text: 'For most service businesses, the single highest-leverage change is to make your homepage do one thing. One primary CTA. One value proposition. One audience. Every element on the page should support that single goal or be removed. The businesses that resist this are usually the ones that most need to hear it.',
      },
      {
        type: 'h2',
        text: 'Testing: what to do and what to skip',
      },
      {
        type: 'p',
        text: 'A/B testing is powerful but requires volume to produce statistically significant results. If your site gets fewer than 5,000 visitors a month, you do not have enough traffic to run meaningful split tests. Instead, focus on implementing established best practices — the improvements that have worked across hundreds of similar sites — rather than testing minor variations.',
      },
      {
        type: 'p',
        text: 'When you do have the volume to test: test headlines first. The headline is the highest-leverage element on any page. A better headline will outperform a better button colour by an order of magnitude every time.',
      },
    ],
  },
]


export const featuredPost = posts.find((p) => p.featured) ?? posts[0]
export const nonFeaturedPosts = posts.filter((p) => !p.featured)
export const allCategories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]

export const formatDate = (iso: string): string => {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
