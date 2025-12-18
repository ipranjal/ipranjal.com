/**
 * TypeScript Type Definitions for Personal Positioning Website
 * 
 * These types define the structure of all content entities.
 * Use these for type-safe content loading and component props.
 * 
 * Generated from: specs/001-personal-website/data-model.md
 * Date: December 17, 2025
 */

// ============================================================================
// Section Content Types
// ============================================================================

/**
 * Call-to-Action button configuration
 */
export interface CTA {
  /** Button label text (5-30 characters) */
  label: string
  /** Destination URL or anchor link */
  href: string
  /** Whether this is the primary CTA (exactly one must be true) */
  primary: boolean
  /** Accessibility label for screen readers */
  ariaLabel: string
}

/**
 * Hero Section - Primary positioning statement
 */
export interface HeroSection {
  /** Main headline (10-120 characters) */
  headline: string
  /** Supporting subheadline (10-80 characters) */
  subheadline: string
  /** Additional supporting line (10-100 characters) */
  supportingLine: string
  /** Call-to-action buttons (1-3 items) */
  ctas: CTA[]
}

/**
 * Expertise pillar in What I Do section
 */
export interface Pillar {
  /** Unique identifier (kebab-case) */
  id: string
  /** Pillar title (10-50 characters) */
  title: string
  /** Brief description (30-120 characters) */
  description: string
  /** Supporting points (2-3 items, 20-150 characters each) */
  points: string[]
}

/**
 * What I Do Section - Four pillars of expertise
 */
export interface WhatIDoSection {
  /** Section heading (5-30 characters) */
  heading: string
  /** Exactly 4 expertise pillars */
  pillars: [Pillar, Pillar, Pillar, Pillar]
}

/**
 * How I Work Section - Process and engagement approach
 */
export interface HowIWorkSection {
  /** Section heading (5-30 characters) */
  heading: string
  /** Optional introductory text (20-150 characters) */
  intro?: string
  /** Exactly 5 working principles (30-150 characters each) */
  principles: [string, string, string, string, string]
}

/**
 * Client engagement entry
 */
export interface Engagement {
  /** Client/company name (5-50 characters) */
  name: string
  /** Brief description of engagement (10-100 characters) */
  description: string
  /** Optional URL to public reference */
  url: string | null
}

/**
 * Selected Work Section - Representative engagements
 */
export interface SelectedWorkSection {
  /** Section heading (5-50 characters) */
  heading: string
  /** Optional introductory text (20-150 characters) */
  intro?: string
  /** Types of work performed (3-7 items, 30-150 characters each) */
  workTypes: string[]
  /** Representative client engagements (3-10 items) */
  engagements: Engagement[]
}

/**
 * Background Section - Coherent narrative (not timeline)
 */
export interface BackgroundSection {
  /** Section heading (5-30 characters) */
  heading: string
  /** Narrative paragraphs (2-5 paragraphs, 100-400 characters each) */
  narrative: string[]
}

/**
 * Educational credential or research position
 */
export interface Credential {
  /** Institution name (10-100 characters) */
  institution: string
  /** Degree type (3-20 characters, e.g., "PhD", "MTech") */
  degree: string
  /** Field of study (10-100 characters) */
  field: string
  /** Time period (format: "YYYY–YYYY" or "YYYY–Present") */
  period: string
  /** Focus areas (2-4 items, 30-150 characters each) */
  focus: string[]
}

/**
 * Research & Education Section - Academic credentials
 */
export interface ResearchEducationSection {
  /** Section heading (5-40 characters) */
  heading: string
  /** Optional introductory text (30-150 characters) */
  intro?: string
  /** Credentials (1-3 items) */
  credentials: Credential[]
}

/**
 * Qualification criteria group
 */
export interface QualificationCriteria {
  /** Criteria group heading (5-30 characters) */
  heading: string
  /** Individual criteria items (3-6 for good fit, 2-5 for not fit, 20-150 characters each) */
  criteria: string[]
}

/**
 * Who Should Reach Out Section - Self-qualification filter
 */
export interface WhoShouldReachOutSection {
  /** Section heading (5-40 characters) */
  heading: string
  /** Optional introductory text (20-150 characters) */
  intro?: string
  /** Good fit criteria */
  goodFit: QualificationCriteria
  /** Not a fit criteria */
  notFit: QualificationCriteria
}

/**
 * Contact method configuration
 */
export interface ContactMethod {
  /** Contact type */
  type: 'email' | 'linkedin' | 'twitter' | 'github'
  /** Display label (3-20 characters) */
  label: string
  /** Email address or URL */
  value: string
  /** Whether this is the primary contact method (exactly one must be true) */
  primary: boolean
  /** Accessibility label for screen readers */
  ariaLabel: string
}

/**
 * Contact Section - Contact methods
 */
export interface ContactSection {
  /** Section heading (5-30 characters) */
  heading: string
  /** Optional introductory text (20-150 characters) */
  intro?: string
  /** Contact methods (1-3 items, must include email and LinkedIn per FR-013) */
  methods: ContactMethod[]
}

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Site author information
 */
export interface Author {
  /** Author name (5-50 characters) */
  name: string
  /** Contact email address */
  email: string
  /** LinkedIn profile URL */
  linkedin: string
}

