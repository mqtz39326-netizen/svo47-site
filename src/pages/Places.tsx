// Страница «Где получить»: адреса и контакты учреждений + карта.
import { Building2, Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { INSTITUTIONS } from '@/data/institutions'
import { Badge } from '@/components/ui/badge'
import type { Institution } from '@/data/types'

const KIND_LABELS: Record<Institution['kind'], string> = {
  cszn: 'Соцзащита',
  mfc: 'МФЦ',
  fund: 'Фонд «Защитники Отечества»',
  committee: 'Комитет ЛО',
  other: 'Другое',
}

export default function Places() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Хлебные крошки" className="mb-4 text-sm text-muted-foreground">
        <a href="#/" className="hover:underline">Главная</a>
        <span aria-hidden> / </span>
        <span aria-current="page">Где получить</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-[#3d4a22] sm:text-3xl">Где получить меры поддержки</h1>
      <p className="mb-6 max-w-2xl text-muted-foreground">
        Адреса и контакты учреждений Ленинградской области: филиалы Центра соцзащиты, МФЦ,
        фонд «Защитники Отечества» и профильные комитеты.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INSTITUTIONS.map((inst) => (
          <div key={inst.id} className="flex flex-col rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-start justify-between gap-2">
              <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3d4a22]" aria-hidden />
              <Badge variant="secondary" className="font-normal">{KIND_LABELS[inst.kind]}</Badge>
            </div>
            <h2 className="font-semibold leading-snug">{inst.name}</h2>
            <ul className="mt-3 flex-1 space-y-1.5 text-sm text-slate-700">
              {inst.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  {inst.address}
                </li>
              )}
              {inst.phone && (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  {inst.phone}
                </li>
              )}
              {inst.hours && (
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  {inst.hours}
                </li>
              )}
              {inst.email && (
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <a href={`mailto:${inst.email}`} className="text-[#3d4a22] hover:underline">{inst.email}</a>
                </li>
              )}
              {inst.site && (
                <li className="flex items-start gap-2">
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <a href={inst.site} target="_blank" rel="noreferrer" className="text-[#3d4a22] hover:underline">
                    {inst.site.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </li>
              )}
            </ul>
            {inst.note && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{inst.note}</p>}
          </div>
        ))}
      </div>

      {/* Карта: филиал фонда «Защитники Отечества» в Гатчине */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-[#3d4a22]">Карта</h2>
        <div className="overflow-hidden rounded-xl border shadow-sm">
          <iframe
            title="Карта: филиал фонда «Защитники Отечества» в Ленинградской области, г. Гатчина, ул. Чкалова, 7"
            src="https://www.openstreetmap.org/export/embed.html?bbox=30.08%2C59.54%2C30.16%2C59.60&layer=mapnik&marker=59.5683%2C30.1210"
            className="h-96 w-full"
            loading="lazy"
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          На карте отмечен филиал фонда «Защитники Отечества» (г. Гатчина, ул. Чкалова, д. 7).
          Адреса филиалов ЦСЗН и МФЦ в вашем районе смотрите на сайтах{' '}
          <a href="https://cszn.info" target="_blank" rel="noreferrer" className="text-[#3d4a22] underline">cszn.info</a>{' '}
          и{' '}
          <a href="https://mfc47.ru" target="_blank" rel="noreferrer" className="text-[#3d4a22] underline">mfc47.ru</a>.
        </p>
      </section>
    </div>
  )
}
