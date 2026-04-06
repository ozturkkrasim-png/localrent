import { useState } from "react";

/* ─── VERİ ─────────────────────────────────────────────────── */
const cars = [
  { id: 1, name: "Renault Logan", category: "Эконом", price: 25, seats: 5, transmission: "Механика", fuel: "Бензин", engine: "1.6 л / 82 л.с.", year: 2022, image: "🚗", rating: 4.8, reviews: 124, deposit: 150, available: true, features: ["Кондиционер", "USB", "ABS", "Центральный замок", "Электростёкла"], mileage: "Без ограничений", minAge: 21, minLicense: "2 года" },
  { id: 2, name: "Volkswagen Polo", category: "Эконом", price: 32, seats: 5, transmission: "Автомат", fuel: "Бензин", engine: "1.6 л / 110 л.с.", year: 2023, image: "🚙", rating: 4.9, reviews: 98, deposit: 200, available: true, features: ["Кондиционер", "Bluetooth", "ABS", "ESP", "Круиз-контроль", "Парктроник"], mileage: "Без ограничений", minAge: 21, minLicense: "2 года" },
  { id: 3, name: "Toyota Camry", category: "Комфорт", price: 55, seats: 5, transmission: "Автомат", fuel: "Бензин", engine: "2.5 л / 181 л.с.", year: 2023, image: "🚘", rating: 4.7, reviews: 76, deposit: 300, available: true, features: ["Климат-контроль", "Bluetooth", "Камера заднего вида", "Круиз-контроль", "Кожаный салон", "Навигация"], mileage: "Без ограничений", minAge: 23, minLicense: "3 года" },
  { id: 4, name: "Hyundai Tucson", category: "SUV", price: 65, seats: 5, transmission: "Автомат", fuel: "Дизель", engine: "2.0 л / 155 л.с.", year: 2022, image: "🚐", rating: 4.9, reviews: 203, deposit: 350, available: true, features: ["Климат-контроль", "Полный привод", "Камера 360°", "Bluetooth", "Подогрев сидений", "Люк"], mileage: "Без ограничений", minAge: 23, minLicense: "3 года" },
  { id: 5, name: "Mercedes C-Class", category: "Премиум", price: 95, seats: 5, transmission: "Автомат", fuel: "Бензин", engine: "2.0 л / 204 л.с.", year: 2024, image: "🏎️", rating: 5.0, reviews: 45, deposit: 500, available: false, features: ["Климат-контроль", "Кожа Nappa", "Панорамная крыша", "Навигация", "Вентиляция сидений", "HUD", "Harman Kardon"], mileage: "300 км/день", minAge: 25, minLicense: "5 лет" },
  { id: 6, name: "Ford Transit", category: "Минивэн", price: 75, seats: 8, transmission: "Механика", fuel: "Дизель", engine: "2.0 л / 130 л.с.", year: 2021, image: "🚌", rating: 4.6, reviews: 67, deposit: 400, available: true, features: ["Кондиционер", "Большой багажник", "ABS", "ESP", "USB", "Bluetooth"], mileage: "Без ограничений", minAge: 25, minLicense: "3 года" },
];

const reviews = [
  { name: "Алексей М.", date: "Март 2026", rating: 5, text: "Отличный автомобиль, всё как описано. Получили ключи прямо в аэропорту, без очередей. Рекомендую!" },
  { name: "Наталья К.", date: "Февраль 2026", rating: 5, text: "Чистый салон, хорошая машина. Менеджер говорит по-русски — это очень удобно." },
  { name: "Дмитрий В.", date: "Январь 2026", rating: 4, text: "В целом всё хорошо. Пришлось немного подождать на выдаче, но потом всё прошло отлично." },
];

const categoryColors = { "Эконом": "#10b981", "Комфорт": "#3b82f6", "SUV": "#f59e0b", "Премиум": "#8b5cf6", "Минивэн": "#ef4444" };

