// Карточка меры поддержки в каталоге и списках
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CATEGORIES, RECIPIENT_LABELS } from '@/data/measures'
import { CATEGORY_ICONS } from '@/components/categoryIcons'
import type { Measure } from '@/data/types'

export default function MeasureCard({ measure }: { measure: Measure }) {
  const category = CATEGORIES.find((c) => c.id === measure.category)
  const Icon = CATEGORY_ICONS[measure.category]

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="h-4 w-4 shrink-0" aria-hidden />
          <span>{category?.title}</span>
        </div>
        <CardTitle className="text-lg leading-snug">
          <Link to={`/measure/${measure.id}`} className="hover:text-[#3d4a22] hover:underline">
            {measure.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <p className="text-sm leading-relaxed text-slate-600">{measure.short}</p>
        {measure.amountValue > 0 || measure.amount ? (
          <p className="text-base font-semibold text-[#6f5c17]">{measure.amount}</p>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1.5 pt-0">
        {measure.recipients.map((r) => (
          <Badge key={r} variant="secondary" className="font-normal">
            {RECIPIENT_LABELS[r]}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
