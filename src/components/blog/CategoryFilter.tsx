import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  active: string
  onChange: (cat: string) => void
  categories: string[]
}

export default function CategoryFilter({ active, onChange, categories }: Props) {
  const barRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const observer = new IntersectionObserver(
      ([e]) => setStuck(e.intersectionRatio < 1),
      { threshold: [1], rootMargin: '-1px 0px 0px 0px' },
    )
    observer.observe(bar)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={barRef}
      className={cn(
        'sticky top-[4.5rem] z-30 overflow-x-auto border-b border-border bg-paper/95 backdrop-blur-md transition-shadow',
        stuck && 'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]',
      )}
    >
      <div className="container-x flex items-center gap-2 py-4">
        <span className="mr-2 shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Filter
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={cn(
              'cursor-target shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200',
              active === cat
                ? 'border-brand bg-brand text-forest'
                : 'border-border text-muted-foreground hover:border-brand/50 hover:text-foreground',
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
