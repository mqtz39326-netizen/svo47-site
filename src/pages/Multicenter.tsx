// Страница «Мультицентр социальной и трудовой интеграции».
// Данные — в src/data/multicenter.ts (источник: multicentr.com).
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  BadgeCheck,
  Briefcase,
  Building2,
  ClipboardList,
  Clock,
  ExternalLink,
  FileText,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Users,
} from 'lucide-react'
import {
  MC_ABOUT,
  MC_CONTACTS,
  MC_DOCS,
  MC_EMPLOYMENT,
  MC_EMPLOYMENT_CONTACTS,
  MC_FACILITIES,
  MC_FACTS,
  MC_FAQ,
  MC_FULL_NAME,
  MC_HOW_TO,
  MC_PARTNERS_TEXT,
  MC_PROFESSIONS,
  MC_SOURCE,
  MC_WHO_CAN,
} from '@/data/multicenter'

export default function Multicenter() {
  return (
    <>
      {/* Шапка страницы */}
      <section className="relative overflow-hidden bg-[#3d4a22] text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <p className="text-sm font-medium uppercase tracking-widest text-[#cfc99d]">ГАНПОУ ЛО</p>
          <h1 className="stencil-heading mt-2 text-2xl font-bold leading-tight sm:text-4xl">
            Мультицентр социальной и трудовой интеграции
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[#dcd6b2] sm:text-lg">
            Бесплатное профессиональное обучение, реабилитация и трудоустройство участников СВО,
            членов их семей и людей с ограниченными возможностями здоровья.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={MC_CONTACTS.hotlineSvoTel}
              className="inline-flex items-center gap-2 rounded-full bg-[#d9c46a] px-4 py-2 text-sm font-bold text-[#232a17] transition-colors hover:bg-[#e8d68a]"
            >
              <Phone className="h-4 w-4" aria-hidden /> Горячая линия участникам и ветеранам СВО:{' '}
              {MC_CONTACTS.hotlineSvo}
            </a>
            <a
              href={MC_CONTACTS.eduTel}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[#dcd6b2] transition-colors hover:bg-white/20"
            >
              <GraduationCap className="h-4 w-4" aria-hidden /> Образовательные услуги: {MC_CONTACTS.edu}
            </a>
          </div>
        </div>
        <div className="military-stripes" aria-hidden />
      </section>

      {/* О Мультицентре */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <h2 className="text-xl font-bold text-[#3d4a22] sm:text-2xl">О Мультицентре</h2>
            <p className="mt-1 text-sm text-muted-foreground">{MC_FULL_NAME}</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-800 sm:text-base">
              {MC_ABOUT.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <img
              src="/mc-cafk.jpg"
              alt="Здание Центра адаптивной физической культуры Мультицентра"
              className="w-full rounded-xl object-cover shadow-sm"
              loading="lazy"
            />
            <div className="grid grid-cols-2 gap-3">
              {MC_FACTS.map((f) => (
                <div key={f.label} className="rounded-xl border bg-white p-4 text-center shadow-sm">
                  <p className="stencil-heading text-xl font-bold text-[#6f5c17]">{f.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Кластер */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="flex items-center gap-2 text-xl font-bold text-[#3d4a22] sm:text-2xl">
          <Building2 className="h-6 w-6" aria-hidden /> Кластер комплексного сопровождения и
          реабилитации участников СВО
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {MC_FACILITIES.map((f) => (
            <a
              key={f.name}
              href={f.url}
              target="_blank"
              rel="noreferrer"
              className={`group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#6f5c17]/40 hover:shadow-md ${
                f.project ? 'border-dashed opacity-90' : ''
              }`}
            >
              {f.photo && (
                <img
                  src={f.photo}
                  alt={f.name}
                  className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              )}
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-start justify-between gap-2 font-bold text-slate-900">
                  <span>
                    {f.name}
                    {f.project && (
                      <span className="ml-2 rounded-full bg-[#6f5c17]/10 px-2 py-0.5 text-xs font-semibold text-[#6f5c17]">
                        проект
                      </span>
                    )}
                  </span>
                  <ExternalLink
                    className="mt-1 h-4 w-4 shrink-0 text-[#6f5c17] opacity-60 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </p>
                {f.text && <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">{f.text}</p>}
                {f.contacts && (
                  <p className="mt-3 border-t pt-3 text-xs leading-relaxed text-[#3d4a22]">
                    <strong>Контакты:</strong> {f.contacts}
                  </p>
                )}
                <p className="mt-3 text-xs font-semibold text-[#6f5c17] group-hover:underline">
                  Подробнее на multicentr.com
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Профессии */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="flex items-center gap-2 text-xl font-bold text-[#3d4a22] sm:text-2xl">
          <GraduationCap className="h-6 w-6" aria-hidden /> Профессии для участников СВО и членов их
          семей
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">{MC_WHO_CAN}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MC_PROFESSIONS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#6f5c17]/40 hover:shadow-md"
            >
              <img
                src={p.photo}
                alt={p.name}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col p-4">
                <p className="flex items-start justify-between gap-2 text-sm font-bold leading-snug text-slate-900">
                  <span>{p.name}</span>
                  <ExternalLink
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6f5c17] opacity-60 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </p>
                <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#3d4a22]/10 px-2.5 py-0.5 text-xs font-semibold text-[#3d4a22]">
                  <Clock className="h-3 w-3" aria-hidden /> {p.duration}
                </p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">{p.text}</p>
                <p className="mt-2 border-t pt-2 text-xs leading-relaxed text-muted-foreground">
                  <strong>Где работать:</strong> {p.sphere}
                </p>
                <p className="mt-2 text-xs font-semibold text-[#6f5c17] group-hover:underline">
                  Подробнее на multicentr.com
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Как поступить */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#3d4a22] sm:text-2xl">
          <ClipboardList className="h-6 w-6" aria-hidden /> Как поступить на обучение
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MC_HOW_TO.map((s, i) => (
            <li key={s.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d4a22] text-sm font-bold text-[#d9c46a]">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>

        <h3 className="mb-4 mt-8 flex items-center gap-2 text-lg font-bold text-slate-900">
          <FileText className="h-5 w-5 text-[#6f5c17]" aria-hidden /> Документы для участников СВО и
          членов их семей
        </h3>
        <div className="grid gap-4 lg:grid-cols-3">
          {MC_DOCS.map((d) => (
            <div key={d.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="font-bold text-slate-900">{d.title}</p>
              <ul className="mt-3 space-y-1.5">
                {d.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6f5c17]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Трудоустройство */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Briefcase className="h-5 w-5 text-[#6f5c17]" aria-hidden /> Трудоустройство
              выпускников
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Центр трудоустройства и занятости сопровождает выпускника на всех этапах — от подбора
              вакансии до адаптации на рабочем месте. При трудоустройстве учитывается важный фактор:
              работа рядом с домом.
            </p>
            <ul className="mt-4 space-y-2">
              {MC_EMPLOYMENT.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#3d4a22]" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Users className="h-5 w-5 text-[#6f5c17]" aria-hidden /> Контакты центра занятости
            </h2>
            <ul className="mt-4 space-y-3">
              {MC_EMPLOYMENT_CONTACTS.map((c) => (
                <li key={c.name} className="text-sm">
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.role}</p>
                  <a
                    href={`tel:${c.phone.replace(/[^+\d]/g, '')}`}
                    className="mt-0.5 inline-block font-medium text-[#6f5c17] hover:underline"
                  >
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t pt-3 text-xs text-muted-foreground">
              Работодателям: услуги по подготовке кадров оказываются только на безвозмездной основе.
              Формы взаимодействия — договоры производственной практики и целевой профессиональной
              подготовки.
            </p>
          </div>
        </div>
      </section>

      {/* Сотрудничество */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="rounded-xl border-2 border-[#6f5c17]/20 bg-gradient-to-r from-[#3d4a22] to-[#55652f] p-6 text-white shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <HeartHandshake className="h-5 w-5 text-[#d9c46a]" aria-hidden /> Сотрудничество
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-[#dcd6b2]">{MC_PARTNERS_TEXT}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="mb-6 text-xl font-bold text-[#3d4a22] sm:text-2xl">Вопросы и ответы</h2>
        <Accordion type="single" collapsible className="rounded-xl border bg-white px-4 shadow-sm sm:px-6">
          {MC_FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`mc-${i}`}>
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
            <h2 className="text-lg font-bold text-slate-900">Контакты Мультицентра</h2>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href={MC_CONTACTS.hotlineSvoTel}
                className="flex items-center gap-2 text-xl font-bold text-[#6f5c17] hover:underline"
              >
                <Phone className="h-5 w-5" aria-hidden /> {MC_CONTACTS.hotlineSvo}
              </a>
              <p className="text-xs text-muted-foreground">
                Горячая линия участникам и ветеранам СВО · {MC_CONTACTS.hours}
              </p>
              <a
                href={MC_CONTACTS.eduTel}
                className="flex items-center gap-2 font-semibold text-[#3d4a22] hover:underline"
              >
                <Phone className="h-4 w-4" aria-hidden /> {MC_CONTACTS.edu} — образовательные услуги
              </a>
              <p className="flex items-start gap-2 text-slate-700">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#6f5c17]" aria-hidden />
                {MC_CONTACTS.address}
              </p>
              <a
                href={`mailto:${MC_CONTACTS.email}`}
                className="flex items-center gap-2 font-medium text-[#3d4a22] hover:underline"
              >
                <Mail className="h-4 w-4" aria-hidden /> {MC_CONTACTS.email}
              </a>
              <p className="flex gap-3 pt-1 text-sm">
                <a
                  href={MC_CONTACTS.vk}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#3d4a22] hover:underline"
                >
                  ВКонтакте <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
                <a
                  href={MC_CONTACTS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#3d4a22] hover:underline"
                >
                  Instagram <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </p>
            </div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Источник информации</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Тексты и фотографии на этой странице взяты с официального сайта учреждения:
            </p>
            <a
              href={MC_SOURCE}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-medium text-[#3d4a22] hover:underline"
            >
              multicentr.com — Мультицентр социальной и трудовой интеграции{' '}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <p className="mt-4 text-sm text-slate-600">
              На сайте учреждения также доступны: сведения об образовательной организации, документы,
              правила приёма, дни открытых дверей, награды, вакансии, новости и Выборгский филиал.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
