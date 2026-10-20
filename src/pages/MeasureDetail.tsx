// Детальная страница меры поддержки:
// кто имеет право, размер, нормативная база, инструкция, документы,
// контакты, кнопки «Распечатать / Поделиться / Задать вопрос».
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import FeedbackDialog from '@/components/FeedbackDialog'
import SharePrint from '@/components/SharePrint'
import MeasureCard from '@/components/MeasureCard'
import { CATEGORIES, MEASURES, RECIPIENT_LABELS, getMeasure } from '@/data/measures'
import { CATEGORY_ICONS } from '@/components/categoryIcons'
import {
  Banknote,
  Building2,
  FileText,
  Landmark,
  ListOrdered,
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
} from 'lucide-react'

export default function MeasureDetail() {
  const { id } = useParams()
  const measure = id ? getMeasure(id) : undefined

  if (!measure) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Мера не найдена</h1>
        <p className="mt-3 text-muted-foreground">
          Возможно, страница была перемещена. Перейдите к{' '}
          <Link to="/" className="text-[#3d4a22] underline">
            списку мер на главной странице
          </Link>
          .
        </p>
      </div>
    )
  }

  const category = CATEGORIES.find((c) => c.id === measure.category)
  const Icon = CATEGORY_ICONS[measure.category]
  const related = MEASURES.filter((m) => m.category === measure.category && m.id !== measure.id).slice(0, 3)

  // Микроразметка Schema.org: GovernmentService
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: measure.title,
    description: measure.short,
    areaServed: { '@type': 'AdministrativeArea', name: 'Ленинградская область' },
    provider: {
      '@type': 'GovernmentOrganization',
      name: measure.contacts[0]?.name ?? measure.department,
      telephone: measure.contacts[0]?.phone,
    },
    url: `https://msupport47.example/#/measure/${measure.id}`,
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Хлебные крошки */}
      <nav aria-label="Хлебные крошки" className="mb-4 text-sm text-muted-foreground print:hidden">
        <Link to="/" className="hover:underline">Главная</Link>
        <span aria-hidden> / </span>
        <span aria-current="page">{category?.title}</span>
      </nav>

      {/* Заголовок */}
      <header className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden />
          <span>{category?.title}</span>
          <span aria-hidden>·</span>
          <span>{measure.department}</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight text-[#3d4a22] sm:text-3xl">{measure.title}</h1>
        <p className="mt-3 leading-relaxed text-slate-700">{measure.short}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {measure.recipients.map((r) => (
            <Badge key={r} className="bg-[#3d4a22] font-normal hover:bg-[#3d4a22]">
              {RECIPIENT_LABELS[r]}
            </Badge>
          ))}
        </div>
        <div className="mt-5 flex items-start gap-3 rounded-lg bg-[#6f5c17]/5 p-4">
          <Banknote className="mt-0.5 h-5 w-5 shrink-0 text-[#6f5c17]" aria-hidden />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Размер выплаты / объём льготы</p>
            <p className="text-lg font-bold text-[#6f5c17]">{measure.amount}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <SharePrint title={measure.title} />
          <FeedbackDialog subject={`Вопрос по мере поддержки: ${measure.title}\n\n`} />
        </div>
        {measure.id === 'konkurs-moj-geroj' && (
          <Link
            to="/contest"
            className="mt-4 block rounded-lg bg-[#3d4a22] px-4 py-3 text-center font-semibold text-white hover:bg-[#2f3a1b] print:hidden"
          >
            Открыть полную страницу конкурса «Мой Герой СВО 47» →
          </Link>
        )}
      </header>

      {/* Кто имеет право */}
      <Section icon={<Landmark className="h-5 w-5" aria-hidden />} title="Кто имеет право">
        <p className="leading-relaxed">{measure.who}</p>
      </Section>

      {/* Как оформить */}
      <Section icon={<ListOrdered className="h-5 w-5" aria-hidden />} title="Как оформить: пошаговая инструкция">
        <ol className="space-y-3">
          {measure.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3d4a22] text-sm font-bold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Документы */}
      <Section icon={<FileText className="h-5 w-5" aria-hidden />} title="Необходимые документы">
        <ul className="list-inside list-disc space-y-1.5 leading-relaxed">
          {measure.documents.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </Section>

      {/* Нормативная база */}
      <Section icon={<FileText className="h-5 w-5" aria-hidden />} title="Нормативная база">
        <ul className="space-y-2">
          {measure.legalBasis.map((l, i) => (
            <li key={i} className="rounded-md bg-[#f2f0e6] p-3 text-sm leading-relaxed">
              {l}
            </li>
          ))}
        </ul>
      </Section>

      {/* Контакты */}
      <Section icon={<Building2 className="h-5 w-5" aria-hidden />} title="Куда обращаться">
        <div className="space-y-4">
          {measure.contacts.map((c, i) => (
            <div key={i} className="rounded-lg border p-4">
              <p className="font-semibold">{c.name}</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {c.address && (
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    {c.address}
                  </li>
                )}
                {c.phone && (
                  <li className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    <span>{c.phone}</span>
                  </li>
                )}
                {c.email && (
                  <li className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    <a href={`mailto:${c.email}`} className="text-[#3d4a22] hover:underline">
                      {c.email}
                    </a>
                  </li>
                )}
                {c.hours && (
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    {c.hours}
                  </li>
                )}
                {c.site && (
                  <li className="flex items-start gap-2">
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    <a href={c.site} target="_blank" rel="noreferrer" className="text-[#3d4a22] hover:underline">
                      {c.site.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Separator className="my-6" />

      {/* Источник и дата актуализации */}
      <Accordion type="single" collapsible className="rounded-xl border bg-white px-5 print:hidden">
        <AccordionItem value="source" className="border-none">
          <AccordionTrigger className="text-sm">Источник информации и дата актуализации</AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            <p>
              Информация проверена и актуализирована: <strong>{measure.updated}</strong>.
            </p>
            <p className="mt-1">
              Официальный источник:{' '}
              <a href={measure.source} target="_blank" rel="noreferrer" className="text-[#3d4a22] underline">
                {measure.source}
              </a>
            </p>
            <p className="mt-1">
              Размеры выплат индексируются — актуальные условия уточняйте в Центре соцзащиты населения
              Ленинградской области по телефону 8 (800) 350-06-05.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Похожие меры */}
      {related.length > 0 && (
        <div className="mt-10 print:hidden">
          <h2 className="mb-4 text-xl font-bold text-[#3d4a22]">Похожие меры</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((m) => (
              <MeasureCard key={m.id} measure={m} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <section className="mt-4 rounded-xl border bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#3d4a22]">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  )
}
