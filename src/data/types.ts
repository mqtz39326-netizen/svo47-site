// ============================================================
// Типы данных каталога мер поддержки.
// Чтобы добавить/изменить меру, редактируйте файлы в src/data —
// правок кода компонентов не требуется.
// ============================================================

/** Категории мер (плитки-навигаторы на главной) */
export type CategoryId =
  | 'payments'   // Социальные выплаты
  | 'health'     // Здравоохранение и реабилитация
  | 'housing'    // Жилищные меры и ЖКХ
  | 'transport'  // Транспорт и проезд
  | 'education'  // Образование, отдых и оздоровление детей
  | 'work'       // Трудоустройство и обучение
  | 'bereaved'   // Меры для членов семей погибших (умерших)
  | 'other'      // Прочие меры

/** Статус получателя */
export type Recipient =
  | 'participant' // Участник СВО
  | 'family'      // Член семьи участника
  | 'bereaved'    // Член семьи погибшего (умершего)

export interface MeasureContact {
  name: string
  address?: string
  phone?: string
  email?: string
  site?: string
  hours?: string
}

export interface Measure {
  /** Уникальный slug — используется в URL (#/measure/<id>) */
  id: string
  title: string
  category: CategoryId
  /** Краткое описание для карточки (1–2 предложения) */
  short: string
  /** Размер выплаты / объём льготы в читаемом виде */
  amount: string
  /** Числовое значение для сортировки (руб., максимальный размер; 0 — если мера неденежная) */
  amountValue: number
  /** Кому положено — теги статусов */
  recipients: Recipient[]
  /** Ответственное ведомство */
  department: string
  /** Полное описание категории получателей */
  who: string
  /** Нормативная база (номера и даты НПА) */
  legalBasis: string[]
  /** Пошаговая инструкция «Как оформить» */
  steps: string[]
  /** Необходимые документы */
  documents: string[]
  /** Контакты ответственного учреждения */
  contacts: MeasureContact[]
  /** Ссылка на официальный источник */
  source: string
  /** Дата актуализации информации (ДД.ММ.ГГГГ) */
  updated: string
}

export interface Institution {
  id: string
  name: string
  kind: 'cszn' | 'mfc' | 'fund' | 'committee' | 'other'
  address?: string
  phone?: string
  email?: string
  site?: string
  hours?: string
  note?: string
}

export interface FaqItem {
  q: string
  a: string
}
