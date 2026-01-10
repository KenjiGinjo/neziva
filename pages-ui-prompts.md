# neziva 网站 UI 设计 Prompts for UXPilot.ai

## 品牌信息（所有页面通用）

**品牌名称：** neziva
**品牌定位：** AI咨询 + 全栈开发，提供可落地的AI解决方案
**品牌调性：** 真诚、专业、实用、不夸大、技术导向
**主 Slogan：** Practical AI Solutions for Your Business
**副标题：** From Ideas to Working Code

### 视觉风格
- **色彩方案：** 蓝色/紫色渐变（科技感）、白色背景、深灰色文字、橙色/绿色作为CTA强调色
- **字体：** 现代无衬线字体，易读性强
- **设计风格：** 简洁、现代、专业、科技感，避免过度设计
- **Logo：** Minimalist风格，tech感，蓝色/紫色渐变，impact wave元素

### 响应式要求
- 必须适配桌面（1920px+）、平板（768px-1024px）、手机（320px-767px）
- 移动端优先设计
- 所有交互元素在触摸设备上易于操作

---

## Prompt 1: 首页（Home / Landing Page）

```
Design a modern, professional landing page for neziva, an AI consulting and full-stack development service.

BRAND & VISUAL IDENTITY:
- Brand name: neziva
- Main slogan: "Practical AI Solutions for Your Business"
- Subtitle: "From Ideas to Working Code"
- Color scheme: Blue/purple gradients (tech feel), white background, dark gray text, orange/green for CTA buttons
- Style: Clean, modern, professional, tech-oriented, minimalist, avoid over-designing
- Tone: Authentic, direct, professional but approachable, avoid exaggeration

PAGE STRUCTURE (top to bottom):

1. NAVIGATION BAR (Fixed at top, sticky):
   - Logo on left: "neziva" in modern sans-serif, with subtle blue/purple gradient
   - Navigation links on right: Home, Services, Portfolio, About, Contact
   - CTA button: "Get Started" or "Schedule Consultation" (orange/green accent)
   - Mobile: Hamburger menu
   - Background: White with subtle shadow on scroll
   - Height: 64px (desktop), 56px (mobile)

2. HERO SECTION (Full viewport height on desktop, ~600px on mobile):
   - Background: Subtle blue/purple gradient, can have abstract tech patterns
   - Layout: Centered content, single column on mobile, two-column on desktop
   - Left/center column:
     * Main headline: "Practical AI Solutions for Your Business" (Large, bold, white/dark text, max 2 lines)
     * Subheadline: "From Ideas to Working Code" (Medium size, lighter weight, muted color)
     * Description: "We build working AI systems. Not just consulting—we write code and deliver real solutions." (1-2 sentences, readable)
     * CTA buttons row:
       - Primary: "Schedule Free Consultation" (Orange/green, large, prominent)
       - Secondary: "View Our Work" (Outlined, white/transparent)
   - Right column (desktop only): Abstract illustration or tech visualization (optional, can be code snippets, AI concepts, or simple geometric shapes)
   - Spacing: Generous padding, breathing room
   - Mobile: Stack vertically, full width

3. WHY CHOOSE US SECTION:
   - Section title: "Why neziva?" (Centered, large heading)
   - Layout: 4-column grid on desktop, 2-column on tablet, 1-column on mobile
   - Each card:
     * Icon (optional): Simple, modern icon related to the benefit
     * Title: Short, benefit-focused (e.g., "Code, Not Just Advice")
     * Description: 1-2 sentences explaining the benefit
   - Content for 4 cards:
     1. "Code, Not Just Advice" - "We write working code and build systems, not just give recommendations"
     2. "Full-Stack Capability" - "From requirements to deployment, we handle the entire process"
     3. "Real Solutions" - "We deliver actual working systems, not theoretical concepts"
     4. "Hands-On Experience" - "We've built AI projects and know what works"
   - Cards: White background, subtle shadow, rounded corners, hover effect (lift shadow)
   - Spacing: Comfortable gap between cards, section padding

4. SERVICES OVERVIEW SECTION:
   - Section title: "Our Services" (Centered, large heading)
   - Subtitle: Brief description (optional)
   - Layout: 4-column grid on desktop, 2-column on tablet, 1-column on mobile
   - Each service card:
     * Service name (bold, larger)
     * Duration (e.g., "2-4 hours", "1-3 weeks") - small text, muted
     * Price range (e.g., "$800-1,500") - prominent, colored
     * Brief description (1-2 sentences)
     * "Learn More" link/button (subtle)
   - Services:
     1. "AI Strategy Workshop" - 2-4 hours - $800-1,500
     2. "AI POC Development" - 1-3 weeks - $5,000-15,000
     3. "Full Implementation" - 1-3 months - $20,000-60,000+
     4. "Optimization & Maintenance" - Monthly - $2,000-5,000/mo
   - Cards: White background, border or shadow, hover effect
   - All cards same height for visual consistency

5. PORTFOLIO/PROJECTS SECTION:
   - Section title: "Portfolio - Our Projects" (Centered)
   - Subtitle: "See what we've built and how we solve problems with AI"
   - Layout: 3-column grid on desktop, 2-column on tablet, 1-column on mobile
   - Each project card:
     * Project image/thumbnail (placeholder: abstract tech illustration or screenshot mockup)
     * Badge: "Personal Project" or "Concept Validation" (small, subtle, honest labeling)
     * Project name (bold)
     * Brief description (2-3 sentences about the problem solved)
     * Technology tags (optional, small chips: "RAG", "Full-Stack", "AI Integration")
     * Links row: "View Demo" (primary), "GitHub" (secondary, icon)
   - Projects:
     1. "AI Workflow Automation Platform" - RAG-based intelligent workflow engine
     2. "Smart Data Analytics Tool" - AI-driven data analysis platform
     3. "AI Content Generation Assistant" - Multi-modal AI content generation tool
   - Cards: White background, image on top, content below, hover effect (slight scale or shadow increase)
   - Important: Include honest labeling as "Personal Project" but present professionally

6. AI INTERACTIVE DEMO SECTION (Optional but recommended):
   - Section title: "Try Our AI Assistant" (Centered)
   - Subtitle: "Ask about your business needs and see how AI can help"
   - Embedded chat widget/component:
     * Chat interface: Messages, input field, send button
     * Pre-loaded greeting: "Hi! I'm neziva's AI assistant. What kind of AI solution are you looking for?"
     * Styling: Modern chat UI, matches brand colors
     * Functionality: Simple Q&A, collects visitor needs (can be mockup for now)
   - Background: Light gray or subtle gradient section
   - Purpose: Showcase AI capability, collect lead information

7. CTA SECTION (Final call-to-action):
   - Background: Blue/purple gradient or solid color
   - Layout: Centered content
   - Headline: "Ready to Build Something Together?" (Large, white/bold)
   - Subheadline: "Let's discuss how AI can help your business" (Medium, lighter)
   - CTA button: "Schedule Free Consultation" (Large, white background, colored text, or vice versa for contrast)
   - Optional: Contact form (compact, 2-3 fields: name, email, message) OR Calendly embed button

8. FOOTER:
   - Background: Dark gray or black
   - Layout: Multi-column (4 columns on desktop, stacked on mobile)
   - Columns:
     * Logo and tagline
     * Quick links (Services, Portfolio, About, Contact)
     * Resources (Blog, if exists)
     * Contact info (Email: hello@neziva.com, LinkedIn link)
   - Bottom: Copyright, privacy policy link
   - Text: Light gray/white, readable
   - Height: Compact, not too tall

RESPONSIVE BEHAVIOR:
- Desktop (1920px+): Full layout, multi-column grids, side-by-side content
- Tablet (768px-1024px): 2-column grids, adjusted spacing
- Mobile (320px-767px): Single column, stacked content, full-width buttons, larger touch targets (min 44x44px)

INTERACTIONS & ANIMATIONS:
- Smooth scroll behavior
- Subtle hover effects on cards (shadow lift, slight scale)
- Button hover states (color change, slight scale)
- Scroll-triggered fade-in animations (optional, subtle)
- Sticky navigation that appears on scroll down

ACCESSIBILITY:
- Sufficient color contrast (WCAG AA minimum)
- Keyboard navigation support
- Screen reader friendly
- Focus states on interactive elements

DELIVERABLES:
- Desktop layout (1920px width)
- Tablet layout (768px width)
- Mobile layout (375px width)
- Component specifications
- Color palette with hex codes
- Typography scale
```

