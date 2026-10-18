// Раздел «Слово героям СВО»: карусель с цитатами участников.
// Данные — в src/data/stories.ts.
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, ExternalLink, Quote, Trophy } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { HERO_STORIES, STORIES_SOURCE, STORIES_SOURCE_2 } from '@/data/stories'
import { pub } from '@/lib/utils'

export default function HeroStories() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const scrollTo = useCallback((i: number) => api?.scrollTo(i), [api])

  return (
    <section className="bg-[#e6dcbb] py-12 sm:py-14" aria-label="Слово героям СВО">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="stencil-heading text-center text-2xl font-bold text-[#6f5c17] sm:text-3xl">
          Слово героям СВО
        </h2>

        <Carousel opts={{ loop: true, align: 'start' }} setApi={setApi} className="relative mt-8">
          <CarouselContent className="-ml-0">
            {HERO_STORIES.map((s) => (
              <CarouselItem key={s.id} className="pl-0">
                <article className="overflow-hidden rounded-xl bg-white shadow-md">
                  {s.photo ? (
                    <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                      <div className="relative min-h-56 md:min-h-[22rem]">
                        <img
                          src={pub(s.photo)}
                          alt={s.photoAlt ?? ''}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col justify-center p-6 sm:p-9">
                        <Quote className="mb-4 h-8 w-8 rotate-180 text-[#6f5c17]/40" aria-hidden />
                        <p className="text-sm leading-relaxed text-slate-800 sm:text-base">
                          {s.quote}
                        </p>
                        <p className="stencil-heading mt-5 font-bold text-[#3d4a22]">{s.name}</p>
                        {s.detail && <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="flex min-h-56 flex-col items-center justify-center gap-4 p-8 text-center md:min-h-[22rem]">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3d4a22] text-[#d9c46a]">
                        <Trophy className="h-7 w-7" aria-hidden />
                      </span>
                      <p className="max-w-xl text-sm leading-relaxed text-slate-800 sm:text-base">
                        {s.quote}
                      </p>
                      {s.cta && (
                        <Link
                          to={s.cta.to}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#6f5c17] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3d4a22]"
                        >
                          {s.cta.label} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      )}
                    </div>
                  )}
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 size-10 border-[#6f5c17]/30 bg-white/90 text-[#3d4a22] hover:bg-white sm:-left-5" />
          <CarouselNext className="-right-3 size-10 border-[#6f5c17]/30 bg-white/90 text-[#3d4a22] hover:bg-white sm:-right-5" />
        </Carousel>

        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Слайды историй">
          {HERO_STORIES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`История ${i + 1} из ${HERO_STORIES.length}${s.name ? `: ${s.name}` : ''}`}
              onClick={() => scrollTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? 'w-7 bg-[#6f5c17]' : 'w-2.5 bg-[#6f5c17]/30 hover:bg-[#6f5c17]/50'
              }`}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[#6b6449]">
          Фотографии и цитаты участников — с порталов{' '}
          <a
            href={STORIES_SOURCE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#3d4a22] hover:underline"
          >
            «Герои 47» <ExternalLink className="h-3 w-3" aria-hidden />
          </a>{' '}
          и{' '}
          <a
            href={STORIES_SOURCE_2}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#3d4a22] hover:underline"
          >
            кадровыйцентр47.рф <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
          .
        </p>
      </div>
    </section>
  )
}
