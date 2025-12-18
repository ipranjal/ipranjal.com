/**
 * Zod Validation Schemas for Personal Positioning Website
 * 
 * These schemas provide runtime validation for all content entities.
 * Use these to validate JSON content files at build time.
 * 
 * Generated from: specs/001-personal-website/data-model.md
 * Date: December 17, 2025
 */

import { z } from 'zod'

// ============================================================================
// Prohibited Language Validation
// ============================================================================

const PROHIBITED_WORDS = [
  'leverage',
  'synergy',
  'cutting-edge',
  'game-changer',
  'revolutionary',
  'disruptive',
  'best-in-class',
] as const

/**
 * Validates text does not contain prohibited marketing language
 */
function validateNoProhibitedLanguage(text: string): boolean {
  const lower = text.toLowerCase()
  return !PROHIBITED_WORDS.some(word => lower.includes(word))
}

// ============================================================================
// Section Content Schemas
// ============================================================================

/**
 * Call-to-Action button schema
 */
export const CTASchema = z.object({
  label: z.string().min(5).max(30),
  href: z.string().refine(val => val.startsWith('#') || val.startsWith('http'), {
    message: 'href must be anchor link (#section) or URL (http/https)',
  }),
  primary: z.boolean(),
  ariaLabel: z.string().min(10),
})

/**
 * Hero Section schema
 */
export const HeroSectionSchema = z.object({
  headline: z
    .string()
    .min(10)
    .max(120)
    .refine(validateNoProhibitedLanguage, {
      message: `Text contains prohibited language. Avoid: ${PROHIBITED_WORDS.join(', ')}`,
    }),
  subheadline: z.string().min(10).max(80),
  supportingLine: z.string().min(10).max(100),
  ctas: z.array(CTASchema).min(1).max(3).refine(
    ctas => ctas.filter(cta => cta.primary).length === 1,
    { message: 'Exactly one CTA must be marked as primary' }
  ),
})

/**
 * Expertise pillar schema
 */
export const PillarSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ID must be kebab-case'),
  title: z.string().min(10).max(50),
  description: z.string().min(30).max(120),
  points: z.array(z.string().min(20).max(150)).min(2).max(3),
})

/**
 * What I Do Section schema
 */
export const WhatIDoSectionSchema = z.object({
  heading: z.string().min(5).max(30),
  pillars: z.array(PillarSchema).length(4, 'Must have exactly 4 pillars (FR-006)'),
})

/**
 * How I Work Section schema
 */
export const HowIWorkSectionSchema = z.object({
  heading: z.string().min(5).max(30),
  intro: z.string().min(20).max(150).optional(),
  principles: z
    .array(z.string().min(30).max(150))
    .length(5, 'Must have exactly 5 principles (FR-008)')
    .refine(
      principles => principles.every(validateNoProhibitedLanguage),
      { message: `Text contains prohibited language. Avoid: ${PROHIBITED_WORDS.join(', ')}` }
    ),
})

/**
 * Client engagement schema
 */
export const EngagementSchema = z.object({
  name: z.string().min(5).max(50),
  description: z.string().min(10).max(100),
  url: z.string().url().nullable(),
})

/**
 * Selected Work Section schema
 */
export const SelectedWorkSectionSchema = z.object({
  heading: z.string().min(5).max(50),
  intro: z.string().min(20).max(150).optional(),
  workTypes: z.array(z.string().min(30).max(150)).min(3).max(7),
  engagements: z.array(EngagementSchema).min(3).max(10),
})

/**
 * Background Section schema
 */
export const BackgroundSectionSchema = z.object({
  heading: z.string().min(5).max(30),
  narrative: z
    .array(z.string().min(100).max(400))
    .min(2)
    .max(5)
    .refine(
      paragraphs => paragraphs.every(p => !p.match(/^[\s]*[-•*]/)),
      { message: 'Narrative must not use bullet points (FR-010: coherent story)' }
    ),
})

