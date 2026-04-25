// ===== configurator.js — данные берутся из data.js =====
// В HTML: сначала <script src="data.js">, потом <script src="configurator.js">

// ===== ПОРЯДОК И НАЗВАНИЯ КАТЕГОРИЙ =====
const cfgCategories = [
  { id: "CPU",     label: "Процессор" },
  { id: "GPU",     label: "Видеокарта" },
  { id: "RAM",     label: "Оперативная память" },
  { id: "SSD",     label: "Накопитель SSD" },
  { id: "PSU",     label: "Блок питания" },
  { id: "CASE",    label: "Корпус" },
];

// ===== ПАРСИНГ ЦЕНЫ ИЗ СТРОКИ =====
// "42 900 ₽" → 42900
function parsePrice(str) {
  if (typeof str === "number") return str;
  return parseInt(String(str).replace(/\D/g, "")) || 0;
}

// ===== ФОРМАТИРОВАНИЕ ЦЕНЫ =====
function formatPrice(n) {
  return n.toLocaleString("ru-RU") + " ₽";
}

// ===== ВЫБРАННЫЕ КОМПОНЕНТЫ { catId -> { name, price } } =====
const chosen = {};

// ===== ПОДСЧЁТ ИТОГА =====
function calcTotal() {
  return Object.values(chosen).reduce((sum, c) => sum + c.price, 0);
}

// ===== ПОЛУЧИТЬ ОПЦИИ КАТЕГОРИИ ИЗ data.js =====
function getOptions(catId) {
  return components.filter(c => c.category === catId);
}

// ===== ОБНОВЛЕНИЕ ИТОГОВОЙ ПАНЕЛИ =====
function updateSummary() {
  const chosenEl = document.getElementById("cfgChosen");
  const totalEl  = document.getElementById("cfgTotalPrice");
  const compatEl = document.getElementById("cfgCompat");

  const entries = cfgCategories
    .filter(cat => chosen[cat.id])
    .map(cat => `
      <div class="cfg-chosen-item">
        <span class="cfg-chosen-item__cat">${cat.label.split(" ")[0]}</span>
        <span class="cfg-chosen-item__name">${chosen[cat.id].name}</span>
        <span class="cfg-chosen-item__price">${formatPrice(chosen[cat.id].price)}</span>
      </div>`)
    .join("");

  chosenEl.innerHTML = entries || '<div class="cfg-empty-msg">Ничего не выбрано</div>';
  totalEl.textContent = formatPrice(calcTotal());
  checkCompat(compatEl);
}

// ===== ПРОВЕРКА СОВМЕСТИМОСТИ =====
function checkCompat(el) {
  const gpu = chosen["GPU"];
  const psu = chosen["PSU"];
  const cpu = chosen["CPU"];

  let msg = "";

  // RTX 5090 (575 Вт TDP) — нужен БП от 1000 Вт
  if (gpu && gpu.name.includes("5090") && psu && !psu.name.includes("1000")) {
    msg = "⚠ RTX 5090 требует БП от 1000 Вт";
    el.className = "cfg-compat warn";
  }
  // i9 / Ryzen 9 без нормального охлаждения — но охлаждения нет в категориях, просто инфо
  else if (cpu && (cpu.name.includes("i9") || cpu.name.includes("9 79")) && psu && psu.name.includes("550")) {
    msg = "⚠ Для мощного CPU рекомендуется БП от 750 Вт";
    el.className = "cfg-compat warn";
  }
  // Всё выбрано
  else if (Object.keys(chosen).length === cfgCategories.length) {
    msg = "✓ Сборка совместима";
    el.className = "cfg-compat ok";
  } else {
    msg = "";
    el.className = "cfg-compat";
  }

  el.textContent = msg;
}

