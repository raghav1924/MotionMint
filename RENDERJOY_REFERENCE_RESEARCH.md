# RenderJoy — Reference Research, Competitive Analysis & Component Source Catalogue

> **Purpose:** Research notebook for Antigravity and future coding agents. This document records the websites the user supplied, the capabilities/categories that were visible in official documentation or indexed pages, the user's own supplied future component list, and how RenderJoy should use each source.
>
> **Research snapshot:** 2026-11-27. Websites change frequently. Re-open official reference pages before making implementation or availability claims. This is a design/product research map, not permission to copy source code, assets, logos or paid components.

---

## 1. Executive findings

### Bencho is the strongest product-experience reference

Bencho combines four related experiences:

1. **Blocks:** live React components and micro-interactions, each with an individual page, interaction demo, adjustable controls and copyable source.
2. **Sounds:** a categorised, previewable UI sound library. The official indexed sound page returned 82 named samples on the research snapshot.
3. **Finds:** a curated gallery of interactions by other designers, with maker attribution.
4. **Bench:** a canvas for arranging and tuning blocks side by side.

Bencho's official About page describes 186 blocks, all live/adjustable, and a source/MCP Pro offering. Its homepage search index shows an interaction-labelled component inventory. Treat counts as a dated snapshot, not a permanent fact. The user's attached screenshot of `/bench` shows a dark dotted full-canvas surface with independent specimen objects (chart, media stack, pricing/value tile, clock, logo glyph) and canvas zoom controls. The attached footer screenshot shows a near-black footer, a contact line, left-side logo/description/creator/social area, four right-side link groups, a large halftone/dot landscape and compact legal footer row.

**RenderJoy adaptation:** live component details + adjustable inspector + category/interaction discovery + individual sound audition + curated Finds/reference area + a `/bench` board. Preserve RenderJoy's own brand, themes and installation model.

### The sources fall into different roles

- **Copy/install component libraries:** shadcn/ui, Kibo UI, Magic UI, React Bits, Tactile UI, Preline, Planes, Bencho, Scroll Shaders, Scrolltide.
- **Accessible behaviour foundations:** Radix UI and Floating UI.
- **Icons:** Lucide.
- **Real product UI inspiration:** Mobbin, Refero.
- **Website/section inspiration:** SiteInspire, Lapa Ninja, Curated, Recent, Godly legacy, Best Designs on X, Awwwards, Wix Studio, Footer Design, CTA Gallery.
- **Brand/portfolio inspiration:** Metalab, Marked.dev, Contra / Divan Raj.

Do not treat every source as a component codebase. Some are reference galleries, interaction inspiration or lower-level primitives.

---

## 1.1 Current working roadmap reconciliation

The user supplied the current repository `ROADMAP.md` (last updated 2026-11-25). It uses the brand **RenderJoy** (`@renderjoy/*`, `<RenderJoyTheme>`, `renderjoy-logo.tsx`), so this research document now follows that repository identity. Earlier conversation messages used “MotionMint”; do not mass-rename the codebase based on conversational naming alone. Preserve the current repository brand unless the user explicitly approves a rename.

The current roadmap reports these as complete: unified application shell (Phase 2.11), editorial brand and shortened homepage (Phase 2.12), Bencho-inspired component discovery/inspector/comparison (Phase 2.13), the raw-WebGL Shader Background engine (six internal presets), and the `/flow` Node Pipeline Orchestrator demo. These are the starting baseline, not an instruction to rebuild them. Verify source and browser behaviour before asserting current state.

The roadmap also establishes important distinctions: `/playground` and standalone `/canvas` were removed later; `InfinityCanvas` remains an installable component; the requested full-canvas Bencho-style experimentation workspace is a separate future **Bench** route. The Flow execution adapter is simulated, not a production workflow runtime. The current Sound Lab reports 17 synthesized cues; the 50+ individually auditionable original sound library remains future work. The single Shader Background item has six internal presets, while the user's later requirement is to publish each distinct visual effect (for example Logo Flare, Prism, Wind Tunnel, Cloud Sea and Liquid Drops) as its own discoverable component while sharing the renderer internally.

If an older section of this research or the earlier Agent Roadmap conflicts with the user's supplied current `ROADMAP.md`, use the latest roadmap's completed status and the later route-removal decisions as the baseline, then use repository evidence to determine what remains.

---

## 2. Bencho — deep-dive reference

**Official site:** https://bencho.dev/  
**About:** https://bencho.dev/about  
**Blocks:** https://bencho.dev/blocks  
**Sounds:** https://bencho.dev/sounds  
**Finds:** https://bencho.dev/finds  
**Bench:** https://bencho.dev/bench  
**Pricing:** https://bencho.dev/pricing  
**Source link referenced on About page:** https://github.com/cabralorenzo/bencho

### 2.1 Product model observed

- A live block library, rather than static screenshots or video-only samples.
- Individual block pages with real controls and tunable values.
- Interaction taxonomy visible in discovery (Press, Drag, Hover, Loading, Type, Swipe, Slide, Select).
- A “Add to bench” action on individual blocks (visible on the indexed ASCII wake detail page).
- Bench is a full-canvas spatial arrangement environment.
- Sounds are organised by interaction category and auditioned individually.
- Finds is a curated interaction gallery; maker attribution is part of the product.
- About page describes React source, per-block pages, adjustable values, source copy, MCP integration and free/Pro separation.

### 2.2 Bencho component inventory captured from its current indexed homepage/details

This is a **name inventory** captured from search-indexed official Bencho pages and the user's screenshots, not a guarantee that each item is still present or has an exact current implementation. Antigravity should verify item detail pages and live behaviour before using an entry as a build spec.

#### Actions, buttons and confirmation
- Check Key
- Live Vote
- Confirm Send
- Huddle
- Hold to Delete
- Status Picker
- Format Bar
- Odds
- Generate
- Step Player
- Like
- Pay Button
- Sweep Button
- Slide to Confirm
- Escape Button
- Create Menu
- Inline Confirm
- Notify
- Radial Menu
- Drag Stepper
- Liquid Toggle
- Send Halo (also referenced in Scrolltide inventory)