---

## Prompt 2: 服务页面（Services Page）

```
Design a services page for neziva that clearly presents 4 main service offerings with detailed information.

BRAND & VISUAL IDENTITY (same as homepage):
- Brand name: neziva
- Color scheme: Blue/purple gradients, white background, dark gray text, orange/green for CTAs
- Style: Clean, modern, professional, tech-oriented
- Tone: Authentic, direct, professional, no exaggeration

PAGE STRUCTURE:

1. NAVIGATION BAR (same as homepage - fixed, sticky)

2. PAGE HEADER SECTION:
   - Background: Subtle gradient or white with accent
   - Centered content
   - Main title: "Our Services" (Large, bold)
   - Subtitle: "From strategy to implementation, we deliver working AI solutions" (1-2 sentences)
   - Breadcrumb: Home > Services (small, subtle, top-left)
   - Height: ~200px (desktop), ~150px (mobile)

3. SERVICES GRID SECTION:
   - Layout: Initially 4 service cards in a grid (2x2 on desktop, 2x2 on tablet, 1-column on mobile)
   - Each service card is clickable and expands or links to detail section
   - Service cards (compact preview):
     * Icon or visual element (optional)
     * Service name (bold, larger)
     * Duration badge (e.g., "2-4 hours") - small, colored badge
     * Price range (prominent, larger text)
     * Brief 1-sentence description
     * "Learn More" button or arrow
   - Hover effect: Card lift, shadow increase, or border highlight

4. DETAILED SERVICE SECTIONS (below grid, or expandable/modals):
   Each service gets a detailed section with:

   SERVICE 1: AI Strategy Workshop
   - Section with distinct background (alternating white/light gray)
   - Service name as heading
   - Two-column layout (desktop): Left = details, Right = pricing card
   - Left column:
     * Duration: "2-4 hours"
     * Format: "Online workshop format"
     * What's included (bullet list):
       - Business pain point diagnosis
       - AI application roadmap
       - Identify AI opportunities
       - Implementation priority recommendations
     * Who it's for: "For businesses wanting to understand how AI applies to their operations"
     * Deliverables (clear list):
       - AI application roadmap
       - Priority recommendations
       - Technology selection suggestions
   - Right column (sticky pricing card):
     * Price: "$800 - $1,500" (large, prominent)
     * "Schedule Workshop" CTA button
     * "What's included" summary
   - Mobile: Stack vertically, pricing card at bottom

   SERVICE 2: AI POC Development
   - Same structure as Service 1
   - Duration: "1-3 weeks"
   - What's included:
     * Develop minimum viable prototype
     * Examples: AI chatbot, sales prediction model, automated content generation tool
     * Includes frontend, backend, deployment
     * Complete demonstrable system
   - Who it's for: "For businesses needing to validate AI solution feasibility"
   - Deliverables:
     * Working POC system
     * Technical documentation
     * Deployment guide
   - Price: "$5,000 - $15,000"

   SERVICE 3: End-to-End AI System Implementation
   - Same structure
   - Duration: "1-3 months"
   - What's included:
     * Complete AI system from zero to production
     * Data pipeline setup
     * Model training/calling
     * System integration
     * User interface development
     * Deployment and maintenance
   - Who it's for: "For businesses needing complete AI solutions"
   - Deliverables:
     * Production-ready AI system
     * Documentation
     * Training
   - Price: "$20,000 - $60,000+"

   SERVICE 4: AI Optimization & Maintenance
   - Same structure
   - Duration: "Monthly service"
   - What's included:
     * System performance optimization
     * Model updates and tuning
     * Monitoring and maintenance
     * Continuous improvement recommendations
     * Technical support
   - Who it's for: "For businesses with existing AI systems needing ongoing optimization"
   - Deliverables:
     * Monthly reports
     * Optimization recommendations
     * Technical support
   - Price: "$2,000 - $5,000/month"

5. COMPARISON TABLE (Optional but recommended):
   - Table comparing all 4 services
   - Columns: Features/Rows, then 4 service columns
   - Features: Duration, Price range, Best for, Deliverables summary
   - Highlight differences
   - Mobile: Card-based comparison or scrollable table

6. PROCESS SECTION (Optional):
   - Title: "How We Work" or "Our Process"
   - Steps (horizontal timeline on desktop, vertical on mobile):
     1. Consultation
     2. Planning
     3. Development
     4. Deployment
     5. Support
   - Each step: Icon, step number, title, brief description

7. CTA SECTION:
   - Background: Gradient or solid color
   - Centered content
   - Headline: "Not Sure Which Service You Need?"
   - Subheadline: "Schedule a free consultation and we'll help you choose"
   - CTA button: "Schedule Free Consultation"
   - Alternative: Compact contact form

8. FOOTER (same as homepage)

RESPONSIVE DESIGN:
- Desktop: Multi-column layouts, side-by-side content
- Tablet: 2-column grids, adjusted spacing
- Mobile: Single column, stacked, full-width sections

INTERACTIONS:
- Service cards expand or link to detailed sections
- Smooth scroll to service details
- Sticky pricing cards (desktop)
- Accordion-style expandable sections (mobile option)

VISUAL HIERARCHY:
- Service names: Largest
- Prices: Prominent but not overwhelming
- Details: Clear, scannable bullet points
- CTAs: Visible but not pushy
```

