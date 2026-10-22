import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from './icons'
import { cn } from '@/lib/utils'

const variants = {
  brand: { pill: 'bg-brand text-forest', arrow: 'bg-forest text-brand' },
  ghost: { pill: 'bg-white/10 text-white ring-1 ring-white/25 backdrop-blur', arrow: 'bg-white text-forest' },
  dark: { pill: 'bg-forest text-white', arrow: 'bg-brand text-forest' },
} as const

export default function ButtonLink({
  to,
  children,
  variant = 'brand',
  className,
}: {
  to: string
  children: ReactNode
  variant?: keyof typeof variants
  className?: string
}) {
  const v = variants[variant]
  return (
    <Link
      to={to}
      className={cn(
        'cursor-target group inline-flex items-center gap-4 rounded-full py-1.5 pl-7 pr-1.5 text-[0.95rem] font-medium',
        v.pill,
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          'grid size-11 place-items-center rounded-full transition-transform duration-500 ease-out group-hover:rotate-45',
          v.arrow,
        )}
      >
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  )
}
