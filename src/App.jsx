import { useState } from "react";

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

const cars = [
  { id: 1, name: "Renault Clio", category: "Эконом", price: 22, seats: 5, transmission: "Механика", fuel: "Бензин", ac: true, image: "/cars/cli5.jpg", doors: 5 },
  { id: 2, name: "Fiat Egea", category: "Комфорт", price: 35, seats: 5, transmission: "Автомат", fuel: "Бензин", ac: true, image: "/cars/egea.jpg", doors: 4 },
  { id: 3, name: "Opel Corsa", category: "Эконом", price: 28, seats: 5, transmission: "Автомат", fuel: "Бензин", ac: true, image: "/cars/opel.jpg", doors: 5 },
  { id: 4, name: "Dacia Duster", category: "SUV", price: 55, seats: 5, transmission: "Автомат", fuel: "Дизель", ac: true, image: "/cars/duster.jpg", doors: 5 },
  { id: 5, name: "Citroen SpaceTourer", category: "Минивэн", price: 75, seats: 8, transmission: "Автомат", fuel: "Дизель", ac: true, image: "/cars/minivan.jpg", doors: 5 },
  { id: 6, name: "Citroen C4X", category: "SUV", price: 65, seats: 5, transmission: "Автомат", fuel: "Бензин", ac: true, image: "/cars/citroenc4x.jpg", doors: 5 },
];

