import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

// Wordmark placeholder. Swap for the real SVG logo when available.
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Akodefy home"
      className={cn('cursor-target font-display text-[1.7rem] font-semibold leading-none tracking-[-0.05em]', className)}
    >
      akodefy
    </Link>
  )
}
