'use client'

import { useState, FormEvent, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import Script from 'next/script'

function RequestReviewForm() {
  const searchParams = useSearchParams()
  const [reviewType, setReviewType] = useState<'architecture' | 'ai-security'>('architecture')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [turnstileLoaded, setTurnstileLoaded] = useState(false)
  const turnstileWidgetId = useRef<string | null>(null)
  
  useEffect(() => {
    // Get review type from URL parameter
    const type = searchParams.get('type')
    if (type === 'ai-security') {
      setReviewType('ai-security')
    } else {
      setReviewType('architecture')
    }
  }, [searchParams])
  
  useEffect(() => {
    // Initialize Turnstile when script loads
    const initTurnstile = () => {
      if ((window as any).turnstile && !turnstileWidgetId.current) {
        const widgetId = (window as any).turnstile.render('#turnstile-widget', {
          sitekey: '0x4AAAAAACHv5aA-CgYKT_E2',
          theme: 'dark',
          appearance: 'interaction-only', // Managed mode
          callback: function() {
            setTurnstileLoaded(true)
          }
        })
        turnstileWidgetId.current = widgetId
      }
    }
    
    // Check if script is already loaded
    if ((window as any).turnstile) {
      initTurnstile()
    } else {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if ((window as any).turnstile) {
          initTurnstile()
          clearInterval(checkInterval)
        }
      }, 100)
      
      return () => clearInterval(checkInterval)
    }
  }, [])
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)
    
    const formData = new FormData(e.currentTarget)
    
    // Get Turnstile token - try both methods
    let turnstileToken = (window as any).turnstile?.getResponse(turnstileWidgetId.current)
    
    if (!turnstileToken) {
      // Fallback: check if token is in hidden input
      const turnstileInput = document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement
      turnstileToken = turnstileInput?.value
    }
    
    if (!turnstileToken) {
      setMessage({ type: 'error', text: 'Please complete the security verification' })
      setIsSubmitting(false)
      return
    }
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      'role-company': formData.get('role-company'),
      stage: formData.get('stage'),
      'team-size': formData.get('team-size'),
      situation: formData.get('situation'),
      concerns: formData.get('concerns'),
      'review-type': formData.get('review-type'),
      website: formData.get('website'), // honeypot
      'cf-turnstile-response': turnstileToken
    }
    
    try {
      const response = await fetch('https://form.ipranjal.com/submit-review-request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Redirect to thank you page with review type
        window.location.href = `/thank-you?type=${reviewType}`
      } else {
        setMessage({ 
          type: 'error', 
          text: result.errors?.join(', ') || result.message 
        })
        // Reset Turnstile on error
        if ((window as any).turnstile && turnstileWidgetId.current) {
          (window as any).turnstile.reset(turnstileWidgetId.current)
        }
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to submit request. Please try again.' 
      })
      // Reset Turnstile on error
      if ((window as any).turnstile && turnstileWidgetId.current) {
        (window as any).turnstile.reset(turnstileWidgetId.current)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Cloudflare Turnstile Script */}
      <Script 
        src="https://challenges.cloudflare.com/turnstile/v0/api.js" 
        strategy="lazyOnload"
      />
      
      {/* Form Section */}
      <Section width='wide' id="form" className="!pt-16 !pb-20">
        <Heading level={1} className="mb-3 text-4xl md:text-5xl text-center">
          {reviewType === 'ai-security' 
            ? 'Request an AI Security & Compliance Review'
            : 'Request a System & AI Architecture Review'
          }
        </Heading>
        
        <div className="flex justify-center mb-3">
          <div className="section-divider"></div>
        </div>
        
        <p className="text-lg text-muted text-center mb-10 max-w-2xl mx-auto">
          The first step is a short exploratory call to confirm fit.<br />
          If it&apos;s not a good match, I&apos;ll say so directly.
        </p>
        
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-surface/30 border border-border rounded-lg p-8">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              {message.text}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Hidden field for review type */}
            <input type="hidden" name="review-type" value={reviewType} />
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground"
              />
            </div>
            
            <div>
              <label htmlFor="role-company" className="block text-sm font-medium text-foreground mb-2">
                Role & Company *
              </label>
              <input
                type="text"
                id="role-company"
                name="role-company"
                required
                placeholder="e.g., CTO at TechCorp"
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground"
              />
            </div>
            
            <div>
              <label htmlFor="stage" className="block text-sm font-medium text-foreground mb-2">
                Company Stage *
              </label>
              <select
                id="stage"
                name="stage"
                required
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground appearance-none cursor-pointer"
              >
                <option value="">Select stage...</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="series-b-plus">Series B+</option>
                <option value="internal-team">Internal Product Team</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="team-size" className="block text-sm font-medium text-foreground mb-2">
                Team Size *
              </label>
              <input
                type="text"
                id="team-size"
                name="team-size"
                required
                placeholder="e.g., 8-10 people"
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground"
              />
            </div>
            
            <div>
              <label htmlFor="situation" className="block text-sm font-medium text-foreground mb-2">
                What best describes your situation? *
              </label>
              <select
                id="situation"
                name="situation"
                required
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground appearance-none cursor-pointer"
              >
                <option value="">Select...</option>
                <option value="architecture-slowing">Architecture is slowing execution</option>
                <option value="ai-not-production">AI integration not production-ready</option>
                <option value="scaling-concerns">Scaling concerns</option>
                <option value="ai-security-risks">AI security or misuse risks</option>
                <option value="compliance-requirements">Compliance or regulatory requirements</option>
                <option value="prompt-injection-concerns">Prompt injection or data leakage concerns</option>
                <option value="exploring-proactively">Exploring proactively</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="concerns" className="block text-sm font-medium text-foreground mb-2">
                Optional: What&apos;s currently worrying you about your system?
              </label>
              <textarea
                id="concerns"
                name="concerns"
                rows={4}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground resize-none"
                placeholder="Share any specific concerns or challenges..."
              />
            </div>
            
            {/* Honeypot field - hidden from humans, visible to bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            
            {/* Cloudflare Turnstile */}
            <div className="flex justify-center">
              <div id="turnstile-widget"></div>
            </div>
            
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-accent text-background font-medium rounded-lg hover:bg-accent-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
          
          <p className="text-center text-sm text-muted/75 mt-6">
            I&apos;ll respond within 48 hours to discuss your specific needs.
          </p>
        </div>
      </Section>
    </>
  )
}

export default function RequestReview() {
  return (
    <Suspense fallback={
      <Section width='wide' id="form" className="!pt-16 !pb-20">
        <Heading level={1} className="mb-3 text-4xl md:text-5xl text-center">
          Request a Review
        </Heading>
        <div className="flex justify-center mb-3">
          <div className="section-divider"></div>
        </div>
        <p className="text-lg text-muted text-center mb-10">Loading form...</p>
      </Section>
    }>
      <RequestReviewForm />
    </Suspense>
  )
}
