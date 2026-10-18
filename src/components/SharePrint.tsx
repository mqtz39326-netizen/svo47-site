// Кнопки «Распечатать» и «Поделиться» для карточки меры
import { useState } from 'react'
import { Printer, Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SharePrint({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        /* пользователь отменил */
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Скопируйте ссылку:', url)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
        <Printer className="h-4 w-4" aria-hidden />
        Распечатать
      </Button>
      <Button variant="outline" size="sm" className="gap-2" onClick={share}>
        {copied ? <Check className="h-4 w-4 text-green-600" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
        {copied ? 'Ссылка скопирована' : 'Поделиться'}
      </Button>
    </div>
  )
}