/**
 * Educational credential schema
 */
export const CredentialSchema = z.object({
  institution: z.string().min(10).max(100),
  degree: z.string().min(3).max(20),
  field: z.string().min(10).max(100),
  period: z.string().regex(/^\d{4}–(\d{4}|Present)$/, 'Period must be "YYYY–YYYY" or "YYYY–Present"'),
  focus: z.array(z.string().min(30).max(150)).min(2).max(4),
})

/**
 * Research & Education Section schema
 */
export const ResearchEducationSectionSchema = z.object({
  heading: z.string().min(5).max(40),
  intro: z.string().min(30).max(150).optional(),
  credentials: z.array(CredentialSchema).min(1).max(3),
})

/**
 * Qualification criteria group schema
 */
export const QualificationCriteriaSchema = z.object({
  heading: z.string().min(5).max(30),
  criteria: z.array(z.string().min(20).max(150)).min(2).max(6),
})

/**
 * Who Should Reach Out Section schema
 */
export const WhoShouldReachOutSectionSchema = z.object({
  heading: z.string().min(5).max(40),
  intro: z.string().min(20).max(150).optional(),
  goodFit: QualificationCriteriaSchema,
  notFit: QualificationCriteriaSchema,
})

/**
 * Contact method schema
 */
export const ContactMethodSchema = z.object({
  type: z.enum(['email', 'linkedin', 'twitter', 'github']),
  label: z.string().min(3).max(20),
  value: z.string().refine(
    val => val.includes('@') || val.startsWith('http'),
    { message: 'Value must be email address or URL' }
  ),
  primary: z.boolean(),
  ariaLabel: z.string().min(10),
})

/**
 * Contact Section schema
 */
export const ContactSectionSchema = z.object({
  heading: z.string().min(5).max(30),
  intro: z.string().min(20).max(150).optional(),
  methods: z
    .array(ContactMethodSchema)
    .min(1)
    .max(3)
    .refine(
      methods => methods.filter(m => m.primary).length === 1,
      { message: 'Exactly one method must be marked as primary' }
    )
    .refine(
      methods => methods.some(m => m.type === 'email'),
      { message: 'Must include email contact method (FR-013)' }
    )
    .refine(
      methods => methods.some(m => m.type === 'linkedin'),
      { message: 'Must include LinkedIn contact method (FR-013)' }
    ),
})

// ============================================================================
// Configuration Schemas
// ============================================================================

/**
 * Site author schema
 */
export const AuthorSchema = z.object({
  name: z.string().min(5).max(50),
  email: z.string().email(),
  linkedin: z.string().url(),
})

/**
 * SEO configuration schema
 */
export const SEOConfigSchema = z.object({
  keywords: z.array(z.string().min(5).max(30)).min(3).max(10),
  ogImage: z.string().optional(),
  twitterHandle: z.string().regex(/^@[a-zA-Z0-9_]+$/).optional(),
})

/**
 * Global site configuration schema
 */
export const SiteConfigSchema = z.object({
  name: z.string().min(5).max(50),
  title: z.string().min(20).max(100),
  description: z.string().min(50).max(300),
  url: z.string().url(),
  locale: z.string().regex(/^[a-z]{2}_[A-Z]{2}$/, 'Locale must be BCP 47 format (e.g., en_US)'),
  author: AuthorSchema,
  seo: SEOConfigSchema,
})

/**
 * Navigation item schema
 */
export const NavigationItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ID must be kebab-case'),
  label: z.string().min(5).max(40),
  href: z.string().startsWith('#'),
  order: z.number().int().min(1).max(8),
})

/**
 * Site navigation configuration schema
 */
export const NavigationConfigSchema = z.object({
  sections: z
    .array(NavigationItemSchema)
    .length(8, 'Must have exactly 8 navigation items (FR-001)')
    .refine(
      sections => {
        const orders = sections.map(s => s.order)
        return orders.length === new Set(orders).size
      },
      { message: 'Navigation order values must be unique' }
    )
    .refine(
      sections => {
        const ids = sections.map(s => s.id)
        return ids.length === new Set(ids).size
      },
      { message: 'Navigation IDs must be unique' }
    ),
})

