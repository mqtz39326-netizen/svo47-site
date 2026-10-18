// Каталог мер поддержки: карточки, фильтры (категория, статус, ведомство),
// поиск, сортировка (алфавит / размер выплаты).
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { SlidersHorizontal, X } from 'lucide-react'
import MeasureCard from '@/components/MeasureCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORIES, DEPARTMENTS, MEASURES, RECIPIENT_LABELS } from '@/data/measures'
import type { CategoryId, Recipient } from '@/data/types'
import { searchMeasures } from '@/components/SearchBar'
import { useStatus } from '@/components/StatusSwitcher'

type SortMode = 'alpha' | 'amount-desc' | 'amount-asc'

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const { status } = useStatus()

  const category = (params.get('category') ?? 'all') as CategoryId | 'all'
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [recipient, setRecipient] = useState<Recipient | 'all'>(status ?? 'all')
  const [department, setDepartment] = useState<string>('all')
  const [sort, setSort] = useState<SortMode>('alpha')

  const filtered = useMemo(() => {
    let list = [...MEASURES]
    if (query.trim()) {
      const found = new Set(searchMeasures(query).map((m) => m.id))
      list = list.filter((m) => found.has(m.id))
    }
    if (category !== 'all') list = list.filter((m) => m.category === category)
    if (recipient !== 'all') list = list.filter((m) => m.recipients.includes(recipient))
    if (department !== 'all') list = list.filter((m) => m.department === department)
    switch (sort) {
      case 'alpha':
        list.sort((a, b) => a.title.localeCompare(b.title, 'ru'))
        break
      case 'amount-desc':
        list.sort((a, b) => b.amountValue - a.amountValue)
        break
      case 'amount-asc':
        list.sort((a, b) => a.amountValue - b.amountValue)
        break
    }
    return list
  }, [query, category, recipient, department, sort])

  const resetFilters = () => {
    setQuery('')
    setRecipient('all')
    setDepartment('all')
    setSort('alpha')
    setParams({})
  }

  const hasFilters = query || category !== 'all' || recipient !== 'all' || department !== 'all'

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Хлебные крошки" className="mb-4 text-sm text-muted-foreground">
        <a href="#/" className="hover:underline">Главная</a>
        <span aria-hidden> / </span>
        <span aria-current="page">Каталог мер</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-[#3d4a22] sm:text-3xl">Каталог мер поддержки</h1>
      <p className="mb-6 max-w-2xl text-muted-foreground">
        Все меры социальной поддержки участников СВО и членов их семей, действующие в Ленинградской области.
        Найдено: {filtered.length} из {MEASURES.length}.
      </p>

      {/* Панель фильтров */}
      <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Поиск и фильтры
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию и описанию…"
            aria-label="Поиск по каталогу"
            className="lg:col-span-2"
          />
          <Select
            value={category}
            onValueChange={(v) => setParams(v === 'all' ? {} : { category: v })}
          >
            <SelectTrigger aria-label="Категория">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={recipient} onValueChange={(v) => setRecipient(v as Recipient | 'all')}>
            <SelectTrigger aria-label="Кому положено">
              <SelectValue placeholder="Кому положено" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все получатели</SelectItem>
              {(Object.keys(RECIPIENT_LABELS) as Recipient[]).map((r) => (
                <SelectItem key={r} value={r}>
                  {RECIPIENT_LABELS[r]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger aria-label="Ведомство">
              <SelectValue placeholder="Ведомство" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все ведомства</SelectItem>
              {DEPARTMENTS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Select value={sort} onValueChange={(v) => setSort(v as SortMode)}>
            <SelectTrigger className="w-56" aria-label="Сортировка">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alpha">По алфавиту (А–Я)</SelectItem>
              <SelectItem value="amount-desc">По размеру выплаты (по убыванию)</SelectItem>
              <SelectItem value="amount-asc">По размеру выплаты (по возрастанию)</SelectItem>
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={resetFilters}>
              <X className="h-4 w-4" aria-hidden />
              Сбросить фильтры
            </Button>
          )}
        </div>
      </div>

      {/* Результаты */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MeasureCard key={m.id} measure={m} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-white p-10 text-center">
          <p className="text-lg font-medium">По вашему запросу ничего не найдено</p>
          <p className="mt-2 text-muted-foreground">
            Попробуйте изменить условия поиска или позвоните на горячую линию{' '}
            <a href="tel:88003500605" className="font-semibold text-[#6f5c17] hover:underline">
              8 (800) 350-06-05
            </a>
            .
          </p>
        </div>
      )}
    </div>
  )
}
