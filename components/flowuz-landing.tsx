"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Locale = "ru" | "uz";
type Theme = "dark" | "light";

type Plan = {
  name: string;
  forWhom: string;
  price: string;
  promise: string;
  points: string[];
  outcomes: string[];
};

type Copy = {
  nav: string[];
  cta: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimary: string;
  heroSecondary: string;
  statLabels: string[];
  workTitle: string;
  workSubtitle: string;
  steps: string[];
  phoneEyebrow: string;
  phoneTitle: string;
  phoneSubtitle: string;
  lessMinute: string;
  stepCountLabel: string;
  botName: string;
  botStatus: string;
  botTyping: string;
  botSteps: {
    bot: string;
    user?: string;
    buttons?: string[];
  }[];
  dashboardTitle: string;
  dashboardSubtitle: string;
  addBooking: string;
  modalTitle: string;
  modalButton: string;
  days: string[];
  statuses: string[];
  statusLabels: { confirmed: string; cancelled: string; completed: string };
  employeeNames: string[];
  bookings: { name: string; service: string; time: string; status: string; color: string }[];
  actions: string[];
  feed: string[];
  widgets: { label: string; value: string; change: string }[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: { title: string; text: string }[];
  pricingTitle: string;
  pricingSubtitle: string;
  bestChoice: string;
  freeTrial: string;
  noCard: string;
  pricingNote: string;
  plans: Plan[];
  compareTitle: string;
  compareItems: string[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  finalTitle: string;
  finalSubtitle: string;
  contacts: string;
  legal: string;
  footerLinks: string[];
  copyright: string;
  restartDemo: string;
  demoHint: string;
  dashboardHint: string;
  dashboardSchedule: string;
  dashboardActivity: string;
  proSavings: string;
  pricingBadges: string[];
  reduceAdmin: string;
  fewerMissed: string;
  founderEyebrow: string;
  founderTitle: string;
  founderName: string;
  founderProblem: string;
  founderIdea: string;
  founderSolution: string;
  founderVision: string;
};

const copy: Record<Locale, Copy> = {
  ru: {
    nav: ["Возможности", "Демо", "Цены", "FAQ"],
    cta: "Начать бесплатно",
    heroTitle: "FLOWUZ — система записи нового поколения",
    heroSubtitle: "Telegram-запись клиентов, автоматизация и управление бизнесом в одной системе",
    heroPrimary: "Попробовать бесплатно 15 дней",
    heroSecondary: "Посмотреть демо",
    statLabels: ["запись без звонков", "меньше пропусков", "контроль расписания"],
    workTitle: "Клиент записывается сам. Команда видит порядок.",
    workSubtitle: "FLOWUZ соединяет Telegram-бот, расписание, напоминания и панель администратора в один аккуратный процесс.",
    steps: ["Открывает бот", "Выбирает услугу", "Выбирает мастера", "Подтверждает время"],
    phoneEyebrow: "Telegram-запись",
    phoneTitle: "Клиент записывается меньше чем за минуту",
    phoneSubtitle: "Реалистичный сценарий: услуга, мастер, дата, время и подтверждение без участия администратора.",
    lessMinute: "меньше 1 минуты",
    stepCountLabel: "шагов",
    botName: "FLOWUZ запись",
    botStatus: "бот онлайн",
    botTyping: "печатает",
    botSteps: [
      { bot: "Здравствуйте! Я помогу выбрать услугу и свободное время." },
      { user: "Записаться", bot: "Выберите направление", buttons: ["Стоматология", "Салон", "Барбершоп"] },
      { user: "Стоматология", bot: "Выберите врача", buttons: ["Доктор Саида", "Доктор Алина", "Доктор Мадина"] },
      { user: "Доктор Саида", bot: "Выберите дату", buttons: ["Сегодня", "Завтра", "12 июня"] },
      { user: "Завтра", bot: "Свободное время", buttons: ["10:30", "13:00", "17:20"] },
      { user: "13:00", bot: "Подтвердить запись к врачу завтра в 13:00?", buttons: ["Подтвердить"] },
      { user: "Подтвердить", bot: "Готово. Запись подтверждена. Напоминание придет за 24 часа и за 2 часа." },
    ],
    dashboardTitle: "Панель администратора, которая выглядит как продукт, а не таблица",
    dashboardSubtitle: "Календарь, сотрудники, деньги, статусы и автоматизация в одном интерфейсе. Двойная запись блокируется до подтверждения.",
    addBooking: "Добавить запись",
    modalTitle: "Новая запись",
    modalButton: "Создать",
    days: ["Сегодня", "Завтра", "Неделя"],
    statuses: ["подтверждено", "отменено", "завершено"],
    statusLabels: { confirmed: "подтверждено", cancelled: "отменено", completed: "завершено" },
    employeeNames: ["Мадина", "Алина", "Саида"],
    bookings: [
      { name: "Фаррух", service: "Стрижка", time: "10:30", status: "подтверждено", color: "bg-flowuz-accent" },
      { name: "Нодира", service: "Косметология", time: "13:00", status: "напоминание", color: "bg-sky-300" },
      { name: "Азиза", service: "Лечение", time: "16:20", status: "ожидает", color: "bg-violet-300" },
    ],
    actions: ["Перенести", "Отменить"],
    feed: ["Свободное окно найдено", "Напоминание отправлено", "Двойная запись остановлена"],
    widgets: [
      { label: "Выручка сегодня", value: "3,8 млн сум", change: "+18%" },
      { label: "Записи", value: "42", change: "+11" },
      { label: "Пропуски", value: "2", change: "-31%" },
    ],
    featuresTitle: "Автоматизация вместо хаоса",
    featuresSubtitle: "Сервис закрывает главные причины потерянных записей: забытые сообщения, двойные окна и ручные переносы.",
    features: [
      { title: "Защита от двойных записей", text: "FLOWUZ проверяет окно до подтверждения и показывает конфликт сразу." },
      { title: "Напоминания 24ч / 2ч", text: "Клиент получает аккуратные сообщения, а администратор меньше звонит вручную." },
      { title: "Сотрудники и услуги", text: "У каждого мастера свои услуги, длительность приема и рабочие часы." },
      { title: "Telegram как точка входа", text: "Клиент записывается там, где уже общается каждый день." },
      { title: "Быстрое расписание", text: "Новая запись, перенос или отмена занимают несколько секунд." },
      { title: "Аналитика бизнеса", text: "Видно, какие услуги растут, где появляются пропуски и кто загружен." },
    ],
    pricingTitle: "Тарифы как инвестиция в порядок",
    pricingSubtitle: "FLOWUZ экономит время администратора, снижает пропущенные записи и превращает запись в управляемую систему.",
    bestChoice: "Самый популярный",
    freeTrial: "15 дней бесплатно",
    noCard: "Без привязки карты",
    pricingNote: "Автоматизация вместо хаоса",
    plans: [
      {
        name: "Starter",
        forWhom: "небольшие салоны",
        price: "249 000 сум",
        promise: "Базовая автоматизация: Telegram-запись и напоминания без сложного внедрения.",
        points: ["до 3 сотрудников", "Telegram-бот для клиентов", "защита от двойных окон", "напоминания 24ч / 2ч"],
        outcomes: ["меньше ручных сообщений", "запуск за 1 день"],
      },
      {
        name: "Pro",
        forWhom: "салоны и клиники с активным потоком",
        price: "549 000 сум",
        promise: "Полная автоматизация записи: экономия времени администратора и меньше пропусков.",
        points: [
          "безлимитные записи",
          "Telegram-автоматизация",
          "напоминания 24ч / 2ч",
          "аналитика загрузки",
          "приоритетная поддержка",
          "продвинутое расписание",
        ],
        outcomes: ["−70% нагрузки на администратора", "меньше пропущенных клиентов", "быстрый поток записи"],
      },
      {
        name: "Business",
        forWhom: "клиники и сети",
        price: "990 000 сум",
        promise: "Мультифилиальность, роли доступа и расширенная аналитика для сетей.",
        points: ["несколько филиалов", "несколько администраторов", "расширенная аналитика", "премиальная поддержка", "кастомные интеграции"],
        outcomes: ["единый стандарт записи", "контроль всей сети"],
      },
    ],
    compareTitle: "Что бизнес получает уже в первый месяц",
    compareItems: ["Экономия времени администратора", "Меньше пропущенных записей", "Автоматизация вместо хаоса"],
    faqTitle: "Вопросы перед запуском",
    faq: [
      { q: "Как работает система?", a: "Клиент проходит запись в Telegram, а FLOWUZ проверяет расписание, фиксирует бронь и отправляет напоминания." },
      { q: "Можно ли добавить сотрудников?", a: "Да. Можно настроить сотрудников, услуги, длительность приема, рабочие дни и индивидуальные окна." },
      { q: "Как работает Telegram?", a: "Бот ведет клиента по шагам: услуга, мастер, дата, время, подтверждение. Все синхронизируется с панелью." },
      { q: "Можно ли отменить запись?", a: "Да. Администратор может отменить или перенести запись, а клиент получит обновление в Telegram." },
    ],
    finalTitle: "Запустите современную запись без долгого внедрения",
    finalSubtitle: "FLOWUZ можно показать клиентам уже сегодня: Telegram-бот, панель и напоминания готовы к работе.",
    contacts: "Контакты",
    legal: "Документы",
    footerLinks: ["Возможности", "Демо", "Цены", "Вопросы"],
    copyright: "Все права защищены.",
    restartDemo: "Начать снова",
    demoHint: "Нажмите кнопки в симуляторе — каждый шаг как в реальном Telegram-боте.",
    dashboardHint: "Клик по карточке — смена статуса",
    dashboardSchedule: "Расписание",
    dashboardActivity: "Активность",
    proSavings: "≈ 12 часов администратора в месяц экономии",
    pricingBadges: ["15 дней бесплатно", "Без привязки карты", "−70% нагрузки на администратора"],
    reduceAdmin: "Снижение нагрузки на администратора до 70%",
    fewerMissed: "Меньше пропущенных клиентов",
    founderEyebrow: "О создателе",
    founderTitle: "Идея, рождённая из хаоса записей",
    founderName: "RAMIS DANIYAROV",
    founderProblem:
      "В салонах и клиниках запись часто живёт в мессенджерах, звонках и блокнотах. Администратор тонет в переписке, а клиенты забывают о визите.",
    founderIdea:
      "FLOWUZ начался с простого наблюдения: клиенты уже в Telegram — почему запись не должна происходить там же, а команда видеть порядок в одной панели?",
    founderSolution:
      "Мы соединили Telegram-бот для клиента и SaaS-панель для команды: услуга, мастер, время, напоминания и статусы — без ручного хаоса.",
    founderVision: "Полностью убрать ручное планирование из салонов и клиник — чтобы владелец думал о сервисе, а не о таблицах.",
  },
  uz: {
    nav: ["Imkoniyatlar", "Namoyish", "Narxlar", "FAQ"],
    cta: "Bepul boshlash",
    heroTitle: "FLOWUZ — yangi avlod yozilish tizimi",
    heroSubtitle: "Telegram orqali mijoz yozilishi, avtomatlashtirish va biznes boshqaruvi bitta tizimda",
    heroPrimary: "15 kun bepul sinash",
    heroSecondary: "Namoyishni ko'rish",
    statLabels: ["qo'ng'iroqsiz yozilish", "kamroq kelmay qolish", "jadval nazorati"],
    workTitle: "Mijoz o'zi yoziladi. Jamoa tartibni ko'radi.",
    workSubtitle: "FLOWUZ Telegram-bot, jadval, eslatmalar va boshqaruv panelini bitta aniq jarayonga birlashtiradi.",
    steps: ["Botni ochadi", "Xizmat tanlaydi", "Mutaxassis tanlaydi", "Vaqtni tasdiqlaydi"],
    phoneEyebrow: "Telegram orqali yozilish",
    phoneTitle: "Mijoz bir daqiqadan kam vaqtda yoziladi",
    phoneSubtitle: "Haqiqiy jarayon: xizmat, mutaxassis, sana, vaqt va administrator ishtirokisiz tasdiq.",
    lessMinute: "1 daqiqadan kam",
    stepCountLabel: "bosqich",
    botName: "FLOWUZ yozilish",
    botStatus: "bot onlayn",
    botTyping: "yozmoqda",
    botSteps: [
      { bot: "Salom! Xizmat va bo'sh vaqtni tanlashda yordam beraman." },
      { user: "Yozilish", bot: "Yo'nalishni tanlang", buttons: ["Stomatologiya", "Salon", "Barbershop"] },
      { user: "Stomatologiya", bot: "Shifokorni tanlang", buttons: ["Doktor Saida", "Doktor Alina", "Doktor Madina"] },
      { user: "Doktor Saida", bot: "Sanani tanlang", buttons: ["Bugun", "Ertaga", "12 iyun"] },
      { user: "Ertaga", bot: "Bo'sh vaqtlar", buttons: ["10:30", "13:00", "17:20"] },
      { user: "13:00", bot: "Ertaga 13:00 da shifokor qabulini tasdiqlaysizmi?", buttons: ["Tasdiqlash"] },
      { user: "Tasdiqlash", bot: "Tayyor. Yozuv tasdiqlandi. Eslatma 24 soat va 2 soat oldin keladi." },
    ],
    dashboardTitle: "Jadval emas, haqiqiy boshqaruv paneli",
    dashboardSubtitle: "Taqvim, xodimlar, daromad, holatlar va avtomatlashtirish bitta interfeysda. Ikki marta band qilish tasdiqdan oldin to'xtatiladi.",
    addBooking: "Yozuv qo'shish",
    modalTitle: "Yangi yozuv",
    modalButton: "Yaratish",
    days: ["Bugun", "Ertaga", "Hafta"],
    statuses: ["tasdiqlandi", "bekor qilindi", "yakunlandi"],
    statusLabels: { confirmed: "tasdiqlandi", cancelled: "bekor qilindi", completed: "yakunlandi" },
    employeeNames: ["Madina", "Alina", "Saida"],
    bookings: [
      { name: "Farrux", service: "Soch olish", time: "10:30", status: "tasdiqlandi", color: "bg-flowuz-accent" },
      { name: "Nodira", service: "Kosmetologiya", time: "13:00", status: "eslatma", color: "bg-sky-300" },
      { name: "Aziza", service: "Davolash", time: "16:20", status: "kutilmoqda", color: "bg-violet-300" },
    ],
    actions: ["Ko'chirish", "Bekor qilish"],
    feed: ["Bo'sh vaqt topildi", "Eslatma yuborildi", "Ikki marta band qilish to'xtatildi"],
    widgets: [
      { label: "Bugungi daromad", value: "3,8 mln so'm", change: "+18%" },
      { label: "Yozuvlar", value: "42", change: "+11" },
      { label: "Kelmay qolish", value: "2", change: "-31%" },
    ],
    featuresTitle: "Tartibsizlik o'rniga avtomatlashtirish",
    featuresSubtitle: "Xizmat yo'qolgan yozuvlarning asosiy sabablarini yopadi: unutilgan xabarlar, ikki marta band qilish va qo'lda ko'chirish.",
    features: [
      { title: "Ikki marta band qilishdan himoya", text: "FLOWUZ tasdiqdan oldin vaqtni tekshiradi va ziddiyatni darhol ko'rsatadi." },
      { title: "24s / 2s eslatmalar", text: "Mijoz aniq xabar oladi, administrator esa kamroq qo'ng'iroq qiladi." },
      { title: "Xodimlar va xizmatlar", text: "Har bir mutaxassis uchun xizmatlar, qabul davomiyligi va ish vaqti alohida." },
      { title: "Telegram kirish nuqtasi", text: "Mijoz har kuni ishlatadigan joyida yoziladi." },
      { title: "Tezkor jadval", text: "Yangi yozuv, ko'chirish yoki bekor qilish bir necha soniya oladi." },
      { title: "Biznes tahlili", text: "Qaysi xizmat o'sayotgani, qayerda kelmay qolish borligi va kim bandligi ko'rinadi." },
    ],
    pricingTitle: "Narxlar tartibga kiritilgan sarmoya sifatida",
    pricingSubtitle: "FLOWUZ administrator vaqtini tejaydi, kelmay qolishni kamaytiradi va yozilishni boshqariladigan tizimga aylantiradi.",
    bestChoice: "Eng mashhur",
    freeTrial: "15 kun bepul",
    noCard: "Karta ulash shart emas",
    pricingNote: "Tartibsizlik o'rniga avtomatlashtirish",
    plans: [
      {
        name: "Starter",
        forWhom: "kichik salonlar",
        price: "249 000 so'm",
        promise: "Asosiy avtomatlashtirish: Telegram yozilishi va eslatmalar — murakkab joriy etishsiz.",
        points: ["3 tagacha xodim", "mijozlar uchun Telegram-bot", "ikki marta band qilishdan himoya", "24s / 2s eslatmalar"],
        outcomes: ["kamroq qo'lda xabar", "1 kunda ishga tushirish"],
      },
      {
        name: "Pro",
        forWhom: "faol oqimli salon va klinikalar",
        price: "549 000 so'm",
        promise: "To'liq yozilish avtomatizatsiyasi: administrator vaqti tejaladi, kelmay qolish kamayadi.",
        points: [
          "cheksiz yozuvlar",
          "Telegram avtomatizatsiyasi",
          "24s / 2s eslatmalar",
          "yuklama tahlili",
          "ustuvor yordam",
          "kengaytirilgan jadval",
        ],
        outcomes: ["administrator yuklamasi −70%", "kamroq kelmay qolish", "tez yozilish oqimi"],
      },
      {
        name: "Business",
        forWhom: "klinika va tarmoqlar",
        price: "990 000 so'm",
        promise: "Ko'p filial, kirish rollari va kengaytirilgan tahlil tarmoqlar uchun.",
        points: ["bir nechta filial", "bir nechta administrator", "kengaytirilgan tahlil", "yuqori darajali yordam", "maxsus integratsiyalar"],
        outcomes: ["yagona yozilish standarti", "butun tarmoq nazorati"],
      },
    ],
    compareTitle: "Biznes birinchi oyda nimani oladi",
    compareItems: ["Administrator vaqti tejaladi", "Kamroq kelmay qolish", "Tartibsizlik o'rniga avtomatlashtirish"],
    faqTitle: "Ishga tushirishdan oldingi savollar",
    faq: [
      { q: "Tizim qanday ishlaydi?", a: "Mijoz Telegramda yoziladi, FLOWUZ jadvalni tekshiradi, band qiladi va eslatmalar yuboradi." },
      { q: "Xodimlarni qo'shish mumkinmi?", a: "Ha. Xodimlar, xizmatlar, qabul davomiyligi, ish kunlari va alohida vaqtlarni sozlash mumkin." },
      { q: "Telegram qanday ishlaydi?", a: "Bot mijozni bosqichma-bosqich olib boradi: xizmat, mutaxassis, sana, vaqt, tasdiq. Hammasi panel bilan sinxron." },
      { q: "Yozuvni bekor qilish mumkinmi?", a: "Ha. Administrator yozuvni bekor qiladi yoki ko'chiradi, mijoz Telegramda yangilanish oladi." },
    ],
    finalTitle: "Zamonaviy yozilishni uzoq joriy etishsiz ishga tushiring",
    finalSubtitle: "FLOWUZni mijozlarga bugunoq ko'rsatish mumkin: Telegram-bot, panel va eslatmalar tayyor.",
    contacts: "Aloqa",
    legal: "Hujjatlar",
    footerLinks: ["Imkoniyatlar", "Namoyish", "Narxlar", "Savollar"],
    copyright: "Barcha huquqlar himoyalangan.",
    restartDemo: "Qayta boshlash",
    demoHint: "Simulyatordagi tugmalarni bosing — har bir bosqich haqiqiy Telegram-bot kabi.",
    dashboardHint: "Kartochkani bosing — holat o'zgaradi",
    dashboardSchedule: "Jadval",
    dashboardActivity: "Faollik",
    proSavings: "≈ oyiga 12 soat administrator vaqti tejaladi",
    pricingBadges: ["15 kun bepul", "Karta shart emas", "Administrator yuklamasi −70%"],
    reduceAdmin: "Administrator yuklamasini 70% gacha kamaytirish",
    fewerMissed: "Kamroq kelmay qolgan mijozlar",
    founderEyebrow: "Asoschisi haqida",
    founderTitle: "Tartibsiz yozuvlardan tug'ilgan g'oya",
    founderName: "RAMIS DANIYAROV",
    founderProblem:
      "Salon va klinikalarda yozuv ko'pincha messenjer, qo'ng'iroq va daftarda qoladi. Administrator xabarlarda cho'kadi, mijozlar esa qabulni unutadi.",
    founderIdea:
      "FLOWUZ oddiy kuzatuvdan boshlandi: mijozlar allaqachon Telegramda — nega yozilish ham shu yerda bo'lmasin, jamoa esa bitta panelda tartibni ko'rsa?",
    founderSolution:
      "Mijoz uchun Telegram-bot va jamoa uchun SaaS-panelni birlashtirdik: xizmat, mutaxassis, vaqt, eslatmalar va holatlar — qo'lda tartibsizliksiz.",
    founderVision: "Salon va klinikalardan qo'lda rejalashtirishni butunlay olib tashlash — egasi jadval emas, xizmat haqida o'ylasin.",
  },
};

const smoothTransition: Transition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };
const reveal = {
  initial: { opacity: 0, y: 28, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-90px" },
  transition: smoothTransition,
};

export function FlowuzLanding({ initialLocale = "ru" }: { initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [theme, setTheme] = useState<Theme>("dark");
  const t = copy[locale];
  const navTargets = useMemo(() => ["features", "demo", "pricing", "faq"], []);
  const isLight = theme === "light";

  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      data-theme={theme}
      className="flowuz-page min-h-screen overflow-x-hidden bg-flowuz-page font-sans text-flowuz-text transition-colors duration-500"
    >
      <div className="flowuz-noise" aria-hidden="true" />
      <BackgroundMesh isLight={isLight} />
      <Header locale={locale} setLocale={setLocale} theme={theme} setTheme={setTheme} t={t} navTargets={navTargets} isLight={isLight} />
      <main>
        <Hero t={t} isLight={isLight} />
        <HowItWorks t={t} isLight={isLight} />
        <PhoneDemo t={t} isLight={isLight} />
        <DashboardPreview t={t} isLight={isLight} />
        <FounderSection t={t} isLight={isLight} />
        <Features t={t} isLight={isLight} />
        <Pricing t={t} isLight={isLight} />
        <Faq t={t} isLight={isLight} />
        <FinalCta t={t} isLight={isLight} />
      </main>
      <Footer locale={locale} setLocale={setLocale} theme={theme} setTheme={setTheme} t={t} isLight={isLight} />
    </div>
  );
}

function BackgroundMesh({ isLight }: { isLight: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -left-[20%] top-[-10%] h-[55vh] w-[55vw] rounded-full opacity-80 blur-[100px] animate-mesh-drift"
        style={{ background: "var(--flowuz-mesh-1)" }}
      />
      <div
        className="absolute right-[-15%] top-[20%] h-[45vh] w-[40vw] rounded-full opacity-70 blur-[90px] animate-mesh-drift-reverse"
        style={{ background: "var(--flowuz-mesh-2)" }}
      />
      <div
        className="absolute bottom-[-10%] left-[25%] h-[40vh] w-[50vw] rounded-full opacity-60 blur-[110px] animate-mesh-drift"
        style={{ background: "var(--flowuz-mesh-3)" }}
      />
      {!isLight ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(197,255,62,0.08),transparent)]" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(255,122,61,0.06),transparent_55%)]" />
      )}
    </div>
  );
}

