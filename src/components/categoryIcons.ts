// Иконки категорий и переключатель статуса посетителя
import {
  Wallet,
  HeartPulse,
  Home,
  Bus,
  GraduationCap,
  Briefcase,
  Ribbon,
  MoreHorizontal,
  type LucideIcon,
} from 'lucide-react'
import type { CategoryId } from '@/data/types'

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  payments: Wallet,
  health: HeartPulse,
  housing: Home,
  transport: Bus,
  education: GraduationCap,
  work: Briefcase,
  bereaved: Ribbon,
  other: MoreHorizontal,
}
