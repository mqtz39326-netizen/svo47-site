// Пошаговый «селектор помощи»: 3 вопроса → персональный список мер.
import { useMemo, useState } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import MeasureCard from '@/components/MeasureCard'
import { CATEGORIES, MEASURES } from '@/data/measures'
import type { CategoryId, Recipient } from '@/data/types'
import { cn } from '@/lib/utils'

interface Option {
  id: string
  label: string
  hint?: string
}

const STEP_STATUS: Option[] = [
  { id: 'participant', label: 'Я участник СВО', hint: 'Действующий или уволенный, в том числе ставший инвалидом' },
  { id: 'family', label: 'Я член семьи участника', hint: 'Супруг(а), ребёнок, родитель участника СВО' },
  { id: 'bereaved', label: 'Я член семьи погибшего', hint: 'Семья погибшего (умершего) участника СВО' },
]

const STEP_CHILDREN: Option[] = [
  { id: 'yes', label: 'Да, есть дети до 18 лет или обучающиеся очно до 23 лет' },
  { id: 'no', label: 'Нет' },
]

const STEP_TOPIC: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'payments', label: 'Денежные выплаты' },
  { id: 'health', label: 'Здоровье и реабилитация' },
  { id: 'housing', label: 'Жильё и ЖКХ' },
  { id: 'transport', label: 'Проезд и транспорт' },
  { id: 'education', label: 'Дети: образование и отдых' },
  { id: 'work', label: 'Работа и обучение' },
  { id: 'all', label: 'Показать все подходящие меры' },
]

export default function HelpQuiz() {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<Recipient | null>(null)
  const [hasChildren, setHasChildren] = useState<boolean | null>(null)
  const [topic, setTopic] = useState<CategoryId | 'all' | null>(null)

  const results = useMemo(() => {
    if (step < 3 || !status || !topic) return []
    return MEASURES.filter((m) => {
      if (!m.recipients.includes(status)) return false
      if (topic !== 'all' && m.category !== topic) return false
      // Если детей нет — скрываем сугубо «детские» меры
      if (hasChildren === false && m.category === 'education') return false
      return true
    })
  }, [step, status, hasChildren, topic])

  const reset = () => {
    setStep(0)
    setStatus(null)
    setHasChildren(null)
    setTopic(null)
  }

  const pick = (fn: () => void) => () => {
    fn()
    setStep((s) => s + 1)
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-[#3d4a22] sm:text-2xl">Подбор мер поддержки</h2>
        {step > 0 && step < 3 && (
          <Button variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)} className="gap-1">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Назад
          </Button>
        )}
      </div>

      {step < 3 && (
        <>
          <Progress value={(step / 3) * 100} className="mb-6 h-2" aria-label={`Шаг ${step + 1} из 3`} />
          <p className="mb-4 text-lg font-medium">
            {step === 0 && 'Шаг 1. Кто вы?'}
            {step === 1 && 'Шаг 2. Есть ли в семье дети?'}
            {step === 2 && 'Шаг 3. Что вас интересует?'}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {step === 0 &&
              STEP_STATUS.map((o) => (
                <QuizOption key={o.id} option={o} onClick={pick(() => setStatus(o.id as Recipient))} />
              ))}
            {step === 1 &&
              STEP_CHILDREN.map((o) => (
                <QuizOption key={o.id} option={o} onClick={pick(() => setHasChildren(o.id === 'yes'))} />
              ))}
            {step === 2 &&
              STEP_TOPIC.map((o) => (
                <QuizOption key={o.id} option={o} onClick={pick(() => setTopic(o.id))} />
              ))}
          </div>
        </>
      )}

      {step >= 3 && (
        <div>
          <p className="mb-4 text-lg">
            {results.length > 0
              ? `Вам подходят меры поддержки (${results.length}):`
              : 'Подходящих мер не найдено. Попробуйте изменить ответы или позвоните на горячую линию 8 (800) 350-06-05.'}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((m) => (
              <MeasureCard key={m.id} measure={m} />
            ))}
          </div>
          <Button variant="outline" className="mt-6 gap-2" onClick={reset}>
            <RotateCcw className="h-4 w-4" aria-hidden /> Пройти заново
          </Button>
        </div>
      )}
    </div>
  )
}

function QuizOption({ option, onClick }: { option: Option; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg border-2 border-slate-200 bg-white px-4 py-4 text-left transition-colors',
        'hover:border-[#3d4a22] hover:bg-[#efead6] focus-visible:border-[#3d4a22] focus-visible:outline-none',
      )}
    >
      <span className="block font-medium">{option.label}</span>
      {option.hint && <span className="mt-1 block text-sm text-muted-foreground">{option.hint}</span>}
    </button>
  )
}

// Подсказка по количеству мер в категории (для главной)
export function categoryCount(id: CategoryId): number {
  return MEASURES.filter((m) => m.category === id).length
}

export { CATEGORIES }
