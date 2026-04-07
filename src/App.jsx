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

const blogs = [
  {
    id: 1,
    title: "Как арендовать авто в Анталье: полное руководство",
    date: "01.04.2026",
    category: "Советы",
    image: "/antalya.jpg",
    excerpt: "Аренда автомобиля в Анталье — лучший способ исследовать Турецкую Ривьеру. Рассказываем, как выбрать машину, что взять с собой и как сэкономить.",
    content: `Анталья — один из самых популярных курортов Турции. Чтобы увидеть всё самое интересное, лучший вариант — арендовать автомобиль. Так вы сможете посетить Кемер, Аланью, Сиде и другие города в удобное время.\n\nЧто нужно для аренды:\n• Водительское удостоверение (стаж от 1 года)\n• Паспорт\n• Минимальный возраст — 21 год\n\nСоветы по экономии:\n• Бронируйте заранее — цены ниже\n• Выбирайте полную страховку\n• Проверяйте авто перед получением`
  },
  {
    id: 2,
    title: "Кемер на машине: лучшие маршруты 2026",
    date: "25.03.2026",
    category: "Маршруты",
    image: "/antalya.jpg",
    excerpt: "Кемер и его окрестности скрывают удивительные места: древние руины, горные дороги и уединённые пляжи. Составили для вас идеальный маршрут.",
    content: `Кемер расположен в 45 км от Анталии. На машине вы доберётесь туда за 40 минут по живописному шоссе вдоль моря.\n\nЧто посетить рядом с Кемером:\n• Олимпос — древний город и горящий огонь Химеры\n• Фазелис — руины у воды\n• Гёйнюк каньон — треккинг и джип-туры\n• Тахталы — канатная дорога на 2365 м\n\nМаршрут на день:\nКемер → Фазелис (20 мин) → Олимпос (30 мин) → Химера (15 мин) → возврат`
  },
  {
    id: 3,
    title: "10 советов туристам при аренде авто в Турции",
    date: "15.03.2026",
    category: "Советы",
    image: "/antalya.jpg",
    excerpt: "Собрали самые важные советы для тех, кто впервые берёт машину напрокат в Турции. Читайте, чтобы не попасть в неприятную ситуацию.",
    content: `1. Всегда проверяйте автомобиль перед получением — фотографируйте все царапины.\n2. Выбирайте полную страховку без франшизы.\n3. Не забудьте взять водительское удостоверение и паспорт.\n4. Заправляйтесь на официальных АЗС.\n5. Соблюдайте скоростной режим — камер много.\n6. Платные дороги (HGS) — уточните у арендодателя.\n7. Парковка в центре городов платная.\n8. Держите номер службы поддержки под рукой.\n9. Проверьте запасное колесо и домкрат.\n10. Возвращайте авто с полным баком.`
  },
];

const cars = [
  { id: 1, name: "Renault Clio", category: "Эконом", price: 22, seats: 5, transmission: "Механика", fuel: "Бензин", ac: true, image: "/cars/cli5.jpg" },
  { id: 2, name: "Fiat Egea", category: "Комфорт", price: 35, seats: 5, transmission: "Автомат", fuel: "Бензин", ac: true, image: "/cars/egea.jpg" },
  { id: 3, name: "Opel Corsa", category: "Эконом", price: 28, seats: 5, transmission: "Автомат", fuel: "Бензин", ac: true, image: "/cars/opel.jpg" },
  { id: 4, name: "Dacia Duster", category: "SUV", price: 55, seats: 5, transmission: "Автомат", fuel: "Дизель", ac: true, image: "/cars/duster.jpg" },
  { id: 5, name: "Citroen SpaceTourer", category: "Минивэн", price: 75, seats: 8, transmission: "Автомат", fuel: "Дизель", ac: true, image: "/cars/minivan.jpg" },
  { id: 6, name: "Citroen C4X", category: "SUV", price: 65, seats: 5, transmission: "Автомат", fuel: "Бензин", ac: true, image: "/cars/citroenc4x.jpg" },
];

