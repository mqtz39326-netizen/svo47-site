// Страница программы Ленинградской области «Герои команды 47».
// Данные — в src/data/gk47.ts (источник: кадровыйцентр47.рф/z).
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  BadgeCheck,
  Briefcase,
  CalendarDays,
  Clock,
  ExternalLink,
  GraduationCap,
  Landmark,
  Mail,
  Phone,
  Quote,
  Users,
} from 'lucide-react'
import {
  GK47_ANKETA,
  GK47_CONTACTS,
  GK47_COUNCIL_HEADS,
  GK47_COUNCIL_MEMBERS,
  GK47_COUNCIL_SECRETARY,
  GK47_DIRECTIONS,
  GK47_FAQ,
  GK47_GOAL,
  GK47_QUOTE,
  GK47_SOURCE,
  GK47_STAGES,
} from '@/data/gk47'
import { pub } from '@/lib/utils'

export default function HeroesTeam() {
  return (
    <>
      {/* Шапка программы */}
      <section className="relative overflow-hidden bg-[#3d4a22] text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <p className="text-sm font-medium uppercase tracking-widest text-[#cfc99d]">
            Программа Ленинградской области
          </p>
          <h1 className="stencil-heading mt-2 text-3xl font-bold sm:text-4xl">
            Герои команды 47
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[#dcd6b2] sm:text-lg">
            Подготовка кадрового резерва для органов власти, муниципалитетов и общественных
            организаций Ленобласти из числа защитников Отечества, возвращающихся с фронта.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-[#dcd6b2]">
              <Landmark className="h-4 w-4" aria-hidden /> Направление «ГМУ»
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-[#dcd6b2]">
              <GraduationCap className="h-4 w-4" aria-hidden /> Направление «Педагогика»
            </span>
          </div>
          <a
            href={GK47_ANKETA}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#d9c46a] px-5 py-3 text-sm font-bold text-[#232a17] transition-colors hover:bg-[#e8d68a]"
          >
            Подать заявку на направление «Педагогика» <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
          <p className="mt-2 text-xs text-[#cfc99d]">Приём заявок — до 27 марта 2026 года</p>
        </div>
        <div className="military-stripes" aria-hidden />
      </section>

      {/* Слово губернатора */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="grid items-center gap-6 rounded-xl border bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[240px_1fr]">
          <img
            src={pub(GK47_QUOTE.photo)}
            alt={GK47_QUOTE.author}
            className="mx-auto w-48 rounded-xl object-cover shadow md:w-full"
            loading="lazy"
          />
          <div>
            <Quote className="mb-3 h-8 w-8 rotate-180 text-[#6f5c17]/40" aria-hidden />
            <p className="text-sm leading-relaxed text-slate-800 sm:text-base">{GK47_QUOTE.text}</p>
            <p className="stencil-heading mt-4 font-bold text-[#3d4a22]">{GK47_QUOTE.author}</p>
            <p className="mt-1 text-sm text-muted-foreground">{GK47_QUOTE.role}</p>
          </div>
        </div>
      </section>

      {/* Цель программы */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-[#3d4a22] sm:text-2xl">Цель программы</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-800 sm:text-base">{GK47_GOAL}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6f5c17]" aria-hidden />
                Бесплатное участие и диплом о профессиональной переподготовке
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6f5c17]" aria-hidden />
                Наставники, стажировки, погружение в экономику региона
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6f5c17]" aria-hidden />
                Жильё на время очных модулей
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6f5c17]" aria-hidden />
                Трудоустройство в органы власти или на предприятия региона после обучения
              </li>
            </ul>
          </div>
          <img
            src={pub('/gk47-program.jpg')}
            alt="Зал заседаний Правительства Ленинградской области"
            className="w-full rounded-xl object-cover shadow-sm"
            loading="lazy"
          />
        </div>
      </section>

      {/* Направления */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="mb-6 text-xl font-bold text-[#3d4a22] sm:text-2xl">Направления программы</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {GK47_DIRECTIONS.map((d) => (
            <div key={d.id} className="flex flex-col rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900">{d.title}</h3>
                {d.id === 'gmu' ? (
                  <Landmark className="h-6 w-6 shrink-0 text-[#3d4a22]" aria-hidden />
                ) : (
                  <GraduationCap className="h-6 w-6 shrink-0 text-[#3d4a22]" aria-hidden />
                )}
              </div>
              <p
                className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  d.statusClosed ? 'bg-slate-100 text-slate-600' : 'bg-[#3d4a22]/10 text-[#3d4a22]'
                }`}
              >
                <CalendarDays className="h-3.5 w-3.5" aria-hidden /> {d.status}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-700">
                <Clock className="h-4 w-4 text-[#6f5c17]" aria-hidden />
                Длительность обучения: <strong>{d.duration}</strong>
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">Требования к участникам:</p>
              <ul className="mt-2 flex-1 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                {d.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              {!d.statusClosed && (
                <a
                  href={GK47_ANKETA}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-[#6f5c17] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3d4a22]"
                >
                  Оставить заявку <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Этапы отбора */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="mb-6 text-xl font-bold text-[#3d4a22] sm:text-2xl">Этапы отбора</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GK47_STAGES.map((s, i) => (
            <li key={s.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d4a22] text-sm font-bold text-[#d9c46a]">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Общественный совет */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#3d4a22] sm:text-2xl">
          <Users className="h-6 w-6" aria-hidden /> Общественный совет программы
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GK47_COUNCIL_HEADS.map((p) => (
            <div key={p.name} className="rounded-xl border bg-white p-5 text-center shadow-sm">
              <img
                src={pub(p.photo)}
                alt={p.name}
                className="mx-auto h-28 w-28 rounded-full object-cover shadow"
                loading="lazy"
              />
              <p className="mt-3 font-bold text-slate-900">{p.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.role}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-8 mb-3 text-base font-bold text-slate-900">Состав совета</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {GK47_COUNCIL_MEMBERS.map((p) => (
            <li key={p.name} className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{p.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{p.role}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-lg border-2 border-[#6f5c17]/20 bg-[#f2f0e6] p-4">
          <p className="text-sm font-semibold text-slate-900">{GK47_COUNCIL_SECRETARY.name}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{GK47_COUNCIL_SECRETARY.role}</p>
        </div>
      </section>

      {/* Вопросы по программе */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="mb-6 text-xl font-bold text-[#3d4a22] sm:text-2xl">
          Часто задаваемые вопросы по программе
        </h2>
        <Accordion type="single" collapsible className="rounded-xl border bg-white px-4 shadow-sm sm:px-6">
          {GK47_FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`gk47-${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold text-slate-900 sm:text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slate-700">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Контакты и источник */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border-2 border-[#6f5c17]/20 bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Briefcase className="h-5 w-5 text-[#6f5c17]" aria-hidden /> Контакты программы
            </h2>
            <div className="mt-4 space-y-2">
              {GK47_CONTACTS.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-2 text-xl font-bold text-[#6f5c17] hover:underline"
                >
                  <Phone className="h-5 w-5" aria-hidden /> {p}
                </a>
              ))}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{GK47_CONTACTS.hours}</p>
            <a
              href={`mailto:${GK47_CONTACTS.email}`}
              className="mt-3 inline-flex items-center gap-2 font-medium text-[#3d4a22] hover:underline"
            >
              <Mail className="h-4 w-4" aria-hidden /> {GK47_CONTACTS.email}
            </a>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Источник информации</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Материалы страницы взяты с официального сайта программы:
            </p>
            <a
              href={GK47_SOURCE}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-medium text-[#3d4a22] hover:underline"
            >
              Программа «Герои команды 47» — кадровыйцентр47.рф{' '}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <p className="mt-4 text-sm text-slate-600">
              Анкета для участия в отборе размещена на портале{' '}
              <a
                href={GK47_ANKETA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[#3d4a22] hover:underline"
              >
                защитник47.рф <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
