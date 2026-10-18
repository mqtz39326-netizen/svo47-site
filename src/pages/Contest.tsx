// Отдельная страница конкурса «Мой Герой СВО 47».
// Источник: msu.lenobl.ru (Комитет по местному самоуправлению ЛО).
import { Link } from 'react-router'
import { pub } from '@/lib/utils'
import {
  Trophy,
  Newspaper,
  Radio,
  Tv,
  Video,
  CalendarDays,
  Mail,
  FileText,
  Users,
  Hash,
  ExternalLink,
  Printer,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import FeedbackDialog from '@/components/FeedbackDialog'

const PAGE_URL =
  'https://msu.lenobl.ru/ru/programmy-i-plany/konkursy/konkurs-moj-geroj-svo-47/'

const NOMINATIONS = [
  {
    icon: Newspaper,
    title: 'Статья, репортаж',
    requirements: ['Объём текста: от 2000 до 4500 символов', 'Текст не должен содержать заимствований'],
  },
  {
    icon: Radio,
    title: 'Радиосюжет',
    requirements: [
      'Формат аудиофайла: MP3',
      'Продолжительность: от 2 до 5 минут',
      'Жанр определяет участник (интервью, репортаж)',
    ],
  },
  {
    icon: Tv,
    title: 'ТВ-сюжет',
    requirements: [
      'Формат видеофайла: MP4, MOV, TS, MKV, AVI, WMV',
      'Продолжительность: от 2 до 5 минут',
      'Жанр определяет участник (интервью, репортаж, видеоклип, статья)',
    ],
  },
  {
    icon: Video,
    title: 'Видеоролик',
    requirements: [
      'Формат видеофайла: MP4, MOV, TS, MKV, AVI, WMV',
      'Продолжительность: от 2 до 5 минут',
      'Программы и инструменты монтажа — на усмотрение участника',
    ],
  },
]

const PRIZES = [
  { place: '1 место', prize: '15 000 ₽' },
  { place: '2 место', prize: '10 000 ₽' },
  { place: '3 место', prize: '5 000 ₽' },
]

export default function Contest() {
  return (
    <article className="pb-4">
      {/* Шапка страницы */}
      <section className="relative overflow-hidden bg-[#3d4a22] text-white print:hidden">
        <img
          src={pub('/hero-bg.jpg')}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#232a17]/95 via-[#3d4a22]/85 to-[#55652f]/50" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:py-14">
          <nav aria-label="Хлебные крошки" className="mb-4 text-sm text-[#cfc99d]">
            <Link to="/" className="hover:underline">Главная</Link>
            <span aria-hidden> / </span>
            <span aria-current="page">Конкурс «Мой Герой СВО 47»</span>
          </nav>
          <div className="flex items-center gap-3">
            <Trophy className="h-9 w-9 text-[#d9c46a]" aria-hidden />
            <h1 className="stencil-heading text-2xl font-bold leading-tight sm:text-4xl">
              Конкурс «Мой Герой СВО 47»
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-[#dcd6b2] sm:text-lg">
            Ежегодный конкурс для жителей Ленинградской области в возрасте от 7 до 23 лет —
            о подвигах, мужестве и героизме российских военнослужащих.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge className="bg-[#6f5c17] text-white hover:bg-[#6f5c17]">
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" aria-hidden />
              Приём заявок: 1 октября — 15 ноября 2026 года
            </Badge>
            <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/15">
              <Hash className="mr-1 h-3.5 w-3.5" aria-hidden />
              МойГеройСВО47
            </Badge>
          </div>
        </div>
        <div className="military-stripes" aria-hidden />
      </section>

      <div className="mx-auto max-w-4xl px-4">
        {/* Хлебные крошки для печати */}
        <p className="mt-6 hidden text-sm print:block">Конкурс «Мой Герой СВО 47» — Ленинградская область</p>

        {/* О конкурсе */}
        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#3d4a22]">
            <Users className="h-5 w-5" aria-hidden />
            О конкурсе
          </h2>
          <p className="leading-relaxed">
            Конкурс проводится ежегодно в соответствии с Положением, утверждённым постановлением
            Правительства Ленинградской области от 16 августа 2024 года № 563.
          </p>
          <p className="mt-3 font-medium">Цели конкурса:</p>
          <ul className="mt-2 list-inside list-disc space-y-1.5 leading-relaxed">
            <li>информирование жителей региона о подвигах, мужестве и героизме, проявленных российскими военнослужащими в ходе специальной военной операции;</li>
            <li>патриотическое воспитание молодёжи;</li>
            <li>укрепление гражданского единства;</li>
            <li>повышение социальной активности и гражданской ответственности.</li>
          </ul>
          <p className="mt-3 leading-relaxed">
            Участвовать могут учащиеся образовательных организаций Ленинградской области и жители региона
            в возрасте от 7 до 23 лет. Принимаются индивидуальные и коллективные работы — не более одной
            работы в каждой из номинаций.
          </p>
        </section>

        {/* Номинации */}
        <section className="mt-6">
          <h2 className="mb-4 text-lg font-bold text-[#3d4a22]">Номинации и требования к работам</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {NOMINATIONS.map((n) => (
              <div key={n.title} className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3d4a22]/10 text-[#3d4a22]">
                    <n.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-semibold">{n.title}</h3>
                </div>
                <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-slate-700">
                  {n.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Работа должна содержать рассказ о подвигах, мужестве, героизме, отваге и доблести граждан РФ,
            принимающих (принимавших) участие в СВО. Не принимаются работы, нарушающие требования
            законодательства, содержащие призывы к терроризму, экстремизму, дискриминации, рекламного
            характера или оскорбляющие достоинство и чувства других лиц.
          </p>
        </section>

        {/* Призы */}
        <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#3d4a22]">
            <Trophy className="h-5 w-5" aria-hidden />
            Награды
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Победители и призёры награждаются дипломами и ценными подарками:
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {PRIZES.map((p) => (
              <div key={p.place} className="rounded-lg bg-[#f2f0e6] p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">{p.place}</p>
                <p className="mt-1 text-xl font-black text-[#6f5c17]">{p.prize}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Как подать заявку */}
        <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#3d4a22]">
            <Mail className="h-5 w-5" aria-hidden />
            Как подать заявку
          </h2>
          <ol className="space-y-3">
            {[
              'Подготовьте работу по требованиям выбранной номинации.',
              'Опубликуйте работу в социальных сетях «ВКонтакте», «Одноклассники» или «Телеграм». Аккаунт должен быть общедоступным, публикация — содержать хештег конкурса #МойГеройСВО47.',
              'Скачайте и заполните формы на официальной странице конкурса: заявку (приложение 1) и согласие на обработку персональных данных (приложение 2).',
              'До 15 ноября 2026 года включительно направьте одним письмом на адрес moygeroy_svo47@lenreg.ru заявку со ссылкой на опубликованную работу и согласие на обработку персональных данных.',
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3d4a22] text-sm font-bold text-white" aria-hidden>
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="gap-2 bg-[#3d4a22] hover:bg-[#2f3a1b]">
              <a href="mailto:moygeroy_svo47@lenreg.ru?subject=%D0%9A%D0%BE%D0%BD%D0%BA%D1%83%D1%80%D1%81%20%C2%AB%D0%9C%D0%BE%D0%B9%20%D0%93%D0%B5%D1%80%D0%BE%D0%B9%20%D0%A1%D0%92%D0%9E%2047%C2%BB">
                <Mail className="h-4 w-4" aria-hidden />
                moygeroy_svo47@lenreg.ru
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href={PAGE_URL} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" aria-hidden />
                Официальная страница и формы документов
              </a>
            </Button>
          </div>
        </section>

        {/* Документы */}
        <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#3d4a22]">
            <FileText className="h-5 w-5" aria-hidden />
            Документы конкурса
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            На официальной странице конкурса доступны для скачивания:
          </p>
          <ul className="list-inside list-disc space-y-1.5 leading-relaxed">
            <li>Положение о конкурсе (docx);</li>
            <li>Заявка участника (docx);</li>
            <li>Согласие на обработку персональных данных (docx);</li>
            <li>Список победителей и призёров конкурса «Мой Герой СВО 47» в 2025 году (docx).</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Организатор: Комитет по местному самоуправлению, межнациональным и межконфессиональным
            отношениям Ленинградской области. Страница обновлена 28.09.2026.
          </p>
        </section>

        {/* Действия */}
        <div className="mt-6 flex flex-wrap items-center gap-3 print:hidden">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden />
            Распечатать
          </Button>
          <FeedbackDialog subject={'Вопрос о конкурсе «Мой Герой СВО 47»\n\n'} />
          <Link to="/measure/konkurs-moj-geroj" className="text-sm font-medium text-[#3d4a22] hover:underline">
            Карточка конкурса в каталоге мер →
          </Link>
        </div>
      </div>
    </article>
  )
}