#### Inputs, form controls and selection
- Drip Slider
- Elastic Slider
- Password Reveal
- AI Chat Input
- Status Picker
- Budget Slider
- Tag Input
- Range
- Picker Wheel
- Magnetic Select
- Assignees
- Checklist
- Palette
- Aspect Ratio
- Search
- Label Input
- One-Time Code
- Selection Actions
- Selection List
- Range Dial
- Slosh Slider
- Country Wheel
- Option Wheel
- Wake Slider
- Time Scrubber
- Segment Timer
- Password Strength
- Date Reel
- Copy Field
- Dropdown

#### Drag, spatial, canvas and physics-like interactions
- Path Panel
- Audio Trim
- Dice
- Score Gauge
- Slingshot
- Crumpled Receipt
- Price Chart
- Orders Globe
- Spec Inspector
- Coin
- Tape
- Picker Wheel
- Split View
- Resize Frame
- Card Fan
- Swipe Deck
- Activity Stack
- Ticket
- Folding Bill
- Magnetic Dots
- Dot Globe
- Image Compare
- Signature Pad
- Dragging Ball
- Pull to Refresh
- Reorder List
- Canvas Toolbar
- Wheel
- Orbit Cards
- Glass Bubble
- Page Peel
- Resizable Panels
- Network Graph
- Drag Slider
- Option Wheel
- Line Sphere

#### Hover, pointer, reveal and visual reactions
- Thinking Orb
- Stories
- Liquid Tooltip
- Income Flow
- 3D Bar Chart
- Market Chart
- Arc Ring
- Card Stack
- Image Trail
- Dust Delete
- Magnetic Letters
- Context Meter
- Ink Bloom
- Peek Rating
- Edge Light
- Line Sidebar
- Emoji Reactions
- Folder
- Foggy Word
- Code Reveal
- Eye Tracker
- Particles
- Image Accordion
- Action Node
- Tilt Card
- Smudge
- Radial Pop-Out
- Heart Rate
- Light
- Share Pill
- Magnifying Dock
- Progress Ticks
- ASCII Wake
- Heat Map
- Dot Swarm
- Falling Text
- Gravity Tags
- Line Sphere
- Profile Hover Card
- Orbit Cards
- Metaballs
- Glass Bubble
- Avatar Group

#### Loading and progress states
- Race Bars
- Progress Tracker
- Thinking Loader
- Loading State
- Load Cards
- Wave Loader
- Bounce Loader
- Trace Loader
- Morph Loader
- Pixel Loader
- Blocks Loader
- Blueprint Loader
- Dot Loader
- Image Shimmer
- Shimmer Text
- Skeleton Morph
- Rolling Counter
- Todo Tower

#### Navigation, layout and application patterns
- Jelly Tabs
- Tab Bar
- Collapsing Sidebar
- Pill Accordion
- Feedback Bar
- Activity Stack
- Hub Diagram
- Avatar Group
- Toast Stack
- Tree View
- Access Request
- Flight Island
- Music Island
- Call Island
- Dynamic Island
- Album Shelf
- Piano
- World Clock
- Share Pill
- Icon Bar
- Command Bar
- Create Menu
- FAQ Frames
- Stacked Bars
- Integrations
- Seat Map
- AI Assistant
- Private Balance
- Billing Card
- Price Flow
- Voice Chat
- Voice Note
- Now Playing
- Step Player
- Checklist
- Carousel

#### Media, image and creative objects
- Asset Swap
- Image Compare
- Image Accordion
- Photo/Media Stories
- Album Shelf
- Retro/Now Playing media controls
- Audio Trim
- Voice Note
- Image Trail
- Glass Bubble
- Dither/ASCII style interaction demos

> Names may overlap or have different spelling/capitalisation on the current live site. Before adding new RenderJoy items, compare behaviour and purpose rather than matching names alone.

### 2.3 Bencho interaction taxonomy to adopt

Use typed metadata rather than a single category label:

- `press`
- `hover`
- `drag`
- `swipe`
- `slide`
- `type`
- `select`
- `loading`
- `scroll`
- `focus`
- `drop`
- `hold`
- `keyboard`
- `zoom`
- `pan`

A component can support multiple interaction types. Filter/search should work on these tags. Only list interactions the component genuinely supports.

### 2.4 Bencho Sounds inventory observation

The official indexed `/sounds` page returned 82 named samples in eight categories: Actions, Feedback, Navigation, Notifications, Selection, Movement, Progress and System. Example names surfaced in the current index include Pat, Knock, Jab, Cuff, Tap, Thump, Sigh, Buzz, Bump, Groan, Snub, Chime, Hail, Pip, Bell, Tone, Whisk, Glide, Step, Vault, Sweep, Ferry, Stride, Bloom, Portal, Drift, Drag, Lift, Float, Drape, Swim, Sway, Hover, Tick, Latch, Pick, Cog, Check, Mark, Notch, Pin, Settle, Rise, Climb, Crest, Fill, Hush, Purr, Boot, Drone, Wake, Hum, Idle and Pulse.

**RenderJoy requirement:** ship at least 50 original, individually playable and clearly categorised sounds. Use Bencho as an interaction/quality benchmark only. Do not copy its audio recordings or one-to-one sound names/identities. Prefer original synthesis or properly licensed assets; sound off by default.

### 2.5 Bencho Bench / screenshot findings

From the user's attached `/bench` screenshot:
- Dark full-screen canvas with subtle dotted grid.
- Independent live objects distributed spatially, not arranged in a normal page grid.
- Zoom percentage and plus/minus/fit controls in the upper-right.
- Specimens include a data chart, image/card stack, conversion/payment panel, abstract glyph and time/tick control.
- Large negative space and direct manipulation feel.

RenderJoy should create `/bench` as a full-canvas lab where developers can place live components, adjust them and compare them. Keep `InfinityCanvas` as a separate installable component. The Bench route is not the old generic Playground route.

### 2.6 Bencho footer screenshot findings

- Almost-black background.
- Small centered/contact message along the upper region.
- Brand and short description left aligned.
- Creator/byline chip and social/contact icons below the brand.
- Four right-side link groups: free blocks, product, resources and company.
- Large dot/halftone landscape along bottom.
- Fine divider and compact legal/copyright links.

Adapt the information architecture and halftone motif in original RenderJoy styling.

### 2.7 Licence and copying safeguards

Bencho's About page states that its free blocks are MIT and that Pro unlocks full source/MCP. This does not grant RenderJoy permission to copy paid blocks or Bencho-specific content. For any open-source code considered for adaptation, inspect the original repository's current LICENSE and preserve required attribution/notice. Prefer original implementation from observed behaviour.