function Header({
  locale,
  setLocale,
  theme,
  setTheme,
  t,
  navTargets,
  isLight,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: Copy;
  navTargets: string[];
  isLight: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500 ${
        isLight ? "border-flowuz-border bg-[var(--flowuz-header)] shadow-[0_1px_0_rgba(26,28,34,0.04)]" : "border-white/[0.06] bg-[#0A0A0E]/60"
      }`}
    >
      <div className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8">
        <a
          href="#"
          className={`font-heading text-[11px] font-semibold tracking-[0.22em] ${isLight ? "text-flowuz-text" : "text-white"}`}
        >
          FLOWUZ
        </a>

        <nav className="hidden items-center justify-center gap-6 text-[13px] font-medium lg:flex">
          {t.nav.map((item, index) => (
            <a
              key={item}
              href={`#${navTargets[index]}`}
              className={`transition-colors ${isLight ? "text-flowuz-muted hover:text-flowuz-text" : "text-white/55 hover:text-white"}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
          <ThemeSwitch theme={theme} setTheme={setTheme} isLight={isLight} />
          <LanguageSwitch locale={locale} setLocale={setLocale} isLight={isLight} />
          <a
            href="#pricing"
            className="flowuz-cta hidden h-8 items-center rounded-full px-3.5 text-[13px] font-semibold shadow-glow transition hover:scale-[1.02] hover:opacity-90 md:inline-flex"
          >
            {t.cta}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border lg:hidden ${
              isLight ? "border-flowuz-border bg-flowuz-card text-flowuz-text" : "border-white/10 bg-white/[0.06] text-white"
            }`}
            aria-label="Menu"
          >
            <span className="h-px w-4 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mx-4 mb-4 rounded-3xl border p-3 shadow-2xl backdrop-blur-2xl lg:hidden ${
              isLight ? "border-flowuz-border bg-flowuz-surface-strong" : "border-white/10 bg-[#111118]/95"
            }`}
          >
            {t.nav.map((item, index) => (
              <a
                key={item}
                href={`#${navTargets[index]}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isLight ? "text-flowuz-muted hover:bg-black/[0.04] hover:text-flowuz-text" : "text-white/78 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="flowuz-cta mt-2 flex h-11 items-center justify-center rounded-full px-4 text-sm font-semibold"
            >
              {t.cta}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function LanguageSwitch({
  locale,
  setLocale,
  isLight,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isLight: boolean;
}) {
  return (
    <div
      className={`flex rounded-full border p-1 text-xs font-semibold ${
        isLight ? "border-flowuz-border bg-flowuz-card text-flowuz-text" : "border-white/10 bg-white/[0.06] text-white"
      }`}
    >
      {(["ru", "uz"] as Locale[]).map((item) => (
        <a
          key={item}
          href={item === "ru" ? "/" : "/uz"}
          onClick={() => setLocale(item)}
          className={`rounded-full px-3 py-1.5 transition ${
            locale === item
              ? "flowuz-cta font-semibold"
              : isLight
                ? "text-flowuz-muted hover:text-flowuz-text"
                : "text-white/58 hover:text-white"
          }`}
        >
          {item.toUpperCase()}
        </a>
      ))}
    </div>
  );
}

function ThemeSwitch({
  theme,
  setTheme,
  isLight,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isLight: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Light theme" : "Dark theme"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition ${
        isLight
          ? "border-flowuz-border bg-flowuz-card text-flowuz-muted hover:text-flowuz-text"
          : "border-white/10 bg-white/[0.06] text-white/72 hover:text-white"
      }`}
    >
      {theme === "dark" ? "☾" : "☀"}
    </button>
  );
}

function Hero({ t, isLight }: { t: Copy; isLight: boolean }) {
  return (
    <section
      className={`relative flex min-h-[92vh] items-center overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8 ${
        isLight ? "bg-transparent" : ""
      }`}
    >
      {!isLight ? (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-12 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "var(--flowuz-mesh-1)" }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
          />
        </>
      ) : null}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div {...reveal} className="text-center lg:text-left">
          <div
            className={`mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl lg:mx-0 ${
              isLight ? "border-flowuz-border bg-flowuz-card text-flowuz-muted" : "border-white/10 bg-white/[0.06] text-white/70"
            }`}
          >
            <span className="h-2 w-2 rounded-full flowuz-accent-bg shadow-glow" />
            {t.pricingNote}
          </div>
          <h1
            className={`font-heading text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl ${
              isLight ? "text-flowuz-text" : "text-white"
            }`}
          >
            {t.heroTitle}
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl text-lg leading-8 sm:text-xl lg:mx-0 ${isLight ? "text-flowuz-muted" : "text-white/68"}`}>
            {t.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a className="flowuz-cta inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition hover:scale-[1.02] hover:opacity-90" href="#pricing">
              {t.heroPrimary}
            </a>
            <a
              className={`inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-semibold backdrop-blur-md transition hover:scale-[1.02] ${
                isLight
                  ? "border-flowuz-border bg-flowuz-card text-flowuz-text hover:border-flowuz-accent"
                  : "border-white/12 bg-white/[0.06] text-white hover:border-flowuz-accent/50"
              }`}
              href="#demo"
            >
              {t.heroSecondary}
            </a>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {t.statLabels.map((label, index) => (
              <div
                key={label}
                className={`rounded-2xl border p-4 backdrop-blur-xl ${
                  isLight ? "border-flowuz-border bg-flowuz-card" : "border-white/10 bg-white/[0.045]"
                }`}
              >
                <div className="font-mono text-xl flowuz-accent-text">{["01", "24ч", "∞"][index]}</div>
                <div className={`mt-2 text-sm ${isLight ? "text-flowuz-muted" : "text-white/58"}`}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <HeroDashboardSnippet isLight={isLight} />
          <FloatingCard className="-left-8 top-12" title="13:00" text={t.bookings[1].service} />
          <FloatingCard className="bottom-12 right-0" title="+18%" text={t.widgets[0].label} />
        </motion.div>
      </div>
    </section>
  );
}

function HeroDashboardSnippet({ isLight }: { isLight: boolean }) {
  return (
    <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_40px_140px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-2 w-24 rounded-full bg-white/20" />
        <div className="h-8 w-28 rounded-full bg-flowuz-accent/90" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={`h-20 rounded-2xl border border-white/8 ${[1, 5, 9].includes(index) ? "bg-flowuz-accent/90" : isLight ? "bg-black/10" : "bg-black/25"}`} />
        ))}
      </div>
    </div>
  );
}