---

## Prompt 3: 案例/作品集页面（Portfolio Page）

```
Design a portfolio/projects page for neziva showcasing 3 personal AI development projects.

BRAND & VISUAL IDENTITY (same as previous pages):
- Brand name: neziva
- Color scheme: Blue/purple gradients, white background, dark gray text
- Style: Clean, modern, professional, tech-oriented
- Important: Projects are honestly labeled as "Personal Projects" but presented professionally

PAGE STRUCTURE:

1. NAVIGATION BAR (same as homepage)

2. PAGE HEADER:
   - Background: Subtle gradient or white
   - Centered content
   - Main title: "Portfolio & Projects" (Large, bold)
   - Subtitle: "Explore our projects and see how we solve real-world problems with AI"
   - Note (optional, small text): "These are personal projects showcasing our technical capabilities"
   - Height: ~200px

3. FILTER/TAG SECTION (Optional):
   - Filter by: Technology (RAG, Full-Stack, AI Integration, etc.)
   - Or display all projects by default
   - Small, subtle filter chips

4. PROJECTS GRID:
   - Layout: 3-column grid on desktop, 2-column on tablet, 1-column on mobile
   - Each project card:
     * Project image/screenshot (top, aspect ratio 16:9 or 4:3)
       - Placeholder: Abstract tech illustration, code snippets, or UI mockup
       - Overlay: "Personal Project" or "Concept Validation" badge (top-right corner, small, honest label)
     * Project content area (white background):
       * Project name (bold, larger, link to detail)
       * Project type badge: "Personal Project" or "Open Source" (small, colored badge)
       * Brief description (2-3 sentences, what problem it solves)
       * Technology tags (small chips/badges: "RAG", "Full-Stack", "AI Integration", "Python", "React", etc.)
       * Action links row:
         - "View Demo" (primary button, links to online demo)
         - "GitHub" (secondary link with GitHub icon)
         - "Read More" (tertiary link to blog post if available)
   - Cards: White background, image on top, content below, hover effect (slight scale or shadow increase)
   - Important: Include honest labeling as "Personal Project" or "Concept Validation" but present professionally

5. DETAILED PROJECT SECTIONS (clicking a project card expands or navigates to detail):
   Each project gets a detailed view with:

   PROJECT 1: AI Workflow Automation Platform
   - Full-width section with alternating background
   - Project hero image/screenshot (full width, ~600px height)
   - Project metadata row:
     * Type badge: "Personal Project / Concept Validation"
     * Technologies: RAG, Full-Stack, AI Integration
     * Status: "Open Source" or "Live Demo"
   - Two-column layout (desktop): Left = content, Right = sidebar
   - Left column (main content):
     * Project name (large heading)
     * Problem statement: "Solving the automation needs of small and medium businesses for repetitive tasks"
     * Solution overview (2-3 paragraphs):
       - RAG-based intelligent workflow engine
       - Multi-API integration capabilities
       - Visual flow design interface
     * Technical highlights section:
       - Full-Stack development capability
       - AI integration and system architecture
       - Scalable design patterns
     * Results/Achievements:
       - Complete demonstrable system
       - GitHub open source
       - Technical blog post documenting approach
   - Right sidebar (sticky on desktop):
     * Quick info card:
       - Project type: Personal Project
       - Status: Active / Completed
       - Technologies used: List of tech stack
     * Links:
       - "Try Demo" button (primary, prominent)
       - "View on GitHub" link (with icon)
       - "Read Blog Post" link (if available)
     * Share buttons (optional)
   - Mobile: Stack vertically, sidebar content at bottom

   PROJECT 2: Smart Data Analytics Tool
   - Same structure as Project 1
   - Problem: "Providing fast data insights for businesses"
   - Solution: AI-driven data analysis platform
   - Technical highlights:
     * Data processing pipeline
     * AI model integration
     * Data visualization capabilities
   - Results: Fully functional POC system
   - Technologies: Data Processing, AI Models, Visualization

   PROJECT 3: AI Content Generation Assistant
   - Same structure as Project 1
   - Problem: "Improving content creation efficiency"
   - Solution: Multi-modal AI content generation tool
   - Technical highlights:
     * LLM integration
     * Content optimization
     * Batch processing capabilities
   - Results: Open source project, GitHub repository
   - Technologies: LLM, Content Processing, Batch Operations

6. PROJECT DETAIL MODAL/EXPANDED VIEW (Alternative to separate page):
   - If using modal/expandable view instead of separate pages:
     * Overlay/modal with project details
     * Close button (X) in top-right
     * Scrollable content area
     * Same information as detailed sections above
     * Keep action buttons visible (sticky at bottom on mobile)

7. CTA SECTION:
   - Background: Blue/purple gradient or solid color
   - Layout: Centered content
   - Headline: "Ready to Build Something Together?" (Large, white/bold)
   - Subheadline: "Let's discuss how AI can help your business" (Medium, lighter)
   - CTA button: "Schedule Free Consultation" (Large, prominent)
   - Alternative text: "View our services" (secondary link)

8. FOOTER (same as homepage)

RESPONSIVE BEHAVIOR:
- Desktop (1920px+): 3-column project grid, side-by-side detail layouts
- Tablet (768px-1024px): 2-column project grid, stacked detail content
- Mobile (320px-767px): Single column, full-width project cards, stacked detail sections

INTERACTIONS & ANIMATIONS:
- Smooth scroll behavior
- Project card hover: Lift shadow, slight scale (1.02x), border highlight
- Click project card: Expand or navigate to detail view
- Image lazy loading for project thumbnails
- Scroll-triggered fade-in animations for project cards (staggered)
- Filter/tag chips: Active state, hover effects
- Technology tags: Hover to show tooltip with brief description (optional)
- Demo button: Loading state, success feedback
- Modal/expanded view: Smooth open/close animation

ACCESSIBILITY:
- Sufficient color contrast (WCAG AA minimum)
- Keyboard navigation support (Tab through projects, Enter to open)
- Screen reader friendly project descriptions
- Alt text for all project images
- Focus states on interactive elements (cards, buttons, links)
- Skip to main content link

CONTENT SPECIFICATIONS:

Project 1: AI Workflow Automation Platform
- Image: Abstract workflow diagram or UI mockup
- Description: "A RAG-based intelligent workflow engine designed to automate repetitive business tasks. Features multi-API integration and visual flow design, demonstrating full-stack development and AI integration capabilities."
- Technologies: RAG, Python, React, Node.js, API Integration
- Demo URL: [To be provided]
- GitHub URL: [To be provided]
- Blog Post: [Optional, to be provided]

Project 2: Smart Data Analytics Tool
- Image: Data visualization dashboard mockup
- Description: "An AI-driven data analysis platform that provides fast insights for businesses. Includes data processing pipelines, AI model integration, and comprehensive visualization capabilities."
- Technologies: Data Processing, AI Models, Visualization, Python, FastAPI
- Demo URL: [To be provided]
- GitHub URL: [To be provided]

Project 3: AI Content Generation Assistant
- Image: Content generation interface mockup
- Description: "A multi-modal AI content generation tool that improves content creation efficiency. Features LLM integration, content optimization, and batch processing capabilities."
- Technologies: LLM, Content Processing, Batch Operations, Python
- Demo URL: [To be provided]
- GitHub URL: [To be provided]
- Blog Post: [Optional, to be provided]

DELIVERABLES:
- Desktop layout (1920px width)
- Tablet layout (768px width)
- Mobile layout (375px width)
- Project card component specifications
- Project detail page/expanded view design
- Modal/overlay component (if used)
- Color palette with hex codes
- Typography scale
- Icon set specifications (GitHub, demo, external link icons)
```