---

## 3. Reference-by-reference component and design inventory

### 3.1 shadcn/ui

**Links:**
- https://ui.shadcn.com/
- https://ui.shadcn.com/docs/components
- https://ui.shadcn.com/blocks
- https://ui.shadcn.com/view/new-york-v4/dashboard-01

**Role:** installable accessible UI foundations and composable blocks. shadcn is especially relevant for source-copy/registry distribution, base controls, dashboard layouts and developer experience.

**Components indexed in current docs:**
- Accordion
- Alert
- Alert Dialog
- Aspect Ratio
- Attachment
- Avatar
- Badge
- Breadcrumb
- Bubble
- Button
- Button Group
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Code Block
- Collapsible
- Combobox
- Command
- Context Menu
- Data Table
- Date Picker
- Dialog
- Direction
- Drawer
- Dropdown Menu
- Empty
- Field
- Form
- Hover Card
- Input
- Input Group
- Input OTP
- Kbd
- Label
- Marker
- Menubar
- Message
- Message Scroller
- Native Select
- Navigation Menu
- Pagination
- Popover
- Progress
- Questionnaire
- Radio Group
- Resizable
- Scroll Area
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Slider
- Spinner
- Switch
- Table
- Tabs
- Textarea
- Toast
- Toggle
- Toggle Group
- Tooltip
- Trace
- Typography

**Dashboard-01 observed composition:** app sidebar with Dashboard/Lifecycle/Analytics/Projects/Team and document/resource nav; site header; summary/stat cards for revenue, customers, active accounts and growth; visitor chart; configurable data table with row drag, status, target, limit, reviewer and row menu. The registry/build example names `app-sidebar`, `chart-area-interactive`, `data-table`, `nav-documents`, `nav-main`, `nav-secondary`, `nav-user`, `section-cards` and `site-header`.

**RenderJoy use:** rely on shadcn/Radix-compatible foundations for semantics, but develop unique interaction-rich application components and full blocks. Avoid duplicating basic primitives without a differentiation reason.

### 3.2 Planes

**Links:**
- https://useplanes.com/
- https://useplanes.com/components
- https://useplanes.com/components/logo-flare

**Role:** premium animated React components, shader/WebGL art direction, curated category gallery, large live previews and copy/install workflow.

**Categories shown in the user's supplied Planes reference/catalogue:**
- Getting Started / Docs / MCP
- AI
- WebGL / visual effects
- Voxel
- Media
- Carousels
- Controls
- Physics
- Text
- Sections
- Features
- Bento
- Testimonials
- Pricing
- FAQs
- Contact
- CTA
- Waitlist
- Charts
- Heroes
- Navbars
- Logins
- Footers

**Specific listed examples supplied by user:**
- AI: Thinking Loader, AI Prompt Composer, Streaming Message, Reasoning Trace, Image Generation, Tool Call Card, Agent Plan, AI Chat, Inline Diff, Approval Card, Chat Orb, Pixel Image Generation.
- WebGL/visual: Logo Flare, Prism, Wind Tunnel, Cloud Sea, Ink, Slipstream, Embers, Beams, ASCII WebGL, Dither Field, Ferrofluid, Fluid Field, Cymatics, Pixel Grid, Caustics, Thin Film, Topography, Jali, Galaxy, Eclipse, Streaks, Magma, Warp, Liquid Gradient, Code Rain.
- Voxel: Voxel, Voxel Park, Voxel Shrine, Voxel Onsen, Voxel Pond, Voxel Skill.
- Media: Link Preview, Radial Pop-out, Direction-Aware Flip Card, Hover Reveal, Photo Stack, Hero Card Stack, Swipe Card Deck, Photo Shuffle, Retro Music Player, Album Cover, Apple Music Card, Watch Face, Digital Watch Face, Avatar Cluster, Photo Lightbox, Scroll Zoom Reveal, GitHub Chart, Dither Renderer, Progressive Blur, Hero Media Scroll-Out, Shutter Gallery, Photo Planes, Polaroid Flip Card, Blur Collage, Text Cylinder, Expanding Card, Curved Video Player, Scroll Settle Gallery, Peel Stack.
- Carousels: Logo Wall, Marquee, Image Wheel, Image Flow Carousel, Arc Marquee, Parallax Carousel, Bend Carousel, Elastic Carousel, Focus Scale Carousel, Fan Carousel, Cover Flow, Lens Carousel, Ring Gallery, Helix Gallery.
- Controls: Copy Button, Segmented Control, Number Stepper, Glow Input, Email Capture, Card Stack, Date Picker, Animated Select, Command Palette, OTP Input, Detent Drawer, Notch, Physical Knob, Reaction Arc, Receipt Printer, Rubber Band Select, Morphing Tray, Keyboard, Infinity Canvas, Scratch Card, Multi Select, File Dropzone, Halftone Popover, Cookie Consent.
- Physics: Ripple Grid, Particle Reveal, Pendulum Wave, Rubik's Cube, Dotted Sphere, Dot Monogram.
- Text: Smooth Stagger Text, Cinematic Text, Split-Flap Board, Liquid Headline, Signature Reveal, Rainbow Text, Neon Sign, Glitch Reveal, Odometer, Photo Headline.
- Sections: Shader Strip, Shader Rows, Shader Index, Shader Flood, Hover Tabs, Silk Card, Mega Menu, Integration Beams, Radial Hub Diagram, Shader Tabs, World Map, Dotted Globe, Activity Feed, Scroll Stage, Radar Sweep, Data Table, Integration Grid, Changelog Timeline, Announcement Bar, Logo Cloud, Team Section, Blog Section, Integration Wall, Showcase Wall.
- Feature/Bento/Testimonial/Pricing/FAQ/Contact/CTA/Waitlist blocks: Feature 1–5, Bento 1–8, Testimonial 1–10, Pricing 1–7, FAQ 1–8, Contact 1–7, CTA 1–6, Waitlist 1–4.
- Charts: Shader Area, Shader Bars, Shader Stream, Dither Donut, Dither Heatmap, Shader Stat Tiles, Dither Bar List, Dither Gauge, Dither Line Chart, Dither Pie.
- Heroes: Silk Strand Hero, Floating Cards Hero, Orbit Hero, Gallery Wall Hero, SDK Hero, Trail Hero, Type Hero, Desk Hero, Orbit Prompt Hero, Scenic Hero, Editorial Hero, Landing Hero.
- Navbars: Shader Nav, Navbar, Curtain Nav.
- Logins: Portal Login, Terminal Login, Auth Form.
- Footers: Wordmark Footer, Halftone Footer, Gradient Footer, Horizon Footer.

