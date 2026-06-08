# MEX Design Guidelines

## Color Palette
- Primary: Deep navy blue (#0F172A) — conveys trust and professionalism
- Accent: Electric indigo (#6366F1) — modern, tech-forward
- Surface: Slate gray (#1E293B) for cards and panels
- Background: Near-black (#0A0F1E) for the overall app shell
- Text: Off-white (#F1F5F9) for primary text, muted gray (#94A3B8) for secondary
- Success: Emerald (#10B981)
- Warning: Amber (#F59E0B)
- Destructive: Rose (#F43F5E)

## Typography
- Font family: Inter (sans-serif) — clean and highly legible
- Headings: Bold, tight letter-spacing
- Body: Regular weight, comfortable line-height (1.6)
- Code/Transcript: Monospace font (JetBrains Mono or system mono) for transcript text

## Elevation & Depth
- Use subtle dark gradients and layered surface colors to create depth
- Cards: 1px border with low-opacity white (border-white/10) on dark backgrounds
- Shadows: Soft, diffused shadows (not harsh drop shadows)
- Glass-morphism accents where appropriate (frosted panels for modals/overlays)

## Components
- Buttons: Rounded corners (rounded-md), solid fills for primary actions, ghost variants for secondary
- Inputs: Dark backgrounds with visible focus rings in accent color
- Tables: Striped rows with subtle hover states
- Progress indicators: Animated indigo progress bars for upload/processing states
- Sidebar: Collapsible dark sidebar with icon + label navigation items
- Badges: Compact, color-coded status badges (processing, completed, failed)

## Layout
- Admin dashboard layout with collapsible sidebar
- Centered content max-width for readability
- Responsive — mobile-first but optimized for desktop productivity use

## Motion & Animation
- Subtle fade-in for page transitions
- Smooth progress animations for upload and processing states
- Minimal animation — only where it adds clarity, never decorative