/* ─── СТИЛИ ─────────────────────────────────────────────────── */
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0a0e1a;}
  .gold{color:#c99b45;}
  .nav-link{color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;letter-spacing:1px;transition:color .3s;font-family:'Crimson Text',serif;}
  .nav-link:hover{color:#c99b45;}
  .back-btn{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:2px;padding:8px 18px;color:rgba(232,228,220,0.7);font-family:'Crimson Text',serif;font-size:13px;letter-spacing:1px;cursor:pointer;transition:all .3s;}
  .back-btn:hover{border-color:rgba(201,155,69,0.4);color:#c99b45;}
  .car-thumb{border:2px solid rgba(255,255,255,0.1);border-radius:4px;padding:10px 14px;cursor:pointer;transition:all .3s;background:rgba(255,255,255,0.03);font-size:28px;text-align:center;}
  .car-thumb.active{border-color:#c99b45;background:rgba(201,155,69,0.08);}
  .car-thumb:hover:not(.active){border-color:rgba(255,255,255,0.25);}
  .spec-box{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:3px;padding:14px 16px;display:flex;align-items:center;gap:12px;}
  .feat-chip{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:2px;padding:6px 12px;font-size:12px;color:rgba(232,228,220,0.6);font-family:'Crimson Text',serif;letter-spacing:.5px;}
  .price-box{background:rgba(201,155,69,0.08);border:1px solid rgba(201,155,69,0.2);border-radius:4px;padding:28px;}
  .book-btn{width:100%;padding:16px;background:linear-gradient(135deg,#c99b45,#a67c32);border:none;border-radius:2px;color:#0a0e1a;font-family:'Crimson Text',serif;font-size:14px;letter-spacing:2px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:all .3s;margin-top:20px;}
  .book-btn:hover{box-shadow:0 8px 28px rgba(201,155,69,0.35);transform:translateY(-1px);}
  .book-btn:disabled{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.3);cursor:not-allowed;transform:none;box-shadow:none;}
  .tab-btn{padding:10px 24px;font-family:'Crimson Text',serif;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;background:transparent;border:none;border-bottom:2px solid transparent;color:rgba(232,228,220,0.4);cursor:pointer;transition:all .3s;}
  .tab-btn.active{color:#c99b45;border-bottom-color:#c99b45;}
  .tab-btn:hover:not(.active){color:rgba(232,228,220,0.8);}
  .review-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:4px;padding:20px 24px;}
  .date-input{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:2px;padding:10px 14px;color:#e8e4dc;font-family:'Crimson Text',serif;font-size:14px;outline:none;width:100%;transition:border-color .3s;}
  .date-input:focus{border-color:rgba(201,155,69,0.5);}
  .divider{width:48px;height:1px;background:linear-gradient(90deg,transparent,#c99b45,transparent);margin:12px 0;}
  .badge{display:inline-block;padding:3px 10px;border-radius:2px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;font-family:'Crimson Text',serif;font-weight:600;}
  .car-list-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;transition:all .35s;cursor:pointer;}
  .car-list-card:hover{border-color:rgba(201,155,69,0.3);transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,0.4);}
  .mini-book{width:100%;padding:11px;background:linear-gradient(135deg,#c99b45,#a67c32);border:none;border-radius:2px;color:#0a0e1a;font-family:'Crimson Text',serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:all .3s;margin-top:14px;}
  .mini-book:hover{box-shadow:0 6px 20px rgba(201,155,69,0.3);}
  .mini-book:disabled{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.25);cursor:not-allowed;}
`;

/* ─── СТРАНИЦА ДЕТАЛЕЙ ──────────────────────────────────────── */
function DetailPage({ car, onBack, onBook }) {
  const [tab, setTab] = useState("specs");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / 86400000))
    : null;

  const total = days ? car.price * days : null;

  return (
    <div style={{ fontFamily: "'Crimson Text',serif", background: "#0a0e1a", minHeight: "100vh", color: "#e8e4dc" }}>
      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,14,26,0.97)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100 }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", fontWeight: 900 }}>
          <span className="gold">Local</span><span style={{ color: "#e8e4dc" }}>Rent</span>
        </span>
        <div style={{ display: "flex", gap: "28px" }}>
          <a href="#" className="nav-link">О нас</a>
          <a href="#" className="nav-link">Поддержка</a>
          <a href="#" className="nav-link">RU</a>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 48px" }}>
        {/* BACK */}
        <button className="back-btn" onClick={onBack} style={{ marginBottom: "32px" }}>
          ← Назад к списку
        </button>

        {/* BREADCRUMB */}
        <p style={{ fontSize: "12px", letterSpacing: "2px", color: "rgba(232,228,220,0.35)", textTransform: "uppercase", marginBottom: "28px" }}>
          Главная / Каталог / {car.category} / {car.name}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "48px", alignItems: "start" }}>

          {/* LEFT */}
          <div>
            {/* HERO IMAGE */}
            <div style={{
              background: `linear-gradient(135deg, rgba(15,23,42,0.9), rgba(10,14,26,0.95))`,
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 40px",
              marginBottom: "16px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse at 50% 60%, rgba(201,155,69,0.06) 0%, transparent 70%)`, pointerEvents: "none" }} />
              <span style={{ fontSize: "120px", filter: "drop-shadow(0 0 40px rgba(201,155,69,0.2))", display: "block", lineHeight: 1 }}>{car.image}</span>
              <span className="badge" style={{ position: "absolute", top: "16px", left: "16px", background: `rgba(${categoryColors[car.category]?.replace('#','').match(/../g)?.map(x => parseInt(x, 16)).join(',') || '255,255,255'},0.12)`, color: categoryColors[car.category], border: `1px solid ${categoryColors[car.category]}40` }}>
                {car.category}
              </span>
              {!car.available && (
                <span className="badge" style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(239,68,68,0.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>Занят</span>
              )}
              <div style={{ position: "absolute", bottom: "16px", right: "16px", background: "rgba(0,0,0,0.5)", borderRadius: "2px", padding: "4px 10px", fontSize: "12px", color: "rgba(232,228,220,0.5)", letterSpacing: "1px" }}>
                {car.year} год
              </div>
            </div>

            {/* THUMBS */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "40px" }}>
              {["🚗", "🛣️", "🏔️", "🌅"].map((em, i) => (
                <div key={i} className={`car-thumb ${i === 0 ? "active" : ""}`} style={{ flex: 1 }}>{em}</div>
              ))}
            </div>

            {/* TITLE */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "36px", fontWeight: 900, lineHeight: 1.1 }}>{car.name}</h1>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#f59e0b", fontSize: "16px" }}>{"★".repeat(Math.floor(car.rating))}</div>
                <div style={{ fontSize: "13px", color: "rgba(232,228,220,0.45)", marginTop: "2px" }}>{car.rating} · {car.reviews} отзывов</div>
              </div>
            </div>
            <div className="divider" style={{ margin: "0 0 32px 0" }} />

            {/* SPECS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "36px" }}>
              {[
                { icon: "⚙️", label: "Коробка", val: car.transmission },
                { icon: "⛽", label: "Топливо", val: car.fuel },
                { icon: "🔧", label: "Двигатель", val: car.engine },
                { icon: "👥", label: "Мест", val: car.seats },
                { icon: "📍", label: "Пробег", val: car.mileage },
                { icon: "📅", label: "Год выпуска", val: car.year },
              ].map((s, i) => (
                <div key={i} className="spec-box">
                  <span style={{ fontSize: "20px" }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(232,228,220,0.35)", marginBottom: "2px" }}>{s.label}</div>
                    <div style={{ fontSize: "15px", color: "#e8e4dc", fontWeight: 600 }}>{s.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* TABS */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "0", marginBottom: "28px" }}>
              {[["specs", "Комплектация"], ["conditions", "Условия"], ["reviews", "Отзывы"]].map(([key, label]) => (
                <button key={key} className={`tab-btn ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}>{label}</button>
              ))}
            </div>

            {tab === "specs" && (
              <div>
                <p style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(201,155,69,0.7)", marginBottom: "16px" }}>Включено в комплектацию</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {car.features.map((f, i) => (
                    <span key={i} className="feat-chip">✓ {f}</span>
                  ))}
                </div>
              </div>
            )}

            {tab === "conditions" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { icon: "🪪", label: "Минимальный возраст", val: `${car.minAge} лет` },
                  { icon: "📋", label: "Стаж вождения", val: `Не менее ${car.minLicense}` },
                  { icon: "💳", label: "Залог (депозит)", val: `$${car.deposit}` },
                  { icon: "🛡️", label: "Страховка", val: "Базовая КАСКО включена" },
                  { icon: "🚗", label: "Пробег", val: car.mileage },
                  { icon: "⛽", label: "Топливо", val: "Полный бак — полный бак" },
                  { icon: "📍", label: "Доставка в аэропорт", val: "Доступна (+$20)" },
                ].map((c, i) => (
                  <div key={i} className="spec-box" style={{ justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "18px" }}>{c.icon}</span>
                      <span style={{ color: "rgba(232,228,220,0.55)", fontSize: "14px" }}>{c.label}</span>
                    </div>
                    <span style={{ color: "#e8e4dc", fontSize: "14px", fontWeight: 600 }}>{c.val}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {reviews.map((r, i) => (
                  <div key={i} className="review-card">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <div>
                        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "15px", fontWeight: 700 }}>{r.name}</span>
                        <span style={{ color: "rgba(232,228,220,0.35)", fontSize: "12px", marginLeft: "12px" }}>{r.date}</span>
                      </div>
                      <span style={{ color: "#f59e0b" }}>{"★".repeat(r.rating)}</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "rgba(232,228,220,0.65)", lineHeight: 1.7 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — PRICE BOX */}
          <div style={{ position: "sticky", top: "88px" }}>
            <div className="price-box">
              <p style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(201,155,69,0.7)", marginBottom: "6px" }}>Стоимость аренды</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "44px", fontWeight: 900, color: "#c99b45" }}>${car.price}</span>
                <span style={{ fontSize: "14px", color: "rgba(232,228,220,0.45)" }}>/ сутки</span>
              </div>
              {total && (
                <div style={{ background: "rgba(201,155,69,0.1)", border: "1px solid rgba(201,155,69,0.2)", borderRadius: "2px", padding: "8px 12px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", color: "rgba(232,228,220,0.6)" }}>Итого за {days} {days === 1 ? "день" : days < 5 ? "дня" : "дней"}: </span>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", color: "#c99b45", fontWeight: 700 }}>${total}</span>
                </div>
              )}
              <div className="divider" style={{ margin: "16px 0" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "8px" }}>
                <div>
                  <label style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(201,155,69,0.7)", display: "block", marginBottom: "6px" }}>Дата получения</label>
                  <input type="date" className="date-input" value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(201,155,69,0.7)", display: "block", marginBottom: "6px" }}>Дата возврата</label>
                  <input type="date" className="date-input" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
                </div>
              </div>

              <button className="book-btn" disabled={!car.available} onClick={() => car.available && onBook(car, pickupDate, returnDate, days, total)}>
                {car.available ? "Перейти к бронированию" : "Автомобиль недоступен"}
              </button>

              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[["🛡️", "Страховка включена"], ["💳", `Залог: $${car.deposit}`], ["❌", "Бесплатная отмена за 48 ч"]].map(([ic, tx], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "rgba(232,228,220,0.45)" }}>
                    <span>{ic}</span><span>{tx}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SUPPORT */}
            <div style={{ marginTop: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px", padding: "18px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>📞</div>
              <p style={{ fontSize: "13px", color: "rgba(232,228,220,0.5)", marginBottom: "6px" }}>Нужна помощь?</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", color: "#c99b45" }}>+90 242 000 00 00</p>
              <p style={{ fontSize: "11px", color: "rgba(232,228,220,0.3)", marginTop: "4px", letterSpacing: "1px" }}>ПОДДЕРЖКА НА РУССКОМ · 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ГЛАВНАЯ СТРАНИЦА ──────────────────────────────────────── */
function HomePage({ onSelect }) {
  const [pickupCity, setPickupCity] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sortBy, setSortBy] = useState("price");
  const [searched, setSearched] = useState(false);
  const cities = ["Анталья", "Стамбул", "Анкара", "Измир", "Бодрум", "Кемер", "Алания", "Фетхие"];
  const categories = ["Все", "Эконом", "Комфорт", "SUV", "Премиум", "Минивэн"];

  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / 86400000))
    : 1;

  const filtered = cars
    .filter(c => activeCategory === "Все" || c.category === activeCategory)
    .sort((a, b) => sortBy === "price" ? a.price - b.price : b.rating - a.rating);

  return (
    <div style={{ fontFamily: "'Crimson Text',serif", background: "#0a0e1a", minHeight: "100vh", color: "#e8e4dc" }}>
      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 100, background: "rgba(10,14,26,0.95)", backdropFilter: "blur(20px)" }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "24px", fontWeight: 900, letterSpacing: "-1px" }}>
          <span className="gold">Local</span><span style={{ color: "#e8e4dc" }}>Rent</span>
          <span style={{ fontSize: "10px", color: "rgba(201,155,69,0.5)", letterSpacing: "3px", textTransform: "uppercase", borderLeft: "1px solid rgba(201,155,69,0.3)", paddingLeft: "12px", marginLeft: "12px", fontFamily: "'Crimson Text',serif" }}>Türkiye</span>
        </span>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="#" className="nav-link">О нас</a>
          <a href="#" className="nav-link">Условия</a>
          <a href="#" className="nav-link">Поддержка</a>
          <a href="#" className="nav-link">RU | TR | EN</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg,#0a0e1a,#0f1729 40%,#0a1628 70%,#0d0a1a)", padding: "80px 48px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", left: "-15%", width: "55%", height: "140%", background: "radial-gradient(ellipse,rgba(201,155,69,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase", color: "#c99b45", marginBottom: "20px" }}>Аренда автомобилей в Турции</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px,6vw,70px)", fontWeight: 900, lineHeight: 1.05, marginBottom: "16px" }}>
            Путешествуйте<br /><span className="gold" style={{ fontStyle: "italic" }}>свободно</span>
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(232,228,220,0.55)", marginBottom: "48px", maxWidth: "440px", lineHeight: 1.65 }}>
            Лучшие предложения от местных компаний. Без скрытых комиссий.
          </p>

          {/* SEARCH */}
          <div style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(201,155,69,0.18)", borderRadius: "4px", padding: "36px" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-end", flexWrap: "wrap" }}>
              {[
                { label: "Город получения", el: <select style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", padding: "12px 14px", color: "#e8e4dc", fontSize: "14px", fontFamily: "'Crimson Text',serif", outline: "none", width: "100%" }} value={pickupCity} onChange={e => setPickupCity(e.target.value)}><option value="">Выберите город</option>{cities.map(c => <option key={c} style={{ background: "#0f1729" }} value={c}>{c}</option>)}</select> },
                { label: "Дата получения", el: <input type="date" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", padding: "12px 14px", color: "#e8e4dc", fontSize: "14px", fontFamily: "'Crimson Text',serif", outline: "none", width: "100%" }} value={pickupDate} onChange={e => setPickupDate(e.target.value)} /> },
                { label: "Дата возврата", el: <input type="date" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", padding: "12px 14px", color: "#e8e4dc", fontSize: "14px", fontFamily: "'Crimson Text',serif", outline: "none", width: "100%" }} value={returnDate} onChange={e => setReturnDate(e.target.value)} /> },
              ].map(({ label, el }, i) => (
                <div key={i} style={{ flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#c99b45" }}>{label}</label>
                  {el}
                </div>
              ))}
              <button
                onClick={() => pickupCity && pickupDate && returnDate && setSearched(true)}
                style={{ background: "linear-gradient(135deg,#c99b45,#a67c32)", border: "none", borderRadius: "2px", padding: "13px 36px", color: "#0a0e1a", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Crimson Text',serif", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Найти авто
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CARS */}
      <section style={{ padding: "56px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "14px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#c99b45", marginBottom: "6px" }}>
              {searched ? `${pickupCity} · ${days} ${days === 1 ? "день" : days < 5 ? "дня" : "дней"}` : "Наш автопарк"}
            </p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "30px", fontWeight: 700 }}>
              Выберите <span className="gold" style={{ fontStyle: "italic" }}>автомобиль</span>
            </h2>
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", padding: "8px 16px", color: "#e8e4dc", fontSize: "13px", fontFamily: "'Crimson Text',serif", outline: "none", cursor: "pointer" }}>
            <option style={{ background: "#0f1729" }} value="price">По цене</option>
            <option style={{ background: "#0f1729" }} value="rating">По рейтингу</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "7px 18px", borderRadius: "2px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Crimson Text',serif", cursor: "pointer", transition: "all .3s", border: activeCategory === cat ? "1px solid rgba(201,155,69,0.5)" : "1px solid rgba(255,255,255,0.12)", background: activeCategory === cat ? "rgba(201,155,69,0.12)" : "transparent", color: activeCategory === cat ? "#c99b45" : "rgba(255,255,255,0.45)" }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          {filtered.map(car => (
            <div key={car.id} className="car-list-card" onClick={() => onSelect(car)} style={{ opacity: car.available ? 1 : 0.5 }}>
              <div style={{ background: "linear-gradient(135deg,rgba(15,23,42,0.9),rgba(10,14,26,0.95))", padding: "32px 24px 20px", textAlign: "center", position: "relative" }}>
                <span style={{ fontSize: "60px" }}>{car.image}</span>
                <span className="badge" style={{ position: "absolute", top: "12px", left: "12px", color: categoryColors[car.category], border: `1px solid ${categoryColors[car.category]}40`, background: `${categoryColors[car.category]}18` }}>{car.category}</span>
                {!car.available && <span className="badge" style={{ position: "absolute", top: "12px", right: "12px", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)" }}>Занят</span>}
              </div>
              <div style={{ padding: "18px 18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", fontWeight: 700 }}>{car.name}</h3>
                    <div style={{ fontSize: "12px", color: "rgba(232,228,220,0.4)", marginTop: "2px" }}>
                      <span style={{ color: "#f59e0b" }}>★</span> {car.rating} ({car.reviews})
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "20px", fontWeight: 700, color: "#c99b45" }}>
                      ${searched ? car.price * days : car.price}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(232,228,220,0.35)" }}>{searched ? `за ${days} дн.` : "/ сутки"}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "12px" }}>
                  {[{ icon: "👥", v: `${car.seats}` }, { icon: "⚙️", v: car.transmission.slice(0, 5) }, { icon: "⛽", v: car.fuel.slice(0, 6) }].map((s, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "2px", padding: "5px 6px", textAlign: "center" }}>
                      <div style={{ fontSize: "13px" }}>{s.icon}</div>
                      <div style={{ fontSize: "10px", color: "rgba(232,228,220,0.4)", marginTop: "1px" }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <button className="mini-book" disabled={!car.available} onClick={e => { e.stopPropagation(); onSelect(car); }}>
                  {car.available ? "Подробнее / Забронировать" : "Недоступен"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", fontWeight: 900 }}><span className="gold">Local</span>Rent <span style={{ fontFamily: "'Crimson Text',serif", fontSize: "12px", color: "rgba(232,228,220,0.25)", letterSpacing: "2px" }}>© 2026</span></span>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="#" className="nav-link">Конфиденциальность</a>
          <a href="#" className="nav-link">Условия</a>
          <a href="#" className="nav-link">Контакты</a>
        </div>
      </footer>
    </div>
  );
}

/* ─── БРОНИРОВАНИЕ ──────────────────────────────────────────── */
function BookingPage({ car, pickupDate, returnDate, days, total, onBack }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", surname: "", phone: "", email: "", passport: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const filled = Object.values(form).every(v => v.trim());

  if (step === 2) return (
    <div style={{ fontFamily: "'Crimson Text',serif", background: "#0a0e1a", minHeight: "100vh", color: "#e8e4dc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "480px", padding: "48px" }}>
        <div style={{ fontSize: "72px", marginBottom: "24px" }}>✅</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "32px", fontWeight: 900, marginBottom: "12px" }}>Бронирование <span className="gold" style={{ fontStyle: "italic" }}>подтверждено!</span></h2>
        <div className="divider" style={{ margin: "16px auto" }} />
        <p style={{ color: "rgba(232,228,220,0.55)", fontSize: "15px", lineHeight: 1.7, marginBottom: "28px" }}>
          Ваш {car.name} забронирован. Детали отправлены на {form.email}.<br />Наш менеджер свяжется с вами в течение 30 минут.
        </p>
        <button onClick={onBack} style={{ background: "linear-gradient(135deg,#c99b45,#a67c32)", border: "none", borderRadius: "2px", padding: "14px 36px", color: "#0a0e1a", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Crimson Text',serif", fontWeight: 600, cursor: "pointer" }}>
          Вернуться на главную
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Crimson Text',serif", background: "#0a0e1a", minHeight: "100vh", color: "#e8e4dc" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,14,26,0.97)" }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", fontWeight: 900 }}><span className="gold">Local</span>Rent</span>
      </nav>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 48px" }}>
        <button className="back-btn" onClick={onBack} style={{ marginBottom: "32px" }}>← Назад</button>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "32px", fontWeight: 900, marginBottom: "8px" }}>
          Оформление <span className="gold" style={{ fontStyle: "italic" }}>бронирования</span>
        </h1>
        <div className="divider" style={{ margin: "0 0 36px 0" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "40px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#c99b45", marginBottom: "20px" }}>Данные арендатора</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[["Имя", "name", "Иван"], ["Фамилия", "surname", "Иванов"], ["Телефон", "phone", "+7 (___) ___-__-__"], ["Email", "email", "mail@example.com"], ["Номер паспорта", "passport", "AA0000000"]].map(([label, key, ph], i) => (
                <div key={key} style={{ gridColumn: i === 4 ? "1 / -1" : "auto" }}>
                  <label style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(201,155,69,0.7)", display: "block", marginBottom: "6px" }}>{label}</label>
                  <input
                    placeholder={ph}
                    value={form[key]}
                    onChange={e => set(key, e.target.value)}
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px", padding: "11px 14px", color: "#e8e4dc", fontFamily: "'Crimson Text',serif", fontSize: "14px", outline: "none", width: "100%" }}
                  />
                </div>
              ))}
            </div>
            <button
              disabled={!filled}
              onClick={() => setStep(2)}
              style={{ marginTop: "28px", width: "100%", padding: "15px", background: filled ? "linear-gradient(135deg,#c99b45,#a67c32)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: "2px", color: filled ? "#0a0e1a" : "rgba(255,255,255,0.25)", fontFamily: "'Crimson Text',serif", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, cursor: filled ? "pointer" : "not-allowed" }}
            >
              Подтвердить бронирование
            </button>
          </div>

          <div>
            <div className="price-box">
              <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(201,155,69,0.7)", marginBottom: "12px" }}>Ваш заказ</p>
              <div style={{ fontSize: "28px", textAlign: "center", marginBottom: "8px" }}>{car.image}</div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "18px", fontWeight: 700, textAlign: "center", marginBottom: "16px" }}>{car.name}</p>
              <div className="divider" style={{ margin: "0 auto 16px" }} />
              {[
                ["Категория", car.category],
                ["Дней", days || "—"],
                ["Цена/сутки", `$${car.price}`],
                ["Залог", `$${car.deposit}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px", color: "rgba(232,228,220,0.55)" }}>
                  <span>{k}</span><span style={{ color: "#e8e4dc" }}>{v}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "16px" }}>Итого</span>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "20px", color: "#c99b45", fontWeight: 700 }}>{total ? `$${total}` : "—"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── КОРЕНЬ ПРИЛОЖЕНИЯ ─────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingData, setBookingData] = useState({});

  return (
    <>
      <style>{S}</style>
      {page === "home" && (
        <HomePage onSelect={car => { setSelectedCar(car); setPage("detail"); }} />
      )}
      {page === "detail" && selectedCar && (
        <DetailPage
          car={selectedCar}
          onBack={() => setPage("home")}
          onBook={(car, pd, rd, days, total) => {
            setBookingData({ pd, rd, days, total });
            setPage("booking");
          }}
        />
      )}
      {page === "booking" && selectedCar && (
        <BookingPage
          car={selectedCar}
          pickupDate={bookingData.pd}
          returnDate={bookingData.rd}
          days={bookingData.days}
          total={bookingData.total}
          onBack={() => setPage("detail")}
        />
      )}
    </>
  );
}
