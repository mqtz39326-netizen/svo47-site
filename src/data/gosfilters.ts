// ============================================================
// Таксономия фильтров портала Госуслуг «Меры поддержки для
// защитников Отечества» (https://www.gosuslugi.ru/fzo):
// группы получателей, направления и тип меры — один в один,
// как в их каталоге. Разметка наших мер по этой таксономии
// вынесена сюда, чтобы не трогать measures.ts.
// ============================================================

/** Группы получателей (чипы «Все / Ветеранам СВО / …») */
export type GosGroup = 'veterans' | 'invalids' | 'donbass' | 'bereaved'

/** Направления (выпадающий список «Направление») */
export type GosDirection =
  | 'payments'      // Выплаты и льготы
  | 'psychology'    // Психологическая помощь
  | 'documents'     // Оформление документов
  | 'social'        // Социальная адаптация, обучение и трудоустройство
  | 'medical'       // Медицинская помощь и надомный уход
  | 'legal'         // Юридическая помощь
  | 'rest'          // Отдых и оздоровление
  | 'medicines'     // Обеспечение лекарствами
  | 'tsr'           // Технические средства реабилитации
  | 'housing-adapt' // Адаптация жилья для инвалидов
  | 'property'      // Имущественная поддержка

/** Тип меры (выпадающий список «Тип меры») */
export type GosLevel = 'fund' | 'federal' | 'regional' | 'municipal'

export const GOS_GROUPS: { id: GosGroup; label: string }[] = [
  { id: 'veterans', label: 'Ветеранам СВО' },
  { id: 'invalids', label: 'Инвалидам СВО' },
  { id: 'donbass', label: 'Защитникам Донбасса' },
  { id: 'bereaved', label: 'Семьям погибших или умерших' },
]

export const GOS_DIRECTIONS: { id: GosDirection; label: string }[] = [
  { id: 'payments', label: 'Выплаты и льготы' },
  { id: 'psychology', label: 'Психологическая помощь' },
  { id: 'documents', label: 'Оформление документов' },
  { id: 'social', label: 'Социальная адаптация, обучение и трудоустройство' },
  { id: 'medical', label: 'Медицинская помощь и надомный уход' },
  { id: 'legal', label: 'Юридическая помощь' },
  { id: 'rest', label: 'Отдых и оздоровление' },
  { id: 'medicines', label: 'Обеспечение лекарствами' },
  { id: 'tsr', label: 'Технические средства реабилитации' },
  { id: 'housing-adapt', label: 'Адаптация жилья для инвалидов' },
  { id: 'property', label: 'Имущественная поддержка' },
]

export const GOS_LEVELS: { id: GosLevel; label: string }[] = [
  { id: 'fund', label: 'Мера Фонда' },
  { id: 'federal', label: 'Федеральная' },
  { id: 'regional', label: 'Региональная' },
  { id: 'municipal', label: 'Муниципальная' },
]

export interface GosTags {
  groups: GosGroup[]
  directions: GosDirection[]
  level: GosLevel
}

// Участник СВО и члены его семьи — в каталоге Госуслуг такие меры
// помечаются группами «Ветеранам СВО», «Инвалидам СВО», «Защитникам Донбасса».
const P: GosGroup[] = ['veterans', 'invalids', 'donbass']
const B: GosGroup[] = ['bereaved']
const ALL_G: GosGroup[] = ['veterans', 'invalids', 'donbass', 'bereaved']

/** Разметка каждой меры каталога по таксономии Госуслуг */
export const GOS_TAGS: Record<string, GosTags> = {
  'edv-uveche': { groups: P, directions: ['payments'], level: 'regional' },
  'edv-semyam-pogibshih': { groups: B, directions: ['payments'], level: 'regional' },
  'kompensaciya-zhku': { groups: P, directions: ['property'], level: 'regional' },
  'kompensaciya-toplivo': { groups: P, directions: ['property'], level: 'regional' },
  'lgotnyj-proezd': { groups: ALL_G, directions: ['payments'], level: 'regional' },
  'zd-proezd-deti': { groups: ALL_G, directions: ['payments'], level: 'regional' },
  'posobie-berem-edinovremennoe': { groups: P, directions: ['payments'], level: 'regional' },
  'posobie-berem-ezhemesyachnoe': { groups: P, directions: ['payments'], level: 'regional' },
  'zuboprotezirovanie': { groups: P, directions: ['medical'], level: 'regional' },
  'edv-zhilje-invalidam': { groups: ALL_G, directions: ['property'], level: 'regional' },
  'edv-kapremont': { groups: B, directions: ['property'], level: 'regional' },
  'zemelnyj-uchastok': { groups: ALL_G, directions: ['property'], level: 'regional' },
  'kompensaciya-putevki': { groups: B, directions: ['rest'], level: 'regional' },
  'sertifikat-detskij-otdyh': { groups: ALL_G, directions: ['rest'], level: 'regional' },
  'stipendiya-gubernatora': { groups: ALL_G, directions: ['social'], level: 'regional' },
  'dopobrazovanie-sad': { groups: ALL_G, directions: ['social'], level: 'regional' },
  'viplata-30000': { groups: P, directions: ['payments'], level: 'fund' },
  'poterya-kormiltsa': { groups: B, directions: ['payments'], level: 'regional' },
  'kompensaciya-pamyatnik': { groups: B, directions: ['payments'], level: 'federal' },
  'socialnoe-taksi': { groups: B, directions: ['payments'], level: 'regional' },
  'zdravnica-47': { groups: P, directions: ['rest'], level: 'regional' },
  'domoj-bez-pregrad': { groups: P, directions: ['housing-adapt'], level: 'regional' },
  'tsr-prokat': { groups: P, directions: ['tsr'], level: 'federal' },
  'trudoustrojstvo': { groups: ALL_G, directions: ['social'], level: 'regional' },
  'vyplaty-kontrakt': { groups: P, directions: ['payments'], level: 'regional' },
  'spisanie-kreditov': { groups: P, directions: ['payments'], level: 'federal' },
  'konkurs-moj-geroj': { groups: ALL_G, directions: ['social'], level: 'regional' },
}

export function gosTags(measureId: string): GosTags {
  return GOS_TAGS[measureId] ?? { groups: ALL_G, directions: [], level: 'regional' }
}

/**
 * Переходы со старых ссылок вида /catalog?category=<id>
 * (плитки на главной, хлебные крошки) — на направления Госуслуг.
 */
export const GOS_CATEGORY_TO_DIRECTIONS: Record<string, GosDirection[]> = {
  payments: ['payments'],
  health: ['medical', 'rest', 'housing-adapt', 'tsr'],
  housing: ['property'],
  transport: ['payments'],
  education: ['rest', 'social'],
  work: ['social'],
  bereaved: ['payments'],
  other: ['payments', 'social'],
}
