// Панель «Версия для слабовидящих» (по ГОСТ Р 52872-2019):
// размер шрифта, контрастная схема, отключение изображений.
import { Eye } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useAccessibility, type FontScale } from '@/context/AccessibilityContext'
import { cn } from '@/lib/utils'

const SCALES: { id: FontScale; label: string }[] = [
  { id: 'normal', label: 'А' },
  { id: 'large', label: 'А+' },
  { id: 'xl', label: 'А++' },
]

export default function AccessibilityButton() {
  const a11y = useAccessibility()
  const active = a11y.fontScale !== 'normal' || a11y.contrast || a11y.noImages

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={active ? 'default' : 'outline'}
          size="sm"
          className={cn('gap-2', !active && 'bg-transparent')}
          aria-label="Версия для слабовидящих"
        >
          <Eye className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline lg:hidden xl:inline">Версия для слабовидящих</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Версия для слабовидящих</DialogTitle>
          <DialogDescription>
            Настройте отображение сайта под себя. Настройки сохранятся автоматически.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-2">
          <div>
            <Label className="mb-3 block text-base">Размер шрифта</Label>
            <div className="flex gap-2" role="group" aria-label="Размер шрифта">
              {SCALES.map((s) => (
                <Button
                  key={s.id}
                  variant={a11y.fontScale === s.id ? 'default' : 'outline'}
                  onClick={() => a11y.setFontScale(s.id)}
                  className="min-w-14 text-lg font-bold"
                  aria-pressed={a11y.fontScale === s.id}
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="a11y-contrast" className="text-base leading-snug">
              Высокая контрастность
              <span className="block text-sm text-muted-foreground">Чёрно-белая схема</span>
            </Label>
            <Switch
              id="a11y-contrast"
              checked={a11y.contrast}
              onCheckedChange={a11y.setContrast}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="a11y-noimg" className="text-base leading-snug">
              Отключить изображения
              <span className="block text-sm text-muted-foreground">Быстрая загрузка страниц</span>
            </Label>
            <Switch
              id="a11y-noimg"
              checked={a11y.noImages}
              onCheckedChange={a11y.setNoImages}
            />
          </div>
          <Button variant="secondary" className="w-full" onClick={a11y.reset}>
            Сбросить настройки
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