---

## Prompt 4: 关于页面（About Page）

```
Design an about page for neziva that authentically presents the company, its values, expertise, and approach.

BRAND & VISUAL IDENTITY (same as previous pages):
- Brand name: neziva
- Color scheme: Blue/purple gradients, white background, dark gray text, orange/green for CTAs
- Style: Clean, modern, professional, tech-oriented
- Tone: Authentic, direct, professional, no exaggeration, honest about capabilities

PAGE STRUCTURE:

1. NAVIGATION BAR (same as homepage - fixed, sticky)

2. PAGE HEADER SECTION:
   - Background: Subtle gradient or white with accent
   - Centered content
   - Main title: "About neziva" (Large, bold)
   - Subtitle: "AI consulting and full-stack development - We build working solutions" (1-2 sentences)
   - Breadcrumb: Home > About (small, subtle, top-left)
   - Height: ~200px (desktop), ~150px (mobile)

3. ABOUT US SECTION (Main introduction):
   - Background: White or very light gray
   - Layout: Two-column on desktop (text left, visual right), stacked on mobile
   - Left column (content):
     * Heading: "What We Do" or "About neziva" (large heading)
     * Main content (3-4 paragraphs or bullet points):
       - "We do both AI consulting and write code"
       - "We focus on AI projects that can actually be implemented"
       - "We help small and medium businesses and individuals integrate AI tools into their business processes"
       - "We're involved from requirements to deployment - we take full responsibility"
     * Tone: Straightforward, honest, no fluff
     * Visual: Simple, clear typography, good spacing
   - Right column (visual element):
     * Optional: Abstract illustration, code snippets visualization, or professional photo
     * Or: Simple icon-based representation of AI + Development
     * Desktop only, hidden on mobile or moved to top
   - Spacing: Generous padding, breathing room

4. WHY WE'RE DIFFERENT SECTION:
   - Background: Light gray or white (alternating with previous section)
   - Section title: "Why We're Different" (Centered, large heading)
   - Subtitle: Brief explanation (optional)
   - Layout: 4-column grid on desktop, 2-column on tablet, 1-column on mobile
   - Each benefit card:
     * Icon (optional): Simple, modern icon related to the benefit
     * Title: Short, benefit-focused heading
     * Description: 1-2 sentences explaining the benefit clearly
   - Content for 4 cards:
     1. "We Write Code"
        - Title: "We Write Code"
        - Description: "We directly develop systems, not just give recommendations. Code, documentation, and deployment - we handle it all."
     2. "Real Experience"
        - Title: "Real Experience"
        - Description: "We've actually built AI projects and know what works and what doesn't. We've encountered the challenges firsthand."
     3. "Full Process"
        - Title: "Full Process Involvement"
        - Description: "From initial discussions to code deployment, we're involved throughout. No handoffs or gaps in communication."
     4. "Working Systems"
        - Title: "Working Systems We Deliver"
        - Description: "Code, documentation, and deployment - we deliver everything needed for a functioning system."
   - Cards: White background, subtle shadow or border, rounded corners, hover effect (lift shadow)
   - Visual style: Clean, minimal, professional
   - Spacing: Comfortable gap between cards

5. INDUSTRIES/SERVICES WE SERVE SECTION:
   - Background: White or subtle gradient
   - Section title: "Industries We Serve" or "What We Can Help With" (Centered, large heading)
   - Subtitle: "We work across various domains to integrate AI solutions" (optional)
   - Layout: Grid or tag cloud style
   - Option A: 6-item grid (3x2 on desktop, 2x3 on tablet, 1-column on mobile)
   - Option B: Tag/chip style with icons
   - Each service area:
     * Icon (optional): Related to the service area
     * Service name (bold)
     * Brief description (1 sentence, optional)
   - Service areas:
     1. "Marketing Automation" - AI-powered marketing workflows
     2. "Data Analytics" - AI-driven data insights and analysis
     3. "Customer Service Chatbots" - AI customer service solutions
     4. "Business Process Automation" - Automating repetitive business tasks
     5. "Content Generation" - AI-powered content creation tools
     6. "Predictive Analytics" - Forecasting and prediction models
   - Visual: Cards with icons, or simple tag-style chips
   - Hover effect: Slight lift or highlight
   - Purpose: Show breadth of applications without over-promising

6. OUR APPROACH / HOW WE WORK SECTION (Optional but recommended):
   - Background: Alternating color (light gray)
   - Section title: "Our Approach" (Centered)
   - Layout: Vertical timeline or step-by-step cards
   - Content (4-5 steps):
     1. "Understand Your Needs" - We start by understanding your business challenges
     2. "Design a Solution" - We design an AI solution that fits your requirements
     3. "Build It" - We write the code and build the system
     4. "Deploy & Support" - We deploy it and provide support
   - Each step: Icon, step number, title, brief description
   - Visual: Timeline (horizontal on desktop, vertical on mobile) or card grid
   - Tone: Practical, no buzzwords

7. VALUES / PRINCIPLES SECTION (Optional):
   - Background: White
   - Section title: "What We Value" (Centered, optional)
   - Content (if included, keep it short and honest):
     * "Honest Communication" - We're transparent about what's possible
     * "Practical Solutions" - We focus on solutions that work, not hype
     * "Code Quality" - We write maintainable, well-documented code
   - Layout: Simple list or minimal cards
   - Keep this section optional - only if it adds value

8. CONTACT / CONNECT SECTION:
   - Background: Gradient or solid color (matches brand)
   - Layout: Centered content or two-column
   - Heading: "Let's Connect" or "Get in Touch"
   - Subheading: "Ready to discuss your AI project?"
   - Contact methods (displayed clearly):
     * Email: hello@neziva.com (clickable mailto link, with icon)
     * LinkedIn: [LinkedIn profile/company page] (external link, with LinkedIn icon)
     * Calendly: "Schedule a Call" button (links to Calendly booking page)
   - Format:
     - Option A: Horizontal row of contact methods (desktop), stacked (mobile)
     - Option B: Contact cards in a grid
   - Each contact method: Icon, label, value/link, brief description (optional)
   - CTA button: "Schedule Free Consultation" (prominent, matches brand colors)
   - Additional text: "We respond within 24 hours" (small, subtle)

9. CTA SECTION (Final call-to-action):
   - Background: Blue/purple gradient or solid brand color
   - Layout: Centered content
   - Headline: "Ready to Build Something Together?" (Large, white/bold)
   - Subheadline: "Let's discuss how AI can help your business" (Medium, lighter)
   - CTA button: "Schedule Free Consultation" (Large, white background, colored text, or vice versa for contrast)
   - Alternative: "View Our Services" (secondary link)

10. FOOTER (same as homepage)

RESPONSIVE DESIGN:
- Desktop (1920px+): Multi-column layouts, side-by-side content, full grid displays
- Tablet (768px-1024px): 2-column grids, adjusted spacing, stacked where needed
- Mobile (320px-767px): Single column, stacked sections, full-width content, larger touch targets

INTERACTIONS & ANIMATIONS:
- Smooth scroll behavior
- Card hover effects: Subtle lift shadow, slight scale (1.02x)
- Icon hover: Color change or slight animation (optional)
- Scroll-triggered fade-in animations for sections (optional, subtle)
- Contact links: Clear hover states, underline or color change
- Sticky navigation on scroll

VISUAL HIERARCHY:
- Page title: Largest
- Section headings: Large, bold
- Body text: Readable size (16px+), good line height (1.6-1.8)
- Icons: Consistent size and style
- Cards: Uniform height where possible (grids)
- CTAs: Visible but not overwhelming

CONTENT TONE & STYLE:
- Authentic: Be honest about what we do
- Direct: No unnecessary jargon or buzzwords
- Professional: But approachable, not corporate-speak
- Practical: Focus on what we actually do, not abstract concepts
- Avoid: Over-promising, generic statements, excessive adjectives

ACCESSIBILITY:
- Sufficient color contrast (WCAG AA minimum)
- Keyboard navigation support
- Screen reader friendly (semantic HTML, alt text for images/icons)
- Focus states on interactive elements
- Readable font sizes (minimum 16px for body text)
- Clear link labels (not just "click here")

SPECIFIC CONTENT REQUIREMENTS:

About Us Section:
- Must emphasize: "We do both consulting AND write code"
- Must emphasize: "Focus on projects that can actually be implemented"
- Must emphasize: "Involved from start to finish"
- Avoid: "Leading", "cutting-edge", "revolutionary" type language

Why We're Different:
- Keep it to 4 key points maximum
- Each point should be specific and verifiable
- No vague statements like "we're the best"
- Focus on what makes us different, not just what we do

Industries We Serve:
- Keep it to 6 areas maximum
- Be honest about scope - don't claim expertise in everything
- Each area should have a clear, practical example

DELIVERABLES:
- Desktop layout (1920px width)
- Tablet layout (768px width)
- Mobile layout (375px width)
- Component specifications (cards, sections, contact methods)
- Icon set (if custom icons are needed)
- Color palette with hex codes
- Typography scale
- Spacing system
```

