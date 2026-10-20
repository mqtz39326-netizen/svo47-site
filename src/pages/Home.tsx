// Главная страница: приветствие, баннер конкурса, каталог мер с фильтрами,
// карусель историй, видео, горячая линия, источники.
import { Link } from 'react-router'
import { ArrowRight, ExternalLink, Phone, Trophy } from 'lucide-react'
import MeasuresCatalog from '@/components/MeasuresCatalog'
import HeroStories from '@/components/HeroStories'
import { HOTLINE, HOTLINE_TEL } from '@/components/Layout'
import { SRC_GEROI, SRC_LENOBL, SRC_MFC } from '@/data/measures'
import { pub } from '@/lib/utils'

export default function Home() {
  return (
    <>
      {/* Приветственный блок */}
      <section className="relative overflow-hidden bg-[#3d4a22] text-white">
        <img
          src={pub('/hero-bg.jpg')}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#232a17]/95 via-[#3d4a22]/80 to-[#55652f]/45"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h1 className="stencil-heading max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">
            Меры поддержки участников СВО и членов их семей в Ленинградской области
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#dcd6b2] sm:text-lg">
            Единая точка входа: найдите положенные вам меры поддержки и понятную инструкцию,
            как их получить, — за 2–3 клика.
          </p>
        </div>
        <div className="military-stripes" aria-hidden />
      </section>

      {/* Баннер конкурса */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <Link
          to="/contest"
          className="group flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-[#6f5c17]/30 bg-gradient-to-r from-[#3d4a22] to-[#55652f] p-5 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="flex items-center gap-3">
            <Trophy className="h-8 w-8 shrink-0 text-[#d9c46a]" aria-hidden />
            <span>
              <span className="stencil-heading block font-bold">Конкурс «Мой Герой СВО 47»</span>
              <span className="block text-sm text-[#dcd6b2]">
                Для жителей области 7–23 лет · приём заявок до 15 ноября 2026 года · призы до 15 000 ₽
              </span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#d9c46a] group-hover:underline">
            Подробнее <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>
      </section>

      {/* Каталог мер с фильтрами (как в каталоге Госуслуг) */}
      <MeasuresCatalog />

      {/* Слово героям СВО: карусель историй */}
      <div className="mt-12">
        <HeroStories />
      </div>

      {/* Гордость страны: видеообращение */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="mb-6 text-xl font-bold text-[#3d4a22] sm:text-2xl">Гордость страны</h2>
        <figure className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <video
            controls
            preload="metadata"
            className="aspect-video w-full bg-[#232a17]"
            aria-label="Видеообращение рядового Анисимова Максима Юрьевича"
          >
            <source src={pub('/anisimov-video.mp4')} type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
          <figcaption className="p-4">
            <p className="text-sm font-semibold text-slate-900">
              Рядовой Анисимов Максим Юрьевич — «Гордость страны»
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Видеообращение участника СВО: «Присоединяйся к своим! Служи по контракту!»
            </p>
          </figcaption>
        </figure>
      </section>

      {/* Горячая линия и источники */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border-2 border-[#6f5c17]/20 bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6f5c17] text-white">
                <Phone className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Горячая линия</h2>
                <p className="text-sm text-muted-foreground">
                  Информационно-справочная служба Центра соцзащиты населения Ленинградской области
                </p>
              </div>
            </div>
            <a
              href={HOTLINE_TEL}
              className="mt-4 block text-2xl font-black tracking-wide text-[#6f5c17] hover:underline sm:text-3xl"
            >
              {HOTLINE}
            </a>
            <p className="mt-2 text-sm text-slate-600">
              Звонок бесплатный. Подскажут, какие меры вам положены, куда обратиться и какие документы подготовить.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Официальные источники</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Вся информация на портале взята из официальных источников:
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={SRC_LENOBL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-[#3d4a22] hover:underline">
                  Правительство Ленинградской области — меры поддержки <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
              <li>
                <a href={SRC_GEROI} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-[#3d4a22] hover:underline">
                  Портал «Герои 47» — Комитет по социальной защите населения ЛО <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
              <li>
                <a href={SRC_MFC} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-[#3d4a22] hover:underline">
                  МФЦ Ленинградской области <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