/**
 * Event item schema
 */
export const EventItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, { message: 'ID must be kebab-case' }),
  title: z.string().min(10).max(100),
  date: z.string().min(5).max(50),
  location: z.string().min(3).max(100),
  description: z.string().min(20).max(300).optional(),
  active: z.boolean(),
  featured: z.boolean().optional(),
})

/**
 * Events Section schema
 */
export const EventsSectionSchema = z.object({
  events: z.array(EventItemSchema).min(0),
})

/**
 * Live Signal Section schema (optional, lightweight)
 * @deprecated Use EventsSectionSchema instead
 */
export const LiveSignalSectionSchema = z.object({
  heading: z.string().min(5).max(40).optional(),
  title: z.string().min(10).max(100),
  date: z.string().min(5).max(50),
  location: z.string().min(3).max(100),
  description: z.string().min(20).max(200).optional(),
  active: z.boolean(),
})

/**
 * Writing item schema
 */
export const WritingItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, { message: 'ID must be kebab-case' }),
  title: z.string().min(10).max(80),
  premise: z.string().min(20).max(150),
  tag: z.enum(['Architecture', 'AI', 'Systems', 'Leadership', 'Engineering']).optional(),
  date: z.string().min(3).max(50).optional(),
  content: z.string().optional(),
  url: z.string().url().optional().or(z.null()),
})

/**
 * Writing & Notes Section schema
 */
export const WritingSectionSchema = z.object({
  heading: z.string().min(5).max(40),
  intro: z.string().min(20).max(150).optional(),
  items: z.array(WritingItemSchema).min(3).max(5),
})

// ============================================================================
// Complete Page Data Schema
// ============================================================================

/**
 * Complete page data schema (all sections)
 */
export const PageDataSchema = z.object({
  hero: HeroSectionSchema,
  liveSignal: LiveSignalSectionSchema.optional(),
  whatIDo: WhatIDoSectionSchema,
  howIWork: HowIWorkSectionSchema,
  writing: WritingSectionSchema,
  selectedWork: SelectedWorkSectionSchema,
  background: BackgroundSectionSchema,
  researchEducation: ResearchEducationSectionSchema,
  whoShouldReachOut: WhoShouldReachOutSectionSchema,
  contact: ContactSectionSchema,
})

// ============================================================================
// Validation Helper Functions
// ============================================================================

/**
 * Validates JSON content file against schema
 * @param schema Zod schema to validate against
 * @param data Parsed JSON data
 * @returns Validation result with typed data or error
 */
export function validateContent<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data)
  
  if (result.success) {
    return { success: true, data: result.data }
  } else {
    const errorMessages = result.error.issues.map(
      err => `${err.path.join('.')}: ${err.message}`
    ).join('\n')
    
    return { success: false, error: errorMessages }
  }
}

/**
 * Validates all section content files
 * Throws error with detailed messages if validation fails
 */
export function validateAllSections(pageData: unknown): void {
  const result = validateContent(PageDataSchema, pageData)
  
  if (!result.success) {
    throw new Error(`Content validation failed:\n${result.error}`)
  }
}

/**
 * Checks for prohibited language in all text content
 * Returns array of violations or empty array if clean
 */
export function checkProhibitedLanguage(text: string | string[]): string[] {
  const texts = Array.isArray(text) ? text : [text]
  const violations: string[] = []
  
  texts.forEach(t => {
    const lower = t.toLowerCase()
    PROHIBITED_WORDS.forEach(word => {
      if (lower.includes(word)) {
        violations.push(`Found prohibited word "${word}" in: "${t.substring(0, 50)}..."`)
      }
    })
  })
  
  return violations
}