**Observed indexed Planes Logo Flare direction from user's recording:** dark navy/black background, central geometric logo, bright blue central illumination, radial rays and soft atmospheric glow. User wants a separate individual component, not a generic shader preset switcher.

**RenderJoy use:** study art direction, preview scale, custom interaction, dedicated detail pages, source/install presentation and WebGL polish. Make original art and component implementations.

### 3.3 Marked.dev

**Link:** https://marked.dev/

**Role:** user-selected developer/product UI reference. Inspect live page directly when available. Use as a reference for developer-centric clarity, product framing, interaction quality, compact navigation and practical tool presentation. No component inventory was reliably surfaced in the current research session; do not invent one. Treat as design inspiration until individual component examples have been inspected.

### 3.4 Radix UI

**Links:**
- https://www.radix-ui.com/
- https://www.radix-ui.com/primitives/docs/components

**Role:** accessible unstyled React primitives; use for behaviour, focus management, keyboard semantics, composability and robust APIs rather than visual inspiration alone.

**Official indexed component list:** Accordion, Alert Dialog, Aspect Ratio, Avatar, Checkbox, Collapsible, Context Menu, Dialog, Dropdown Menu, Form, Hover Card, Label, Menubar, Navigation Menu, One-Time Password Field, Password Toggle Field, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, Toggle Group, Toolbar, Tooltip.

**Utilities:** Accessible Icon, Direction Provider, Portal, Slot and Visually Hidden.

**Important engineering value:** keyboard navigation, typeahead, submenu support, collision-aware placement/animation, controlled/uncontrolled state, screen-reader semantics and focus management.

### 3.5 Kibo UI

**Links:**
- https://www.kibo-ui.com/
- https://www.kibo-ui.com/components/reel

**Role:** composable shadcn-oriented components and blocks, especially application patterns and media.

**Components listed on official site:** Announcement, Avatar Stack, Banner, Calendar, Choicebox, Code Block, Color Picker, Combobox, Comparison, Contribution Graph, Credit Card, Cursor, Deck, Dialog Stack, Dropzone, Editor, Gantt, Glimpse, Image Crop, Image Zoom, Kanban, List, Marquee, Mini Calendar, Pill, QR Code, Rating, Reel, Relative Time, Sandbox, Snippet, Spinner, Status, Stories, Table, Tags, Theme Switcher, Ticker, Tree, Typography, Video Player.

**Blocks listed:** About, Awards, Blog, Blog Post, Careers, Case Studies, Case Study, Changelog, Code Example, Codebase, Collaborative Canvas, Community, Compare, Compliance, Contact, CTA, Download, Experience, FAQ, Feature, Footer, Form, Hero, Pricing, Roadmap, Stats, Team, Testimonial.

**Patterns include:** Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, Context Menu, Data Table, Date Picker, Dialog, Drawer, Dropdown Menu, Empty, Field, Form, Hover Card, Input, Input Group, Input OTP, Item, Kbd, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Scroll Area, Separator, Sheet, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group and Tooltip.

**Reel detail observed:** 9:16 media, progress indicators, autoplay/advance, image/video support, play/pause and mute, touch left/right navigation, composable overlays, keyboard accessibility and responsive viewport-height scaling.

**RenderJoy use:** review Deck, Reel, Stories, Image Zoom/Crop, Collaborative Canvas, Gantt/Kanban, Code Block, Editor and richer block templates.

### 3.6 Magic UI

**Link:** https://magicui.design/docs/components

**Role:** animated components and effects for landing pages, with a useful catalogue of backgrounds, typography and device mocks.

**Official docs inventory captured:**
- Core/showcase: Marquee, Terminal, Hero Video Dialog, Bento Grid, Animated List, Dock, Globe, Tweet Card, Orbiting Circles, Avatar Circles, Icon Cloud, Lens, Pointer, Smooth Cursor, Progressive Blur, Dotted Map.
- Special effects: Animated Beam, Border Beam, Shine Border, Magic Card, Glare Hover, Meteors, Confetti, Particles, Animated Theme Toggler.
- Animation: Blur Fade.
- Text: Text Animate, Typing Animation, Line Shadow Text, Aurora Text, Video Text, Number Ticker, Animated Shiny Text, Animated Gradient Text, Text Reveal, Dia Text Reveal, Hyper Text, Word Rotate, Scroll Based Velocity, Sparkles Text, Morphing Text, Spinning Text, Text Highlighter, Text 3D Flip.
- Device mocks: Safari, iPhone, Android.
- Buttons: Rainbow Button, Shimmer Button, Ripple Button.
- Backgrounds: Flickering Grid, Animated Grid Pattern, Retro Grid, Ripple, Dot Pattern, Grid Pattern, Hexagon Pattern, Striped Pattern, Interactive Grid Pattern, Light Rays, Noise Texture.
- Community: Shiny Button, File Tree, Code Comparison, Scroll Progress, Neon Gradient Card, Comic Text, Kinetic Text, Cool Mode, Pixel Image, Pulsating Button, Backlight, Glyph Matrix.

**RenderJoy use:** compare effects and build original versions only where distinct; don't assume every Magic UI item belongs in the initial roadmap.

### 3.7 Tactile UI

**Link:** https://tactileui.dev/

**Role:** hardware-inspired tactile controls and product UI. The live indexed page reports 39 interactive objects, 59 blocks and 224 kit parts; it demonstrates a loud Tactile and quiet visual treatment with live specimens. It groups content into Actions, Inputs, Selection, Navigation, Feedback, Display and other parts.

**Visible examples:** buttons, inputs, toggles, toasts, navigation controls, day/week/month controls, alerts, cards, invoice/payment surfaces, tables, dialogs, keys, knobs, fields and meters. Exact 224-item breakdown was not captured in the available index; inspect the live kit before adding a specific Tactile-derived item.

**RenderJoy use:** physical/tactile control ideas (knobs, sliders, keys, rubber-band selection, tactile feedback); do not copy the exact skeuomorphic visual language.

### 3.8 React Bits

**Links:**
- https://reactbits.dev/tools
- https://www.reactbits.dev/tools