const extras = [
  { id: "gps", name: "GPS навигатор", price: 5, icon: "🗺️" },
  { id: "seat", name: "Детское кресло", price: 5, icon: "👶" },
  { id: "insurance", name: "Полная страховка", price: 10, icon: "🛡️" },
  { id: "driver", name: "Второй водитель", price: 8, icon: "👤" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCar, setSelectedCar] = useState(null);
  const [search, setSearch] = useState({ pickup: "", pickupDate: "", pickupTime: "10:00", returnLoc: "", returnDate: "", returnTime: "10:00", sameReturn: true });
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [form, setForm] = useState({ name: "", surname: "", phone: "", email: "", flight: "", notes: "" });
  const [done, setDone] = useState(false);

  const days = search.pickupDate && search.returnDate
    ? Math.max(1, Math.ceil((new Date(search.returnDate) - new Date(search.pickupDate)) / 86400000))
    : null;

  const extraTotal = selectedExtras.reduce((s, eid) => s + (extras.find(e => e.id === eid)?.price || 0), 0);
  const carPrice = selectedCar ? selectedCar.price * (days || 1) : 0;
  const total = carPrice + extraTotal * (days || 1);

  const setS = (k, v) => setSearch(p => ({ ...p, [k]: v }));

  if (done) return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "#f0f7f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Montserrat:wght@700;900&display=swap');`}</style>
      <div style={{ background: "#fff", borderRadius: 16, padding: "56px 48px", textAlign: "center", maxWidth: 480, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: 28, color: "#1a5c2a", marginBottom: 12 }}>Бронирование подтверждено!</h2>
        <p style={{ color: "#666", lineHeight: 1.7, marginBottom: 28 }}>Детали отправлены на <b>{form.email}</b>.<br />Мы свяжемся с вами в течение 30 минут.</p>
        <button onClick={() => { setDone(false); setPage("home"); setSelectedCar(null); setSelectedExtras([]); }} style={{ background: "#2d8a47", color: "#fff", border: "none", borderRadius: 8, padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          На главную
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
        .car-card.selected { border-color: #2d8a47; background: #f0f9f3; }
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
      `}</style>

      {/* TOP BAR */}
      <div style={{ background: "#1a5c2a", color: "#fff", padding: "8px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
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
          {[["Автомобили", "cars"], ["Локации", "locations"], ["Условия", "terms"], ["Бронирование", "booking"], ["О нас", "about"], ["Контакты", "contact"]].map(([label, pg]) => (
            <span key={label} onClick={() => pg === "booking" && selectedCar ? setPage("booking") : setPage(pg)} style={{ fontSize: 14, fontWeight: 700, color: page === pg ? "#2d8a47" : "#444", cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#2d8a47"}
              onMouseLeave={e => e.target.style.color = page === "home" ? "#444" : "#2d8a47"}
            >{label}</span>
          ))}
          <button className="green-btn" style={{ padding: "10px 22px", fontSize: 14 }} onClick={() => setPage("cars")}>Выбрать авто</button>
        </div>
      </nav>

      {page === "home" && <>
        {/* HERO */}
        <div style={{ background: "linear-gradient(135deg, #1a5c2a 0%, #2d8a47 60%, #4caf6f 100%)", padding: "72px 48px 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -80, top: -80, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "6px 20px", fontSize: 13, color: "#fff", fontWeight: 700, marginBottom: 20, letterSpacing: 1 }}>
              🚗 АРЕНДА АВТОМОБИЛЕЙ В ТУРЦИИ
            </div>
            <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
              Лучшие автомобили<br />по лучшим ценам
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 48, lineHeight: 1.6 }}>
              Без скрытых комиссий · Поддержка на русском · Бесплатная доставка в аэропорт
            </p>

            {/* SEARCH BOX */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "28px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", textAlign: "left" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#666", marginBottom: 20, cursor: "pointer" }}>
                <input type="checkbox" checked={!search.sameReturn} onChange={e => setS("sameReturn", !e.target.checked)} style={{ accentColor: "#2d8a47" }} />
                Вернуть в другом месте
              </label>
              <div style={{ display: "grid", gridTemplateColumns: search.sameReturn ? "2fr 1fr 1fr 1fr 1fr auto" : "1fr 1fr 1fr 1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Место получения</div>
                  <select className="sel" value={search.pickup} onChange={e => setS("pickup", e.target.value)}>
                    <option value="">Выберите локацию</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                {!search.sameReturn && <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Место возврата</div>
                  <select className="sel" value={search.returnLoc} onChange={e => setS("returnLoc", e.target.value)}>
                    <option value="">Выберите локацию</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Дата получения</div>
                  <input type="date" className="sel" value={search.pickupDate} onChange={e => setS("pickupDate", e.target.value)} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Время</div>
                  <select className="sel" value={search.pickupTime} onChange={e => setS("pickupTime", e.target.value)}>
                    {times.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Дата возврата</div>
                  <input type="date" className="sel" value={search.returnDate} onChange={e => setS("returnDate", e.target.value)} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Время</div>
                  <select className="sel" value={search.returnTime} onChange={e => setS("returnTime", e.target.value)}>
                    {times.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <button className="green-btn" style={{ whiteSpace: "nowrap", height: 44 }} onClick={() => setPage("cars")}>
                  🔍 Найти
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* WHY US */}
        <div style={{ padding: "64px 48px", background: "#f9fdf9" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, textAlign: "center", color: "#1a5c2a", marginBottom: 8 }}>Почему LocalRent?</h2>
            <p style={{ textAlign: "center", color: "#888", marginBottom: 48 }}>Мы работаем для вашего комфорта</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }}>
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
        <div style={{ padding: "64px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
              <div>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a" }}>Наш автопарк</h2>
                <p style={{ color: "#888", marginTop: 4 }}>Выберите идеальный автомобиль для вашей поездки</p>
              </div>
              <button className="outline-btn" onClick={() => setPage("cars")}>Все автомобили →</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {cars.slice(0,3).map(car => (
                <div key={car.id} className="car-card" onClick={() => { setSelectedCar(car); setPage("extras"); }}>
                  <img src={car.image} alt={car.name} style={{ width: "100%", height: 180, objectFit: "cover" }} onError={e => e.target.style.display="none"} />
                  <div style={{ padding: "16px 20px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <span className="badge" style={{ background: "#e8f5ec", color: "#2d8a47", marginBottom: 6, display: "block", width: "fit-content" }}>{car.category}</span>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 17, fontWeight: 800 }}>{car.name}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#2d8a47" }}>${car.price}</div>
                        <div style={{ fontSize: 11, color: "#999" }}>/ сутки</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#666", marginBottom: 14 }}>
                      <span>👥 {car.seats}</span>
                      <span>⚙️ {car.transmission}</span>
                      <span>❄️ {car.ac ? "Кондиционер" : "-"}</span>
                    </div>
                    <button className="green-btn" style={{ width: "100%", padding: "11px" }} onClick={e => { e.stopPropagation(); setSelectedCar(car); setPage("extras"); }}>
                      Выбрать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: "#1a5c2a", color: "#fff", padding: "40px 48px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 900, marginBottom: 8 }}>LocalRent</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>© 2026 LocalRent Türkiye. Все права защищены.</div>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <a href={`tel:${PHONE}`} style={{ color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>📞 {PHONE}</a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={{ color: "#7fff9a", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>💬 WhatsApp</a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>📸 Instagram</a>
            </div>
          </div>
        </footer>
      </>}



      {page === "about" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>О нас</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Мы — местная компания по аренде автомобилей в Турции</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: "#1a5c2a", marginBottom: 16 }}>Наша история</h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16 }}>
                LocalRent — местная компания по аренде автомобилей, основанная в 2012 году в Анталье. 
                За более чем 12 лет работы мы помогли тысячам туристов со всего мира исследовать 
                красоту Турции за рулём надёжного автомобиля.
              </p>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16 }}>
                Мы сами много путешествовали по разным странам мира и прекрасно понимаем, 
                что значит быть туристом. Поэтому наш главный приоритет — сделать аренду 
                автомобиля максимально простой, прозрачной и комфортной.
              </p>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
                Зная, что выбор арендного автомобиля может быть непростой задачей, 
                мы всегда готовы помочь вам сделать правильный выбор. Поддержка на русском языке — 24/7.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                ["12+", "лет на рынке"],
                ["5000+", "довольных клиентов"],
                ["6", "моделей автомобилей"],
                ["24/7", "поддержка на русском"],
              ].map(([num, label]) => (
                <div key={label} style={{ background: "#f0f9f3", border: "1.5px solid #d0eeda", borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 36, fontWeight: 900, color: "#2d8a47" }}>{num}</div>
                  <div style={{ fontSize: 15, color: "#555", fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#f9fdf9", border: "1.5px solid #d0eeda", borderRadius: 14, padding: "32px 36px" }}>
            <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 18, fontWeight: 800, color: "#1a5c2a", marginBottom: 20 }}>Почему клиенты выбирают нас</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                ["✅", "Честные цены без скрытых комиссий"],
                ["✅", "Новые автомобили не старше 3 лет"],
                ["✅", "Полная страховка включена"],
                ["✅", "Бесплатная доставка в аэропорт Анталья"],
                ["✅", "Поддержка на русском языке 24/7"],
                ["✅", "Бесплатный второй водитель"],
                ["✅", "Неограниченный пробег"],
                ["✅", "Замена автомобиля при поломке"],
              ].map(([ic, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#444" }}>
                  <span style={{ color: "#2d8a47", fontWeight: 700 }}>{ic}</span> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === "locations" && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Локации выдачи</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Мы доставим автомобиль в любую точку — аэропорт, отель или офис</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
            {[
              { city: "Анталья", icon: "✈️", locations: ["Аэропорт Анталья (AYT)", "Центр Анталья", "Старый город Калейчи", "Лара", "Коньяалты"] },
              { city: "Кемер", icon: "🏖️", locations: ["Центр Кемер", "Бельдиби", "Гёйнюк", "Кириш", "Чамьюва"] },
              { city: "Алания", icon: "🏰", locations: ["Центр Алания", "Авсаллар", "Окурджалар", "Махмутлар", "Газипаша"] },
              { city: "Бодрум", icon: "⛵", locations: ["Аэропорт Бодрум (BJV)", "Центр Бодрум", "Турбукю", "Яликавак", "Гюмюшлюк"] },
              { city: "Мармарис", icon: "🌊", locations: ["Центр Мармарис", "Ичмелер", "Армутлан", "Датча", "Бозбурун"] },
              { city: "Фетхие", icon: "🪂", locations: ["Центр Фетхие", "Олюдениз", "Хисаранью", "Каякёй", "Гёчек"] },
            ].map(({ city, icon, locations }) => (
              <div key={city} style={{ background: "#fff", border: "1.5px solid #e8f5ec", borderRadius: 14, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
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
            <div style={{ fontSize: 24, marginBottom: 8 }}>📞</div>
            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Не нашли свою локацию?</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>Свяжитесь с нами — мы доставим автомобиль куда угодно!</p>
            <a href={"https://wa.me/905400070095"} target="_blank" rel="noreferrer" style={{ background: "#25d366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 14 }}>
              💬 Написать в WhatsApp
            </a>
          </div>
        </div>
      )}

      {page === "contact" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Контакты</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Мы всегда на связи — напишите или позвоните нам</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "📞", title: "Телефон", value: "+90 540 007 00 95", href: "tel:+905400070095" },
                { icon: "💬", title: "WhatsApp", value: "+90 540 007 00 95", href: "https://wa.me/905400070095" },
                { icon: "📸", title: "Instagram", value: "@localrent.com.tr", href: "https://instagram.com/localrent.com.tr" },
                { icon: "✉️", title: "Email", value: "info@localrent.com.tr", href: "mailto:info@localrent.com.tr" },
                { icon: "📍", title: "Адрес", value: "Анталья, Турция", href: null },
                { icon: "🕐", title: "Режим работы", value: "Пн–Вс: 08:00 – 22:00", href: null },
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
                    <input type={type} placeholder={ph} className="sel" />
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8a47", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Сообщение</div>
                  <textarea placeholder="Ваш вопрос..." className="sel" style={{ resize: "vertical", minHeight: 90 }} />
                </div>
                <button className="green-btn" style={{ width: "100%" }}>Отправить сообщение</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {page === "terms" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 30, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Условия аренды</h1>
          <p style={{ color: "#888", marginBottom: 40 }}>Пожалуйста, ознакомьтесь с условиями перед бронированием</p>
          {[
            { icon: "🪪", title: "Водительское удостоверение", text: "Требуется действующее национальное водительское удостоверение с паспортом или удостоверением личности. Для граждан стран, не подписавших Венскую конвенцию 1968 года, требуется международное водительское удостоверение." },
            { icon: "👤", title: "Минимальный возраст", text: "Все водители должны иметь стаж вождения не менее 1 года. Минимальный возраст: 21 год — для классов Small/Эконом; 23 года — для классов Medium/Комфорт и SUV; 25 лет — для премиум-классов и микроавтобусов. Максимальный возраст — 79 лет." },
            { icon: "🛣️", title: "Неограниченный пробег", text: "Суточного лимита пробега нет. Вы можете ездить сколько угодно без дополнительной оплаты." },
            { icon: "💰", title: "Все налоги включены", text: "Наши цены окончательные и включают все налоги и услуги. Никаких скрытых платежей." },
            { icon: "🔧", title: "Помощь на дороге 24/7", text: "Мы обеспечиваем техническую помощь на дороге круглосуточно." },
            { icon: "✈️", title: "Доставка в аэропорт/отель", text: "Мы доставим автомобиль в аэропорт, порт или прямо в ваш отель. При отъезде вы можете оставить машину у отеля или в аэропорту." },
            { icon: "🛡️", title: "Полная страховка", text: "Включает: КАСКО без франшизы, полное покрытие пожара, кражи, колёс, шин, стёкол, зеркал и повреждений снизу автомобиля, страхование от несчастных случаев для всех пассажиров. Страховка не распространяется на нарушения ПДД, езду вне дорог и управление в нетрезвом состоянии." },
            { icon: "🔄", title: "Замена автомобиля", text: "В случае поломки мы заменим ваш автомобиль новым." },
            { icon: "👥", title: "Второй водитель бесплатно", text: "Дополнительная плата за второго водителя не взимается." },
            { icon: "🚗", title: "Новые автомобили", text: "Для вашей безопасности мы регулярно обновляем автопарк новыми автомобилями." },
            { icon: "⏰", title: "Нет доплаты за задержку", text: "Если ваш рейс задержится, дополнительная плата за ожидание не взимается." },
            { icon: "👶", title: "Детские кресла бесплатно", text: "Мы предоставляем детские кресла высокой безопасности бесплатно." },
            { icon: "🔑", title: "Потеря ключей", text: "В случае утери ключей клиент оплачивает замену: от 50 до 150 евро в зависимости от модели автомобиля, плюс транспортные расходы." },
            { icon: "🚦", title: "Штрафы за нарушение ПДД", text: "Все штрафы и административные санкции за нарушения ПДД в период аренды оплачивает арендатор." },
            { icon: "❌", title: "Условия отмены", text: "Отмена за 7 и более дней до начала аренды — полный возврат средств. Отмена менее чем за 7 дней — удерживается 10% от суммы бронирования. Отмена после времени доставки — оплата за 3 дня аренды. Досрочный возврат автомобиля — возврат средств не производится." },
            { icon: "🔒", title: "Политика конфиденциальности", text: "Мы уважаем вашу конфиденциальность и не передаём личные данные третьим лицам. Все данные защищены современными технологиями шифрования." },
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
      {page === "cars" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 48px" }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Все автомобили</h2>
          <p style={{ color: "#888", marginBottom: 32 }}>Выберите подходящий вариант</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {cars.map(car => (
              <div key={car.id} className={`car-card ${selectedCar?.id === car.id ? "selected" : ""}`} onClick={() => setSelectedCar(car)}>
                <img src={car.image} alt={car.name} style={{ width: "100%", height: 180, objectFit: "cover" }} onError={e => e.target.style.display="none"} />
                <div style={{ padding: "16px 20px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <span className="badge" style={{ background: "#e8f5ec", color: "#2d8a47", marginBottom: 6, display: "block", width: "fit-content" }}>{car.category}</span>
                      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 17, fontWeight: 800 }}>{car.name}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#2d8a47" }}>${days ? car.price * days : car.price}</div>
                      <div style={{ fontSize: 11, color: "#999" }}>{days ? `за ${days} дн.` : "/ сутки"}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#666", marginBottom: 14 }}>
                    <span>👥 {car.seats} мест</span>
                    <span>⚙️ {car.transmission}</span>
                    <span>⛽ {car.fuel}</span>
                  </div>
                  <button className="green-btn" style={{ width: "100%", padding: "11px" }} onClick={e => { e.stopPropagation(); setSelectedCar(car); setPage("extras"); }}>
                    Выбрать этот автомобиль
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === "extras" && selectedCar && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 48px" }}>
          <div className="step-bar">
            {["Автомобиль", "Доп. услуги", "Ваши данные", "Подтверждение"].map((s, i) => (
              <div key={s} className={`step ${i === 1 ? "active" : i < 1 ? "done-step" : ""}`}>{i < 1 ? "✓ " : ""}{s}</div>
            ))}
          </div>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 24, fontWeight: 900, color: "#1a5c2a", marginBottom: 8 }}>Дополнительные услуги</h2>
          <p style={{ color: "#888", marginBottom: 28 }}>Выберите что нужно для комфортной поездки</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                {extras.map(ex => (
                  <div key={ex.id} className={`extra-card ${selectedExtras.includes(ex.id) ? "sel-extra" : ""}`}
                    onClick={() => setSelectedExtras(p => p.includes(ex.id) ? p.filter(x => x !== ex.id) : [...p, ex.id])}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{ex.icon}</div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{ex.name}</div>
                    <div style={{ color: "#2d8a47", fontWeight: 800 }}>+${ex.price}/день</div>
                  </div>
                ))}
              </div>
              <button className="green-btn" style={{ width: "100%" }} onClick={() => setPage("booking")}>
                Продолжить →
              </button>
            </div>
            <div className="info-box">
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16, color: "#1a5c2a" }}>Ваш заказ</div>
              <img src={selectedCar.image} alt={selectedCar.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 14 }} onError={e => e.target.style.display="none"} />
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{selectedCar.name}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>{selectedCar.category} · {selectedCar.transmission}</div>
              {days && <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>🗓 {days} {days === 1 ? "день" : "дней"}</div>}
              {search.pickup && <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>📍 {search.pickup}</div>}
              <div style={{ borderTop: "1px solid #d0eeda", marginTop: 14, paddingTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18, color: "#2d8a47" }}>
                  <span>Итого</span><span>${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {page === "booking" && selectedCar && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 48px" }}>
          <div className="step-bar">
            {["Автомобиль", "Доп. услуги", "Ваши данные", "Подтверждение"].map((s, i) => (
              <div key={s} className={`step ${i === 2 ? "active" : i < 2 ? "done-step" : ""}`}>{i < 2 ? "✓ " : ""}{s}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 32 }}>
            <div>
              <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 900, color: "#1a5c2a", marginBottom: 24 }}>Ваши данные</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Имя", "name", "Иван"], ["Фамилия", "surname", "Иванов"], ["Телефон", "phone", "+7 999 123 45 67"], ["Email", "email", "ivan@mail.ru"], ["Номер рейса", "flight", "TK 123 (необязательно)"]].map(([label, key, ph]) => (
                  <div key={key} style={{ gridColumn: key === "flight" ? "1/-1" : "auto" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                    <input placeholder={ph} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="sel" />
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#2d8a47", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Примечания</div>
                  <textarea placeholder="Любые пожелания..." value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="sel" style={{ resize: "vertical", minHeight: 80 }} />
                </div>
              </div>
              <button className="green-btn" style={{ width: "100%", marginTop: 24, padding: 16, fontSize: 16 }}
                disabled={!form.name || !form.email || !form.phone}
                onClick={() => setDone(true)}
                style={{ width: "100%", marginTop: 24, padding: 16, fontSize: 16, background: form.name && form.email && form.phone ? "#2d8a47" : "#ccc", color: "#fff", border: "none", borderRadius: 8, fontFamily: "Nunito,sans-serif", fontWeight: 700, cursor: form.name && form.email && form.phone ? "pointer" : "not-allowed" }}>
                ✅ Подтвердить бронирование
              </button>
            </div>
            <div className="info-box" style={{ height: "fit-content" }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 14, color: "#1a5c2a" }}>Итог заказа</div>
              <div style={{ fontWeight: 700 }}>{selectedCar.name}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>{selectedCar.category}</div>
              {days && <div style={{ fontSize: 13, marginBottom: 4 }}>📅 {days} дней × ${selectedCar.price} = <b>${carPrice}</b></div>}
              {selectedExtras.map(eid => {
                const ex = extras.find(e => e.id === eid);
                return <div key={eid} style={{ fontSize: 13, marginBottom: 4 }}>{ex.icon} {ex.name}: <b>+${ex.price * (days||1)}</b></div>;
              })}
              <div style={{ borderTop: "1px solid #d0eeda", marginTop: 14, paddingTop: 14, display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 20, color: "#2d8a47" }}>
                <span>Итого</span><span>${total}</span>
              </div>
              <div style={{ fontSize: 12, color: "#999", marginTop: 10 }}>* Залог оплачивается при получении автомобиля</div>
            </div>
          </div>
        </div>
      )}

      {/* WHATSAPP FLOAT */}
      <a href={`https://wa.me/${WHATSAPP}?text=Здравствуйте! Хочу узнать об аренде.`} target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg,#25d366,#128c7e)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 24px rgba(37,211,102,0.4)", textDecoration: "none" }}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
