// Поиск с автоподсказками по каталогу мер.
// Ввод → выпадающий список совпадений; Enter или выбор → переход.
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Search } from 'lucide-react'
import { MEASURES } from '@/data/measures'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function searchMeasures(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return MEASURES.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.short.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q),
  )
}

export default function SearchBar({ large }: { large?: boolean }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const navigate = useNavigate()
  const boxRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => searchMeasures(query).slice(0, 6), [query])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const go = (id?: string) => {
    setOpen(false)
    if (id) {
      navigate(`/measure/${id}`)
      setQuery('')
    } else if (query.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="relative">
        <Search
          className={cn('pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400', large ? 'h-5 w-5' : 'h-4 w-4')}
          aria-hidden
        />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              go(activeIndex >= 0 ? suggestions[activeIndex]?.id : undefined)
            } else if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActiveIndex((i) => Math.max(i - 1, -1))
            } else if (e.key === 'Escape') {
              setOpen(false)
            }
          }}
          placeholder="Найти меру поддержки: выплата, ЖКУ, путёвка…"
          className={cn('bg-white', large ? 'h-14 pl-11 text-lg' : 'h-10 pl-9')}
          role="combobox"
          aria-expanded={open && suggestions.length > 0}
          aria-label="Поиск по мерам поддержки"
        />
      </div>
      {open && suggestions.length > 0 && (
        <ul
          className="absolute z-30 mt-1 w-full overflow-hidden rounded-md border bg-white shadow-lg"
          role="listbox"
        >
          {suggestions.map((m, i) => (
            <li key={m.id} role="option" aria-selected={i === activeIndex}>
              <button
                className={cn(
                  'block w-full px-4 py-3 text-left text-sm hover:bg-slate-100',
                  i === activeIndex && 'bg-slate-100',
                )}
                onMouseDown={(e) => {
                  e.preventDefault()
                  go(m.id)
                }}
              >
                <span className="block font-medium text-slate-900">{m.title}</span>
                <span className="block truncate text-xs text-slate-500">{m.amount}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