**Role:** animated React components, creative tooling and exportable visual assets.

**Tools surfaced in official indexed page:**
- Background Studio: tune animated background effects; export code, still image or video; share URLs.
- Shape Magic / OpenShape: build merged blob shapes with gradients, shadows, outlines and export SVG/PNG/JPG/React/CSS clip-path.
- Texture Lab: image/video/camera texture effects including noise, dithering, halftone and ASCII.
- Center Stage: turn screenshots/recordings into device/browser product shots with tilt, depth, shadows and typography; export still/video/GIF.
- Sound Lab: audition/tune sound effects and install/export sounds.
- Bento Builder: arrange, drag and resize bento tiles.

**RenderJoy use:** strong product inspiration for a future shader/texture/sound studio and export/share workflow. Keep actual component previews and export behaviour honest.

### 3.9 Preline UI

**Link:** https://preline.co/docs/components/tooltip.html

**Role:** large Tailwind component and plugin catalogue across HTML/React/Vue and more. Useful for breadth and conventional app UI patterns.

**Official indexed categories/components:**
- Layout/content: Container, Columns, Grid, Layout Splitter, Typography, Images, Links, Dividers, KBD, Custom Scrollbar.
- Base: Accordion, Alerts, Avatar, Avatar Group, Badge, Blockquote, Buttons, Button Group, Cards, Chat Bubbles, Carousel, Collapse, Datepicker, Devices, Lists, List Group, Legend Indicator, Progress, File Uploading Progress, Ratings, Skeleton, Spinners, Styled Icons, Toasts, Timeline, Tree View, Marquee.
- Navigation: Navbar, Mega Menu, Navs, Tabs, Sidebar, Scrollspy, Breadcrumb, Pagination, Stepper.
- Basic forms: Input, Input Group, Textarea, File Input, Checkbox, Radio, Switch, Select, Range Slider, Color Picker, TimePicker.
- Advanced forms: Advanced Select, ComboBox, SearchBox, Input Number, Strong Password, Toggle Password, Toggle Count, Copy Markup, PIN Input.
- Overlays: Dropdown, Context Menu, Modal, Offcanvas/Drawer, Popover, Tooltip.
- Tables/plugins: Tables, Advanced Range Slider, Advanced Datepicker, Charts, Clipboard, Confetti, Datamaps, Datatables, Drag and Drop, File Upload, Maps, Toast Notifications, WYSIWYG Editor.

### 3.10 Lucide

**Link:** https://lucide.dev/icons/

**Role:** icon system, not a UI component library. Current indexed catalogue exposes over 2,124 icons and category groups including Accessibility, Accounts & Access, AI, Animals, Arrows, Buildings, Charts, Communication, Connectivity, Cursors, Design, Coding & Development, Devices, Education, Finance, File Icons, Gaming, Layout, Mail, Multimedia, Nature, Navigation & Places, Notifications, People, Photography, Science, Security and Shapes.

**RenderJoy use:** use Lucide for supporting interface icons with consistent stroke; never use generic icon art as RenderJoy's primary brand mark. Build a curated icon mapping and provide tooltips.

### 3.11 Floating UI

**Links:**
- https://floating-ui.com/
- https://floating-ui.com/docs/react
- https://floating-ui.com/docs/middleware

**Role:** positioning and interaction primitives for tooltips, popovers, menus, inspectors, context menus, drawers and floating toolbar elements.

**Relevant APIs/documentation surfaced:** `useFloating`, `useInteractions`, `useHover`, `useClick`; middleware includes `offset`, `flip`, `shift`, `size`, `arrow`, `hide`, `autoPlacement`, etc. Floating UI's middleware is ordered and can reset/recompute positioning when placement changes.

**RenderJoy use:** implement compact inspector/menu positioning, viewport collision handling, tooltips and hover/focus behaviour. Keep menu placement fixed/stable and avoid preview layout shifts.

### 3.12 Stylemoth

**Link:** https://stylemoth.com/

**Research state:** supplied by user, but no reliable component inventory was surfaced in the current search results. Agent must open and inspect live site and capture only verifiable component families, interactions and licensing. Do not invent a component list.

### 3.13 Scrolltide

**Links:**
- https://www.scrolltide.co/components
- https://www.scrolltide.co/

**Role:** scroll-driven website templates, prompts, shader/visual effects and individual interaction components.

**Component page items surfaced:** Focus Reveal, Mesh Flow, Circular Slider, Media Gallery, Carousel Ring, Arc Carousel, Fan Carousel, Expanded Cards, Spotlight Carousel, Fan Deck, Send Halo, Glow Ring Button, Particle Globe, Scroll Key.

**Homepage indexed positioning:** library of templates and prompts, separate sections/components/shaders categories, and shader backgrounds exported as MP4/still/component. Homepage search result reported 172 shaders and 132 components at crawl time; counts may change.

**RenderJoy use:** unique scroll/motion patterns and component interaction engineering. Inspect actual implementations and avoid duplicating generic effects.

### 3.14 Footer Design

**Link:** https://www.footer.design/

**Role:** dedicated footer inspiration gallery.

**Filters/categories surfaced:** Typographic, Small Type, Illustrative, Grid, Flat, Animated, Cards, Bright, Dark, Large Type and Bold.

**RenderJoy use:** research distinct footer composition patterns and select a halftone/typographic/dark editorial solution for RenderJoy. The user's Bencho footer screenshot remains the primary requested reference.

### 3.15 Try Clucky

**Link:** https://tryclucky.com/

**Research state:** no reliable, structured component inventory was surfaced during the search session. Agent must inspect directly and classify what it is (library, generator, inspiration or other). Do not assume it is a component library.

### 3.16 CTA Gallery

**Link:** https://www.cta.gallery/

**Role:** CTA/website call-to-action inspiration gallery.

**Official indexed categories:** button category contains examples from product/brand websites such as Telescope, Primeasia, turn.io, Titan, Safepal, Zkpass, Vapi, Framer, Supabase, Linear, Perplexity, Cohere and others. Treat it as reference examples, not a source-code library.

**RenderJoy use:** CTA hierarchy, wording, placement, hover states, pricing/upgrade prompts and conversion affordances.

### 3.17 Mobbin

**Links:**
- https://mobbin.com/explore/web/ui-elements
- https://mobbin.com/explore/web/ui-elements/components-examples

**Role:** real shipped application UI/screens and flows. Good for product interaction research, not source-code reuse.

