// Страница «Полезные ссылки» — переходы на официальные источники.
import { ExternalLink } from 'lucide-react'
import { USEFUL_LINKS } from '@/data/links'

export default function Links() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav aria-label="Хлебные крошки" className="mb-4 text-sm text-muted-foreground">
        <a href="#/" className="hover:underline">Главная</a>
        <span aria-hidden> / </span>
        <span aria-current="page">Полезные ссылки</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-[#3d4a22] sm:text-3xl">Полезные ссылки</h1>
      <p className="mb-6 max-w-2xl text-muted-foreground">
        Официальные ресурсы, на которых публикуется актуальная информация о мерах поддержки
        участников СВО и членов их семей.
      </p>

      <ul className="space-y-3">
        {USEFUL_LINKS.map((l) => (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3d4a22] hover:shadow-md"
            >
              <span className="flex items-center gap-2 font-semibold text-[#3d4a22]">
                {l.title}
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600">{l.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