---

## Prompt 5: 联系页面（Contact Page）

```
Design a contact page for neziva that provides multiple ways for visitors to get in touch, with a focus on the contact form and Calendly integration.

BRAND & VISUAL IDENTITY (same as previous pages):
- Brand name: neziva
- Color scheme: Blue/purple gradients, white background, dark gray text, orange/green for CTAs
- Style: Clean, modern, professional, tech-oriented
- Tone: Friendly, approachable, professional, helpful

PAGE STRUCTURE:

1. NAVIGATION BAR (same as homepage - fixed, sticky)

2. PAGE HEADER SECTION:
   - Background: Subtle gradient or white with accent
   - Centered content
   - Main title: "Let's Talk About Your AI Project" (Large, bold)
   - Subtitle: "Schedule a free consultation to discuss how AI can transform your business" (1-2 sentences, readable)
   - Breadcrumb: Home > Contact (small, subtle, top-left)
   - Height: ~200px (desktop), ~150px (mobile)

3. MAIN CONTENT AREA (Two-column layout on desktop, stacked on mobile):

   LEFT COLUMN (or top on mobile): CONTACT FORM SECTION
   - Background: White
   - Section title: "Send Us a Message" or "Get in Touch" (optional, can be implied)
   - Contact form (well-designed, user-friendly):
     * Form container: White background, subtle border or shadow, rounded corners
     * Form fields (7 total):
       1. Name (required)
          - Label: "Name" or "Full Name"
          - Input type: text
          - Placeholder: "Your name"
          - Required indicator: Asterisk (*) or "required" text
          - Validation: Show error if empty on submit
       2. Company Name (optional)
          - Label: "Company Name" (with "optional" indicator)
          - Input type: text
          - Placeholder: "Your company (optional)"
       3. Email (required)
          - Label: "Email"
          - Input type: email
          - Placeholder: "your.email@example.com"
          - Required indicator
          - Validation: Email format validation
       4. Phone (optional)
          - Label: "Phone" (with "optional" indicator)
          - Input type: tel
          - Placeholder: "+1 (555) 123-4567" or "Your phone number (optional)"
       5. Project Type (required dropdown)
          - Label: "Project Type"
          - Dropdown/select with options:
            - "Strategy Workshop"
            - "POC Development"
            - "Full Implementation"
            - "Maintenance & Optimization"
            - "Not Sure / Other"
          - Default: "Select a project type" or first option
          - Required indicator
       6. Project Description (required textarea)
          - Label: "Project Description" or "Tell us about your project"
          - Textarea: Multi-line text input
          - Placeholder: "Describe your project, goals, and any specific requirements..."
          - Rows: 4-6 lines (expandable)
          - Character count (optional): Max 1000 characters
          - Required indicator
       7. Budget Range (optional dropdown)
          - Label: "Budget Range" (with "optional" indicator)
          - Dropdown/select with options:
            - "Under $5,000"
            - "$5,000 - $15,000"
            - "$15,000 - $50,000"
            - "$50,000+"
            - "Prefer not to say"
          - Default: "Select budget range (optional)"
     * Form styling:
       - Consistent spacing between fields (comfortable padding)
       - Labels above inputs (or floating labels)
       - Input styling: Border, rounded corners, focus state (border color change)
       - Error states: Red border, error message below field
       - Success states: Green checkmark or confirmation
     * Submit button:
       - Text: "Send Message"
       - Style: Primary CTA button (orange/green accent color)
       - Size: Full width on mobile, auto width on desktop
       - Loading state: Spinner or "Sending..." text
       - Success state: Confirmation message
     * Form validation:
       - Client-side validation before submit
       - Clear error messages
       - Required fields highlighted if empty
     * Privacy/consent (optional):
       - Small text: "We'll never share your information" or privacy policy link
     * Response time note:
       - Small text below form: "We'll respond within 24 hours"

   RIGHT COLUMN (or below form on mobile): CALENDLY INTEGRATION SECTION
   - Background: Light gray or white with subtle border
   - Section title: "Or Schedule a Call Directly"
   - Subtitle/description: "Choose a time that works for you. We'll respond within 15 minutes after you book."
   - Calendly embed:
     * Embedded Calendly widget/iframe
     * Responsive: Full width, appropriate height (600-800px)
     * Styling: Matches brand colors if possible
     * Alternative: Large button "Schedule on Calendly" that opens Calendly in new tab/modal
   - Benefits listed (optional, small bullets):
     * "Choose your preferred time"
     * "15-minute response guarantee"
     * "No back-and-forth emails"
   - Visual: Calendar icon or illustration (optional)

4. ALTERNATIVE CONTACT METHODS SECTION:
   - Background: White or light gray (alternating)
   - Section title: "Other Ways to Reach Us" (Centered, optional)
   - Layout: Horizontal row on desktop (3 items), stacked on mobile
   - Contact methods:
     * Email:
       - Icon: Mail/envelope icon
       - Label: "Email"
       - Value: hello@neziva.com
       - Link: mailto:hello@neziva.com (clickable)
       - Description: "Send us an email anytime"
     * LinkedIn:
       - Icon: LinkedIn icon
       - Label: "LinkedIn"
       - Value: [LinkedIn profile/company page]
       - Link: External link to LinkedIn (opens in new tab)
       - Description: "Connect with us on LinkedIn"
     * Response Time:
       - Icon: Clock/time icon
       - Label: "Response Time"
       - Value: "Within 24 hours"
       - Description: "We respond to all inquiries"
   - Cards: White background, icon, text, subtle shadow, hover effect
   - Spacing: Equal spacing between cards

5. FAQ / COMMON QUESTIONS SECTION (Optional but recommended):
   - Background: White
   - Section title: "Frequently Asked Questions" (Centered, optional)
   - Accordion-style FAQ items:
     1. "How quickly will you respond?"
        Answer: "We respond to all inquiries within 24 hours. If you schedule a call via Calendly, we'll respond within 15 minutes."
     2. "What information should I include in my message?"
        Answer: "Please describe your project goals, any specific requirements, and your timeline. The more details, the better we can help."
     3. "Do you offer free consultations?"
        Answer: "Yes, we offer free initial consultations to discuss your needs and see if we're a good fit."
     4. "What's the typical project timeline?"
        Answer: "Timelines vary by project. Strategy workshops are 2-4 hours, POC development is 1-3 weeks, and full implementations are 1-3 months."
   - Accordion: Expandable/collapsible items
   - Visual: Plus/minus icons or chevrons

6. CTA SECTION (Final call-to-action, optional):
   - Background: Blue/purple gradient or solid brand color
   - Layout: Centered content
   - Headline: "Ready to Get Started?" (Large, white/bold)
   - Subheadline: "Let's discuss how AI can help your business" (Medium, lighter)
   - CTA buttons row:
     * Primary: "Schedule Free Consultation" (links to Calendly or scrolls to form)
     * Secondary: "View Our Services" (links to services page)

7. FOOTER (same as homepage)

RESPONSIVE DESIGN:
- Desktop (1920px+): Two-column layout (form left, Calendly right), side-by-side contact methods
- Tablet (768px-1024px): Stacked layout, form full width, Calendly below, contact methods 2-column
- Mobile (320px-767px): Single column, stacked sections, full-width form fields, full-width buttons

FORM UX BEST PRACTICES:
- Clear labels above each field
- Placeholders provide helpful examples
- Required fields clearly marked
- Error messages appear below fields (not just red border)
- Success confirmation after submission
- Loading state during submission
- Accessible: Proper label-input associations, ARIA attributes
- Keyboard navigation: Tab through fields, Enter to submit

INTERACTIONS & ANIMATIONS:
- Form field focus: Border color change, subtle glow
- Form validation: Real-time or on blur
- Error messages: Smooth fade-in
- Submit button: Loading spinner, success animation
- Calendly embed: Smooth load, responsive
- Contact method cards: Hover lift effect
- FAQ accordion: Smooth expand/collapse animation
- Smooth scroll to form section (if CTA links to it)

ACCESSIBILITY:
- All form fields have proper labels
- Required fields announced to screen readers
- Error messages associated with fields (ARIA)
- Keyboard navigation: Tab order logical, Enter submits form
- Focus states visible on all interactive elements
- Color contrast meets WCAG AA (error messages, text)
- Form submission feedback (success/error) announced to screen readers

FORM SUBMISSION HANDLING:
- Client-side validation before submit
- Show loading state during submission
- Success message: "Thank you! We'll get back to you within 24 hours."
- Error handling: "Something went wrong. Please try again or email us directly."
- Optional: Redirect to thank you page after successful submission
- Email notification to hello@neziva.com (backend handling)

CALENDLY INTEGRATION OPTIONS:
- Option A: Embedded iframe (recommended)
  - Full Calendly widget embedded in page
  - Responsive, matches page width
  - Seamless user experience
- Option B: Button that opens Calendly
  - Large button: "Schedule on Calendly"
  - Opens Calendly in new tab or modal overlay
  - Less seamless but more flexible

CONTACT FORM FIELD SPECIFICATIONS:

Name Field:
- Type: text
- Required: Yes
- Validation: Not empty, min 2 characters
- Max length: 100 characters

Company Name Field:
- Type: text
- Required: No
- Max length: 100 characters

Email Field:
- Type: email
- Required: Yes
- Validation: Valid email format
- Max length: 255 characters

Phone Field:
- Type: tel
- Required: No
- Validation: Optional phone format validation
- Placeholder: Shows format example

Project Type Field:
- Type: select/dropdown
- Required: Yes
- Options: Strategy Workshop, POC Development, Full Implementation, Maintenance & Optimization, Not Sure / Other
- Default: "Select a project type" (placeholder option, disabled)

Project Description Field:
- Type: textarea
- Required: Yes
- Rows: 4-6 (expandable)
- Min length: 10 characters
- Max length: 1000 characters
- Character counter (optional)

Budget Range Field:
- Type: select/dropdown
- Required: No
- Options: Under $5,000, $5,000 - $15,000, $15,000 - $50,000, $50,000+, Prefer not to say
- Default: "Select budget range (optional)" (placeholder option)

DELIVERABLES:
- Desktop layout (1920px width)
- Tablet layout (768px width)
- Mobile layout (375px width)
- Contact form component specifications
- Form field states (default, focus, error, success)
- Calendly integration specifications
- Contact method cards/components
- FAQ accordion component (if included)
- Color palette with hex codes
- Typography scale
- Form validation states and error messages
- Success/error feedback components
```