**Categories/examples surfaced:** component screens and patterns such as buttons, dashboard navigation, onboarding tooltips, tabs, segmented controls, pagination, accordion, text fields, time picker, full-screen overlay, modal, multi-select dropdown, notification dot, admin badge, dialogs, cards, progress indicators, skeletons, toasts, upload flows, logo/navigation combinations, tabs and forms.

**RenderJoy use:** inspect real-world edge cases and workflows before implementing form controls, navigation, overlays, account flows, dashboard and onboarding patterns.

### 3.18 Refero

**Link:** https://refero.design/styles

**Role:** design style reference gallery.

**Styles surfaced in index:** 3D objects, soft pastel gradients, Bauhaus geometry, AI startup, editorial magazine, type foundry, e-commerce, film grain/photos, acid lime accent, friendly startup, minimal & clean, huge serif headlines, brutalist, cinematic dark, developer tool, uppercase type, sharp corners, rounded, bento grid, playful/colorful, luxury brand, hardware product, retro web, maximalist, health/wellness, bold sans, earthy terracotta, black with one accent, fashion brand, hairline grid lines, creative studio, vibrant gradients, warm indie SaaS, architecture studio, black and white, frosted glass, music/audio, monospace/terminal, calm/soft, pixel fonts, mobile app landing and game studio.

**RenderJoy use:** moodboard and theme research. Not a component code library.

### 3.19 Scroll Shaders

**Links:**
- https://scrollshaders.com/
- https://scrollshaders.com/components

**Role:** WebGL shader backgrounds and shader-integrated UI components. Especially relevant to the user's request for separate WebGL background components.

**Component categories/items surfaced:**
- Shader components: Liquid Glass Carousel, Aurora Button, Beam Button, Chrome Text, Grain Card, Pixel Trail, Ember Frame, Glass Button, Grain Text, Holo Card, Warp Grid, Beam Logo, Chrome Logo, Dither Image, Ember Button, Glass Logo, Gold Logo, Halo Border, Holo Logo, Ink Trail, Liquid Image, Molten Text, Thermal Image, ASCII Image, Aurora Logo, Chromatic Image, Chrome Pill, CRT Image, Dither Logo, Dither Text, Dot Ripple, Duotone Image, Film Image, Fluted Image, Glass Mosaic, Glitch Image, Glitch Logo, Halftone Image, Halftone Logo, Liquid Logo, Molten Logo, Neon Logo, Pixel Logo, Pixel Reveal, Ripple Image, Shine Logo, Spotlight Card.
- Shader shelves: Mesh Gradients, Grain Gradients, Dither, Liquid Metal, Light & Rays, Fluted Glass, Halftone, Waves & Lines, 3D & Depth, Retro & ASCII, Patterns & Grids.
- Examples surfaced: ASCII Flow, Aurora Veil, Bayer Drift, Caustics, Contour, Dot Screen, Eclipse, Ember Bloom, Fluted Glass, Grain Orbs, Heat Ribbons, Hex Scan, Iris Orb, Light Leak, Mercury, Moiré Rings, Ooze, Silk Lines, Silk Mesh, Swirl Gradient, Truchet Flow, Tunnel Warp, Voronoi Cells, Chrome Ribbons, Oil Slick, Prism Eclipse, Solar Eclipse, Aurora Bloom, Liquid Metal and others.

**RenderJoy use:** shader inspiration and WebGL quality benchmark. Each distinct visual requested by the user should have its own RenderJoy catalogue detail page, even when engine code is shared.

### 3.20 Lapa Ninja

**Link:** https://www.lapa.ninja/elements/all/

**Role:** large screenshot library of real website sections.

**Categories/counts surfaced in index (snapshot):** Hero, Features, Pricing, Testimonials, CTA, Footer, FAQ, How It Works, About, Team, Contact, Newsletter, Products, Services, Work, Blog, Gallery, Showcase, Stats, Value Proposition, Menu, Loading, Cursor & Hover, Page Transition and Text Animation. The indexed page reported 36,225 examples; this can change.

**RenderJoy use:** section/block idea discovery, not component code reuse.

### 3.21 Curated

**Link:** https://curated.design/

**Role:** real live website references filtered by industry and style; can assemble a collection of sections for coding agents.

**Categories surfaced:** Agency, Artificial Intelligence, Assets, Design Tools, Desktop Apps, Development Tools, E-commerce, Education, Finance, Marketing, Mobile Apps, Portfolio, Productivity, Tech, Web Apps and Web3. Includes filtering by style, visuals, attributes and tags.

**RenderJoy use:** live source websites for art direction, page composition and industry-specific blocks.

### 3.22 Recent Design (formerly Godly)

**Link:** https://recent.design/

**Role:** daily curation of web, interface, branding, product, typography, motion, illustration, 3D, editorial and print work. The website has Browse categories including Design, Websites, OG Images, App Screenshots and App Icons; Resources include Tools, Skills and Jobs.

**RenderJoy use:** up-to-date aesthetic research. User's prior URL `recent.design/?ref=godly` is valid but the current identity is Recent.

### 3.23 Best Designs on X

**Link:** https://bestdesignsonx.com/

**Role:** curated design references from X. The user also supplied a specific post for Flow Orchestrator: `https://bestdesignsonx.com/flohoeller/status/2125281041560564142`.

**Research state:** specific post content not reliably surfaced in web search. Agent must open it in a browser if accessible; otherwise record unavailable and use the user's supplied screenshots plus additional Flow/node-editor references. Do not pretend the post was inspected.

### 3.24 Contra / Divan Raj

**Link:** https://contra.com/divanrajoffl/work

**Role:** designer portfolio and project inspiration, not a component library. Indexed work indicates product design, mobile/web, motion design, AI/SaaS, website design, art gallery mobile app and AI-native audio platform work.

**RenderJoy use:** portfolio case-study, motion direction, product showcase and creative presentation inspiration.

### 3.25 SiteInspire, Dribbble, Wix Studio, Metalab and Awwwards (contextual sources)

- https://www.siteinspire.com/websites — website inspiration gallery; browse styles, industries and page compositions.
- https://dribbble.com/ — design shots and concepts; use for ideation, but validate interaction in real sites.
- https://www.wix.com/studio/inspiration — visual/interaction inspiration; inspect live examples.
- https://www.metalab.com/ — primary reference for premium brand/product storytelling and art direction.
- https://www.awwwards.com/ — award/gallery inspiration; use for motion and visual quality references.

