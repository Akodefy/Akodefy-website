import { useEffect, useRef, useState } from 'react'
import { ChromaGrid, CurvedLoop } from '@/components/rb'
import { gsap, useGSAP } from '@/lib/gsap'
import { about } from '@/content/site'

// Built from the approach statements already on the site, so it adds no new claims.
const text = about.checks.join('   /   ')

/**
 * Team photos live in public/assets/team/ (4:5 portrait, 1200x1500 WebP).
 * Add a name and role here when you have them; leave them empty to show photos only.
 * Entries whose image file does not exist yet are skipped automatically.
 */
const TEAM = [
  { image: '/assets/team/team-1.webp', name: '', role: '' },
  { image: '/assets/team/team-2.webp', name: '', role: '' },
  { image: '/assets/team/team-3.webp', name: '', role: '' },
  { image: '/assets/team/team-4.webp', name: '', role: '' },
]

/** Resolves to the subset of image URLs that actually load. null while checking. */
function useAvailable(srcs: string[]) {
  const [ok, setOk] = useState<string[] | null>(null)
  useEffect(() => {
    let live = true
    Promise.all(
      srcs.map(
        (src) =>
          new Promise<string | null>((resolve) => {
            const img = new Image()
            img.onload = () => resolve(src)
            img.onerror = () => resolve(null)
            img.src = src
          }),
      ),
    ).then((found) => {
      if (live) setOk(found.filter((s): s is string => Boolean(s)))
    })
    return () => {
      live = false
    }
  }, [srcs])
  return ok
}

const SRCS = TEAM.map((t) => t.image)

export default function CurvedLoopSection() {
  const root = useRef<HTMLElement>(null)
  const photos = useAvailable(SRCS)
  const [small, setSmall] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setSmall(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useGSAP(
    () => {
      gsap.from('.team-grid', {
        y: 70,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
      })
    },
    { scope: root },
  )

  const items = (photos ?? [])
    .slice(0, small ? 2 : 4)
    .map((src) => {
      const member = TEAM.find((t) => t.image === src)
      return {
        image: src,
        title: member?.name ?? '',
        subtitle: member?.role ?? '',
        borderColor: '#19C46B',
        gradient: 'linear-gradient(160deg, #19C46B 0%, #072A1E 85%)',
      }
    })

  return (
    <section ref={root} aria-label="Our team and how we work" className="overflow-hidden bg-forest-2 text-white">
      <div className="grid md:min-h-svh md:grid-cols-2">
        {/* Left half: team photos, revealed in colour by a spotlight that follows the pointer */}
        <div className="flex items-center justify-center px-6 py-20 md:py-16">
          <div className="team-grid w-full max-w-[40rem]">
            {items.length > 0 ? (
              <ChromaGrid key={items.length} items={items} columns={small ? 1 : 2} radius={300} damping={0.45} fadeOut={0.6} />
            ) : (
              <div aria-hidden className="pattern-rings mx-auto h-[26rem] w-[20rem] rounded-[2rem] text-white" />
            )}
          </div>
        </div>

        {/* Right half: the curved text loop, faded at both edges */}
        <div className="flex items-center overflow-hidden pb-16 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:pb-0">
          <div className="w-full">
            <CurvedLoop marqueeText={text} speed={2} curveAmount={300} direction="left" interactive />
          </div>
        </div>
      </div>
    </section>
  )
}