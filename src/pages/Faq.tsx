// Страница «Вопросы и ответы» (FAQ) с аккордеоном и микроразметкой FAQPage.
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import FeedbackDialog from '@/components/FeedbackDialog'
import { FAQ_ITEMS } from '@/data/faq'

export default function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Хлебные крошки" className="mb-4 text-sm text-muted-foreground">
        <a href="#/" className="hover:underline">Главная</a>
        <span aria-hidden> / </span>
        <span aria-current="page">Вопросы и ответы</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-[#3d4a22] sm:text-3xl">Вопросы и ответы</h1>
      <p className="mb-6 max-w-2xl text-muted-foreground">
        Типовые вопросы об оформлении мер поддержки в Ленинградской области.
      </p>

      <Accordion type="single" collapsible className="rounded-xl border bg-white px-5 shadow-sm">
        {FAQ_ITEMS.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
            <AccordionContent className="leading-relaxed text-slate-700">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 rounded-xl border bg-white p-6 text-center shadow-sm">
        <p className="text-lg font-medium">Не нашли ответ на свой вопрос?</p>
        <p className="mt-1 text-muted-foreground">
          Позвоните на горячую линию{' '}
          <a href="tel:88003500605" className="font-semibold text-[#6f5c17] hover:underline">
            8 (800) 350-06-05
          </a>{' '}
          или отправьте вопрос через форму.
        </p>
        <div className="mt-4 flex justify-center">
          <FeedbackDialog />
        </div>
      </div>
    </div>
  )
}