These are not all component source libraries. The agent must identify exact visual patterns and translate them into original RenderJoy design.

---

## 4. Cross-reference component taxonomy for RenderJoy

This is a deduplicated research taxonomy. It combines the user's own roadmap and verified reference inventories. The agent should map it to existing RenderJoy components before building anything.

### A. Foundations and accessible primitives
Buttons, button groups, toggles, segmented controls, inputs, input groups, textareas, forms, labels, checkbox, radio group, switch, select, combobox, OTP, password reveal, slider, number stepper, date/time pickers, calendar, color picker, tags, rating, badge, avatar/avatar stack, progress, skeleton, spinner, separator, KBD, tooltip, popover, hover card, dropdown, context menu, command palette, dialog, alert dialog, drawer/sheet, accordion/collapsible, tabs, toggle group, menubar, navigation menu, breadcrumbs, pagination, stepper, sidebar, scroll area, toast, empty state.

### B. Application/data and dashboard patterns
Dashboard shells, section stat cards, charts, area/bar/line/pie/donut/radar/gauge/heatmap, sparkline, data table, sortable/reorderable table, filter bar, activity feed, timeline, changelog, kanban, gantt, tree view, roadmap, calendar, contribution graph, ticker, metric/status tiles, notification stack, analytics panel, command bar, inspector, resizable panel.

### C. AI and agent UI
Prompt composer, streaming message, chat, thinking loader/orb, reasoning/execution trace, agent plan, tool call card, approval card, inline diff, model selector, attachment preview, image generation, pixel image generation, AI autocomplete, structured output, citation/source card, voice chat/orb, run status, step player, tool permissions, retry/error state.

### D. Media and content
Image crop, zoom, lightbox, image comparison, reel/stories, video player, album cover, music player, audio trim, voice note, camera/media capture, photo stack, photo shuffle, swipe deck, photo headline, scroll zoom, blur collage, text cylinder, media gallery, card fan, curved video, avatar cluster, watch face, QR code, device frame.

### E. Gesture and physics interactions
Drag/swipe decks, elastic slider, physical knob, wheel picker, reaction arc, rubber-band select, scratch card, magnetic letters, pointer trails, image trail, particle reveal, tilt card, 3D globe, radial menu, spring button, pull-to-refresh, slide-to-confirm, resize frame, slingshot, pendulum, wheel, wake field, metaballs, hover reveal, page peel, drag reorder, infinite canvas.

### F. Text and typography
Typing, stagger, word reveal, line reveal, blur/focus reveal, cinematic text, split-flap, odometer, signature reveal, liquid headline, rainbow text, neon sign, glitch, 3D flip, word rotate, number ticker, text highlighter, text cylinder, photo headline, monospace/terminal text.

### G. WebGL, shaders and visual backgrounds
Logo flare, prism, wind tunnel, cloud sea, ink, slipstream, embers, beams, ASCII, dither, ferrofluid, fluid field, cymatics, pixel grid, caustics, thin film, topography, Jali, galaxy, eclipse, streaks, magma, warp, liquid gradient, code rain, voxel scenes, mesh gradients, grain gradients, liquid metal, fluted glass, halftone, aurora, light rays, ripple, noise, logo effects, image effects.

### H. Page sections and website blocks
Hero, feature grid, bento, testimonials, pricing, FAQ, CTA, waitlist, contact, newsletter, about, team, blog, case study, work/portfolio, showcase, integrations, logo cloud, footer, navbar, mega menu, login/auth, roadmap, changelog, stats, comparison, download and community sections.

### I. Sound and haptic effects
Actions, feedback, navigation, notifications, selection, movement, progress and system sounds. Include tap/click, confirm, reject, warning, error, success, notification, hover, focus, drag, drop, lift, snap, page transition, open/close, loading, progress, completion, boot, idle and sync. Create original audio assets or synthesis and an audition UI.

---

## 5. Reference prioritisation matrix

| Priority | Reference | Best use in RenderJoy | Do not use it for |
|---|---|---|---|
| P0 | Bencho | Live adjustable components, interactions, Sounds, Finds, Bench, individual details | Copying its source, sound assets, brand or page design |
| P0 | Planes | Premium live previews, shader/WebGL art direction, component exhibition | Reproducing its proprietary artwork/code |
| P0 | shadcn/ui | Registry/source installation, primitives, real app blocks | Treating basic shadcn components as RenderJoy's differentiator |
| P0 | Radix | Accessible behaviour, focus, keyboard semantics | Visual design inspiration |
| P0 | Floating UI | Collision-aware menus, popovers, tooltips, inspectors | Component visual styling |
| P1 | Scroll Shaders | WebGL shader quality and effect taxonomy | Reusing paid visuals/source without a compatible licence |
| P1 | React Bits | Live background/shape/texture/sound tools and export workflow | Replacing RenderJoy's visual identity |
| P1 | Tactile UI | Tactile hardware-like controls and rich blocks | Cloning exact Tactile visual style |
| P1 | Kibo UI | Media, editor, data, collaborative and block families | Blindly duplicating existing RenderJoy components |
| P1 | Magic UI | Animated text/background/effects catalog | A shallow clone of generic gradient effects |
| P1 | Mobbin | Real shipped product interaction patterns | Copying entire screens verbatim |
| P1 | Lapa Ninja | Page section/block composition | Source code or complete website copying |
| P1 | Footer Design | Footer patterns and variants | Copying a footer screenshot exactly |
| P1 | Refero | Design-style taxonomy/moodboards | Treating styles as components |
| P1 | Scrolltide | Novel scroll-driven and 3D motion components | Exact prompts/code without checking rights |
| P2 | Preline | Breadth check for conventional UI patterns | Implementing every generic component |
| P2 | Lucide | Consistent iconography | Primary RenderJoy logomark |
| P2 | CTA Gallery | CTA and conversion patterns | Fake metrics or dark patterns |
| P2 | Curated | Live site references by industry/style | Component APIs |
| P2 | Recent Design | Current design/motion inspiration | Code inventory |
| P2 | SiteInspire / Dribbble / Awwwards / Wix Studio | Visual exploration, art direction | Assuming shots are build-ready or accessible implementations |
| P2 | Contra / Divan Raj | Portfolio and motion presentation inspiration | Component source catalogue |
| VERIFY | Marked.dev | Developer-focused design reference | Inventing components without inspecting it |
| VERIFY | Stylemoth | Inspect to classify; add only verified findings | Assuming it is a specific UI kit |
| VERIFY | Try Clucky | Inspect to classify; add only verified findings | Assuming it is a component library |
| VERIFY | Best Designs on X post | Flow visual direction, if the post can be opened | Claiming the post was inspected if it is inaccessible |

