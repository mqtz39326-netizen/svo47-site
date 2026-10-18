// Форма обратной связи «Задать вопрос».
// Локальная отправка: письмо формируется через почтовый клиент (mailto),
// данные никуда не передаются с устройства пользователя.
import { useState, type FormEvent, type ReactNode } from 'react'
import { MessageCircleQuestion, Send } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { HOTLINE, HOTLINE_TEL } from '@/components/Layout'

export default function FeedbackDialog({
  trigger,
  subject,
}: {
  trigger?: ReactNode
  subject?: string
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [question, setQuestion] = useState(subject ?? '')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const body = [
      `ФИО: ${name || '—'}`,
      `Контакт для ответа: ${contact || '—'}`,
      '',
      question,
    ].join('\n')
    // Открываем почтовый клиент пользователя с готовым письмом
    window.location.href = `mailto:cszn@lenreg.ru?subject=${encodeURIComponent(
      'Вопрос с портала «Меры поддержки участников СВО — Ленинградская область»',
    )}&body=${encodeURIComponent(body)}`
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="gap-2">
            <MessageCircleQuestion className="h-4 w-4" aria-hidden />
            Задать вопрос
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Задать вопрос</DialogTitle>
          <DialogDescription>
            Вопрос будет сформирован как письмо в Центр соцзащиты населения Ленинградской области.
            По срочным вопросам звоните на горячую линию{' '}
            <a href={HOTLINE_TEL} className="font-semibold text-[#6f5c17] hover:underline">
              {HOTLINE}
            </a>
            .
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fb-name">Ваше имя</Label>
              <Input id="fb-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван Иванов" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fb-contact">Телефон или e-mail для ответа</Label>
              <Input
                id="fb-contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fb-question">Ваш вопрос *</Label>
            <Textarea
              id="fb-question"
              required
              rows={5}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Опишите вашу ситуацию и вопрос…"
            />
          </div>
          <Button type="submit" className="w-full gap-2 sm:w-auto">
            <Send className="h-4 w-4" aria-hidden />
            Сформировать письмо
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
