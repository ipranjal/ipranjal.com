import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Architecture Review | Pranjal Pandey',
  description: 'Request a system and AI architecture review. A senior-level engagement to identify what will break as you scale before it becomes expensive.',
}

export default function RequestReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
