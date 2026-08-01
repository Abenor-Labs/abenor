import { ActSection } from '@/components/ui/ActSection'
import type { ActId } from '@/lib/motion/acts'

/**
 * Holds an act's scroll window open before its scene exists.
 *
 * This is not decoration: the camera timeline is expressed as fractions of
 * total page height, so if an act contributed no height the whole move would
 * compress and every other act would mistime. These placeholders keep the
 * film in sync while acts 04 and 05 are built.
 */
export function ActPlaceholder({
  id,
  index,
  title,
  note,
}: {
  id: ActId
  index: string
  title: string
  note: string
}) {
  return (
    <ActSection id={id} align="center">
      <div className="wrap">
        <div className="border-rule flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten font-medium">{index}</b> ] {title}
          </span>
        </div>
        <p className="text-ink-3 mt-6 max-w-[40ch] font-mono text-[11px] tracking-[0.16em] uppercase">
          {note}
        </p>
      </div>
    </ActSection>
  )
}
