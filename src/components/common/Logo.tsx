import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

// Logo image — white wordmark + green icon on transparent background.
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Akodefy home"
      className={cn('cursor-target -ml-3 inline-block', className)}
    >
      <img
        src="/assets/logo/logo.webp"
        alt="Akodefy"
        className="h-9 w-auto object-contain md:h-10"
        draggable={false}
      />
    </Link>
  )
}