function FloatingCard({ className, title, text }: { className: string; title: string; text: string }) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-2xl border border-white/10 bg-[#101016]/78 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}
    >
      <div className="font-mono text-xl text-flowuz-accent">{title}</div>
      <div className="mt-1 text-sm text-white/60">{text}</div>
    </motion.div>
  );
}

function HowItWorks({ t, isLight }: { t: Copy; isLight: boolean }) {
  return (
    <Section id="features" isLight={isLight}>
      <SectionTitle title={t.workTitle} subtitle={t.workSubtitle} isLight={isLight} />
      <div className="grid gap-4 md:grid-cols-4">
        {t.steps.map((step, index) => (
          <motion.div key={step} {...reveal} transition={{ ...smoothTransition, delay: index * 0.06 }} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-flowuz-accent/30 hover:bg-white/[0.07]">
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full flowuz-cta font-mono text-sm font-bold shadow-glow">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold text-white">{step}</h3>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function PhoneDemo({ t, isLight }: { t: Copy; isLight: boolean }) {
  type BookingStage = "welcome" | "service" | "doctor" | "date" | "time" | "confirm" | "done";
  const [stage, setStage] = useState<BookingStage>("welcome");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const startLabel = t.botSteps[1].user ?? t.cta;
  const services = t.botSteps[1].buttons ?? [];
  const doctors = t.botSteps[2].buttons ?? [];
  const dates = t.botSteps[3].buttons ?? [];
  const times = t.botSteps[4].buttons ?? [];
  const confirmLabel = t.botSteps[5].buttons?.[0] ?? t.cta;
  const restartLabel = t.restartDemo;
  const isDone = stage === "done";
  const showTyping = stage !== "done" && stage !== "confirm";

  const resetDemo = () => {
    setStage("welcome");
    setSelectedService("");
    setSelectedDoctor("");
    setSelectedDate("");
    setSelectedTime("");
  };

  const chooseService = (value: string) => {
    setSelectedService(value);
    setStage("doctor");
  };

  const chooseDoctor = (value: string) => {
    setSelectedDoctor(value);
    setStage("date");
  };

  const chooseDate = (value: string) => {
    setSelectedDate(value);
    setStage("time");
  };

  const chooseTime = (value: string) => {
    setSelectedTime(value);
    setStage("confirm");
  };

  useEffect(() => {
    const node = chatRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [stage, selectedService, selectedDoctor, selectedDate, selectedTime, isDone]);

  return (
    <Section id="demo" isLight={isLight} className="relative grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="flowuz-light-section">
        <SectionTitle title={t.phoneTitle} subtitle={t.phoneSubtitle} align="left" eyebrow={t.phoneEyebrow} isLight={isLight} />
        <p className="flowuz-muted mb-6 max-w-lg text-sm leading-6 text-white/58">{t.demoHint}</p>
        <div className="grid max-w-xl grid-cols-2 gap-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 flowuz-card flowuz-border">
            <div className="font-mono text-3xl font-medium text-flowuz-accent">&lt;1 мин</div>
            <p className="mt-2 text-sm text-white/58">{t.lessMinute}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 flowuz-card flowuz-border">
            <div className="font-mono text-3xl font-medium text-flowuz-accent">5</div>
            <p className="mt-2 text-sm text-white/58">{t.stepCountLabel}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["service", "doctor", "date", "time", "confirm", "done"].map((step, index) => (
            <span
              key={step}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                index <= ["welcome", "service", "doctor", "date", "time", "confirm", "done"].indexOf(stage)
                  ? "flowuz-accent-muted-bg flowuz-accent-text"
                  : "border border-flowuz-border text-flowuz-faint"
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex min-h-[520px] items-center justify-center py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--flowuz-accent-glow),transparent_72%)]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 72, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[320px] sm:max-w-[340px]"
        >
          <div className="animate-float-phone">
            <IPhoneFrame>
              <div className="flex h-full min-h-0 flex-col bg-[#17212B]">
                <div className="shrink-0 border-b border-white/[0.06] bg-[#202B36] px-3 pb-2.5 pt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full flowuz-accent-bg text-[11px] font-bold text-[var(--flowuz-cta-text)]">
                      F
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-semibold leading-tight text-white">{t.botName}</div>
                      <div className="text-[11px] text-[#7BB8E8]">{t.botStatus}</div>
                    </div>
                  </div>
                </div>
                <div
                  ref={chatRef}
                  className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-x-hidden overflow-y-auto px-2.5 py-3 scroll-smooth"
                >
                  <div className="space-y-2">
                    <TelegramBubble text={t.botSteps[0].bot} />
                    {stage === "welcome" ? (
                      <TelegramButtons items={[startLabel]} onSelect={() => setStage("service")} />
                    ) : (
                      <TelegramBubble text={startLabel} user />
                    )}
                  </div>

                  {stage !== "welcome" ? (
                    <div className="space-y-2">
                      <TelegramBubble text={t.botSteps[1].bot} />
                      {selectedService ? (
                        <TelegramBubble text={selectedService} user />
                      ) : (
                        <TelegramButtons items={services} onSelect={chooseService} columns={1} />
                      )}
                    </div>
                  ) : null}

                  {selectedService ? (
                    <div className="space-y-2">
                      <TelegramBubble text={t.botSteps[2].bot} />
                      {selectedDoctor ? (
                        <TelegramBubble text={selectedDoctor} user />
                      ) : (
                        <TelegramButtons items={doctors} onSelect={chooseDoctor} />
                      )}
                    </div>
                  ) : null}

                  {selectedDoctor ? (
                    <div className="space-y-2">
                      <TelegramBubble text={t.botSteps[3].bot} />
                      {selectedDate ? (
                        <TelegramBubble text={selectedDate} user />
                      ) : (
                        <TelegramButtons items={dates} onSelect={chooseDate} />
                      )}
                    </div>
                  ) : null}

                  {selectedDate ? (
                    <div className="space-y-2">
                      <TelegramBubble text={t.botSteps[4].bot} />
                      {selectedTime ? (
                        <TelegramBubble text={selectedTime} user />
                      ) : (
                        <TelegramButtons items={times} onSelect={chooseTime} />
                      )}
                    </div>
                  ) : null}

                  {selectedTime ? (
                    <div className="space-y-2">
                      <TelegramBubble text={t.botSteps[5].bot} />
                      {isDone ? (
                        <TelegramBubble text={confirmLabel} user />
                      ) : (
                        <TelegramButtons items={[confirmLabel]} onSelect={() => setStage("done")} columns={1} />
                      )}
                    </div>
                  ) : null}

                  {isDone ? (
                    <div className="space-y-2">
                      <TelegramBubble text={t.botSteps[6].bot} />
                      <TelegramButtons items={[restartLabel]} onSelect={resetDemo} columns={1} />
                    </div>
                  ) : null}

                  {showTyping ? (
                    <div className="mt-auto flex shrink-0 items-center gap-2 rounded-xl bg-[#233241] px-2.5 py-2 text-[11px] text-white/54">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:240ms]" />
                      </span>
                      {t.botTyping}
                    </div>
                  ) : null}
                </div>
              </div>
            </IPhoneFrame>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function IPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[390/844] w-full max-h-[min(78vh,640px)]">
      <div className="absolute -inset-8 rounded-[4rem] bg-[radial-gradient(circle,var(--flowuz-accent-glow),transparent_68%)] blur-2xl animate-glow-pulse" />
      <div className="relative flex h-full flex-col rounded-[2.75rem] border border-white/[0.14] bg-[linear-gradient(155deg,#3a3a42_0%,#141418_38%,#060608_100%)] p-[11px] shadow-iphone">
        <div className="pointer-events-none absolute inset-[11px] z-10 rounded-[2.35rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.2)_0%,transparent_42%,transparent_58%,rgba(255,255,255,0.05)_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[15px] z-30 h-[28px] w-[108px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        <div className="relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2.35rem] border border-black/40 bg-black">
          <div className="h-[44px] shrink-0 bg-[#17212B]" aria-hidden="true" />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

function TelegramBubble({ text, user = false }: { text: string; user?: boolean }) {
  return (
    <div
      className={`max-w-[88%] shrink-0 break-words rounded-2xl px-3 py-2 text-[12px] leading-[1.45] shadow-sm ${
        user ? "ml-auto rounded-br-md bg-[#2AABEE] text-white" : "rounded-bl-md bg-[#233241] text-white/90"
      }`}
    >
      {text}
    </div>
  );
}

function TelegramButtons({
  items,
  onSelect,
  columns = 2,
}: {
  items: string[];
  onSelect: (value: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid gap-1.5 ${columns === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          className="rounded-xl bg-[#2AABEE]/95 px-2.5 py-2.5 text-[12px] font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#45BDF6] active:scale-[0.98]"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function statusBadgeClass(status: string, t: Copy) {
  if (status === t.statusLabels.cancelled) return "bg-red-500/20 text-red-400 ring-1 ring-red-500/30";
  if (status === t.statusLabels.completed) return "bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/30";
  return "flowuz-accent-muted-bg flowuz-accent-text ring-1 ring-[color:var(--flowuz-accent)]/30";
}

function FounderSection({ t, isLight }: { t: Copy; isLight: boolean }) {
  const isUz = t.founderEyebrow === "Asoschisi haqida";
  const labels = isUz ? ["Muammo", "G'oya", "Yechim", "Vizyon"] : ["Проблема", "Идея", "Решение", "Видение"];
  const texts = [t.founderProblem, t.founderIdea, t.founderSolution, t.founderVision];

  return (
    <Section id="founder" isLight={isLight}>
      <motion.div {...reveal} className="overflow-hidden rounded-[2rem] border border-flowuz-border bg-flowuz-card p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] flowuz-accent-text">{t.founderEyebrow}</p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{t.founderTitle}</h2>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl flowuz-accent-muted-bg font-heading text-lg font-bold flowuz-accent-text">
                RD
              </div>
              <div>
                <div className="font-heading text-sm font-bold tracking-wide">{t.founderName}</div>
                <div className="mt-1 text-xs text-flowuz-muted">Founder, FLOWUZ</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {texts.map((text, index) => (
              <div
                key={labels[index]}
                className={`rounded-2xl border p-5 ${isLight ? "border-flowuz-border bg-[#faf8f4]" : "border-white/10 bg-white/[0.04]"}`}
              >
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider flowuz-accent-text">{labels[index]}</div>
                <p className="text-sm leading-7 text-flowuz-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function DashboardPreview({ t, isLight }: { t: Copy; isLight: boolean }) {
  const [selectedDay, setSelectedDay] = useState(t.days[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [extraBooking, setExtraBooking] = useState(false);
  const [feedIndex, setFeedIndex] = useState(0);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    setSelectedDay(t.days[0]);
    setStatusOverrides({});
    setExtraBooking(false);
    setModalOpen(false);
    setFeedIndex(0);
  }, [t.days, t.bookings]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeedIndex((value) => (value + 1) % t.feed.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [t.feed.length]);

  const changeStatus = (bookingName: string) => {
    const cycle = [t.statusLabels.confirmed, t.statusLabels.cancelled, t.statusLabels.completed];
    const current = statusOverrides[bookingName] ?? t.statusLabels.confirmed;
    const idx = cycle.indexOf(current);
    const nextIndex = idx === -1 ? 0 : (idx + 1) % cycle.length;
    setStatusOverrides((value) => ({ ...value, [bookingName]: cycle[nextIndex] }));
  };

  const createBooking = () => {
    setExtraBooking(true);
    setModalOpen(false);
  };

  return (
    <Section id="dashboard" isLight={isLight}>
      <SectionTitle title={t.dashboardTitle} subtitle={t.dashboardSubtitle} isLight={isLight} />
      <motion.div {...reveal} className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0e0e12] p-4 shadow-[0_32px_100px_rgba(0,0,0,0.45)] sm:p-5">
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {t.widgets.map((widget) => (
            <div key={widget.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs font-medium text-white/45">{widget.label}</div>
              <div className="mt-2 flex items-end justify-between gap-2">
                <div className="font-mono text-xl font-medium tabular-nums text-white">{widget.value}</div>
                <div className="rounded-full flowuz-accent-muted-bg px-2 py-0.5 font-mono text-[11px] flowuz-accent-text">{widget.change}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-[1fr_260px]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#08080c]">
            <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-white">{t.dashboardSchedule}</div>
                <div className="mt-0.5 text-xs text-white/40">{selectedDay}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {t.days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`h-8 rounded-full border px-3 text-xs font-medium transition ${
                      selectedDay === day
                        ? "flowuz-cta border-transparent"
                        : "border-white/10 bg-white/[0.04] text-white/55 hover:text-white"
                    }`}
                  >
                    {day}
                  </button>
                ))}
                <button type="button" onClick={() => setModalOpen(true)} className="flowuz-cta h-8 rounded-full px-4 text-xs font-semibold transition hover:opacity-90">
                  {t.addBooking}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="grid min-w-[640px] grid-cols-[64px_repeat(3,minmax(0,1fr))]">
                <div className="border-b border-r border-white/10 bg-white/[0.02] p-2" />
                {t.employeeNames.map((name) => (
                  <div key={name} className="border-b border-r border-white/10 p-3 text-center text-xs font-semibold text-white/70 last:border-r-0">
                    {name}
                  </div>
                ))}
                {["09:00", "10:30", "13:00", "16:20"].map((time, row) => (
                  <FragmentRow
                    key={`${selectedDay}-${time}`}
                    time={time}
                    row={row}
                    t={t}
                    statusOverrides={statusOverrides}
                    changeStatus={changeStatus}
                    extraBooking={extraBooking}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-white/10 flowuz-accent-muted-bg p-4 ring-1 ring-[color:var(--flowuz-accent)]/20">
              <div className="text-xs font-semibold flowuz-accent-text">{t.modalTitle}</div>
              <div className="mt-3 space-y-2">
                <div className="h-9 rounded-lg border border-white/10 bg-black/20 px-3 text-xs leading-9 text-white/50">{t.bookings[0].service}</div>
                <div className="h-9 rounded-lg border border-white/10 bg-black/20 px-3 text-xs leading-9 text-white/50">{t.employeeNames[0]}</div>
                <button type="button" onClick={() => setModalOpen(true)} className="flowuz-cta h-9 w-full rounded-lg text-xs font-semibold transition hover:opacity-90">
                  {t.addBooking}
                </button>
              </div>
            </div>
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 text-xs font-semibold text-white/80">{t.dashboardActivity}</div>
              <div className="space-y-2.5">
                {t.feed.map((item, index) => (
                  <motion.div
                    key={item}
                    animate={{ opacity: feedIndex === index ? 1 : 0.4 }}
                    className="flex items-start gap-2.5 text-xs leading-5 text-white/55"
                  >
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${feedIndex === index ? "flowuz-accent-bg shadow-glow" : "bg-white/25"}`} />
                    {item}
                  </motion.div>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-white/35">{t.dashboardHint}</p>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {modalOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-[2rem] bg-black/55 p-4 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.96 }}
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-md rounded-[1.6rem] border border-white/10 bg-[#14141A] p-5 shadow-2xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-lg font-semibold">{t.modalTitle}</div>
                  <button type="button" onClick={() => setModalOpen(false)} className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/58">×</button>
                </div>
                <div className="grid gap-3">
                  {[t.bookings[1].service, t.employeeNames[1], selectedDay, "15:40"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/70">{item}</div>
                  ))}
                </div>
                <button type="button" onClick={createBooking} className="flowuz-cta mt-5 h-10 w-full rounded-full text-sm font-semibold transition hover:opacity-90">
                  {t.modalButton}
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

function FragmentRow({
  time,
  row,
  t,
  statusOverrides,
  changeStatus,
  extraBooking,
}: {
  time: string;
  row: number;
  t: Copy;
  statusOverrides: Record<string, string>;
  changeStatus: (bookingName: string) => void;
  extraBooking: boolean;
}) {
  return (
    <>
      <div className="flex items-center border-b border-r border-white/10 p-2 font-mono text-[10px] tabular-nums text-white/35">{time}</div>
      {t.employeeNames.map((name, col) => {
        const booking = t.bookings[(row + col) % t.bookings.length];
        const show = (row + col) % 2 === 0 || (extraBooking && row === 0 && col === 1);
        const cycle = [t.statusLabels.confirmed, t.statusLabels.cancelled, t.statusLabels.completed];
        const status = statusOverrides[booking.name] ?? cycle[0];
        const badgeClass = statusBadgeClass(status, t);
        return (
          <div key={`${time}-${name}`} className="min-h-[88px] border-b border-r border-white/10 p-1.5 last:border-r-0">
            {show ? (
              <motion.button
                type="button"
                onClick={() => changeStatus(booking.name)}
                whileHover={{ y: -2 }}
                className="flex h-full w-full flex-col rounded-xl border border-white/10 bg-white/[0.05] p-2.5 text-left transition hover:border-[color:var(--flowuz-accent)]/40"
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <div className="truncate text-xs font-semibold text-white">{booking.name}</div>
                    <div className="truncate text-[10px] text-white/40">{booking.service}</div>
                  </div>
                  <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${badgeClass}`}>{status}</span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-mono text-[10px] tabular-nums flowuz-accent-text">{time}</span>
                  <div className={`h-1 w-8 rounded-full ${booking.color}`} />
                </div>
              </motion.button>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

function Features({ t, isLight }: { t: Copy; isLight: boolean }) {
  return (
    <Section isLight={isLight}>
      <SectionTitle title={t.featuresTitle} subtitle={t.featuresSubtitle} isLight={isLight} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.features.map((feature, index) => (
          <motion.div key={feature.title} {...reveal} transition={{ ...smoothTransition, delay: index * 0.04 }} className="group rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-flowuz-accent/35 hover:bg-white/[0.065]">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-flowuz-accent/12 font-mono text-sm text-flowuz-accent">{String(index + 1).padStart(2, "0")}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/58">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Pricing({ t, isLight }: { t: Copy; isLight: boolean }) {
  return (
    <Section id="pricing" isLight={isLight}>
      <SectionTitle title={t.pricingTitle} subtitle={t.pricingSubtitle} isLight={isLight} />
      <div className="mb-8 flex flex-wrap justify-center gap-2 text-sm">
        {t.pricingBadges.map((item) => (
          <span key={item} className="rounded-full border border-flowuz-border bg-flowuz-card px-4 py-2 text-flowuz-muted">
            {item}
          </span>
        ))}
      </div>
      <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-flowuz-muted">
        {t.reduceAdmin} · {t.fewerMissed}
      </p>
      <div className="grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
        {t.plans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} highlighted={index === 1} t={t} index={index} />
        ))}
      </div>
      <motion.div {...reveal} className="mx-auto mt-8 max-w-4xl rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-4 text-center text-sm font-semibold text-white/72">{t.compareTitle}</div>
        <div className="grid gap-3 md:grid-cols-3">
          {t.compareItems.map((item) => (
            <div key={item} className="rounded-2xl bg-black/20 p-4 text-sm text-white/68">
              <span className="mr-2 text-flowuz-accent">✓</span>
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function PricingCard({
  plan,
  highlighted,
  t,
  index,
}: {
  plan: Plan;
  highlighted: boolean;
  t: Copy;
  index: number;
}) {
  return (
    <motion.div
      {...reveal}
      transition={{ ...smoothTransition, delay: index * 0.06 }}
      whileHover={{ y: highlighted ? -10 : -6 }}
      className={`relative flex flex-col overflow-hidden rounded-[2rem] border p-6 lg:p-7 ${
        highlighted
          ? "z-10 scale-[1.02] border-[color:var(--flowuz-accent)]/60 bg-[linear-gradient(165deg,var(--flowuz-accent-muted)_0%,transparent_55%)] shadow-pro-card lg:-my-2 lg:py-9"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      {highlighted ? (
        <>
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-flowuz-accent/40" />
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-flowuz-accent/20 blur-3xl animate-glow-pulse" />
        </>
      ) : null}
      {highlighted ? (
        <div className="relative mb-5 inline-flex w-fit rounded-full flowuz-cta px-3 py-1 text-xs font-bold shadow-glow">
          {t.bestChoice}
        </div>
      ) : (
        <div className="mb-5 h-6" />
      )}
      <div className="relative text-sm uppercase tracking-wide text-white/48">{plan.forWhom}</div>
      <h3 className="relative mt-2 font-heading text-4xl font-bold tracking-tight">{plan.name}</h3>
      <p className="relative mt-4 min-h-[3.5rem] text-sm leading-6 text-white/58">{plan.promise}</p>
      <div className="relative mt-7 font-mono text-3xl font-medium text-white">{plan.price}</div>
      {highlighted ? (
        <p className="relative mt-2 text-xs text-flowuz-accent">{t.proSavings}</p>
      ) : null}
      <a
        href="#demo"
        className={`relative mt-6 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition ${
          highlighted ? "flowuz-cta shadow-glow hover:scale-[1.02] hover:opacity-90" : "border border-white/10 bg-white/[0.05] text-white hover:border-[color:var(--flowuz-accent)]/50"
        }`}
      >
        {t.cta}
      </a>
      <ul className="relative mt-7 flex-1 space-y-3 text-sm text-white/70">
        {plan.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-flowuz-accent/15 text-[10px] text-flowuz-accent">✓</span>
            {point}
          </li>
        ))}
      </ul>
      <div className="relative mt-6 space-y-2 border-t border-white/10 pt-5">
        {plan.outcomes.map((outcome) => (
          <div key={outcome} className="rounded-xl bg-black/20 px-3 py-2 text-xs text-white/58">
            {outcome}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Faq({ t, isLight }: { t: Copy; isLight: boolean }) {
  return (
    <Section id="faq" isLight={isLight}>
      <SectionTitle title={t.faqTitle} subtitle="" isLight={isLight} />
      <div className="mx-auto max-w-3xl space-y-3">
        {t.faq.map((item) => (
          <motion.div key={item.q} {...reveal} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold">{item.q}</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">{item.a}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function FinalCta({ t, isLight }: { t: Copy; isLight: boolean }) {
  return (
    <Section isLight={isLight}>
      <motion.div {...reveal} className="relative overflow-hidden rounded-[2rem] border border-[color:var(--flowuz-accent)]/25 flowuz-accent-muted-bg px-6 py-14 text-center shadow-glow-lg sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--flowuz-accent-glow),transparent_50%)]" />
        <div className="relative">
          <h2 className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{t.finalTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-flowuz-muted">{t.finalSubtitle}</p>
          <a href="#pricing" className="flowuz-cta mt-8 inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition hover:opacity-90">
            {t.heroPrimary}
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

function Footer({
  locale,
  setLocale,
  theme,
  setTheme,
  t,
  isLight,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: Copy;
  isLight: boolean;
}) {
  return (
    <footer className={`flowuz-light-section border-t px-4 py-12 sm:px-6 lg:px-8 ${isLight ? "border-flowuz-border" : "border-white/10"}`}>
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="font-heading text-sm font-bold tracking-[0.32em]">FLOWUZ</div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/46">© 2026 FLOWUZ. {t.copyright}</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-white/58">
          {t.footerLinks.map((link, index) => (
            <a key={link} href={["#features", "#demo", "#pricing", "#faq"][index]} className="transition hover:text-white">{link}</a>
          ))}
          <a href="https://t.me/" className="transition hover:text-white">Telegram</a>
          <a href="#" className="transition hover:text-white">{t.contacts}</a>
          <a href="#" className="transition hover:text-white">{t.legal}</a>
        </div>
        <div className="flex items-start gap-3 md:justify-end">
          <LanguageSwitch locale={locale} setLocale={setLocale} isLight={isLight} />
          <ThemeSwitch theme={theme} setTheme={setTheme} isLight={isLight} />
        </div>
      </div>
    </footer>
  );
}

function Section({
  id,
  className = "",
  children,
  isLight = false,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  isLight?: boolean;
}) {
  return (
    <section id={id} className={`flowuz-light-section mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 ${isLight ? "" : ""} ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({
  title,
  subtitle,
  eyebrow,
  align = "center",
  isLight = false,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  align?: "left" | "center";
  isLight?: boolean;
}) {
  return (
    <motion.div {...reveal} className={`mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <div className="mb-4 text-sm font-semibold uppercase tracking-wider flowuz-accent-text">{eyebrow}</div> : null}
      <h2 className={`font-heading text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl ${isLight ? "text-flowuz-text" : ""}`}>
        {title}
      </h2>
      {subtitle ? <p className="mt-5 text-lg leading-8 text-white/60">{subtitle}</p> : null}
    </motion.div>
  );
}
