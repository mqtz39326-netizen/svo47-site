// Переключатель «Я участник СВО / Я член семьи / Я член семьи погибшего».
// Управляет фильтрацией контента под статус посетителя.
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Recipient } from '@/data/types'
import { RECIPIENT_LABELS } from '@/data/measures'
import { cn } from '@/lib/utils'

interface StatusState {
  status: Recipient | null
  setStatus: (s: Recipient | null) => void
}

const StatusContext = createContext<StatusState | null>(null)

export function StatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Recipient | null>(null)
  return <StatusContext.Provider value={{ status, setStatus }}>{children}</StatusContext.Provider>
}

export function useStatus(): StatusState {
  const ctx = useContext(StatusContext)
  if (!ctx) throw new Error('useStatus must be used within StatusProvider')
  return ctx
}

const OPTIONS: { id: Recipient; label: string }[] = [
  { id: 'participant', label: 'Я участник СВО' },
  { id: 'family', label: 'Я член семьи' },
  { id: 'bereaved', label: 'Я член семьи погибшего' },
]

export function StatusSwitcher({ compact }: { compact?: boolean }) {
  const { status, setStatus } = useStatus()
  return (
    <div
      className={cn(
        'inline-flex flex-wrap gap-1 rounded-lg border bg-white p-1 shadow-sm',
        compact && 'text-sm',
      )}
      role="group"
      aria-label="Выберите ваш статус"
    >
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          onClick={() => setStatus(status === o.id ? null : o.id)}
          aria-pressed={status === o.id}
          className={cn(
            'rounded-md px-3 py-2 text-sm font-medium transition-colors sm:px-4',
            status === o.id
              ? 'bg-[#3d4a22] text-white shadow'
              : 'text-slate-700 hover:bg-slate-100',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export { RECIPIENT_LABELS }