---

## 6. How to research new component candidates

For each candidate, Antigravity must record:

1. **Reference URL and exact page/component name.**
2. **Observed behaviour:** pointer, click, drag, keyboard, scroll, audio, async state, etc.
3. **States:** idle, hover, focused, pressed, active, loading, success, error, disabled, empty, selected.
4. **API proposal:** props, controlled/uncontrolled state, callback contract and slots.
5. **Theme strategy:** identify which tokens/geometry/type/texture change across the 29 themes while preserving the same underlying behaviour.
6. **Light/Dark component variants:** both must remain scoped to the specimen.
7. **Accessibility:** semantics, keyboard, focus, screen reader, reduced motion, contrast and touch.
8. **Performance:** dependencies, layout/paint cost, animation scheduling, GPU context use and mobile fallback.
9. **License:** inspect source and assets if code is to be adapted.
10. **Novelty:** compare to RenderJoy catalogue and do not reimplement an existing item.
11. **Acceptance evidence:** tests, screenshot, browser interaction recording or manual checklist, fresh registry install.

### Research quality rule

Use official docs/live demos first. Use screenshot galleries for composition and behaviour inspiration only. If a site cannot be crawled or requires login, report that limitation and do not fabricate inventory details. Re-check mutable counts and product features before publishing.

---

## 7. Current known project context from user-supplied logs

The user's recent logs report:
- Component Studio and Theme Studio with 29 themes and 58 component variants.
- Shared FloatingToolbar, editorial sidebar, device frames and global appearance control.
- Motion Lab and Sound Lab.
- `/flow` with POC-derived node editor and clearly labelled simulated execution.
- Removed standalone Playground and standalone Canvas route; `InfinityCanvas` retained as a component.
- Registry, public registry output, `llms.txt`/`llms-full.txt` and tests.
- Recent reports ranged around 44 available components and 50 registry items.

These are user-provided execution summaries; they must be verified against current source before being treated as current facts.

---

## 8. Direct links — source directory

### Core component and interaction libraries
- [shadcn/ui](https://ui.shadcn.com/)
- [shadcn components](https://ui.shadcn.com/docs/components)
- [shadcn Dashboard 01](https://ui.shadcn.com/view/new-york-v4/dashboard-01)
- [Planes components](https://useplanes.com/components)
- [Planes Logo Flare](https://useplanes.com/components/logo-flare)
- [Marked.dev](https://marked.dev/)
- [Bencho](https://bencho.dev/)
- [Bencho About](https://bencho.dev/about)
- [Bencho Blocks](https://bencho.dev/blocks)
- [Bencho Sounds](https://bencho.dev/sounds)
- [Bencho Finds](https://bencho.dev/finds)
- [Bencho Bench](https://bencho.dev/bench)
- [Bencho Pricing](https://bencho.dev/pricing)
- [Radix Primitives](https://www.radix-ui.com/primitives/docs/components)
- [Kibo UI](https://www.kibo-ui.com/components/reel)
- [Magic UI](https://magicui.design/docs/components)
- [Tactile UI](https://tactileui.dev/)
- [React Bits Tools](https://reactbits.dev/tools)
- [Preline Tooltip](https://preline.co/docs/components/tooltip.html)
- [Lucide Icons](https://lucide.dev/icons/)
- [Floating UI](https://floating-ui.com/)
- [Floating UI React](https://floating-ui.com/docs/react)

### Visual/component/section inspiration
- [Stylemoth](https://stylemoth.com/)
- [Scrolltide Components](https://www.scrolltide.co/components)
- [Footer Design](https://www.footer.design/)
- [Try Clucky](https://tryclucky.com/)
- [CTA Gallery](https://www.cta.gallery/)
- [Mobbin Web UI Elements](https://mobbin.com/explore/web/ui-elements)
- [Refero Styles](https://refero.design/styles)
- [Scroll Shaders](https://scrollshaders.com/)
- [Scroll Shaders Components](https://scrollshaders.com/components)
- [Lapa Ninja Elements](https://www.lapa.ninja/elements/all/)
- [Curated](https://curated.design/)
- [Recent Design](https://recent.design/)
- [Best Designs on X](https://bestdesignsonx.com/)
- [Flow reference post supplied by user](https://bestdesignsonx.com/flohoeller/status/2125281041560564142)
- [Contra — Divan Raj Work](https://contra.com/divanrajoffl/work)
- [SiteInspire](https://www.siteinspire.com/websites)
- [Dribbble](https://dribbble.com/)
- [Wix Studio Inspiration](https://www.wix.com/studio/inspiration)
- [Metalab](https://www.metalab.com/)
- [Awwwards](https://www.awwwards.com/)

### Technical shader references
- [Shader backgrounds in React without Three.js — Ashish Gogula](https://www.ashishgogula.in/blogs/shader-backgrounds-in-react-without-three-js)
- [Scroll Shaders](https://scrollshaders.com/)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [MDN WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [GLSL specifications and references](https://registry.khronos.org/OpenGL/specs/gl/)

---

## 9. Research limitations and follow-up

- Bencho's homepage, About and Sounds information were available through official indexed search content; direct page opening returned cache misses in this research session. The user's screenshots of the footer, Bench and Sounds provide additional first-hand visual context.
- The exact current Bencho block count and sounds count can change. The official About index reported 186 blocks; its sound page index returned 82 samples. Re-check before using numbers in public copy.
- Marked.dev, Stylemoth and Try Clucky did not yield a reliable structured component inventory in the available search results. Their live sites must be opened and manually inspected before adding source-derived claims.
- The specified Best Designs on X Flow post did not return a reliable readable page in this search session. Do not claim to have inspected its content until a browser opens it.
- Mobbin and some inspiration galleries may require account access for complete screenshots. Respect login/paywall boundaries; use publicly visible material and the user's own screenshots.
- This file deliberately differentiates verified official inventories, user-supplied component lists and unverified research targets. Maintain that distinction in future revisions.