---

## Prompt 6: 博客/资源页面（Blog / Resources Page）

```
Design a blog/resources page for neziva that showcases articles, insights, and technical content to demonstrate expertise and attract potential clients.

BRAND & VISUAL IDENTITY (same as previous pages):
- Brand name: neziva
- Color scheme: Blue/purple gradients, white background, dark gray text, orange/green for CTAs
- Style: Clean, modern, professional, tech-oriented
- Tone: Educational, informative, practical, authentic

PAGE STRUCTURE:

1. NAVIGATION BAR (same as homepage - fixed, sticky)

2. PAGE HEADER SECTION:
   - Background: Subtle gradient or white with accent
   - Centered content
   - Main title: "Insights & Resources" or "Blog" (Large, bold)
   - Subtitle: "AI trends, technical insights, and practical guides" (1-2 sentences)
   - Breadcrumb: Home > Blog (small, subtle, top-left)
   - Height: ~200px (desktop), ~150px (mobile)

3. FILTER/CATEGORY SECTION (Below header):
   - Background: White or very light gray
   - Layout: Horizontal scrollable chips on mobile, horizontal row on desktop
   - Filter chips/categories:
     * "All" (default, active state)
     * "AI Trends"
     * "Technical Insights"
     * "Case Studies"
     * "Guides & Tutorials"
     * "Tools & Resources"
   - Styling:
     * Active: Colored background (brand color), white text
     * Inactive: White/light gray background, dark text, border
     * Hover: Slight scale or color change
   - Optional: "View by tag" toggle or separate tag section
   - Mobile: Horizontal scrollable, with arrow indicators

4. SEARCH BAR (Optional but recommended):
   - Position: Below category filters or in header
   - Design: Search input with magnifying glass icon
   - Placeholder: "Search articles..." or "Search insights..."
   - Functionality: Real-time search or search on Enter
   - Clear button (X) when text is entered
   - Results: Highlight matching terms, show result count

5. BLOG POSTS GRID/SECTION:
   - Background: White
   - Layout: 3-column grid on desktop, 2-column on tablet, 1-column on mobile
   - Each article card:
     * Article image/thumbnail (top, aspect ratio 16:9 or 4:3)
       - Placeholder: Abstract tech illustration, code snippets, or relevant imagery
       - Overlay: Category badge/tag (top-left corner, small, colored)
     * Article content area (white background):
       * Category/Tag: Small badge above title (e.g., "AI Trends", "Technical")
       * Article title (bold, larger, link to detail page)
         - Max 2 lines, truncate with ellipsis if longer
       * Excerpt/description (2-3 lines, readable text)
         - Preview of article content
       * Metadata row:
         - Author: "neziva" (optional, small text)
         - Date: "Jan 15, 2026" (formatted date, small text)
         - Read time: "5 min read" (optional, small text, clock icon)
       * Tags (optional, small chips): Related keywords
       * "Read More" link/button (subtle, or implied by card click)
     * Hover effect: Card lift, shadow increase, slight scale (1.02x)
   - Cards: White background, image on top, content below, subtle border or shadow
   - Spacing: Comfortable gap between cards (grid gap)

6. ARTICLE DETAIL PAGE (When clicking an article):
   - Full-width layout
   - Article hero image (full width, ~400-500px height)
   - Article header section:
     * Category badge (top, above title)
     * Article title (large, bold, readable)
     * Metadata row: Author, Date, Read time
     * Social share buttons (optional): LinkedIn, Twitter, Copy link
   - Article content area:
     * Max width: ~800-1000px (centered, readable line length)
     * Typography: Readable font size (18px+), good line height (1.6-1.8)
     * Content sections: Headings, paragraphs, lists, code blocks
     * Images: Full width or constrained, with captions
     * Code blocks: Syntax highlighting, copy button
     * Quotes: Styled blockquotes
     * Links: Clear, underlined, brand color on hover
   - Table of Contents (optional, for long articles):
     * Sticky sidebar on desktop
     * Collapsible section on mobile
     * Links to article sections
   - Related articles section (below content):
     * Title: "Related Articles" or "You Might Also Like"
     * 3-4 related article cards (horizontal scroll on mobile, grid on desktop)
     * Based on tags/categories
   - CTA section (below article):
     * Background: Light gray or gradient
     * Headline: "Ready to Build Your AI Solution?"
     * CTA button: "Schedule Free Consultation"
     * Alternative: "View Our Services"

7. PAGINATION (If many articles):
   - Position: Below article grid
   - Design: Page numbers or "Load More" button
   - Previous/Next navigation
   - Current page highlighted
   - Mobile: Simplified pagination (Previous/Next buttons)

8. NEWSLETTER SIGNUP SECTION (Optional but recommended):
   - Background: Gradient or solid brand color
   - Layout: Centered content
   - Headline: "Stay Updated" or "Get AI Insights"
   - Subheadline: "Subscribe to get the latest AI trends and tips"
   - Email signup form:
     * Email input field
     * Submit button: "Subscribe"
     * Privacy note: "We'll never spam you" (small text)
   - Benefits listed (optional, small bullets):
     * "Weekly AI insights"
     * "Exclusive case studies"
     * "Tool recommendations"

9. CTA SECTION (Final call-to-action, optional):
   - Background: Blue/purple gradient or solid brand color
   - Layout: Centered content
   - Headline: "Have Questions About AI?" (Large, white/bold)
   - Subheadline: "Let's discuss how AI can help your business" (Medium, lighter)
   - CTA button: "Schedule Free Consultation" (Large, prominent)

10. FOOTER (same as homepage)

RESPONSIVE DESIGN:
- Desktop (1920px+): 3-column article grid, side-by-side layouts, sticky elements
- Tablet (768px-1024px): 2-column article grid, adjusted spacing
- Mobile (320px-767px): Single column, full-width cards, stacked sections, horizontal scrollable filters

INTERACTIONS & ANIMATIONS:
- Article card hover: Lift shadow, slight scale (1.02x)
- Filter chip click: Active state transition, smooth
- Search: Real-time results or search on Enter, loading state
- Article card click: Navigate to article detail page
- Smooth scroll to top when navigating
- Scroll-triggered fade-in animations for article cards (staggered)
- Image lazy loading for article thumbnails
- Infinite scroll or pagination with smooth transitions
- Share button: Copy link confirmation, social share popup

CONTENT STRUCTURE:

Article Card Components:
- Featured image (required)
- Category/Tag badge
- Title (required, max 60 characters recommended)
- Excerpt (2-3 sentences, max 150 characters)
- Metadata (Date, Read time)
- Tags (optional, max 3-5 tags)

Article Detail Page Components:
- Hero image
- Title
- Metadata (Author, Date, Read time, Category)
- Table of contents (optional, for articles > 1500 words)
- Article body (formatted content)
- Related articles
- Social share buttons
- Author bio (optional)
- Comments section (optional, can be omitted)

EXAMPLE ARTICLE TYPES & FORMATTING:

1. AI Trends Articles:
   - Title example: "2026年中小企业如何用AI省钱省力" or "How Small Businesses Can Save Money with AI in 2026"
   - Format: News-style, informative, data-driven
   - Length: 800-1500 words
   - Includes: Statistics, examples, actionable insights

2. Technical Insights:
   - Title example: "从零到一：如何构建你的第一个AI应用" or "From Zero to One: Building Your First AI Application"
   - Format: Tutorial-style, step-by-step
   - Length: 1000-2000 words
   - Includes: Code examples, diagrams, explanations

3. Case Studies:
   - Title example: "AI客服机器人的5个最佳实践" or "5 Best Practices for AI Customer Service Chatbots"
   - Format: Case study format, problem-solution-results
   - Length: 1000-2000 words
   - Includes: Real examples, lessons learned, recommendations

4. Guides & Tutorials:
   - Title example: "如何选择适合你业务的AI工具" or "How to Choose the Right AI Tools for Your Business"
   - Format: Guide format, actionable steps
   - Length: 1500-3000 words
   - Includes: Checklists, comparison tables, recommendations

CONTENT TONE & STYLE:
- Educational: Focus on teaching and informing
- Practical: Actionable insights and real examples
- Authentic: Honest about challenges and limitations
- Professional: Well-researched, accurate information
- Approachable: Not overly technical, accessible to business owners
- Avoid: Over-promising, excessive self-promotion, generic content

SEO CONSIDERATIONS:
- Article titles: Descriptive, keyword-rich, engaging
- Meta descriptions: Compelling summaries (150-160 characters)
- URL structure: Clean, readable (/blog/article-title)
- Header tags: Proper H1, H2, H3 hierarchy
- Alt text: All images have descriptive alt text
- Internal linking: Link to related articles and service pages
- Schema markup: Article schema for better search visibility

ACCESSIBILITY:
- Sufficient color contrast (WCAG AA minimum)
- Keyboard navigation support (Tab through articles, Enter to open)
- Screen reader friendly (semantic HTML, ARIA labels)
- Alt text for all images
- Focus states on interactive elements
- Readable font sizes (minimum 16px for body text)
- Clear link labels

DELIVERABLES:
- Desktop layout (1920px width) - Blog list page
- Tablet layout (768px width) - Blog list page
- Mobile layout (375px width) - Blog list page
- Desktop layout - Article detail page
- Tablet layout - Article detail page
- Mobile layout - Article detail page
- Article card component specifications
- Article detail page component specifications
- Filter/category chip component
- Search bar component
- Pagination component
- Newsletter signup component
- Color palette with hex codes
- Typography scale (body text, headings, metadata)
- Image specifications (aspect ratios, sizes)
- Spacing system
```