const extras = [
  { id: "gps", name: "GPS навигатор", icon: "🗺️" },
  { id: "seat", name: "Детское кресло", icon: "👶" },
  { id: "insurance", name: "Полная страховка", icon: "🛡️" },
  { id: "driver", name: "Второй водитель", icon: "👤" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCar, setSelectedCar] = useState(null);
  const [search, setSearch] = useState({ pickup: "", pickupDate: "", pickupTime: "10:00", returnLoc: "", returnDate: "", returnTime: "10:00", sameReturn: true, category: "Любая" });
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [form, setForm] = useState({ name: "", surname: "", phone: "", email: "", flight: "", notes: "" });
  const [done, setDone] = useState(false);
  const [reservationNo, setReservationNo] = useState("");

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
      extras: selectedExtras.map(id => extras.find(e => e.id === id)?.name).join(", ") || "-",
      flight: form.flight || "-",
      notes: form.notes || "-",
      message: "Новый запрос цены от " + form.name,
      title: car.name,
      reservation_no: resNo || "-",
    };
    window.emailjs.send("service_k60k4su", "template_508cxnq", params)
      .then(() => console.log("Admin email sent!"))
      .catch(e => console.error(e));
    window.emailjs.send("service_k60k4su", "template_4d8skxp", params)
      .then(() => console.log("Customer email sent!"))
      .catch(e => console.error(e));
  };

  const days = search.pickupDate && search.returnDate
    ? Math.max(1, Math.ceil((new Date(search.returnDate) - new Date(search.pickupDate)) / 86400000))
    : null;

  const setS = (k, v) => setSearch(p => ({ ...p, [k]: v }));

  const goTo = (pg) => {
    window.history.pushState({ page: pg }, "", "#" + pg);
    setPage(pg);
  };

  useEffect(() => {
    const onPop = (e) => {
      if (e.state?.page) setPage(e.state.page);
      else setPage("home");
    };
    window.addEventListener("popstate", onPop);
    window.history.replaceState({ page: "home" }, "", "#home");
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (done) return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "#f0f7f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Montserrat:wght@700;900&display=swap');`}</style>
      <div style={{ background: "#fff", borderRadius: 16, padding: "56px 48px", textAlign: "center", maxWidth: 480, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: 28, color: "#1a5c2a", marginBottom: 12 }}>Запрос отправлен!</h2>
        <div style={{ background: "#f0f9f3", border: "2px solid #2d8a47", borderRadius: 10, padding: "16px 24px", marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>НОМЕР ЗАПРОСА</div>
          <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#1a5c2a", letterSpacing: 2 }}>{reservationNo}</div>
        </div>
        <p style={{ color: "#666", lineHeight: 1.7, marginBottom: 28 }}>
          Мы получили ваш запрос и отправили подтверждение на <b>{form.email}</b>.<br />
          Наш менеджер свяжется с вами в течение 30 минут и предложит лучшую цену.
        </p>
        <a href={`https://wa.me/${WHATSAPP}?text=Здравствуйте! Мой номер запроса: ${reservationNo}. Хочу уточнить цену.`} target="_blank" rel="noreferrer"
          style={{ display: "block", background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "14px 36px", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          💬 Написать в WhatsApp
        </a>
        <button onClick={() => { setDone(false); setPage("home"); setSelectedCar(null); setSelectedExtras([]); }}
          style={{ background: "#2d8a47", color: "#fff", border: "none", borderRadius: 8, padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          На главную
        </button>
      </div>
    </div>
  );

  const CarCard = ({ car }) => (
    <div className="car-card" onClick={() => { setSelectedCar(car); goTo("extras"); }}>
      <img src={car.image} alt={`${car.name} — аренда авто Анталья`} style={{ width: "100%", height: 180, objectFit: "cover" }} onError={e => e.target.style.display="none"} />
      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <span className="badge" style={{ background: "#e8f5ec", color: "#2d8a47", marginBottom: 6, display: "block", width: "fit-content" }}>{car.category}</span>
            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 17, fontWeight: 800 }}>{car.name}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2d8a47" }}>от ${car.price}/день</div>
            {days && <div style={{ fontSize: 11, color: "#999" }}>~{days} дн.</div>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#666", marginBottom: 14 }}>
          <span>👥 {car.seats}</span>
          <span>⚙️ {car.transmission}</span>
          <span>⛽ {car.fuel}</span>
        </div>
        <button className="green-btn" style={{ width: "100%", padding: "11px" }} onClick={e => { e.stopPropagation(); setSelectedCar(car); goTo("extras"); }}>
          Запросить цену
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "#fff", minHeight: "100vh", color: "#222" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Montserrat:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; }
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
        @media (max-width: 768px) {
          nav { padding: 12px 16px !important; }
          nav > div:last-child { display: none !important; }
          .top-bar { padding: 8px 16px !important; font-size: 11px !important; }
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
          <span style={{ fontWeight: 600 }}>RU | TR | EN</span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav style={{ padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", background: "#fff", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 26, fontWeight: 900, color: "#1a5c2a", cursor: "pointer" }} onClick={() => setPage("home")}>
          Local<span style={{ color: "#2d8a47" }}>Rent</span>
          <span style={{ fontSize: 11, color: "#999", fontFamily: "Nunito,sans-serif", fontWeight: 600, marginLeft: 10, letterSpacing: 2 }}>TÜRKİYE</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["Автомобили", "cars"], ["Локации", "locations"], ["Условия", "terms"], ["Бронирование", "reservation"], ["Блог", "blog"], ["ЧаВо", "faq"], ["О нас", "about"], ["Контакты", "contact"]].map(([label, pg]) => (
            <span key={label} onClick={() => goTo(pg)} style={{ fontSize: 14, fontWeight: 700, color: page === pg ? "#2d8a47" : "#444", cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#2d8a47"}
              onMouseLeave={e => e.target.style.color = page === pg ? "#2d8a47" : "#444"}
            >{label}</span>
          ))}
          <button className="green-btn" style={{ padding: "10px 22px", fontSize: 14 }} onClick={() => goTo("cars")}>Запросить цену</button>
        </div>
      </nav>

      {page === "home" && <>
        {/* HERO */}
        <div className="hero" style={{ backgroundImage: "linear-gradient(135deg, rgba(26,92,42,0.75) 0%, rgba(45,138,71,0.70) 60%, rgba(26,92,42,0.78) 100%), url(/antalya.jpg)", backgroundSize: "cover", backgroundPosition: "center", padding: "40px 48px 80px", position: "relative", marginTop: "-1px", overflow: "hidden" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "6px 20px", fontSize: 13, color: "#fff", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>
              🚗 АРЕНДА АВТОМОБИЛЕЙ В ТУРЦИИ
            </div>
            <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
              Лучшие автомобили<br />по лучшим ценам
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 48, lineHeight: 1.6 }}>
              Без скрытых комиссий · Поддержка на русском · Бесплатная доставка в аэропорт
            </p>
            <div className="search-box" style={{ background: "#fff", borderRadius: 16, padding: "28px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", textAlign: "left" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#666", marginBottom: 20, cursor: "pointer" }}>
                <input type="checkbox" checked={!search.sameReturn} onChange={e => setS("sameReturn", !e.target.checked)} style={{ accentColor: "#2d8a47" }} />
                Вернуть в другом месте
              </label>
              <div className="search-grid" style={{ display: "grid", gridTemplateColumns: search.sameReturn ? "2fr 1fr 1fr 1fr 1fr auto" : "1fr 1fr 1fr 1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Место получения</div>
                  <select aria-label="Место получения" className="sel" value={search.pickup} onChange={e => setS("pickup", e.target.value)}>
                    <option value="">Выберите локацию</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                {!search.sameReturn && <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Место возврата</div>
                  <select aria-label="Место возврата" className="sel" value={search.returnLoc} onChange={e => setS("returnLoc", e.target.value)}>
                    <option value="">Выберите локацию</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Дата получения</div>
                  <input type="date" aria-label="Дата получения" className="sel" value={search.pickupDate} onChange={e => setS("pickupDate", e.target.value)} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Время</div>
                  <select aria-label="Время получения" className="sel" value={search.pickupTime} onChange={e => setS("pickupTime", e.target.value)}>
                    {times.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Дата возврата</div>
                  <input type="date" aria-label="Дата возврата" className="sel" value={search.returnDate} onChange={e => setS("returnDate", e.target.value)} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Время</div>
                  <select aria-label="Время возврата" className="sel" value={search.returnTime} onChange={e => setS("returnTime", e.target.value)}>
                    {times.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <button className="green-btn" style={{ whiteSpace: "nowrap", height: 44 }} onClick={() => goTo("cars")}>
                  🔍 Найти
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* WHY US */}
        <div className="section-pad" style={{ padding: "64px 48px", background: "#f9fdf9" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, textAlign: "center", color: "#1a5c2a", marginBottom: 8 }}>Почему LocalRent?</h2>
            <p style={{ textAlign: "center", color: "#888", marginBottom: 48 }}>Мы работаем для вашего комфорта</p>
            <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }}>
              {[
                ["🏷️", "Честные цены", "Никаких скрытых платежей. Цена финальная."],
                ["🚗", "Новые авто", "Весь парк не старше 3 лет, всегда исправен."],
                ["📞", "Поддержка 24/7", "Русскоязычная поддержка круглосуточно."],
                ["✈️", "Доставка в аэропорт", "Встретим вас прямо у выхода из терминала."],
              ].map(([ic, t, d]) => (
                <div key={t} style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1.5px solid #e8f5ec" }}>
                  <div style={{ fontSize: 40, marginBottom: 14 }}>{ic}</div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#1a5c2a", marginBottom: 8 }}>{t}</div>
                  <div style={{ fontSize: 14, color: "#888", lineHeight: 1.6 }}>{d}</div>
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
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a" }}>Наш автопарк</h2>
                <p style={{ color: "#888", marginTop: 4 }}>Запросите цену на любой автомобиль</p>
              </div>
              <button className="outline-btn" onClick={() => goTo("cars")}>Все автомобили →</button>
            </div>
            <div className="cars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {cars.slice(0,3).map(car => <CarCard key={car.id} car={car} />)}
            </div>
          </div>
        </div>

        {/* BLOG PREVIEW */}
        <div className="section-pad" style={{ padding: "64px 48px", background: "#f9fdf9" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
              <div>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a" }}>Блог</h2>
                <p style={{ color: "#888", marginTop: 4 }}>Советы и маршруты для путешественников</p>
              </div>
              <button className="outline-btn" onClick={() => goTo("blog")}>Все статьи →</button>
            </div>
            <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {blogs.map(blog => (
                <div key={blog.id} onClick={() => goTo("blog-" + blog.id)} style={{ border: "1.5px solid #e8f5ec", borderRadius: 14, overflow: "hidden", cursor: "pointer", background: "#fff" }}>
                  <img src={blog.image} alt={blog.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <div style={{ padding: "16px 20px" }}>
                    <span style={{ background: "#e8f5ec", color: "#2d8a47", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{blog.category}</span>
                    <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 15, fontWeight: 800, color: "#1a5c2a", margin: "10px 0 8px", lineHeight: 1.4 }}>{blog.title}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#bbb" }}>{blog.date}</span>
                      <span style={{ fontSize: 13, color: "#2d8a47", fontWeight: 700 }}>Читать →</span>
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
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", textAlign: "center", marginBottom: 8 }}>
              Мы гарантируем конкурентные цены и высокий уровень обслуживания
            </h2>
            <div style={{ width: 60, height: 3, background: "rgba(255,255,255,0.5)", margin: "12px auto 48px" }} />
            <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 32 }}>
              {[
                { d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", text: "Полное КАСКО без франшизы" },
                { d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z", text: "Страхование от несчастных случаев" },
                { d: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z", text: "Страховка от угона и пожара" },
                { d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12", text: "Покрытие шин, стёкол и днища" },
                { d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", text: "Помощь на дороге 24/7" },
                { d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z", text: "Кредитная карта не требуется" },
                { d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75", text: "Нет скрытых платежей" },
                { d: "M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z", text: "Все налоги включены" },
                { d: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z", text: "Оплата наличными или картой" },
                { d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", text: "Второй водитель бесплатно" },
                { d: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z", text: "Неограниченный пробег" },
                { d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z", text: "Все авто с кондиционером" },
                { d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", text: "Авто для некурящих" },
                { d: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z", text: "Карта маршрутов бесплатно" },
                { d: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z", text: "Детское кресло бесплатно" },
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

            {/* Üst kısım */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
              <div>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 900, marginBottom: 12 }}>LocalRent</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 16 }}>
                  Аренда автомобилей в Турции.<br />
                  Поддержка на русском 24/7.<br />
                  Без скрытых комиссий.
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>📞 {PHONE}</a>
                </div>
                <div style={{ marginTop: 8 }}>
                  <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={{ color: "#7fff9a", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>💬 WhatsApp</a>
                </div>
                <div style={{ marginTop: 8 }}>
                  <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ color: "#fff", textDecoration: "none", fontSize: 13 }}>📸 Instagram</a>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>Навигация</div>
                {[["Автомобили", "cars"], ["Локации", "locations"], ["Условия", "terms"], ["Бронирование", "reservation"], ["Блог", "blog"], ["ЧаВо", "faq"], ["О нас", "about"], ["Контакты", "contact"]].map(([label, pg]) => (
                  <div key={pg} style={{ marginBottom: 8 }}>
                    <span onClick={() => goTo(pg)} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer", textDecoration: "none" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                    >→ {label}</span>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>Города</div>
                {["Анталья", "Кемер", "Алания", "Бодрум", "Мармарис", "Фетхие", "Измир", "Стамбул"].map(city => (
                  <div key={city} style={{ marginBottom: 8 }}>
                    <span onClick={() => goTo("locations")} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer" }}
  onMouseEnter={e => e.target.style.color = "#fff"}
  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
>→ Аренда авто {city}</span>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>Правовая информация</div>
                {["Политика конфиденциальности", "Политика cookies", "Условия использования", "Защита данных"].map(item => (
                  <div key={item} style={{ marginBottom: 8 }}>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                    >→ {item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alt kısım */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>© 2026 LocalRent Türkiye. Все права защищены.</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>localrent.com.tr</div>
            </div>
          </div>
        </footer>
      </>}

      {/* BLOG */}
      {page === "blog" && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Блог</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Советы, маршруты и полезная информация для путешественников</p>
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {blogs.map(blog => (
              <div key={blog.id} onClick={() => goTo("blog-" + blog.id)} style={{ border: "1.5px solid #e8f5ec", borderRadius: 14, overflow: "hidden", cursor: "pointer", background: "#fff" }}>
                <img src={blog.image} alt={blog.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ background: "#e8f5ec", color: "#2d8a47", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{blog.category}</span>
                  <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 800, color: "#1a5c2a", margin: "10px 0 8px", lineHeight: 1.4 }}>{blog.title}</h2>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 12 }}>{blog.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#bbb" }}>{blog.date}</span>
                    <span style={{ fontSize: 13, color: "#2d8a47", fontWeight: 700 }}>Читать →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {blogs.map(blog => page === "blog-" + blog.id && (
        <div key={blog.id} style={{ maxWidth: 760, margin: "0 auto", padding: "40px 48px" }}>
          <button onClick={() => goTo("blog")} style={{ background: "none", border: "none", color: "#2d8a47", fontWeight: 700, cursor: "pointer", fontSize: 14, marginBottom: 24, padding: 0 }}>← Назад в блог</button>
          <img src={blog.image} alt={blog.title} style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 14, marginBottom: 28 }} />
          <span style={{ background: "#e8f5ec", color: "#2d8a47", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{blog.category}</span>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#1a5c2a", margin: "12px 0 8px" }}>{blog.title}</h1>
          <div style={{ fontSize: 13, color: "#bbb", marginBottom: 24 }}>{blog.date}</div>
          <div style={{ fontSize: 15, color: "#444", lineHeight: 1.9, whiteSpace: "pre-line" }}>{blog.content}</div>
          <div style={{ marginTop: 40, background: "#f0f9f3", border: "1.5px solid #d0eeda", borderRadius: 12, padding: "24px", textAlign: "center" }}>
            <p style={{ fontWeight: 700, color: "#1a5c2a", marginBottom: 12 }}>Хотите арендовать авто в Анталье?</p>
            <button className="green-btn" onClick={() => goTo("cars")}>Запросить цену →</button>
          </div>
        </div>
      ))}

      {/* FAQ */}
      {page === "faq" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Часто задаваемые вопросы</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Ответы на самые популярные вопросы об аренде авто</p>
          {[
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
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eee", paddingBottom: 24, marginBottom: 24 }}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 800, color: "#1a5c2a", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ background: "#2d8a47", color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                {item.q}
              </div>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, paddingLeft: 40 }}>{item.a}</p>
            </div>
          ))}
          <div style={{ background: "#1a5c2a", borderRadius: 14, padding: "28px 36px", color: "#fff", textAlign: "center", marginTop: 20 }}>
            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Не нашли ответ?</p>
            <a href="https://wa.me/905400070095" target="_blank" rel="noreferrer" style={{ background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
              💬 Написать в WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* ABOUT */}
      {page === "about" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>О нас</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Мы — местная компания по аренде автомобилей в Турции</p>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: "#1a5c2a", marginBottom: 16 }}>Наша история</h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16 }}>LocalRent — местная компания по аренде автомобилей, основанная в 2012 году в Анталье. За более чем 12 лет работы мы помогли тысячам туристов исследовать красоту Турции.</p>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>Наш приоритет — простая, прозрачная и комфортная аренда. Поддержка на русском языке — 24/7.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[["12+", "лет на рынке"], ["5000+", "довольных клиентов"], ["6", "моделей автомобилей"], ["24/7", "поддержка на русском"]].map(([num, label]) => (
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
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Локации выдачи</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Мы доставим автомобиль в любую точку — аэропорт, отель или офис</p>
          <div className="locations-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
            {[
              { city: "Анталья", icon: "✈️", locations: ["Аэропорт Анталья (AYT)", "Центр Анталья", "Старый город Калейчи", "Лара", "Коньяалты"] },
              { city: "Кемер", icon: "🏖️", locations: ["Центр Кемер", "Бельдиби", "Гёйнюк", "Кириш", "Чамьюва"] },
              { city: "Алания", icon: "🏰", locations: ["Центр Алания", "Авсаллар", "Окурджалар", "Махмутлар", "Газипаша"] },
              { city: "Бодрум", icon: "⛵", locations: ["Аэропорт Бодрум (BJV)", "Центр Бодрум", "Турбукю", "Яликавак", "Гюмюшлюк"] },
              { city: "Мармарис", icon: "🌊", locations: ["Центр Мармарис", "Ичмелер", "Армутлан", "Датча", "Бозбурун"] },
              { city: "Фетхие", icon: "🪂", locations: ["Центр Фетхие", "Олюдениз", "Хисаранью", "Каякёй", "Гёчек"] },
            ].map(({ city, icon, locations }) => (
              <div key={city} style={{ background: "#fff", border: "1.5px solid #e8f5ec", borderRadius: 14, padding: "24px" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 17, fontWeight: 800, color: "#1a5c2a", marginBottom: 12 }}>{city}</h3>
                {locations.map(loc => (
                  <div key={loc} style={{ fontSize: 13, color: "#666", padding: "5px 0", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "#2d8a47", fontSize: 10 }}>●</span> {loc}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ background: "#1a5c2a", borderRadius: 14, padding: "28px 36px", color: "#fff", textAlign: "center" }}>
            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Не нашли свою локацию?</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>Мы доставим автомобиль куда угодно!</p>
            <a href="https://wa.me/905400070095" target="_blank" rel="noreferrer" style={{ background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
              💬 Написать в WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* CONTACT */}
      {page === "contact" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Контакты</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Мы всегда на связи</p>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "📞", title: "Телефон", value: "+90 540 007 00 95", href: "tel:+905400070095" },
                { icon: "💬", title: "WhatsApp", value: "+90 540 007 00 95", href: "https://wa.me/905400070095" },
                { icon: "📸", title: "Instagram", value: "@localrent.com.tr", href: "https://instagram.com/localrent.com.tr" },
                { icon: "✉️", title: "Email", value: "info@localrent.com.tr", href: "mailto:info@localrent.com.tr" },
                { icon: "📍", title: "Адрес", value: "Анталья, Турция", href: null },
                { icon: "🕐", title: "Режим работы", value: "Пн–Вс: 00:00 – 24:00", href: null },
              ].map(({ icon, title, value, href }) => (
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
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 18, fontWeight: 800, color: "#1a5c2a", marginBottom: 20 }}>Написать нам</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["Имя", "text", "Ваше имя"], ["Email", "email", "your@email.com"], ["Телефон", "tel", "+7 999 ..."]].map(([label, type, ph]) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                    <input type={type} placeholder={ph} className="sel" aria-label={label} />
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Сообщение</div>
                  <textarea placeholder="Ваш вопрос..." className="sel" aria-label="Сообщение" style={{ resize: "vertical", minHeight: 90 }} />
                </div>
                <button className="green-btn" style={{ width: "100%" }}>Отправить</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESERVATION */}
      {page === "reservation" && (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Запрос цены</h1>
          <p style={{ color: "#888", marginBottom: 36 }}>Выберите даты — мы пришлём лучшее предложение</p>
          <div style={{ background: "#f9fdf9", border: "1.5px solid #d0eeda", borderRadius: 14, padding: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>Место получения</div>
                <select aria-label="Место получения" className="sel" value={search.pickup} onChange={e => setS("pickup", e.target.value)}>
                  <option value="">Выберите локацию</option>
                  {cities.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>Место возврата</div>
                <select aria-label="Место возврата" className="sel" value={search.returnLoc} onChange={e => setS("returnLoc", e.target.value)}>
                  <option value="">То же место</option>
                  {cities.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>Дата получения</div>
                <input type="date" aria-label="Дата получения" className="sel" value={search.pickupDate} onChange={e => setS("pickupDate", e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>Время получения</div>
                <select aria-label="Время получения" className="sel" value={search.pickupTime} onChange={e => setS("pickupTime", e.target.value)}>
                  {times.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>Дата возврата</div>
                <input type="date" aria-label="Дата возврата" className="sel" value={search.returnDate} onChange={e => setS("returnDate", e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase" }}>Время возврата</div>
                <select aria-label="Время возврата" className="sel" value={search.returnTime} onChange={e => setS("returnTime", e.target.value)}>
                  {times.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button className="green-btn" style={{ width: "100%", padding: 16, fontSize: 16 }} onClick={() => goTo("cars")}>
              🚗 Выбрать автомобиль
            </button>
          </div>
          <div style={{ marginTop: 28, background: "#fff", border: "1.5px solid #e8f5ec", borderRadius: 14, padding: "24px 32px", textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#888", marginBottom: 16 }}>Или получите цену напрямую в WhatsApp</p>
            <a href="https://wa.me/905400070095?text=Здравствуйте! Хочу узнать цену на аренду автомобиля." target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "13px 28px", fontWeight: 700, fontSize: 15 }}>
              💬 Написать в WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* TERMS */}
      {page === "terms" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Условия аренды</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Пожалуйста, ознакомьтесь перед бронированием</p>
          {[
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
          ].map((item, i) => (
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

      {/* CARS */}
      {page === "cars" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 48px" }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Все автомобили</h2>
          <p style={{ color: "#888", marginBottom: 32 }}>Выберите авто — мы пришлём лучшую цену в течение 30 минут</p>
          <div className="cars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {cars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      )}

      {/* EXTRAS */}
      {page === "extras" && selectedCar && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 48px" }}>
          <div className="step-bar">
            {["Автомобиль", "Доп. услуги", "Ваши данные", "Готово"].map((s, i) => (
              <div key={s} className={`step ${i === 1 ? "active" : i < 1 ? "done-step" : ""}`}>{i < 1 ? "✓ " : ""}{s}</div>
            ))}
          </div>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 24, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Дополнительные услуги</h2>
          <p style={{ color: "#888", marginBottom: 28 }}>Выберите что нужно — укажем в запросе</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
            <div>
              <div className="extras-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                {extras.map(ex => (
                  <div key={ex.id} className={`extra-card ${selectedExtras.includes(ex.id) ? "sel-extra" : ""}`}
                    onClick={() => setSelectedExtras(p => p.includes(ex.id) ? p.filter(x => x !== ex.id) : [...p, ex.id])}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{ex.icon}</div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{ex.name}</div>
                    <div style={{ color: "#2d8a47", fontWeight: 600, fontSize: 13 }}>
                      {selectedExtras.includes(ex.id) ? "✓ Добавлено" : "Добавить"}
                    </div>
                  </div>
                ))}
              </div>
              <button className="green-btn" style={{ width: "100%" }} onClick={() => goTo("booking")}>
                Продолжить →
              </button>
            </div>
            <div className="info-box">
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16, color: "#1a5c2a" }}>Ваш запрос</div>
              <img src={selectedCar.image} alt={selectedCar.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 14 }} onError={e => e.target.style.display="none"} />
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{selectedCar.name}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>{selectedCar.category} · {selectedCar.transmission}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#2d8a47", marginBottom: 14 }}>от ${selectedCar.price}/день</div>
              {days && <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>🗓 {days} {days === 1 ? "день" : "дней"}</div>}
              {search.pickup && <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>📍 {search.pickup}</div>}
              <div style={{ borderTop: "1px solid #d0eeda", marginTop: 14, paddingTop: 14, background: "#f0f9f3", borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#2d8a47", fontWeight: 700 }}>💬 Пришлём лучшую цену за 30 мин</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING */}
      {page === "booking" && selectedCar && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 48px" }}>
          <div className="step-bar">
            {["Автомобиль", "Доп. услуги", "Ваши данные", "Готово"].map((s, i) => (
              <div key={s} className={`step ${i === 2 ? "active" : i < 2 ? "done-step" : ""}`}>{i < 2 ? "✓ " : ""}{s}</div>
            ))}
          </div>
          <div className="booking-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 32 }}>
            <div>
              <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 900, color: "#1a5c2a", marginBottom: 24 }}>Ваши данные</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Имя", "name", "Иван"], ["Фамилия", "surname", "Иванов"], ["Телефон", "phone", "+7 999 123 45 67"], ["Email", "email", "ivan@mail.ru"], ["Номер рейса", "flight", "TK 123 (необязательно)"]].map(([label, key, ph]) => (
                  <div key={key} style={{ gridColumn: key === "flight" ? "1/-1" : "auto" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                    <input aria-label={label} placeholder={ph} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="sel" />
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Примечания</div>
                  <textarea aria-label="Примечания" placeholder="Любые пожелания, вопросы по цене..." value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="sel" style={{ resize: "vertical", minHeight: 80 }} />
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
                📩 Отправить запрос на цену
              </button>
            </div>
            <div className="info-box" style={{ height: "fit-content" }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 14, color: "#1a5c2a" }}>Детали запроса</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedCar.name}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>{selectedCar.category} · {selectedCar.transmission}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#2d8a47", marginBottom: 12 }}>от ${selectedCar.price}/день</div>
              {search.pickup && <div style={{ fontSize: 13, marginBottom: 4 }}>📍 {search.pickup}</div>}
              {search.pickupDate && <div style={{ fontSize: 13, marginBottom: 4 }}>📅 {search.pickupDate} в {search.pickupTime}</div>}
              {search.returnDate && <div style={{ fontSize: 13, marginBottom: 4 }}>🔄 {search.returnDate} в {search.returnTime}</div>}
              {days && <div style={{ fontSize: 13, marginBottom: 4 }}>🗓 {days} {days === 1 ? "день" : "дней"}</div>}
              {selectedExtras.length > 0 && (
                <div style={{ fontSize: 13, marginBottom: 4 }}>
                  ➕ {selectedExtras.map(id => extras.find(e => e.id === id)?.name).join(", ")}
                </div>
              )}
              <div style={{ borderTop: "1px solid #d0eeda", marginTop: 14, paddingTop: 14, background: "#f0f9f3", borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#2d8a47", fontWeight: 700 }}>💬 Ответим с ценой за 30 минут</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WHATSAPP FLOAT */}
      <a href={`https://wa.me/${WHATSAPP}?text=Здравствуйте! Хочу узнать цену на аренду авто.`} target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg,#25d366,#128c7e)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 24px rgba(37,211,102,0.4)", textDecoration: "none" }}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