// ===== РЕНДЕР ШАГОВ =====
function renderSteps() {
  const wrap = document.getElementById("cfgSteps");
  if (!wrap) return;

  cfgCategories.forEach((cat, idx) => {
    const options = getOptions(cat.id);
    const step = document.createElement("div");
    step.className = "cfg-step";
    step.id = "step-" + cat.id;

    const optionsHTML = options.map(opt => {
      const price = parsePrice(opt.price);
      const spec  = opt.specs && opt.specs[0] ? opt.specs[0].value : "";
      const safeName = opt.name.replace(/"/g, "&quot;");
      return `
        <div class="cfg-option" data-cat="${cat.id}" data-name="${safeName}" data-price="${price}">
          <div class="cfg-option__info">
            <div class="cfg-option__name">${opt.name}</div>
            <div class="cfg-option__spec">${spec}${opt.specs[1] ? " · " + opt.specs[1].value : ""}</div>
          </div>
          ${opt.badge ? `<div class="cfg-option__badge">${opt.badge}</div>` : ""}
          <div class="cfg-option__price">${price === 0 ? "Входит в набор" : opt.price}</div>
          <div class="cfg-option__check">✓</div>
        </div>`;
    }).join("");

    step.innerHTML = `
      <div class="cfg-step__header">
        <div class="cfg-step__num">0${idx + 1}</div>
        <div class="cfg-step__name">${cat.label}</div>
        <div class="cfg-step__chosen-preview" id="preview-${cat.id}"></div>
        <div class="cfg-step__arrow">▼</div>
      </div>
      <div class="cfg-step__options">${optionsHTML}</div>`;

    wrap.appendChild(step);

    // Открыть / закрыть шаг
    step.querySelector(".cfg-step__header").addEventListener("click", () => {
      step.classList.toggle("open");
    });

    // Выбор варианта
    step.querySelectorAll(".cfg-option").forEach(opt => {
      opt.addEventListener("click", () => {
        step.querySelectorAll(".cfg-option").forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");

        chosen[cat.id] = {
          name:  opt.dataset.name,
          price: parseInt(opt.dataset.price),
        };

        document.getElementById("preview-" + cat.id).textContent = opt.dataset.name;
        step.classList.add("done");
        step.classList.remove("open");

        // Открыть следующий шаг
        const next = cfgCategories[idx + 1];
        if (next) {
          const nextStep = document.getElementById("step-" + next.id);
          if (nextStep && !nextStep.classList.contains("done")) {
            nextStep.classList.add("open");
            nextStep.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }

        updateSummary();
      });
    });
  });

  // Открыть первый шаг
  document.querySelector(".cfg-step")?.classList.add("open");
}

// ===== КНОПКА "ЗАКАЗАТЬ" =====
function initOrderBtn() {
  document.getElementById("cfgOrderBtn")?.addEventListener("click", () => {
    if (Object.keys(chosen).length === 0) {
      alert("Выберите хотя бы один компонент!");
      return;
    }
    const list = cfgCategories
      .filter(cat => chosen[cat.id])
      .map(cat => `${cat.label}: ${chosen[cat.id].name}`)
      .join("\n");
    sessionStorage.setItem("orderItem", `Конфигуратор — ${formatPrice(calcTotal())}\n${list}`);
    window.location.href = "index.html#contact";
  });
}

// ===== КНОПКА "СБРОСИТЬ" =====
function initResetBtn() {
  document.getElementById("cfgResetBtn")?.addEventListener("click", () => {
    for (const key in chosen) delete chosen[key];
    document.querySelectorAll(".cfg-option").forEach(o => o.classList.remove("selected"));
    document.querySelectorAll(".cfg-step").forEach(s => s.classList.remove("done", "open"));
    document.querySelectorAll("[id^='preview-']").forEach(el => el.textContent = "");
    document.querySelector(".cfg-step")?.classList.add("open");
    updateSummary();
  });
}

// ===== БУРГЕР =====
function initBurger() {
  const burger = document.getElementById("burger");
  const nav    = document.getElementById("nav");
  if (!burger || !nav) return;
  burger.addEventListener("click", () => { burger.classList.toggle("open"); nav.classList.toggle("open"); });
  nav.querySelectorAll(".nav__link").forEach(l => l.addEventListener("click", () => { burger.classList.remove("open"); nav.classList.remove("open"); }));
}

// ===== КНОПКА НАВЕРХ =====
function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;
  window.addEventListener("scroll", () => btn.classList.toggle("visible", window.scrollY > 400));
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ===== ТЕМА =====
function initThemeToggle() {
  const btn = document.querySelector(".theme-toggle-nav"); // было getElementById("themeToggle")
  if (!btn) return;

  // Восстановить сохранённую тему
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    btn.innerHTML = "Сменить тему"; 
  }

  btn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    btn.innerHTML = isLight ? "Сменить тему" : "Сменить тему"; // с текстом "ТЕМА"
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener("DOMContentLoaded", () => {
  renderSteps();
  updateSummary();
  initOrderBtn();
  initResetBtn();
  initBurger();
  initScrollTop();
  initThemeToggle();
});
