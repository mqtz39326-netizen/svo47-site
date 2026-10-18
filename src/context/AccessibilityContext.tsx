// Версия для слабовидящих: размер шрифта, контрастная схема,
// отключение изображений. Настройки сохраняются в localStorage.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type FontScale = 'normal' | 'large' | 'xl'

interface A11yState {
  fontScale: FontScale
  contrast: boolean
  noImages: boolean
  setFontScale: (v: FontScale) => void
  setContrast: (v: boolean) => void
  setNoImages: (v: boolean) => void
  reset: () => void
}

const AccessibilityContext = createContext<A11yState | null>(null)

const STORAGE_KEY = 'a11y-settings'

function load(): { fontScale: FontScale; contrast: boolean; noImages: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { fontScale: 'normal', contrast: false, noImages: false, ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return { fontScale: 'normal', contrast: false, noImages: false }
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('a11y-large', state.fontScale === 'large')
    root.classList.toggle('a11y-xl', state.fontScale === 'xl')
    root.classList.toggle('a11y-contrast', state.contrast)
    root.classList.toggle('a11y-noimg', state.noImages)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const value: A11yState = {
    ...state,
    setFontScale: (fontScale) => setState((s) => ({ ...s, fontScale })),
    setContrast: (contrast) => setState((s) => ({ ...s, contrast })),
    setNoImages: (noImages) => setState((s) => ({ ...s, noImages })),
    reset: () => setState({ fontScale: 'normal', contrast: false, noImages: false }),
  }

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}

export function useAccessibility(): A11yState {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider')
  return ctx
}
