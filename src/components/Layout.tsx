// Каркас сайта: шапка с навигацией, полоса горячей линии, футер.
import { Link, NavLink, Outlet } from 'react-router'
import { Phone, Menu, ExternalLink, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import AccessibilityButton from '@/components/AccessibilityButton'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/', label: 'Главная', end: true },
  { to: '/catalog', label: 'Каталог мер' },
  { to: '/places', label: 'Где получить' },
  { to: '/contest', label: 'Конкурс «Мой Герой СВО 47»' },
  { to: '/heroes-team', label: 'Герои команды 47' },
  { to: '/multicenter', label: 'Мультицентр' },
  { to: '/faq', label: 'Вопросы и ответы' },
  { to: '/links', label: 'Полезные ссылки' },
]

export const HOTLINE = '8 (800) 350-06-05'
export const HOTLINE_TEL = 'tel:88003500605'

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f0e6] text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Перейти к содержимому
      </a>

      {/* Полоса горячей линии */}
      <div className="bg-[#6f5c17] text-white print:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-sm">
          <span>Горячая линия Центра соцзащиты населения Ленинградской области</span>
          <a href={HOTLINE_TEL} className="inline-flex items-center gap-1.5 font-semibold underline-offset-2 hover:underline">
            <Phone className="h-4 w-4" aria-hidden />
            {HOTLINE}
          </a>
        </div>
      </div>

      {/* Шапка */}
      <header className="border-b bg-[#3d4a22] text-white print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white text-lg font-black text-[#3d4a22]" aria-hidden>
              47
            </span>
            <span className="leading-tight">
              <span className="stencil-heading block text-base font-bold sm:text-lg">Меры поддержки участников СВО</span>
              <span className="block text-xs text-[#cfc99d] sm:text-sm">Ленинградская область</span>
            </span>
          </Link>
          {/* Кликабельные логотипы-бейджи (как на кадровыйцентр47.рф) — каждый в одну строку */}
          <div className="hidden items-center gap-2 lg:flex" aria-label="Быстрые переходы">
            <a
              href="https://кадровыйцентр47.рф/"
              target="_blank"
              rel="noreferrer"
              className="stencil-heading flex h-11 items-center gap-2 whitespace-nowrap rounded-md bg-[#b3242a] px-3.5 text-xs font-bold tracking-wide text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#d03037] hover:shadow"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M12 1.8l2.6 7.1 7.6.3-6 4.7 2 7.3-6.2-4.2-6.2 4.2 2-7.3-6-4.7 7.6-.3z" />
              </svg>
              Присоединиться!
            </a>
            <Link
              to="/catalog"
              className="stencil-heading flex h-11 items-center whitespace-nowrap rounded-md bg-black/60 px-3.5 text-[11px] font-bold tracking-wide text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-black/80 hover:shadow"
            >
              Меры поддержки СВО
            </Link>
            <Link
              to="/heroes-team"
              className="flex h-11 items-center gap-2 whitespace-nowrap rounded-md bg-white px-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#3d4a22]" aria-hidden>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#d9c46a]">
                  <path d="M12 1.8l2.6 7.1 7.6.3-6 4.7 2 7.3-6.2-4.2-6.2 4.2 2-7.3-6-4.7 7.6-.3z" />
                </svg>
              </span>
              <span className="stencil-heading text-[11px] font-bold tracking-wide text-[#3d4a22]">
                Герои команды&nbsp;47
              </span>
            </Link>
            <Link
              to="/multicenter"
              className="flex h-11 items-center gap-2 whitespace-nowrap rounded-md bg-white px-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#6f5c17]" aria-hidden>
                <GraduationCap className="h-4 w-4 text-[#d9c46a]" />
              </span>
              <span className="stencil-heading text-[11px] font-bold tracking-wide text-[#3d4a22]">
                Мультицентр
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <AccessibilityButton />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="rounded-md p-2 hover:bg-white/10 lg:hidden" aria-label="Открыть меню">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle>Навигация</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col gap-1" aria-label="Мобильное меню">
                  {NAV.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'rounded-md px-3 py-2.5 text-base font-medium',
                          isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* Десктопная навигация */}
        <nav className="hidden border-t border-white/10 lg:block" aria-label="Основное меню">
          <div className="mx-auto flex max-w-6xl px-4">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors',
                    isActive
                      ? 'border-white bg-white/10 text-white'
                      : 'border-transparent text-[#dcd6b2] hover:bg-white/5 hover:text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      {/* Футер */}
      <div className="military-stripes mt-12 print:hidden" aria-hidden />
      <footer className="bg-[#1f2613] text-[#dcd6b2] print:hidden">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-3 font-bold text-white">Меры поддержки участников СВО</p>
            <p className="text-sm">Единый информационный навигатор мер социальной поддержки в Ленинградской области.</p>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">Разделы</p>
            <ul className="space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">Официальные источники</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://lenobl.ru/support/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white hover:underline">
                  Правительство ЛО — меры поддержки <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
              <li>
                <a href="https://герои47.рф/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white hover:underline">
                  Портал «Герои 47» <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
              <li>
                <a href="https://mfc47.ru/declarant/mobilization/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white hover:underline">
                  МФЦ Ленинградской области <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">Контакты</p>
            <p className="text-sm">
              Информационно-справочная служба ЦСЗН ЛО:
              <br />
              <a href={HOTLINE_TEL} className="mt-1 inline-block font-semibold text-white hover:underline">
                {HOTLINE}
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-4 text-xs leading-relaxed text-[#cfc99d]">
            Информация носит справочный характер, актуальные условия уточняйте в Центре соцзащиты населения
            Ленинградской области по телефону 8 (800) 350-06-05.
          </p>
        </div>
      </footer>
    </div>
  )
}
