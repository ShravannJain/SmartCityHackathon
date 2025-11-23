# Smart City Hackathon Platform - Design Guidelines

## Design Approach
**Selected System:** Material Design with Modern Dashboard Patterns
**Justification:** Data-heavy productivity application requiring clear information hierarchy, robust component patterns, and efficient data presentation. Reference: Linear (clean data tables), Notion (flexible layouts), Asana (project management patterns).

## Core Design Principles
1. **Information Clarity:** Data visibility and scannable layouts prioritized
2. **Workflow Efficiency:** Minimize clicks between related actions
3. **Status Transparency:** Clear visual indicators for submission states, scores, and awards
4. **Hierarchical Navigation:** Multi-level structure for complex data relationships

## Typography System
- **Primary Font:** Inter via Google Fonts (clean, professional, excellent for data)
- **Headings:** 
  - H1: text-3xl font-bold (Dashboard titles)
  - H2: text-2xl font-semibold (Section headers)
  - H3: text-xl font-medium (Card titles)
- **Body:** text-base (Data tables, descriptions)
- **Labels:** text-sm font-medium uppercase tracking-wide (Form labels, badges)
- **Captions:** text-xs (Metadata, timestamps)

## Layout System
**Spacing Units:** Tailwind 2, 4, 6, 8, 12, 16 (e.g., p-4, gap-6, mb-8)
- Consistent card padding: p-6
- Section spacing: space-y-8
- Grid gaps: gap-6
- Form spacing: space-y-4

**Container Structure:**
- Dashboard Layout: Sidebar (w-64) + Main Content (flex-1)
- Content max-width: max-w-7xl mx-auto
- Card-based sections with rounded-lg borders

## Component Library

### Navigation
**Sidebar Navigation:**
- Fixed left sidebar with logo at top
- Navigation items with icons (Home, Teams, Companies, Problems, Judges, Submissions, Analytics)
- Active state with subtle background highlight
- Collapsible on mobile (hamburger menu)

**Top Bar:**
- Search bar (prominent, centered or right-aligned)
- User profile dropdown (right corner)
- Notification bell icon
- Breadcrumb navigation below for context

### Data Display Components

**Data Tables:**
- Striped rows for readability
- Sortable column headers with arrow indicators
- Sticky header on scroll
- Row actions (View, Edit, Delete) as icon buttons on hover
- Pagination controls at bottom
- Rows per page selector
- Empty state with illustration and CTA

**Statistics Cards:**
- Grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Each card: metric value (text-3xl font-bold), label (text-sm), trend indicator (up/down arrow with percentage)
- Icon in top-right corner representing metric type

**Score Display:**
- Horizontal progress bars for innovation/feasibility scores
- Total score as large number with maximum in smaller text (e.g., "85/100")
- Visual score ranges: 0-40 (needs improvement), 41-70 (good), 71-100 (excellent)

### Form Components
**Input Fields:**
- Label above input
- Border with focus ring on interaction
- Helper text below when needed
- Error states with red accent and message
- Consistent height (h-10 for inputs, h-32 for textareas)

**Dropdowns/Select:**
- Custom styled select with chevron icon
- Multi-select with tag display for judges/teams
- Search within dropdown for long lists

**Submission Form:**
- Step indicator at top (Team → Problem → Solution → Submit)
- File upload area with drag-and-drop
- Preview of selected problem statement
- Character counters for text fields

### Cards & Panels

**Team/Company Cards:**
- Image or icon placeholder at top
- Title (team/company name) as h3
- Key metrics in row (submissions count, average score)
- Status badge (Active, Winner, Collaboration Offer)
- Action buttons at bottom (View Details, Edit)

**Problem Statement Card:**
- Company logo/name at top
- Problem title as bold text
- Difficulty/category tag
- Team count indicator ("12 teams working on this")
- View Details button

**Submission Card:**
- Team name with small avatar
- Problem title linked
- Score breakdown (Innovation: X, Feasibility: Y, Total: Z)
- Judge count ("Evaluated by 3 judges")
- Award badge if applicable
- Expandable section for solution details

### Modals & Overlays
- Centered modal with backdrop blur
- Header with title and close button
- Content area with scrollable body
- Footer with action buttons (Cancel, Confirm/Submit)
- Used for: Quick edits, confirmations, detailed views

### Analytics Dashboard
**Charts Integration:**
- Bar charts for company comparison (teams per problem)
- Pie chart for award distribution
- Line chart for submission timeline
- Leaderboard table with rank, team name, score columns
- Filter controls above charts (date range, company, category)

**Query Result Displays:**
- Each query as dedicated section/card
- Results in appropriate format (table, list, chart)
- Export to CSV button
- Real-time update indicator

### Badges & Status Indicators
- Award type badges (rounded-full px-3 py-1 text-xs): Gold, Silver, Bronze, Collaboration Offer
- Status badges: Submitted, Under Review, Evaluated, Winner
- Score badges with ranges
- Judge assignment count badges

### Empty States
- Centered icon (large, muted)
- "No [items] yet" heading
- Helpful description text
- Primary CTA button ("Create Your First Team", "Add Problem Statement")

## Images
**Where to Use:**
- Team/Company profile placeholders (circular avatars, 64x64 or 128x128)
- Company logos in problem cards (rectangular, 120x40)
- Empty state illustrations (centered, 200x200)
- Hero section on landing/home NOT needed - Dashboard starts with statistics overview

**No Hero Image:** This is a dashboard application, not a marketing page. Lead with data and functionality immediately.

## Animations
Minimal, functional only:
- Smooth transitions on hover states (transition-all duration-200)
- Fade-in for modal appearances
- Skeleton loaders for data fetching
- NO decorative scroll animations

## Responsive Behavior
- Mobile: Stacked single column, collapsed sidebar
- Tablet: 2-column grids where appropriate
- Desktop: Full multi-column layouts, expanded sidebar
- Data tables: Horizontal scroll on mobile with sticky first column

## Accessibility
- Consistent focus indicators (ring-2 ring-offset-2)
- ARIA labels for icon buttons
- Keyboard navigation for all interactive elements
- High contrast between text and backgrounds
- Form validation with clear error messaging