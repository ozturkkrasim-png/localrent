import { useState, useEffect } from "react";

const WHATSAPP = "905400070095";
const PHONE = "+90 540 007 00 95";
const INSTAGRAM = "https://instagram.com/localrent.com.tr";

const cities = [
  "Анталья Аэропорт", "Анталья Центр", "Анталья Порт",
  "Кемер", "Алания", "Бодрум", "Мармарис", "Фетхие",
  "Измир Аэропорт", "Измир Центр", "Стамбул Аэропорт SAW",
  "Стамбул Аэропорт IST", "Каппадокия", "Анкара"
];

const times = [];
for (let h = 0; h < 24; h++) {
  for (let m of ["00", "30"]) {
    times.push(`${String(h).padStart(2,"0")}:${m}`);
  }
}

const T = {
  ru: {
    nav: ["Автомобили", "Локации", "Условия", "Бронирование", "Блог", "ЧаВо", "О нас", "Контакты"],
    navBtn: "Запросить цену",
    heroBadge: "🚗 АРЕНДА АВТОМОБИЛЕЙ В ТУРЦИИ",
    heroTitle: "Лучшие автомобили\nпо лучшим ценам",
    heroSub: "Без скрытых комиссий · Поддержка на русском · Бесплатная доставка в аэропорт",
    sameReturn: "Вернуть в другом месте",
    pickup: "Место получения",
    pickupDate: "Дата получения",
    pickupTime: "Время",
    returnDate: "Дата возврата",
    returnLoc: "Место возврата",
    chooseLocation: "Выберите локацию",
    searchBtn: "🔍 Найти",
    whyTitle: "Почему LocalRent?",
    whySub: "Мы работаем для вашего комфорта",
    why: [
      ["🏷️", "Честные цены", "Никаких скрытых платежей. Цена финальная."],
      ["🚗", "Новые авто", "Весь парк не старше 3 лет, всегда исправен."],
      ["📞", "Поддержка 24/7", "Русскоязычная поддержка круглосуточно."],
      ["✈️", "Доставка в аэропорт", "Встретим вас прямо у выхода из терминала."],
    ],
    carsTitle: "Наш автопарк",
    carsSub: "Запросите цену на любой автомобиль",
    carsAll: "Все автомобили →",
    blogTitle: "Блог",
    blogSub: "Советы и маршруты для путешественников",
    blogAll: "Все статьи →",
    blogRead: "Читать →",
    requestPrice: "Запросить цену",
    perDay: "/день",
    seats: "мест",
    featTitle: "Мы гарантируем конкурентные цены и высокий уровень обслуживания",
    footerDesc: "Аренда автомобилей в Турции.\nПоддержка на русском 24/7.\nБез скрытых комиссий.",
    footerNav: "Навигация",
    footerCities: "Города",
    footerLegal: "Правовая информация",
    footerLegalLinks: ["Политика конфиденциальности", "Политика cookies", "Условия использования", "Защита данных"],
    footerCopyright: "© 2026 LocalRent Türkiye. Все права защищены.",
    rentIn: "Аренда авто",
    // Pages
    carsPageTitle: "Все автомобили",
    carsPageSub: "Выберите авто — мы пришлём лучшую цену в течение 30 минут",
    blogPageTitle: "Блог",
    blogPageSub: "Советы, маршруты и полезная информация для путешественников",
    blogBackBtn: "← Назад в блог",
    blogCTA: "Хотите арендовать авто в Анталье?",
    faqTitle: "Часто задаваемые вопросы",
    faqSub: "Ответы на самые популярные вопросы об аренде авто",
    faqNoAnswer: "Не нашли ответ?",
    faqWA: "💬 Написать в WhatsApp",
    faqs: [
      { q: "Какие документы нужны для аренды?", a: "Действующее водительское удостоверение (стаж от 1 года) и паспорт. Для граждан стран, не подписавших Венскую конвенцию, требуется международное водительское удостоверение." },
      { q: "Есть ли скрытые платежи?", a: "Нет. Наши цены окончательные и включают все налоги и страховку. Никаких дополнительных комиссий." },
      { q: "Можно ли оплатить наличными?", a: "Да, принимаем наличные и банковские карты. Залог и предоплата не требуются." },
      { q: "Доставляете ли вы авто в аэропорт?", a: "Да, бесплатно доставляем в аэропорт Анталья (AYT) и любой отель. При возврате забираем у вас." },
      { q: "Что входит в страховку?", a: "Полное КАСКО без франшизы, страхование от угона и пожара, покрытие шин, стёкол, зеркал и днища." },
      { q: "Можно ли взять второго водителя?", a: "Да, второй водитель добавляется бесплатно." },
      { q: "Есть ли ограничение по пробегу?", a: "Нет, пробег неограниченный." },
      { q: "Что делать если машина сломалась?", a: "Звоните 24/7. Окажем помощь и при необходимости заменим автомобиль бесплатно." },
      { q: "Можно ли отменить бронирование?", a: "Отмена за 7+ дней — полный возврат. Менее 7 дней — удерживается 10%." },
      { q: "Как получить цену?", a: "Выберите авто, заполните форму — мы свяжемся в течение 30 минут с лучшим предложением." },
    ],
    aboutTitle: "О нас",
    aboutSub: "Мы — местная компания по аренде автомобилей в Турции",
    aboutHistory: "Наша история",
    aboutP1: "LocalRent — местная компания по аренде автомобилей, основанная в 2012 году в Анталье. За более чем 12 лет работы мы помогли тысячам туристов исследовать красоту Турции.",
    aboutP2: "Наш приоритет — простая, прозрачная и комфортная аренда. Поддержка на русском языке — 24/7.",
    aboutStats: [["12+", "лет на рынке"], ["5000+", "довольных клиентов"], ["6", "моделей автомобилей"], ["24/7", "поддержка на русском"]],
    locTitle: "Локации выдачи",
    locSub: "Мы доставим автомобиль в любую точку — аэропорт, отель или офис",
    locNotFound: "Не нашли свою локацию?",
    locNotFoundSub: "Мы доставим автомобиль куда угодно!",
    contactTitle: "Контакты",
    contactSub: "Мы всегда на связи",
    contactWrite: "Написать нам",
    contactSend: "Отправить",
    contactFields: [["Имя", "text", "Ваше имя"], ["Email", "email", "your@email.com"], ["Телефон", "tel", "+7 999 ..."]],
    contactMessage: "Сообщение",
    contactMessagePh: "Ваш вопрос...",
    contactInfo: [
      { icon: "📞", title: "Телефон", value: "+90 540 007 00 95", href: "tel:+905400070095" },
      { icon: "💬", title: "WhatsApp", value: "+90 540 007 00 95", href: "https://wa.me/905400070095" },
      { icon: "📸", title: "Instagram", value: "@localrent.com.tr", href: "https://instagram.com/localrent.com.tr" },
      { icon: "✉️", title: "Email", value: "info@localrent.com.tr", href: "mailto:info@localrent.com.tr" },
      { icon: "📍", title: "Адрес", value: "Анталья, Турция", href: null },
      { icon: "🕐", title: "Режим работы", value: "Пн–Вс: 00:00 – 24:00", href: null },
    ],
    resTitle: "Запрос цены",
    resSub: "Выберите даты — мы пришлём лучшее предложение",
    resSelectCar: "🚗 Выбрать автомобиль",
    resOrWA: "Или получите цену напрямую в WhatsApp",
    resWA: "💬 Написать в WhatsApp",
    returnTime: "Время возврата",
    samePlace: "То же место",
    extrasTitle: "Дополнительные услуги",
    extrasSub: "Выберите что нужно — укажем в запросе",
    extrasAdded: "✓ Добавлено",
    extrasAdd: "Добавить",
    extrasContinue: "Продолжить →",
    extrasRequest: "Ваш запрос",
    extrasPrice: "💬 Пришлём лучшую цену за 30 мин",
    steps: ["Автомобиль", "Доп. услуги", "Ваши данные", "Готово"],
    bookingTitle: "Ваши данные",
    bookingFields: [["Имя", "name", "Иван"], ["Фамилия", "surname", "Иванов"], ["Телефон", "phone", "+7 999 123 45 67"], ["Email", "email", "ivan@mail.ru"], ["Номер рейса", "flight", "TK 123 (необязательно)"]],
    bookingNotes: "Примечания",
    bookingNotesPh: "Любые пожелания, вопросы по цене...",
    bookingSubmit: "📩 Отправить запрос на цену",
    bookingDetails: "Детали запроса",
    bookingAnswer: "💬 Ответим с ценой за 30 минут",
    doneTitle: "Запрос отправлен!",
    doneText1: "Мы получили ваш запрос и отправили подтверждение на",
    doneText2: "Наш менеджер свяжется с вами в течение 30 минут и предложит лучшую цену.",
    doneWA: "💬 Написать в WhatsApp",
    doneHome: "На главную",
    doneReqNo: "НОМЕР ЗАПРОСА",
    waText: "Здравствуйте! Хочу узнать цену на аренду авто.",
    waTextReq: "Здравствуйте! Мой номер запроса:",
    waTextWant: "Хочу уточнить цену.",
    termsTitle: "Условия аренды",
    termsSub: "Пожалуйста, ознакомьтесь перед бронированием",
    terms: [
      { icon: "🪪", title: "Водительское удостоверение", text: "Действующее национальное ВУ с паспортом. Для стран вне Венской конвенции — международное ВУ." },
      { icon: "👤", title: "Минимальный возраст", text: "21 год — Эконом; 23 года — Комфорт/SUV; 25 лет — Минивэн. Стаж вождения от 1 года." },
      { icon: "🛣️", title: "Неограниченный пробег", text: "Без суточного лимита пробега." },
      { icon: "💰", title: "Все налоги включены", text: "Цены окончательные, скрытых платежей нет." },
      { icon: "🔧", title: "Помощь на дороге 24/7", text: "Техническая помощь круглосуточно." },
      { icon: "✈️", title: "Доставка в аэропорт/отель", text: "Доставим в аэропорт, порт или отель." },
      { icon: "🛡️", title: "Полная страховка", text: "КАСКО без франшизы, угон, пожар, шины, стёкла, зеркала, днище." },
      { icon: "🔄", title: "Замена автомобиля", text: "При поломке заменим бесплатно." },
      { icon: "👥", title: "Второй водитель бесплатно", text: "Без дополнительной платы." },
      { icon: "❌", title: "Условия отмены", text: "7+ дней — полный возврат. Менее 7 дней — удерживается 10%." },
    ],
    privacyTitle: "Политика конфиденциальности",
    cookiesTitle: "Политика cookies",
    usageTitle: "Условия использования",
    dataTitle: "Защита персональных данных",
    days: "дней",
    day: "день",
    approx: "~",
  },
  tr: {
    nav: ["Araçlar", "Lokasyonlar", "Koşullar", "Rezervasyon", "Blog", "SSS", "Hakkımızda", "İletişim"],
    navBtn: "Fiyat Al",
    heroBadge: "🚗 TÜRKİYE'DE ARAÇ KİRALAMA",
    heroTitle: "En İyi Araçlar\nEn İyi Fiyatlarla",
    heroSub: "Gizli ücret yok · Türkçe destek · Havalimanına ücretsiz teslimat",
    sameReturn: "Farklı yerde teslim et",
    pickup: "Teslim alma yeri",
    pickupDate: "Teslim alma tarihi",
    pickupTime: "Saat",
    returnDate: "İade tarihi",
    returnLoc: "İade yeri",
    chooseLocation: "Lokasyon seçin",
    searchBtn: "🔍 Ara",
    whyTitle: "Neden LocalRent?",
    whySub: "Konforunuz için çalışıyoruz",
    why: [
      ["🏷️", "Dürüst Fiyatlar", "Gizli ücret yok. Fiyat kesindir."],
      ["🚗", "Yeni Araçlar", "Tüm araç parkı 3 yaşından genç ve daima bakımlı."],
      ["📞", "7/24 Destek", "Türkçe destek ekibi her zaman yanınızda."],
      ["✈️", "Havalimanı Teslimatı", "Sizi terminal çıkışında karşılıyoruz."],
    ],
    carsTitle: "Araç Parkımız",
    carsSub: "İstediğiniz araç için fiyat isteyin",
    carsAll: "Tüm araçlar →",
    blogTitle: "Blog",
    blogSub: "Gezginler için ipuçları ve rotalar",
    blogAll: "Tüm yazılar →",
    blogRead: "Oku →",
    requestPrice: "Fiyat Al",
    perDay: "/gün",
    seats: "kişi",
    featTitle: "Rekabetçi fiyatlar ve üst düzey hizmet garantisi veriyoruz",
    footerDesc: "Türkiye'de araç kiralama.\n7/24 Türkçe destek.\nGizli ücret yok.",
    footerNav: "Navigasyon",
    footerCities: "Şehirler",
    footerLegal: "Hukuki Bilgiler",
    footerLegalLinks: ["Gizlilik Politikası", "Çerez Politikası", "Kullanım Koşulları", "Veri Koruma"],
    footerCopyright: "© 2026 LocalRent Türkiye. Tüm hakları saklıdır.",
    rentIn: "Araç kiralama",
    carsPageTitle: "Tüm Araçlar",
    carsPageSub: "Araç seçin — 30 dakika içinde en iyi fiyatı göndeririz",
    blogPageTitle: "Blog",
    blogPageSub: "Gezginler için ipuçları, rotalar ve faydalı bilgiler",
    blogBackBtn: "← Bloga dön",
    blogCTA: "Antalya'da araç kiralamak ister misiniz?",
    faqTitle: "Sıkça Sorulan Sorular",
    faqSub: "Araç kiralama hakkında en çok sorulan sorular",
    faqNoAnswer: "Cevap bulamadınız mı?",
    faqWA: "💬 WhatsApp'tan yazın",
    faqs: [
      { q: "Kiralama için hangi belgeler gerekli?", a: "Geçerli sürücü belgesi (en az 1 yıl deneyim) ve pasaport. Viyana Sözleşmesi'ni imzalamayan ülke vatandaşları için uluslararası sürücü belgesi gereklidir." },
      { q: "Gizli ücret var mı?", a: "Hayır. Fiyatlarımız kesin olup tüm vergiler ve sigortayı kapsar. Ek komisyon yoktur." },
      { q: "Nakit ödeme yapılabilir mi?", a: "Evet, nakit ve banka kartı kabul ediyoruz. Depozito ve ön ödeme gerekmez." },
      { q: "Havalimanına araç teslimi yapıyor musunuz?", a: "Evet, Antalya Havalimanı (AYT) ve istediğiniz otele ücretsiz teslimat yapıyoruz." },
      { q: "Sigortaya neler dahil?", a: "Muafiyetsiz tam kasko, hırsızlık ve yangın sigortası, lastik, cam, ayna ve alt kısım güvencesi." },
      { q: "İkinci sürücü eklenebilir mi?", a: "Evet, ikinci sürücü ücretsiz olarak eklenir." },
      { q: "Kilometre sınırı var mı?", a: "Hayır, sınırsız kilometre." },
      { q: "Araç bozulursa ne yapmalıyım?", a: "7/24 arayın. Yol yardımı sağlar ve gerekirse ücretsiz araç değişimi yaparız." },
      { q: "Rezervasyon iptal edilebilir mi?", a: "7+ gün öncesi — tam iade. 7 günden az — %10 kesinti uygulanır." },
      { q: "Fiyat nasıl alınır?", a: "Araç seçin, formu doldurun — 30 dakika içinde en iyi teklifle geri dönüyoruz." },
    ],
    aboutTitle: "Hakkımızda",
    aboutSub: "Türkiye'de yerel bir araç kiralama şirketiyiz",
    aboutHistory: "Hikayemiz",
    aboutP1: "LocalRent, 2012 yılında Antalya'da kurulan yerel bir araç kiralama şirketidir. 12 yılı aşkın deneyimimizle binlerce turiste Türkiye'yi keşfetmelerinde yardımcı olduk.",
    aboutP2: "Önceliğimiz basit, şeffaf ve konforlu kiralama hizmetidir. Türkçe destek 7/24 hizmetinizdedir.",
    aboutStats: [["12+", "yıllık deneyim"], ["5000+", "memnun müşteri"], ["6", "araç modeli"], ["7/24", "Türkçe destek"]],
    locTitle: "Teslim Alma Lokasyonları",
    locSub: "Aracı istediğiniz yere teslim ediyoruz — havalimanı, otel veya ofis",
    locNotFound: "Lokasyonunuzu bulamadınız mı?",
    locNotFoundSub: "Aracı istediğiniz her yere teslim ederiz!",
    contactTitle: "İletişim",
    contactSub: "Her zaman ulaşabilirsiniz",
    contactWrite: "Bize Yazın",
    contactSend: "Gönder",
    contactFields: [["İsim", "text", "Adınız"], ["Email", "email", "your@email.com"], ["Telefon", "tel", "+90 ..."]],
    contactMessage: "Mesaj",
    contactMessagePh: "Sorunuz...",
    contactInfo: [
      { icon: "📞", title: "Telefon", value: "+90 540 007 00 95", href: "tel:+905400070095" },
      { icon: "💬", title: "WhatsApp", value: "+90 540 007 00 95", href: "https://wa.me/905400070095" },
      { icon: "📸", title: "Instagram", value: "@localrent.com.tr", href: "https://instagram.com/localrent.com.tr" },
      { icon: "✉️", title: "Email", value: "info@localrent.com.tr", href: "mailto:info@localrent.com.tr" },
      { icon: "📍", title: "Adres", value: "Antalya, Türkiye", href: null },
      { icon: "🕐", title: "Çalışma Saatleri", value: "Pzt–Paz: 00:00 – 24:00", href: null },
    ],
    resTitle: "Fiyat Talebi",
    resSub: "Tarihleri seçin — en iyi teklifi göndereceğiz",
    resSelectCar: "🚗 Araç Seç",
    resOrWA: "Ya da doğrudan WhatsApp'tan fiyat alın",
    resWA: "💬 WhatsApp'tan Yaz",
    returnTime: "İade saati",
    samePlace: "Aynı yer",
    extrasTitle: "Ek Hizmetler",
    extrasSub: "İhtiyacınız olanları seçin — talebe ekleyelim",
    extrasAdded: "✓ Eklendi",
    extrasAdd: "Ekle",
    extrasContinue: "Devam Et →",
    extrasRequest: "Talebiniz",
    extrasPrice: "💬 30 dk içinde en iyi fiyatı göndeririz",
    steps: ["Araç", "Ek Hizmetler", "Bilgileriniz", "Tamamlandı"],
    bookingTitle: "Bilgileriniz",
    bookingFields: [["İsim", "name", "Ali"], ["Soyisim", "surname", "Yılmaz"], ["Telefon", "phone", "+90 555 123 45 67"], ["Email", "email", "ali@mail.com"], ["Uçuş numarası", "flight", "TK 123 (isteğe bağlı)"]],
    bookingNotes: "Notlar",
    bookingNotesPh: "İstekleriniz, fiyat soruları...",
    bookingSubmit: "📩 Fiyat Talebi Gönder",
    bookingDetails: "Talep Detayları",
    bookingAnswer: "💬 30 dakika içinde fiyatla yanıt veririz",
    doneTitle: "Talebiniz Gönderildi!",
    doneText1: "Talebinizi aldık ve onay gönderdik:",
    doneText2: "Yöneticimiz 30 dakika içinde en iyi teklifle sizinle iletişime geçecek.",
    doneWA: "💬 WhatsApp'tan Yaz",
    doneHome: "Ana Sayfaya Dön",
    doneReqNo: "TALEP NUMARASI",
    waText: "Merhaba! Araç kiralama fiyatı öğrenmek istiyorum.",
    waTextReq: "Merhaba! Talep numaram:",
    waTextWant: "Fiyatı öğrenmek istiyorum.",
    termsTitle: "Kiralama Koşulları",
    termsSub: "Lütfen rezervasyondan önce okuyun",
    terms: [
      { icon: "🪪", title: "Sürücü Belgesi", text: "Geçerli ulusal sürücü belgesi ve pasaport. Viyana Sözleşmesi dışı ülkeler için uluslararası ehliyet." },
      { icon: "👤", title: "Minimum Yaş", text: "21 yaş — Ekonomi; 23 yaş — Konfor/SUV; 25 yaş — Minivan. En az 1 yıl sürüş deneyimi." },
      { icon: "🛣️", title: "Sınırsız Kilometre", text: "Günlük kilometre sınırı yok." },
      { icon: "💰", title: "Tüm Vergiler Dahil", text: "Fiyatlar kesin, gizli ücret yok." },
      { icon: "🔧", title: "7/24 Yol Yardımı", text: "Teknik yardım her zaman." },
      { icon: "✈️", title: "Havalimanı/Otel Teslimatı", text: "Havalimanı, liman veya otele teslim ediyoruz." },
      { icon: "🛡️", title: "Tam Sigorta", text: "Muafiyetsiz kasko, hırsızlık, yangın, lastik, cam, ayna, alt kısım." },
      { icon: "🔄", title: "Araç Değişimi", text: "Arıza durumunda ücretsiz değişim." },
      { icon: "👥", title: "İkinci Sürücü Ücretsiz", text: "Ek ücret ödemeden." },
      { icon: "❌", title: "İptal Koşulları", text: "7+ gün öncesi — tam iade. 7 günden az — %10 kesinti." },
    ],
    privacyTitle: "Gizlilik Politikası",
    cookiesTitle: "Çerez Politikası",
    usageTitle: "Kullanım Koşulları",
    dataTitle: "Kişisel Verilerin Korunması",
    days: "gün",
    day: "gün",
    approx: "~",
  },
  en: {
    nav: ["Cars", "Locations", "Terms", "Booking", "Blog", "FAQ", "About", "Contact"],
    navBtn: "Get a Quote",
    heroBadge: "🚗 CAR RENTAL IN TURKEY",
    heroTitle: "Best Cars\nat Best Prices",
    heroSub: "No hidden fees · English support · Free airport delivery",
    sameReturn: "Return at a different location",
    pickup: "Pick-up location",
    pickupDate: "Pick-up date",
    pickupTime: "Time",
    returnDate: "Return date",
    returnLoc: "Return location",
    chooseLocation: "Select location",
    searchBtn: "🔍 Search",
    whyTitle: "Why LocalRent?",
    whySub: "We work for your comfort",
    why: [
      ["🏷️", "Honest Prices", "No hidden fees. The price is final."],
      ["🚗", "New Cars", "All fleet under 3 years old, always maintained."],
      ["📞", "24/7 Support", "English-speaking support around the clock."],
      ["✈️", "Airport Delivery", "We'll meet you right at the terminal exit."],
    ],
    carsTitle: "Our Fleet",
    carsSub: "Request a price for any car",
    carsAll: "All cars →",
    blogTitle: "Blog",
    blogSub: "Tips and routes for travelers",
    blogAll: "All articles →",
    blogRead: "Read →",
    requestPrice: "Get a Quote",
    perDay: "/day",
    seats: "seats",
    featTitle: "We guarantee competitive prices and high-quality service",
    footerDesc: "Car rental in Turkey.\n24/7 English support.\nNo hidden fees.",
    footerNav: "Navigation",
    footerCities: "Cities",
    footerLegal: "Legal Information",
    footerLegalLinks: ["Privacy Policy", "Cookie Policy", "Terms of Use", "Data Protection"],
    footerCopyright: "© 2026 LocalRent Türkiye. All rights reserved.",
    rentIn: "Car rental",
    carsPageTitle: "All Cars",
    carsPageSub: "Choose a car — we'll send you the best price within 30 minutes",
    blogPageTitle: "Blog",
    blogPageSub: "Tips, routes and useful information for travelers",
    blogBackBtn: "← Back to blog",
    blogCTA: "Want to rent a car in Antalya?",
    faqTitle: "Frequently Asked Questions",
    faqSub: "Answers to the most common questions about car rental",
    faqNoAnswer: "Didn't find your answer?",
    faqWA: "💬 Write on WhatsApp",
    faqs: [
      { q: "What documents are required for rental?", a: "A valid driver's license (at least 1 year of experience) and passport. For countries outside the Vienna Convention, an international driver's license is required." },
      { q: "Are there any hidden fees?", a: "No. Our prices are final and include all taxes and insurance. No additional commissions." },
      { q: "Can I pay in cash?", a: "Yes, we accept cash and bank cards. No deposit or prepayment required." },
      { q: "Do you deliver the car to the airport?", a: "Yes, we deliver for free to Antalya Airport (AYT) and any hotel. We also pick up on return." },
      { q: "What's included in the insurance?", a: "Full comprehensive insurance with no excess, theft and fire coverage, tires, glass, mirrors and underbody protection." },
      { q: "Can I add a second driver?", a: "Yes, a second driver is added free of charge." },
      { q: "Is there a mileage limit?", a: "No, unlimited mileage." },
      { q: "What if the car breaks down?", a: "Call us 24/7. We'll provide roadside assistance and replace the car free of charge if needed." },
      { q: "Can I cancel my booking?", a: "Cancellation 7+ days before — full refund. Less than 7 days — 10% is retained." },
      { q: "How do I get a price?", a: "Choose a car, fill in the form — we'll contact you within 30 minutes with the best offer." },
    ],
    aboutTitle: "About Us",
    aboutSub: "We are a local car rental company in Turkey",
    aboutHistory: "Our Story",
    aboutP1: "LocalRent is a local car rental company founded in 2012 in Antalya. Over 12 years we've helped thousands of tourists explore the beauty of Turkey.",
    aboutP2: "Our priority is simple, transparent and comfortable rental. English support is available 24/7.",
    aboutStats: [["12+", "years in business"], ["5000+", "happy customers"], ["6", "car models"], ["24/7", "English support"]],
    locTitle: "Pick-up Locations",
    locSub: "We deliver the car anywhere — airport, hotel or office",
    locNotFound: "Can't find your location?",
    locNotFoundSub: "We'll deliver the car anywhere!",
    contactTitle: "Contact",
    contactSub: "We're always available",
    contactWrite: "Write to Us",
    contactSend: "Send",
    contactFields: [["Name", "text", "Your name"], ["Email", "email", "your@email.com"], ["Phone", "tel", "+1 999 ..."]],
    contactMessage: "Message",
    contactMessagePh: "Your question...",
    contactInfo: [
      { icon: "📞", title: "Phone", value: "+90 540 007 00 95", href: "tel:+905400070095" },
      { icon: "💬", title: "WhatsApp", value: "+90 540 007 00 95", href: "https://wa.me/905400070095" },
      { icon: "📸", title: "Instagram", value: "@localrent.com.tr", href: "https://instagram.com/localrent.com.tr" },
      { icon: "✉️", title: "Email", value: "info@localrent.com.tr", href: "mailto:info@localrent.com.tr" },
      { icon: "📍", title: "Address", value: "Antalya, Turkey", href: null },
      { icon: "🕐", title: "Working Hours", value: "Mon–Sun: 00:00 – 24:00", href: null },
    ],
    resTitle: "Price Request",
    resSub: "Select dates — we'll send you the best offer",
    resSelectCar: "🚗 Choose a Car",
    resOrWA: "Or get a price directly on WhatsApp",
    resWA: "💬 Write on WhatsApp",
    returnTime: "Return time",
    samePlace: "Same location",
    extrasTitle: "Additional Services",
    extrasSub: "Select what you need — we'll include it in the request",
    extrasAdded: "✓ Added",
    extrasAdd: "Add",
    extrasContinue: "Continue →",
    extrasRequest: "Your Request",
    extrasPrice: "💬 We'll send the best price in 30 min",
    steps: ["Car", "Extras", "Your Details", "Done"],
    bookingTitle: "Your Details",
    bookingFields: [["First Name", "name", "John"], ["Last Name", "surname", "Smith"], ["Phone", "phone", "+1 999 123 45 67"], ["Email", "email", "john@mail.com"], ["Flight number", "flight", "TK 123 (optional)"]],
    bookingNotes: "Notes",
    bookingNotesPh: "Any requests, price questions...",
    bookingSubmit: "📩 Send Price Request",
    bookingDetails: "Request Details",
    bookingAnswer: "💬 We'll reply with a price in 30 minutes",
    doneTitle: "Request Sent!",
    doneText1: "We received your request and sent a confirmation to",
    doneText2: "Our manager will contact you within 30 minutes with the best price.",
    doneWA: "💬 Write on WhatsApp",
    doneHome: "Back to Home",
    doneReqNo: "REQUEST NUMBER",
    waText: "Hello! I'd like to know the car rental price.",
    waTextReq: "Hello! My request number is:",
    waTextWant: "I'd like to confirm the price.",
    termsTitle: "Rental Terms",
    termsSub: "Please read before booking",
    terms: [
      { icon: "🪪", title: "Driver's License", text: "Valid national driver's license with passport. International license required for non-Vienna Convention countries." },
      { icon: "👤", title: "Minimum Age", text: "21 years — Economy; 23 years — Comfort/SUV; 25 years — Minivan. At least 1 year driving experience." },
      { icon: "🛣️", title: "Unlimited Mileage", text: "No daily mileage limit." },
      { icon: "💰", title: "All Taxes Included", text: "Final prices, no hidden fees." },
      { icon: "🔧", title: "24/7 Roadside Assistance", text: "Technical help around the clock." },
      { icon: "✈️", title: "Airport/Hotel Delivery", text: "Delivery to airport, port or hotel." },
      { icon: "🛡️", title: "Full Insurance", text: "Comprehensive with no excess, theft, fire, tires, glass, mirrors, underbody." },
      { icon: "🔄", title: "Car Replacement", text: "Free replacement in case of breakdown." },
      { icon: "👥", title: "Second Driver Free", text: "No extra charge." },
      { icon: "❌", title: "Cancellation Policy", text: "7+ days before — full refund. Less than 7 days — 10% retained." },
    ],
    privacyTitle: "Privacy Policy",
    cookiesTitle: "Cookie Policy",
    usageTitle: "Terms of Use",
    dataTitle: "Personal Data Protection",
    days: "days",
    day: "day",
    approx: "~",
  }
};

