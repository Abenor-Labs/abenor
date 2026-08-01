import type { ReactNode } from 'react'
import { ACT_BY_ID, type ActId } from '@/lib/motion/acts'

/**
 * A DOM overlay for one act.
 *
 * Height comes from the act definition, so the scroll track the camera runs
 * along and the space the copy occupies can never drift apart. z-10 keeps
 * every overlay above the fixed canvas.
 */
export function ActSection({
  id,
  children,
  className = '',
  align = 'end',
}: {
  id: ActId
  children: ReactNode
  className?: string
  align?: 'start' | 'center' | 'end'
}) {
  const act = ACT_BY_ID[id]
  const justify =
    align === 'center' ? 'justify-center' : align === 'start' ? 'justify-start' : 'justify-end'

  return (
    <section
      id={id}
      data-act={id}
      style={{ minHeight: `${act.vh}vh` }}
      /* scroll-mt clears the fixed header when a nav link jumps here */
      className={`relative z-10 flex scroll-mt-24 flex-col ${justify} ${className}`}
    >
      {children}
    </section>
  )
}
