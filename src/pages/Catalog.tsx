// Каталог мер поддержки. Система фильтров повторяет каталог Госуслуг
// «Меры поддержки для защитников Отечества» (https://www.gosuslugi.ru/fzo):
// чипы получателей, мультивыбор «Направление», список «Тип меры».
// Разметка мер по этой таксономии — в src/data/gosfilters.ts.
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import MeasureCard from '@/components/MeasureCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MEASURES } from '@/data/measures'
import {
  GOS_CATEGORY_TO_DIRECTIONS,
  GOS_DIRECTIONS,
  GOS_GROUPS,
  GOS_LEVELS,
  gosTags,
  type GosDirection,
  type GosGroup,
  type GosLevel,
} from '@/data/gosfilters'
import { searchMeasures } from '@/components/SearchBar'
import { cn } from '@/lib/utils'

type SortMode = 'alpha' | 'amount-desc' | 'amount-asc'

export default function Catalog() {
  const [params] = useSearchParams()

  // Старые ссылки /catalog?category=<id> (плитки главной, хлебные крошки)
  // переводим в предвыбранные направления Госуслуг.
  const categoryParam = params.get('category')
  const initialDirections = categoryParam
    ? (GOS_CATEGORY_TO_DIRECTIONS[categoryParam] ?? [])
    : []

  const [query, setQuery] = useState(params.get('q') ?? '')
  const [group, setGroup] = useState<GosGroup | 'all'>('all')
  const [directions, setDirections] = useState<GosDirection[]>(initialDirections)
  const [level, setLevel] = useState<GosLevel | 'all'>('all')
  const [sort, setSort] = useState<SortMode>('alpha')

  const toggleDirection = (d: GosDirection) =>
    setDirections((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]))

  const filtered = useMemo(() => {
    let list = [...MEASURES]
    if (query.trim()) {
      const found = new Set(searchMeasures(query).map((m) => m.id))
      list = list.filter((m) => found.has(m.id))
    }
    if (group !== 'all') list = list.filter((m) => gosTags(m.id).groups.includes(group))
    if (directions.length > 0)
      list = list.filter((m) => gosTags(m.id).directions.some((d) => directions.includes(d)))
    if (level !== 'all') list = list.filter((m) => gosTags(m.id).level === level)
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
  }, [query, group, directions, level, sort])

  const resetFilters = () => {
    setQuery('')
    setGroup('all')
    setDirections([])
    setLevel('all')
    setSort('alpha')
  }

  const hasFilters =
    query || group !== 'all' || directions.length > 0 || level !== 'all'

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Хлебные крошки" className="mb-4 text-sm text-muted-foreground">
        <a href="#/" className="hover:underline">Главная</a>
        <span aria-hidden> / </span>
        <span aria-current="page">Каталог мер</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-[#3d4a22] sm:text-3xl">
        Меры поддержки для жителей Ленинградской области
      </h1>
      <p className="mb-6 max-w-2xl text-muted-foreground">
        Найдено: {filtered.length} из {MEASURES.length}.
      </p>

      {/* Панель фильтров — как в каталоге Госуслуг */}
      <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Фильтры
        </div>

        {/* Получатели — чипы */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Кому положено">
          <button
            type="button"
            onClick={() => setGroup('all')}
            aria-pressed={group === 'all'}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              group === 'all'
                ? 'border-[#3d4a22] bg-[#3d4a22] text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-[#3d4a22]/50',
            )}
          >
            Все
          </button>
          {GOS_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGroup(g.id)}
              aria-pressed={group === g.id}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                group === g.id
                  ? 'border-[#3d4a22] bg-[#3d4a22] text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-[#3d4a22]/50',
              )}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Направление и тип меры */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию и описанию…"
            aria-label="Поиск по каталогу"
            className="lg:col-span-2"
          />
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Направление"
              >
                <span className={cn('truncate', directions.length === 0 && 'text-muted-foreground')}>
                  {directions.length === 0
                    ? 'Направление'
                    : directions.length === 1
                      ? GOS_DIRECTIONS.find((d) => d.id === directions[0])?.label
                      : `Выбрано ${directions.length} знач.`}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-2" align="start">
              <ul className="max-h-72 overflow-y-auto">
                {GOS_DIRECTIONS.map((d) => {
                  const checked = directions.includes(d.id)
                  return (
                    <li key={d.id}>
                      <label className="flex cursor-pointer items-start gap-2.5 rounded-md px-2 py-2 text-sm hover:bg-accent">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleDirection(d.id)}
                          className="mt-0.5"
                          aria-label={d.label}
                        />
                        <span>{d.label}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </PopoverContent>
          </Popover>
          <Select value={level} onValueChange={(v) => setLevel(v as GosLevel | 'all')}>
            <SelectTrigger aria-label="Тип меры">
              <SelectValue placeholder="Тип меры" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              {GOS_LEVELS.map((l) => (
                <SelectItem key={l.id} value={l.id}>
                  {l.label}
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