const blogs = {
  ru: [
    { id: 1, title: "Как арендовать авто в Анталье: полное руководство", date: "01.04.2026", category: "Советы", image: "/antalya.jpg", excerpt: "Аренда автомобиля в Анталье — лучший способ исследовать Турецкую Ривьеру.", content: `Анталья — один из самых популярных курортов Турции.\n\nЧто нужно для аренды:\n• Водительское удостоверение (стаж от 1 года)\n• Паспорт\n• Минимальный возраст — 21 год\n\nСоветы по экономии:\n• Бронируйте заранее — цены ниже\n• Выбирайте полную страховку\n• Проверяйте авто перед получением` },
    { id: 2, title: "Кемер на машине: лучшие маршруты 2026", date: "25.03.2026", category: "Маршруты", image: "/antalya.jpg", excerpt: "Кемер и его окрестности скрывают удивительные места.", content: `Кемер расположен в 45 км от Анталии.\n\nЧто посетить:\n• Олимпос — древний город\n• Фазелис — руины у воды\n• Гёйнюк каньон\n• Тахталы — канатная дорога` },
    { id: 3, title: "10 советов туристам при аренде авто в Турции", date: "15.03.2026", category: "Советы", image: "/antalya.jpg", excerpt: "Самые важные советы для тех, кто впервые берёт машину напрокат в Турции.", content: `1. Проверяйте автомобиль перед получением.\n2. Выбирайте полную страховку.\n3. Возьмите документы.\n4. Заправляйтесь на официальных АЗС.\n5. Соблюдайте скоростной режим.\n6. Уточните платные дороги (HGS).\n7. Парковка в центре платная.\n8. Держите номер поддержки.\n9. Проверьте запасное колесо.\n10. Верните авто с полным баком.` },
  ],
  tr: [
    { id: 1, title: "Antalya'da Araç Kiralama: Tam Rehber", date: "01.04.2026", category: "İpuçları", image: "/antalya.jpg", excerpt: "Antalya'da araç kiralamak Türk Rivierası'nı keşfetmenin en iyi yoludur.", content: `Antalya, Türkiye'nin en popüler tatil beldelerinden biridir.\n\nKiralama için gerekenler:\n• Sürücü belgesi (en az 1 yıl deneyim)\n• Pasaport\n• Minimum yaş — 21\n\nTasarruf ipuçları:\n• Erken rezervasyon yapın\n• Tam sigorta seçin\n• Aracı teslim almadan önce kontrol edin` },
    { id: 2, title: "Kemer'i Araçla Keşfedin: 2026 Rotaları", date: "25.03.2026", category: "Rotalar", image: "/antalya.jpg", excerpt: "Kemer ve çevresi harika yerleri barındırıyor.", content: `Kemer, Antalya'ya 45 km uzaklıktadır.\n\nGezilecek yerler:\n• Olimpos — antik şehir\n• Phaselis — su kenarındaki kalıntılar\n• Göynük Kanyonu\n• Tahtalı — teleferik` },
    { id: 3, title: "Türkiye'de Araç Kiralama: 10 İpucu", date: "15.03.2026", category: "İpuçları", image: "/antalya.jpg", excerpt: "Türkiye'de ilk kez araç kiralayacaklar için en önemli ipuçları.", content: `1. Teslim almadan önce aracı kontrol edin.\n2. Tam sigorta seçin.\n3. Belgelerinizi yanınıza alın.\n4. Resmi istasyonlardan yakıt alın.\n5. Hız limitine uyun.\n6. HGS (ücretli yollar) hakkında bilgi alın.\n7. Şehir merkezinde park ücretlidir.\n8. Destek numarasını saklayın.\n9. Stepneyi kontrol edin.\n10. Aracı dolu depolu iade edin.` },
  ],
  en: [
    { id: 1, title: "How to Rent a Car in Antalya: Complete Guide", date: "01.04.2026", category: "Tips", image: "/antalya.jpg", excerpt: "Renting a car in Antalya is the best way to explore the Turkish Riviera.", content: `Antalya is one of Turkey's most popular resorts.\n\nWhat you need:\n• Driver's license (at least 1 year experience)\n• Passport\n• Minimum age — 21\n\nMoney-saving tips:\n• Book in advance\n• Choose full insurance\n• Inspect the car before pick-up` },
    { id: 2, title: "Kemer by Car: Best Routes 2026", date: "25.03.2026", category: "Routes", image: "/antalya.jpg", excerpt: "Kemer and its surroundings hide amazing places.", content: `Kemer is 45 km from Antalya.\n\nPlaces to visit:\n• Olympos — ancient city\n• Phaselis — ruins by the water\n• Goynuk Canyon\n• Tahtali — cable car` },
    { id: 3, title: "10 Tips for Renting a Car in Turkey", date: "15.03.2026", category: "Tips", image: "/antalya.jpg", excerpt: "The most important tips for first-time car renters in Turkey.", content: `1. Inspect the car before pick-up.\n2. Choose full insurance.\n3. Bring your documents.\n4. Refuel at official stations.\n5. Observe speed limits.\n6. Ask about toll roads (HGS).\n7. City center parking is paid.\n8. Save the support number.\n9. Check the spare tire.\n10. Return the car with a full tank.` },
  ],
};