/**
 * SEO configuration
 */
export interface SEOConfig {
  /** Search keywords (3-10 items, 5-30 characters each) */
  keywords: string[]
  /** Open Graph image path */
  ogImage?: string
  /** Twitter handle (including @) */
  twitterHandle?: string
}

/**
 * Global site configuration
 */
export interface SiteConfig {
  /** Site name (5-50 characters) */
  name: string
  /** Page title for <title> tag (20-100 characters) */
  title: string
  /** Meta description (50-300 characters) */
  description: string
  /** Site URL */
  url: string
  /** Locale code (BCP 47 language tag, e.g., "en_US") */
  locale: string
  /** Author information */
  author: Author
  /** SEO configuration */
  seo: SEOConfig
}

/**
 * Navigation item configuration
 */
export interface NavigationItem {
  /** Unique section identifier (kebab-case) */
  id: string
  /** Display label (5-40 characters) */
  label: string
  /** Anchor link (must match section id) */
  href: string
  /** Display order (1-8) */
  order: number
}

/**
 * Site navigation configuration
 */
export interface NavigationConfig {
  /** Exactly 8 section navigation items (per FR-001) */
  sections: [
    NavigationItem,
    NavigationItem,
    NavigationItem,
    NavigationItem,
    NavigationItem,
    NavigationItem,
    NavigationItem,
    NavigationItem
  ]
}

/**
 * Event item
 */
export interface EventItem {
  /** Unique identifier (kebab-case) */
  id: string
  /** Event title */
  title: string
  /** Event date (e.g., "December 18, 2025") */
  date: string
  /** Event location (e.g., "IIT Jodhpur") */
  location: string
  /** Brief event description */
  description?: string
  /** Whether this is an active/upcoming event */
  active: boolean
  /** Whether to feature this event (for LiveSignal) */
  featured?: boolean
}

/**
 * Events Section - Speaking engagements and conferences
 */
export interface EventsSection {
  /** List of events */
  events: EventItem[]
}

/**
 * Live Signal Section - Derived from latest featured event
 * @deprecated Use EventsSection instead
 */
export interface LiveSignalSection {
  /** Section heading (optional, can be omitted for minimal display) */
  heading?: string
  /** Event title */
  title: string
  /** Event date (e.g., "December 18, 2025") */
  date: string
  /** Event location (e.g., "IIT Jodhpur") */
  location: string
  /** Brief event description */
  description?: string
  /** Whether to show this section (can be toggled off when no events) */
  active: boolean
}

/**
 * Writing/Essay item
 */
export interface WritingItem {
  /** Unique identifier (kebab-case) */
  id: string
  /** Article/essay title (10-80 characters) */
  title: string
  /** One-line premise (20-150 characters) */
  premise: string
  /** Optional tag for categorization */
  tag?: 'Architecture' | 'AI' | 'Systems' | 'Leadership' | 'Engineering'
  /** Publication date (e.g., "December 2025") */
  date?: string
  /** Full article content (markdown) */
  content?: string
  /** URL to the full article (can be external or internal) */
  url?: string
}

/**
 * Writing & Notes Section
 */
export interface WritingSection {
  /** Section heading (5-40 characters) */
  heading: string
  /** Optional intro text (20-150 characters) */
  intro?: string
  /** Array of 3-5 writing pieces (thinking artifacts, not tutorials) */
  items: WritingItem[]
}

// ============================================================================
// Component Prop Types
// ============================================================================

/**
 * Props for section wrapper component
 */
export interface SectionProps {
  /** Section ID for anchor links */
  id: string
  /** Aria label for accessibility */
  ariaLabel?: string
  /** Child components */
  children: React.ReactNode
  /** Optional CSS classes */
  className?: string
}

/**
 * Props for heading component
 */
export interface HeadingProps {
  /** Heading level (h1-h6) */
  level: 1 | 2 | 3 | 4 | 5 | 6
  /** Heading text */
  children: React.ReactNode
  /** Optional CSS classes */
  className?: string
  /** Optional ID for anchor links */
  id?: string
}

/**
 * Props for button/CTA component
 */
export interface ButtonProps {
  /** Button label */
  children: React.ReactNode
  /** Destination URL or anchor link */
  href: string
  /** Whether this is a primary CTA */
  primary?: boolean
  /** Accessibility label */
  ariaLabel?: string
  /** Optional CSS classes */
  className?: string
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Content loading result with error handling
 */
export type ContentResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

/**
 * Section identifiers (for type safety)
 */
export type SectionId =
  | 'hero'
  | 'events'
  | 'live-signal'
  | 'what-i-do'
  | 'how-i-work'
  | 'writing'
  | 'selected-work'
  | 'background'
  | 'research-education'
  | 'who-should-reach-out'
  | 'contact'

/**
 * Complete page data structure
 */
export interface PageData {
  hero: HeroSection
  liveSignal?: LiveSignalSection
  whatIDo: WhatIDoSection
  howIWork: HowIWorkSection
  writing: WritingSection
  selectedWork: SelectedWorkSection
  background: BackgroundSection
  researchEducation: ResearchEducationSection
  whoShouldReachOut: WhoShouldReachOutSection
  contact: ContactSection
}