const cars = [
  { id: 9, name: "Skoda Superb", category: { ru: "Премиум", tr: "Premium", en: "Premium" }, price: 85, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Бензин", tr: "Benzin", en: "Petrol" }, image: "/cars/superb.jpg" },
  { id: 8, name: "BYD Seal U", category: { ru: "SUV", tr: "SUV", en: "SUV" }, price: 75, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Электро", tr: "Elektrik", en: "Electric" }, image: "/cars/bydseal.jpg" },
  { id: 5, name: "Citroen SpaceTourer", category: { ru: "Минивэн", tr: "Minivan", en: "Minivan" }, price: 75, seats: 8, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Дизель", tr: "Dizel", en: "Diesel" }, image: "/cars/minivan.jpg" },
  { id: 7, name: "Opel Grandland", category: { ru: "SUV", tr: "SUV", en: "SUV" }, price: 70, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Бензин", tr: "Benzin", en: "Petrol" }, image: "/cars/grandland.jpg" },
  { id: 6, name: "Citroen C4X", category: { ru: "SUV", tr: "SUV", en: "SUV" }, price: 65, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Бензин", tr: "Benzin", en: "Petrol" }, image: "/cars/citroenc4x.jpg" },
  { id: 10, name: "Peugeot 2008", category: { ru: "SUV", tr: "SUV", en: "SUV" }, price: 58, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Бензин", tr: "Benzin", en: "Petrol" }, image: "/cars/peugeot2008.jpg" },
  { id: 4, name: "Dacia Duster", category: { ru: "SUV", tr: "SUV", en: "SUV" }, price: 55, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Дизель", tr: "Dizel", en: "Diesel" }, image: "/cars/duster.jpg" },
  { id: 12, name: "Toyota Corolla", category: { ru: "Комфорт Седан", tr: "Konfor Sedan", en: "Comfort Sedan" }, price: 40, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Бензин", tr: "Benzin", en: "Petrol" }, image: "/cars/corolla.jpg" },
  { id: 2, name: "Fiat Egea", category: { ru: "Комфорт", tr: "Konfor", en: "Comfort" }, price: 35, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Бензин", tr: "Benzin", en: "Petrol" }, image: "/cars/egea.jpeg" },
  { id: 3, name: "Opel Corsa", category: { ru: "Эконом", tr: "Ekonomi", en: "Economy" }, price: 28, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Бензин", tr: "Benzin", en: "Petrol" }, image: "/cars/opel.jpeg" },
  { id: 1, name: "Renault Clio", category: { ru: "Эконом", tr: "Ekonomi", en: "Economy" }, price: 30, seats: 5, transmission: { ru: "Автомат", tr: "Otomatik", en: "Automatic" }, fuel: { ru: "Бензин", tr: "Benzin", en: "Petrol" }, image: "/cars/cli5.jpg" },
  { id: 11, name: "Citroen C-Elysee", category: { ru: "Эконом Седан", tr: "Ekonomi Sedan", en: "Economy Sedan" }, price: 25, seats: 5, transmission: { ru: "Механика", tr: "Manuel", en: "Manual" }, fuel: { ru: "Бензин", tr: "Benzin", en: "Petrol" }, image: "/cars/celysee.jpg" },
];

const extras = {
  ru: [
    { id: "gps", name: "GPS навигатор", icon: "🗺️" },
    { id: "seat", name: "Детское кресло", icon: "👶" },
    { id: "insurance", name: "Полная страховка", icon: "🛡️" },
    { id: "driver", name: "Второй водитель", icon: "👤" },
  ],
  tr: [
    { id: "gps", name: "GPS Navigatör", icon: "🗺️" },
    { id: "seat", name: "Çocuk Koltuğu", icon: "👶" },
    { id: "insurance", name: "Tam Sigorta", icon: "🛡️" },
    { id: "driver", name: "İkinci Sürücü", icon: "👤" },
  ],
  en: [
    { id: "gps", name: "GPS Navigator", icon: "🗺️" },
    { id: "seat", name: "Child Seat", icon: "👶" },
    { id: "insurance", name: "Full Insurance", icon: "🛡️" },
    { id: "driver", name: "Second Driver", icon: "👤" },
  ],
};

const locations = [
  { city: { ru: "Анталья", tr: "Antalya", en: "Antalya" }, icon: "✈️", locs: { ru: ["Аэропорт Анталья (AYT)", "Центр Анталья", "Старый город Калейчи", "Лара", "Коньяалты"], tr: ["Antalya Havalimanı (AYT)", "Antalya Merkez", "Kaleiçi (Eski Şehir)", "Lara", "Konyaaltı"], en: ["Antalya Airport (AYT)", "Antalya Center", "Kaleiçi (Old Town)", "Lara", "Konyaaltı"] } },
  { city: { ru: "Кемер", tr: "Kemer", en: "Kemer" }, icon: "🏖️", locs: { ru: ["Центр Кемер", "Бельдиби", "Гёйнюк", "Кириш", "Чамьюва"], tr: ["Kemer Merkez", "Beldibi", "Göynük", "Kiriş", "Çamyuva"], en: ["Kemer Center", "Beldibi", "Göynük", "Kiriş", "Çamyuva"] } },
  { city: { ru: "Алания", tr: "Alanya", en: "Alanya" }, icon: "🏰", locs: { ru: ["Центр Алания", "Авсаллар", "Окурджалар", "Махмутлар", "Газипаша"], tr: ["Alanya Merkez", "Avsallar", "Okurcalar", "Mahmutlar", "Gazipaşa"], en: ["Alanya Center", "Avsallar", "Okurcalar", "Mahmutlar", "Gazipaşa"] } },
  { city: { ru: "Бодрум", tr: "Bodrum", en: "Bodrum" }, icon: "⛵", locs: { ru: ["Аэропорт Бодрум (BJV)", "Центр Бодрум", "Турбукю", "Яликавак", "Гюмюшлюк"], tr: ["Bodrum Havalimanı (BJV)", "Bodrum Merkez", "Türkbükü", "Yalıkavak", "Gümüşlük"], en: ["Bodrum Airport (BJV)", "Bodrum Center", "Türkbükü", "Yalıkavak", "Gümüşlük"] } },
  { city: { ru: "Мармарис", tr: "Marmaris", en: "Marmaris" }, icon: "🌊", locs: { ru: ["Центр Мармарис", "Ичмелер", "Армутлан", "Датча", "Бозбурун"], tr: ["Marmaris Merkez", "İçmeler", "Armutalan", "Datça", "Bozburun"], en: ["Marmaris Center", "İçmeler", "Armutalan", "Datça", "Bozburun"] } },
  { city: { ru: "Фетхие", tr: "Fethiye", en: "Fethiye" }, icon: "🪂", locs: { ru: ["Центр Фетхие", "Олюдениз", "Хисаранью", "Каякёй", "Гёчек"], tr: ["Fethiye Merkez", "Ölüdeniz", "Hisarönü", "Kayaköy", "Göcek"], en: ["Fethiye Center", "Ölüdeniz", "Hisarönü", "Kayaköy", "Göcek"] } },
];

export default function App() {
  const [lang, setLang] = useState("ru");
  const [page, setPage] = useState("home");
  const [selectedCar, setSelectedCar] = useState(null);
  const [search, setSearch] = useState({ pickup: "", pickupDate: "", pickupTime: "10:00", returnLoc: "", returnDate: "", returnTime: "10:00", sameReturn: true });
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [form, setForm] = useState({ name: "", surname: "", phone: "", email: "", flight: "", notes: "" });
  const [done, setDone] = useState(false);
  const [reservationNo, setReservationNo] = useState("");

  const t = T[lang];
  const blogList = blogs[lang];
  const extrasList = extras[lang];

  const sendEmail = (car, resNo) => {
    if (typeof window.emailjs === "undefined") return;
    window.emailjs.init("NOP4w5U43oGZ4P0RS");
    const params = {
      from_name: form.name + " " + form.surname,
      name: form.name + " " + form.surname,
      phone: form.phone,
      email: form.email,
      car_name: car.name,
      pickup_date: search.pickupDate || "-",
      return_date: search.returnDate || "-",
      pickup_location: search.pickup || "-",
      return_location: search.returnLoc || search.pickup || "-",
      pickup_time: search.pickupTime || "-",
      return_time: search.returnTime || "-",
      extras: selectedExtras.map(id => extrasList.find(e => e.id === id)?.name).join(", ") || "-",
      flight: form.flight || "-",
      notes: form.notes || "-",
      message: "New request from " + form.name,
      title: car.name,
      reservation_no: resNo || "-",
    };
    window.emailjs.send("service_k60k4su", "template_508cxnq", params).catch(e => console.error(e));
    window.emailjs.send("service_k60k4su", "template_4d8skxp", params).catch(e => console.error(e));
  };

  const days = search.pickupDate && search.returnDate
    ? Math.max(1, Math.ceil((new Date(search.returnDate) - new Date(search.pickupDate)) / 86400000))
    : null;

  const setS = (k, v) => setSearch(p => ({ ...p, [k]: v }));

  const goTo = (pg) => {
    const url = pg === "home" ? "/" : "/" + pg;
    window.history.pushState({ page: pg }, "", url);
    setPage(pg);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const onPop = (e) => {
      if (e.state?.page) setPage(e.state.page);
      else setPage("home");
    };
    window.addEventListener("popstate", onPop);
    window.history.replaceState({ page: "home" }, "", "/");
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navPages = [["cars"], ["locations"], ["terms"], ["reservation"], ["blog"], ["faq"], ["about"], ["contact"]];

  if (done) return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "#f0f7f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Montserrat:wght@700;900&display=swap');`}</style>
      <div style={{ background: "#fff", borderRadius: 16, padding: "56px 48px", textAlign: "center", maxWidth: 480, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: 28, color: "#1a5c2a", marginBottom: 12 }}>{t.doneTitle}</h2>
        <div style={{ background: "#f0f9f3", border: "2px solid #2d8a47", borderRadius: 10, padding: "16px 24px", marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{t.doneReqNo}</div>
          <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#1a5c2a", letterSpacing: 2 }}>{reservationNo}</div>
        </div>
        <p style={{ color: "#666", lineHeight: 1.7, marginBottom: 28 }}>
          {t.doneText1} <b>{form.email}</b>.<br />{t.doneText2}
        </p>
        <a href={`https://wa.me/${WHATSAPP}?text=${t.waTextReq} ${reservationNo}. ${t.waTextWant}`} target="_blank" rel="noreferrer"
          style={{ display: "block", background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "14px 36px", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          {t.doneWA}
        </a>
        <button onClick={() => { setDone(false); setPage("home"); setSelectedCar(null); setSelectedExtras([]); }}
          style={{ background: "#2d8a47", color: "#fff", border: "none", borderRadius: 8, padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {t.doneHome}
        </button>
      </div>
    </div>
  );

  const CarCard = ({ car }) => (
    <div className="car-card" onClick={() => { setSelectedCar(car); goTo("extras"); }}>
      <img src={car.image} alt={`${car.name} — rent a car Antalya`} style={{ width: "100%", height: 180, objectFit: "cover" }} onError={e => e.target.style.display="none"} />
      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <span className="badge" style={{ background: "#e8f5ec", color: "#2d8a47", marginBottom: 6, display: "block", width: "fit-content" }}>{car.category[lang]}</span>
            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 17, fontWeight: 800 }}>{car.name}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2d8a47" }}>${car.price}{t.perDay}</div>
            {days && <div style={{ fontSize: 11, color: "#999" }}>{t.approx}{days} {days === 1 ? t.day : t.days}</div>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#666", marginBottom: 14 }}>
          <span>👥 {car.seats} {t.seats}</span>
          <span>⚙️ {car.transmission[lang]}</span>
          <span>⛽ {car.fuel[lang]}</span>
        </div>
        <button className="green-btn" style={{ width: "100%", padding: "11px" }} onClick={e => { e.stopPropagation(); setSelectedCar(car); goTo("extras"); }}>
          {t.requestPrice}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "#fff", minHeight: "100vh", color: "#222", overflowX: "hidden", maxWidth: "100vw" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Montserrat:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; overflow-x: hidden; }
        html { overflow-x: hidden; }
        #root { overflow-x: hidden; max-width: 100vw; }
        .sel { width: 100%; padding: 11px 14px; border: 1.5px solid #ddd; border-radius: 8px; font-size: 14px; font-family: Nunito,sans-serif; outline: none; background: #fff; color: #222; transition: border .2s; }
        .sel:focus { border-color: #2d8a47; }
        .green-btn { background: #2d8a47; color: #fff; border: none; border-radius: 8px; padding: 13px 28px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: Nunito,sans-serif; transition: background .2s; }
        .green-btn:hover { background: #236b38; }
        .outline-btn { background: transparent; color: #2d8a47; border: 2px solid #2d8a47; border-radius: 8px; padding: 11px 24px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: Nunito,sans-serif; transition: all .2s; }
        .outline-btn:hover { background: #2d8a47; color: #fff; }
        .car-card { border: 2px solid #e8e8e8; border-radius: 14px; overflow: hidden; transition: all .3s; cursor: pointer; background: #fff; }
        .car-card:hover { border-color: #2d8a47; box-shadow: 0 8px 32px rgba(45,138,71,0.12); transform: translateY(-2px); }
        .badge { display:inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        .extra-card { border: 2px solid #e8e8e8; border-radius: 10px; padding: 14px; cursor: pointer; transition: all .2s; text-align: center; }
        .extra-card:hover { border-color: #2d8a47; }
        .extra-card.sel-extra { border-color: #2d8a47; background: #f0f9f3; }
        .step-bar { display: flex; gap: 0; margin-bottom: 40px; }
        .step { flex: 1; padding: 12px; text-align: center; font-size: 13px; font-weight: 700; border-bottom: 3px solid #e0e0e0; color: #999; }
        .step.active { border-bottom-color: #2d8a47; color: #2d8a47; }
        .step.done-step { border-bottom-color: #2d8a47; color: #2d8a47; }
        input.sel { appearance: none; }
        .info-box { background: #f8fdf9; border: 1.5px solid #d0eeda; border-radius: 10px; padding: 16px 20px; }
        .lang-btn { background: transparent; border: none; cursor: pointer; font-size: 13px; font-weight: 700; font-family: Nunito,sans-serif; padding: 4px 8px; border-radius: 4px; transition: all .2s; }
        .lang-btn.active { background: #2d8a47; color: #fff; border-radius: 4px; }
        .lang-btn:not(.active) { color: #666; }
        .lang-btn:not(.active):hover { color: #2d8a47; }
        @media (max-width: 768px) {
          nav { padding: 12px 16px !important; }
          nav > div:last-child { display: none !important; }
          .top-bar { padding: 8px 16px !important; font-size: 11px !important; overflow: hidden; }
          .hero { padding: 40px 16px 48px !important; }
          .search-box { padding: 20px 16px !important; }
          .search-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .cars-grid { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: repeat(3,1fr) !important; }
          .booking-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .locations-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .extras-grid { grid-template-columns: 1fr !important; }
          .section-pad { padding: 40px 16px !important; }
          .mob-lang { display: flex !important; }
        }
        @media (max-width: 480px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: repeat(2,1fr) !important; }
          .locations-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* TOP BAR */}
      <div className="top-bar" style={{ background: "#1a5c2a", color: "#fff", padding: "8px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>📞 {PHONE}</a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={{ color: "#7fff9a", textDecoration: "none", fontWeight: 700 }}>💬 WhatsApp</a>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ color: "#fff", textDecoration: "none" }}>📸 Instagram</a>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>|</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["ru","tr","en"].map(l => (
              <button key={l} onClick={() => setLang(l)} className={`lang-btn ${lang===l?"active":""}`} style={{ color: lang===l?"#fff":"rgba(255,255,255,0.7)" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav style={{ padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", background: "#fff", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 26, fontWeight: 900, color: "#1a5c2a", cursor: "pointer" }} onClick={() => goTo("home")}>
          Local<span style={{ color: "#2d8a47" }}>Rent</span>
          <span style={{ fontSize: 11, color: "#999", fontFamily: "Nunito,sans-serif", fontWeight: 600, marginLeft: 10, letterSpacing: 2 }}>TÜRKİYE</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {t.nav.map((label, i) => (
            <span key={label} onClick={() => goTo(navPages[i][0])} style={{ fontSize: 14, fontWeight: 700, color: page === navPages[i][0] ? "#2d8a47" : "#444", cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#2d8a47"}
              onMouseLeave={e => e.target.style.color = page === navPages[i][0] ? "#2d8a47" : "#444"}
            >{label}</span>
          ))}
          <button className="green-btn" style={{ padding: "10px 22px", fontSize: 14 }} onClick={() => goTo("cars")}>{t.navBtn}</button>
        </div>
      </nav>

      {page === "home" && <>
        {/* HERO */}
        <div className="hero" style={{ backgroundImage: "linear-gradient(135deg, rgba(26,92,42,0.75) 0%, rgba(45,138,71,0.70) 60%, rgba(26,92,42,0.78) 100%), url(/antalya.jpg)", backgroundSize: "cover", backgroundPosition: "center", padding: "40px 48px 80px", position: "relative", marginTop: "-1px", overflow: "hidden" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "6px 20px", fontSize: 13, color: "#fff", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>
              {t.heroBadge}
            </div>
            <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16, whiteSpace: "pre-line" }}>
              {t.heroTitle}
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 48, lineHeight: 1.6 }}>
              {t.heroSub}
            </p>
            <div className="search-box" style={{ background: "#fff", borderRadius: 16, padding: "28px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", textAlign: "left" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#666", marginBottom: 20, cursor: "pointer" }}>
                <input type="checkbox" checked={!search.sameReturn} onChange={e => setS("sameReturn", !e.target.checked)} style={{ accentColor: "#2d8a47" }} />
                {t.sameReturn}
              </label>
              <div className="search-grid" style={{ display: "grid", gridTemplateColumns: search.sameReturn ? "2fr 1fr 1fr 1fr 1fr auto" : "1fr 1fr 1fr 1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{t.pickup}</div>
                  <select aria-label={t.pickup} className="sel" value={search.pickup} onChange={e => setS("pickup", e.target.value)}>
                    <option value="">{t.chooseLocation}</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                {!search.sameReturn && <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{t.returnLoc}</div>
                  <select aria-label={t.returnLoc} className="sel" value={search.returnLoc} onChange={e => setS("returnLoc", e.target.value)}>
                    <option value="">{t.chooseLocation}</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{t.pickupDate}</div>
                  <input type="date" aria-label={t.pickupDate} className="sel" value={search.pickupDate} onChange={e => setS("pickupDate", e.target.value)} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{t.pickupTime}</div>
                  <select aria-label={t.pickupTime} className="sel" value={search.pickupTime} onChange={e => setS("pickupTime", e.target.value)}>
                    {times.map(t2 => <option key={t2}>{t2}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{t.returnDate}</div>
                  <input type="date" aria-label={t.returnDate} className="sel" value={search.returnDate} onChange={e => setS("returnDate", e.target.value)} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{t.pickupTime}</div>
                  <select aria-label={t.returnTime} className="sel" value={search.returnTime} onChange={e => setS("returnTime", e.target.value)}>
                    {times.map(t2 => <option key={t2}>{t2}</option>)}
                  </select>
                </div>
                <button className="green-btn" style={{ whiteSpace: "nowrap", height: 44 }} onClick={() => goTo("cars")}>
                  {t.searchBtn}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* WHY US */}
        <div className="section-pad" style={{ padding: "64px 48px", background: "#f9fdf9" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, textAlign: "center", color: "#1a5c2a", marginBottom: 8 }}>{t.whyTitle}</h2>
            <p style={{ textAlign: "center", color: "#888", marginBottom: 48 }}>{t.whySub}</p>
            <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }}>
              {t.why.map(([ic, title, desc]) => (
                <div key={title} style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1.5px solid #e8f5ec" }}>
                  <div style={{ fontSize: 40, marginBottom: 14 }}>{ic}</div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#1a5c2a", marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: 14, color: "#888", lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARS PREVIEW */}
        <div className="section-pad" style={{ padding: "64px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
              <div>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a" }}>{t.carsTitle}</h2>
                <p style={{ color: "#888", marginTop: 4 }}>{t.carsSub}</p>
              </div>
              <button className="outline-btn" onClick={() => goTo("cars")}>{t.carsAll}</button>
            </div>
            <div className="cars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {cars.filter(car => [8,7,9].includes(car.id)).map(car => <CarCard key={car.id} car={car} />)}
            </div>
          </div>
        </div>

        {/* BLOG PREVIEW */}
        <div className="section-pad" style={{ padding: "64px 48px", background: "#f9fdf9" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
              <div>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a" }}>{t.blogTitle}</h2>
                <p style={{ color: "#888", marginTop: 4 }}>{t.blogSub}</p>
              </div>
              <button className="outline-btn" onClick={() => goTo("blog")}>{t.blogAll}</button>
            </div>
            <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {blogList.map(blog => (
                <div key={blog.id} onClick={() => goTo("blog-" + blog.id)} style={{ border: "1.5px solid #e8f5ec", borderRadius: 14, overflow: "hidden", cursor: "pointer", background: "#fff" }}>
                  <img src={blog.image} alt={blog.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <div style={{ padding: "16px 20px" }}>
                    <span style={{ background: "#e8f5ec", color: "#2d8a47", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{blog.category}</span>
                    <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 15, fontWeight: 800, color: "#1a5c2a", margin: "10px 0 8px", lineHeight: 1.4 }}>{blog.title}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#bbb" }}>{blog.date}</span>
                      <span style={{ fontSize: 13, color: "#2d8a47", fontWeight: 700 }}>{t.blogRead}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ background: "#1a5c2a", padding: "60px 48px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", textAlign: "center", marginBottom: 8 }}>{t.featTitle}</h2>
            <div style={{ width: 60, height: 3, background: "rgba(255,255,255,0.5)", margin: "12px auto 48px" }} />
            <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 32 }}>
              {[
                { d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", text: lang==="ru"?"Полное КАСКО без франшизы":lang==="tr"?"Muafiyetsiz Tam Kasko":"Full Comprehensive Insurance" },
                { d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z", text: lang==="ru"?"Страхование от несчастных случаев":lang==="tr"?"Kaza Sigortası":"Accident Insurance" },
                { d: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z", text: lang==="ru"?"Страховка от угона и пожара":lang==="tr"?"Hırsızlık ve Yangın Sigortası":"Theft & Fire Insurance" },
                { d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12", text: lang==="ru"?"Покрытие шин, стёкол и днища":lang==="tr"?"Lastik, Cam ve Alt Kısım":"Tires, Glass & Underbody" },
                { d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", text: lang==="ru"?"Помощь на дороге 24/7":lang==="tr"?"7/24 Yol Yardımı":"24/7 Roadside Assistance" },
                { d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z", text: lang==="ru"?"Кредитная карта не требуется":lang==="tr"?"Kredi Kartı Gerekmiyor":"No Credit Card Required" },
                { d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75", text: lang==="ru"?"Нет скрытых платежей":lang==="tr"?"Gizli Ücret Yok":"No Hidden Fees" },
                { d: "M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z", text: lang==="ru"?"Все налоги включены":lang==="tr"?"Tüm Vergiler Dahil":"All Taxes Included" },
                { d: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z", text: lang==="ru"?"Оплата наличными или картой":lang==="tr"?"Nakit veya Kartla Ödeme":"Cash or Card Payment" },
                { d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", text: lang==="ru"?"Второй водитель бесплатно":lang==="tr"?"İkinci Sürücü Ücretsiz":"Second Driver Free" },
                { d: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z", text: lang==="ru"?"Неограниченный пробег":lang==="tr"?"Sınırsız Kilometre":"Unlimited Mileage" },
                { d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z", text: lang==="ru"?"Все авто с кондиционером":lang==="tr"?"Tüm Araçlarda Klima":"All Cars with A/C" },
                { d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", text: lang==="ru"?"Авто для некурящих":lang==="tr"?"Sigara İçilmez":"Non-smoking Cars" },
                { d: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z", text: lang==="ru"?"Карта маршрутов бесплатно":lang==="tr"?"Ücretsiz Rota Haritası":"Free Route Map" },
                { d: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z", text: lang==="ru"?"Детское кресло бесплатно":lang==="tr"?"Ücretsiz Çocuk Koltuğu":"Free Child Seat" },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5} style={{ width: 48, height: 48, marginBottom: 12 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
                  </svg>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: "#1a5c2a", color: "#fff", padding: "48px 48px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
              <div>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 900, marginBottom: 12 }}>LocalRent</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 16, whiteSpace: "pre-line" }}>{t.footerDesc}</div>
                <div style={{ display: "flex", gap: 16 }}>
                  <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>📞 {PHONE}</a>
                </div>
                <div style={{ marginTop: 8 }}><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={{ color: "#7fff9a", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>💬 WhatsApp</a></div>
                <div style={{ marginTop: 8 }}><a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ color: "#fff", textDecoration: "none", fontSize: 13 }}>📸 Instagram</a></div>
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>{t.footerNav}</div>
                {t.nav.map((label, i) => (
                  <div key={label} style={{ marginBottom: 8 }}>
                    <span onClick={() => goTo(navPages[i][0])} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer" }}
                      onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.7)"}
                    >→ {label}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>{t.footerCities}</div>
                {["Анталья","Кемер","Алания","Бодрум","Мармарис","Фетхие","Измир","Стамбул"].map(city => (
                  <div key={city} style={{ marginBottom: 8 }}>
                    <span onClick={() => goTo("locations")} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer" }}
                      onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.7)"}
                    >→ {t.rentIn} {city}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>{t.footerLegal}</div>
                {[["privacy"],["cookies"],["usage"],["dataprotection"]].map(([pg], i) => (
                  <div key={pg} style={{ marginBottom: 8 }}>
                    <span onClick={() => goTo(pg)} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer" }}
                      onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.7)"}
                    >→ {t.footerLegalLinks[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{t.footerCopyright}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>localrent.com.tr</div>
            </div>
          </div>
        </footer>
      </>}

      {/* BLOG LIST */}
      {page === "blog" && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.blogPageTitle}</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>{t.blogPageSub}</p>
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {blogList.map(blog => (
              <div key={blog.id} onClick={() => goTo("blog-" + blog.id)} style={{ border: "1.5px solid #e8f5ec", borderRadius: 14, overflow: "hidden", cursor: "pointer", background: "#fff" }}>
                <img src={blog.image} alt={blog.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ background: "#e8f5ec", color: "#2d8a47", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{blog.category}</span>
                  <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 800, color: "#1a5c2a", margin: "10px 0 8px", lineHeight: 1.4 }}>{blog.title}</h2>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 12 }}>{blog.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#bbb" }}>{blog.date}</span>
                    <span style={{ fontSize: 13, color: "#2d8a47", fontWeight: 700 }}>{t.blogRead}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {blogList.map(blog => page === "blog-" + blog.id && (
        <div key={blog.id} style={{ maxWidth: 760, margin: "0 auto", padding: "40px 48px" }}>
          <button onClick={() => goTo("blog")} style={{ background: "none", border: "none", color: "#2d8a47", fontWeight: 700, cursor: "pointer", fontSize: 14, marginBottom: 24, padding: 0 }}>{t.blogBackBtn}</button>
          <img src={blog.image} alt={blog.title} style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 14, marginBottom: 28 }} />
          <span style={{ background: "#e8f5ec", color: "#2d8a47", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{blog.category}</span>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#1a5c2a", margin: "12px 0 8px" }}>{blog.title}</h1>
          <div style={{ fontSize: 13, color: "#bbb", marginBottom: 24 }}>{blog.date}</div>
          <div style={{ fontSize: 15, color: "#444", lineHeight: 1.9, whiteSpace: "pre-line" }}>{blog.content}</div>
          <div style={{ marginTop: 40, background: "#f0f9f3", border: "1.5px solid #d0eeda", borderRadius: 12, padding: "24px", textAlign: "center" }}>
            <p style={{ fontWeight: 700, color: "#1a5c2a", marginBottom: 12 }}>{t.blogCTA}</p>
            <button className="green-btn" onClick={() => goTo("cars")}>{t.requestPrice} →</button>
          </div>
        </div>
      ))}

      {/* FAQ */}
      {page === "faq" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.faqTitle}</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>{t.faqSub}</p>
          {t.faqs.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eee", paddingBottom: 24, marginBottom: 24 }}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 800, color: "#1a5c2a", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ background: "#2d8a47", color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                {item.q}
              </div>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, paddingLeft: 40 }}>{item.a}</p>
            </div>
          ))}
          <div style={{ background: "#1a5c2a", borderRadius: 14, padding: "28px 36px", color: "#fff", textAlign: "center", marginTop: 20 }}>
            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{t.faqNoAnswer}</p>
            <a href="https://wa.me/905400070095" target="_blank" rel="noreferrer" style={{ background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>{t.faqWA}</a>
          </div>
        </div>
      )}

      {/* ABOUT */}
      {page === "about" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.aboutTitle}</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>{t.aboutSub}</p>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: "#1a5c2a", marginBottom: 16 }}>{t.aboutHistory}</h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16 }}>{t.aboutP1}</p>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>{t.aboutP2}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {t.aboutStats.map(([num, label]) => (
                <div key={label} style={{ background: "#f0f9f3", border: "1.5px solid #d0eeda", borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 36, fontWeight: 900, color: "#2d8a47" }}>{num}</div>
                  <div style={{ fontSize: 15, color: "#555", fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LOCATIONS */}
      {page === "locations" && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.locTitle}</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>{t.locSub}</p>
          <div className="locations-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
            {locations.map((loc) => (
              <div key={loc.city.ru} style={{ background: "#fff", border: "1.5px solid #e8f5ec", borderRadius: 14, padding: "24px" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{loc.icon}</div>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 17, fontWeight: 800, color: "#1a5c2a", marginBottom: 12 }}>{loc.city[lang]}</h3>
                {loc.locs[lang].map(l => (
                  <div key={l} style={{ fontSize: 13, color: "#666", padding: "5px 0", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "#2d8a47", fontSize: 10 }}>●</span> {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ background: "#1a5c2a", borderRadius: 14, padding: "28px 36px", color: "#fff", textAlign: "center" }}>
            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{t.locNotFound}</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>{t.locNotFoundSub}</p>
            <a href="https://wa.me/905400070095" target="_blank" rel="noreferrer" style={{ background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>{t.faqWA}</a>
          </div>
        </div>
      )}

      {/* CONTACT */}
      {page === "contact" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.contactTitle}</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>{t.contactSub}</p>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {t.contactInfo.map(({ icon, title, value, href }) => (
                <div key={title} style={{ display: "flex", alignItems: "center", gap: 16, background: "#f9fdf9", border: "1.5px solid #e8f5ec", borderRadius: 10, padding: "16px 20px" }}>
                  <span style={{ fontSize: 28 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: "#999", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{title}</div>
                    {href ? <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: 15, color: "#2d8a47", fontWeight: 700, textDecoration: "none" }}>{value}</a>
                    : <div style={{ fontSize: 15, color: "#333", fontWeight: 600 }}>{value}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#f9fdf9", border: "1.5px solid #e8f5ec", borderRadius: 14, padding: "28px" }}>
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 18, fontWeight: 800, color: "#1a5c2a", marginBottom: 20 }}>{t.contactWrite}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {t.contactFields.map(([label, type, ph]) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                    <input type={type} placeholder={ph} className="sel" aria-label={label} />
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{t.contactMessage}</div>
                  <textarea placeholder={t.contactMessagePh} className="sel" aria-label={t.contactMessage} style={{ resize: "vertical", minHeight: 90 }} />
                </div>
                <button className="green-btn" style={{ width: "100%" }}>{t.contactSend}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESERVATION */}
      {page === "reservation" && (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.resTitle}</h1>
          <p style={{ color: "#888", marginBottom: 36 }}>{t.resSub}</p>
          <div style={{ background: "#f9fdf9", border: "1.5px solid #d0eeda", borderRadius: 14, padding: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>{t.pickup}</div>
                <select aria-label={t.pickup} className="sel" value={search.pickup} onChange={e => setS("pickup", e.target.value)}>
                  <option value="">{t.chooseLocation}</option>
                  {cities.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>{t.returnLoc}</div>
                <select aria-label={t.returnLoc} className="sel" value={search.returnLoc} onChange={e => setS("returnLoc", e.target.value)}>
                  <option value="">{t.samePlace}</option>
                  {cities.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>{t.pickupDate}</div>
                <input type="date" aria-label={t.pickupDate} className="sel" value={search.pickupDate} onChange={e => setS("pickupDate", e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>{t.pickupTime}</div>
                <select aria-label={t.pickupTime} className="sel" value={search.pickupTime} onChange={e => setS("pickupTime", e.target.value)}>
                  {times.map(t2 => <option key={t2}>{t2}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>{t.returnDate}</div>
                <input type="date" aria-label={t.returnDate} className="sel" value={search.returnDate} onChange={e => setS("returnDate", e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>{t.returnTime}</div>
                <select aria-label={t.returnTime} className="sel" value={search.returnTime} onChange={e => setS("returnTime", e.target.value)}>
                  {times.map(t2 => <option key={t2}>{t2}</option>)}
                </select>
              </div>
            </div>
            <button className="green-btn" style={{ width: "100%", padding: 16, fontSize: 16 }} onClick={() => goTo("cars")}>{t.resSelectCar}</button>
          </div>
          <div style={{ marginTop: 28, background: "#fff", border: "1.5px solid #e8f5ec", borderRadius: 14, padding: "24px 32px", textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#888", marginBottom: 16 }}>{t.resOrWA}</p>
            <a href={`https://wa.me/905400070095?text=${t.waText}`} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "13px 28px", fontWeight: 700, fontSize: 15 }}>
              {t.resWA}
            </a>
          </div>
        </div>
      )}

      {/* TERMS */}
      {page === "terms" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.termsTitle}</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>{t.termsSub}</p>
          {t.terms.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eee", paddingBottom: 24, marginBottom: 24, display: "flex", gap: 20 }}>
              <div style={{ fontSize: 36, flexShrink: 0, width: 50, textAlign: "center" }}>{item.icon}</div>
              <div>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 17, fontWeight: 800, color: "#1a5c2a", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PRIVACY */}
      {page === "privacy" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.privacyTitle}</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>{ lang==="ru"?"Последнее обновление: апрель 2026":lang==="tr"?"Son güncelleme: Nisan 2026":"Last updated: April 2026"}</p>
          {(lang==="ru"?[
            { title: "Какие данные мы собираем", text: "Имя и фамилия, телефон, email, номер рейса (по желанию), информация об аренде. Данные собираются только при заполнении формы." },
            { title: "Как мы используем данные", text: "Только для обработки запроса, связи по вопросам бронирования и отправки подтверждения. Без маркетинговых рассылок без согласия." },
            { title: "Передача третьим лицам", text: "Данные не продаются и не передаются третьим лицам. Исключение — требования законодательства Турции." },
            { title: "Хранение данных", text: "Данные хранятся на защищённых серверах с шифрованием. Не дольше, чем необходимо." },
            { title: "Ваши права", text: "Вы можете запросить доступ, исправление или удаление данных. Пишите на info@localrent.com.tr." },
          ]:lang==="tr"?[
            { title: "Hangi verileri topluyoruz", text: "Ad, soyad, telefon, e-posta, uçuş numarası (isteğe bağlı). Yalnızca form doldurulduğunda." },
            { title: "Verileri nasıl kullanıyoruz", text: "Yalnızca talebi işlemek, rezervasyon iletişimi ve onay göndermek için. İzinsiz pazarlama yok." },
            { title: "Üçüncü taraflara aktarım", text: "Veriler satılmaz veya paylaşılmaz. Türk mevzuatı gerektirmedikçe." },
            { title: "Veri saklama", text: "Şifreli sunucularda, hizmet için gerekli süre kadar saklanır." },
            { title: "Haklarınız", text: "Verilere erişim, düzeltme veya silme talep edebilirsiniz. info@localrent.com.tr" },
          ]:[
            { title: "What data we collect", text: "Name, phone, email, flight number (optional). Only collected when the form is submitted." },
            { title: "How we use your data", text: "Only to process your request, contact you about booking and send confirmation. No marketing without consent." },
            { title: "Third party sharing", text: "Data is not sold or shared. Exception: Turkish legal requirements." },
            { title: "Data storage", text: "Stored on encrypted servers for as long as necessary." },
            { title: "Your rights", text: "You can request access, correction or deletion. Email: info@localrent.com.tr" },
          ]).map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eee", paddingBottom: 24, marginBottom: 24 }}>
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 17, fontWeight: 800, color: "#1a5c2a", marginBottom: 8 }}>{i+1}. {item.title}</h3>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7 }}>{item.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* COOKIES, USAGE, DATAPROTECTION - simplified */}
      {["cookies","usage","dataprotection"].map(pg => page === pg && (
        <div key={pg} style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>
            {pg==="cookies"?t.cookiesTitle:pg==="usage"?t.usageTitle:t.dataTitle}
          </h1>
          <p style={{ color: "#888", marginBottom: 40 }}>{lang==="ru"?"Последнее обновление: апрель 2026":lang==="tr"?"Son güncelleme: Nisan 2026":"Last updated: April 2026"}</p>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
            {pg==="cookies"
              ? (lang==="ru"?"Мы используем cookies для анализа трафика и улучшения сайта. Вы можете отключить их в настройках браузера.":lang==="tr"?"Site trafiğini analiz etmek ve iyileştirmek için çerezler kullanıyoruz. Tarayıcı ayarlarından devre dışı bırakabilirsiniz.":"We use cookies to analyze traffic and improve the site. You can disable them in your browser settings.")
              : pg==="usage"
              ? (lang==="ru"?"Используя сайт localrent.com.tr, вы соглашаетесь с данными условиями. Все материалы защищены авторским правом. Условия регулируются законодательством Турции.":lang==="tr"?"localrent.com.tr sitesini kullanarak bu koşulları kabul etmiş sayılırsınız. Tüm içerikler telif hakkıyla korunmaktadır. Türk hukuku geçerlidir.":"By using localrent.com.tr you agree to these terms. All content is copyright protected. Governed by Turkish law.")
              : (lang==="ru"?"Обработка персональных данных осуществляется в соответствии с Законом о защите персональных данных Турции (KVKK № 6698). Вы имеете право на доступ, исправление и удаление ваших данных.":lang==="tr"?"Kişisel veriler, Türkiye Kişisel Verilerin Korunması Kanunu (KVKK No. 6698) kapsamında işlenmektedir. Verilerinize erişim, düzeltme ve silme hakkına sahipsiniz.":"Personal data is processed in accordance with Turkish Personal Data Protection Law (KVKK No. 6698). You have the right to access, correct and delete your data.")}
          </p>
        </div>
      ))}

      {/* CARS */}
      {page === "cars" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 48px" }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.carsPageTitle}</h2>
          <p style={{ color: "#888", marginBottom: 32 }}>{t.carsPageSub}</p>
          <div className="cars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {cars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      )}

      {/* EXTRAS */}
      {page === "extras" && selectedCar && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 48px" }}>
          <div className="step-bar">
            {t.steps.map((s, i) => (
              <div key={s} className={`step ${i === 1 ? "active" : i < 1 ? "done-step" : ""}`}>{i < 1 ? "✓ " : ""}{s}</div>
            ))}
          </div>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 24, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>{t.extrasTitle}</h2>
          <p style={{ color: "#888", marginBottom: 28 }}>{t.extrasSub}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
            <div>
              <div className="extras-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                {extrasList.map(ex => (
                  <div key={ex.id} className={`extra-card ${selectedExtras.includes(ex.id) ? "sel-extra" : ""}`}
                    onClick={() => setSelectedExtras(p => p.includes(ex.id) ? p.filter(x => x !== ex.id) : [...p, ex.id])}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{ex.icon}</div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{ex.name}</div>
                    <div style={{ color: "#2d8a47", fontWeight: 600, fontSize: 13 }}>
                      {selectedExtras.includes(ex.id) ? t.extrasAdded : t.extrasAdd}
                    </div>
                  </div>
                ))}
              </div>
              <button className="green-btn" style={{ width: "100%" }} onClick={() => goTo("booking")}>{t.extrasContinue}</button>
            </div>
            <div className="info-box">
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16, color: "#1a5c2a" }}>{t.extrasRequest}</div>
              <img src={selectedCar.image} alt={selectedCar.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 14 }} onError={e => e.target.style.display="none"} />
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{selectedCar.name}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>{selectedCar.category[lang]} · {selectedCar.transmission[lang]}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#2d8a47", marginBottom: 14 }}>${selectedCar.price}{t.perDay}</div>
              {days && <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>🗓 {days} {days === 1 ? t.day : t.days}</div>}
              {search.pickup && <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>📍 {search.pickup}</div>}
              <div style={{ borderTop: "1px solid #d0eeda", marginTop: 14, paddingTop: 14, background: "#f0f9f3", borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#2d8a47", fontWeight: 700 }}>{t.extrasPrice}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING */}
      {page === "booking" && selectedCar && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 48px" }}>
          <div className="step-bar">
            {t.steps.map((s, i) => (
              <div key={s} className={`step ${i === 2 ? "active" : i < 2 ? "done-step" : ""}`}>{i < 2 ? "✓ " : ""}{s}</div>
            ))}
          </div>
          <div className="booking-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 32 }}>
            <div>
              <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 900, color: "#1a5c2a", marginBottom: 24 }}>{t.bookingTitle}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {t.bookingFields.map(([label, key, ph]) => (
                  <div key={key} style={{ gridColumn: key === "flight" ? "1/-1" : "auto" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                    <input aria-label={label} placeholder={ph} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="sel" />
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{t.bookingNotes}</div>
                  <textarea aria-label={t.bookingNotes} placeholder={t.bookingNotesPh} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="sel" style={{ resize: "vertical", minHeight: 80 }} />
                </div>
              </div>
              <button
                onClick={() => {
                  const resNo = "LR-" + Date.now().toString().slice(-6);
                  setReservationNo(resNo);
                  sendEmail(selectedCar, resNo);
                  setDone(true);
                }}
                style={{ width: "100%", marginTop: 24, padding: 16, fontSize: 16, background: form.name && form.email && form.phone ? "#2d8a47" : "#ccc", color: "#fff", border: "none", borderRadius: 8, fontFamily: "Nunito,sans-serif", fontWeight: 700, cursor: form.name && form.email && form.phone ? "pointer" : "not-allowed" }}>
                {t.bookingSubmit}
              </button>
            </div>
            <div className="info-box" style={{ height: "fit-content" }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 14, color: "#1a5c2a" }}>{t.bookingDetails}</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedCar.name}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>{selectedCar.category[lang]} · {selectedCar.transmission[lang]}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#2d8a47", marginBottom: 12 }}>${selectedCar.price}{t.perDay}</div>
              {search.pickup && <div style={{ fontSize: 13, marginBottom: 4 }}>📍 {search.pickup}</div>}
              {search.pickupDate && <div style={{ fontSize: 13, marginBottom: 4 }}>📅 {search.pickupDate} — {search.pickupTime}</div>}
              {search.returnDate && <div style={{ fontSize: 13, marginBottom: 4 }}>🔄 {search.returnDate} — {search.returnTime}</div>}
              {days && <div style={{ fontSize: 13, marginBottom: 4 }}>🗓 {days} {days === 1 ? t.day : t.days}</div>}
              {selectedExtras.length > 0 && (
                <div style={{ fontSize: 13, marginBottom: 4 }}>➕ {selectedExtras.map(id => extrasList.find(e => e.id === id)?.name).join(", ")}</div>
              )}
              <div style={{ borderTop: "1px solid #d0eeda", marginTop: 14, paddingTop: 14, background: "#f0f9f3", borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#2d8a47", fontWeight: 700 }}>{t.bookingAnswer}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WHATSAPP FLOAT */}
      <a href={`https://wa.me/${WHATSAPP}?text=${t.waText}`} target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: 28, right: 16, zIndex: 9999, width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg,#25d366,#128c7e)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 24px rgba(37,211,102,0.4)", textDecoration: "none" }}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
