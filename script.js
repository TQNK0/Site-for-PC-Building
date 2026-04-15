// ===== ДАННЫЕ: СБОРКИ ПК =====
const builds = [
  {
    name: "Office Start",
    image: "https://cdn.digital-razor.ru/FM81UB6T0H6zzqCwN79RqtS6yto=/fit-in/680x680/filters:format(webp)/files/upload/iblock/92b/92b83d261856fdab12a081e55ced3420.png",
    desc: "Для офисной работы и других задач",
    price: "74 900 ₽",
    featured: false,
    badge: null,
    specs: [
      { label: "CPU", value: "Intel Core i3-13100F" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "GPU", value: "RTX 5050 8ГБ" },
      { label: "SSD", value: "512GB NVMe" },
    ]
  },
  {
    name: "Game Pro",
    image: "https://cdn.digital-razor.ru/EqWdBudsOuuqafBn4y5K3la3vMQ=/fit-in/680x680/filters:format(webp)/files/upload/iblock/4b9/4b96c748547f94aea9745b43fcec6266.png",
    desc: "Игровой ПК для комфортной игры в Full HD",
    price: "84 900 ₽",
    featured: true,
    badge: "Хит продаж",
    specs: [
      { label: "CPU", value: "Intel Core i5-13600K" },
      { label: "RAM", value: "32GB DDR5" },
      { label: "GPU", value: "RTX 5070 12GB" },
      { label: "SSD", value: "1TB NVMe" },
    ]
  },
  {
    name: "Creator Beast",
    image:"https://cdn.digital-razor.ru/68EPtpHsLj1ZLk88wKyyBpQTqAE=/fit-in/680x680/filters:format(webp)/files/upload/iblock/d9b/d9b74daf8e551080be21f91096065784.png",
    desc: "Для монтажа, 3D и работы с тяжёлыми задачами",
    price: "139 900 ₽",
    featured: false,
    badge: null,
    specs: [
      { label: "CPU", value: "AMD Ryzen 9 7950X" },
      { label: "RAM", value: "64GB DDR5" },
      { label: "GPU", value: "RTX 5080 16GB" },
      { label: "SSD", value: "2TB NVMe" },
    ]
  },
  {
    name: "Ultra Extreme",
    image: "https://cdn.digital-razor.ru/MxJEqy3EUjVMvuqXLNb2tvNvPgk=/fit-in/680x680/filters:format(webp)/files/upload/iblock/67a/67a7bd29bf6d84425ade4e90b6b52198.png",
    desc: "Максимальная производительность без компромиссов",
    price: "299 900 ₽",
    featured: false,
    badge: "Топ конфиг",
    specs: [
      { label: "CPU", value: "Intel i9-14900K" },
      { label: "RAM", value: "128GB DDR5" },
      { label: "GPU", value: "RTX 5090 24GB" },
      { label: "SSD", value: "4TB NVMe" },
    ]
  }
];

// ===== ДАННЫЕ: ТАРИФЫ =====
const pricingPlans = [
  {
    name: "Базовый",
    price: "990 ₽",
    period: "в месяц",
    best: false,
    label: null,
    features: [
      "Диагностика 1 раз в месяц",
      "Консультации онлайн",
      "Чистка от пыли раз в год",
      "Email-поддержка",
      "Отчёт о состоянии ПК",
    ]
  },
  {
    name: "Стандарт",
    price: "2 490 ₽",
    period: "в месяц",
    best: true,
    label: "Популярный",
    features: [
      "Диагностика 2 раза в месяц",
      "Приоритетная поддержка",
      "Чистка + замена термопасты",
      "Выезд мастера 1 раз",
      "Установка обновлений ПО",
    ]
  },
  {
    name: "Бизнес",
    price: "6 990 ₽",
    period: "в месяц",
    best: false,
    label: null,
    features: [
      "Неограниченная диагностика",
      "Поддержка 24/7",
      "Выезды без ограничений",
      "Скидка 15% на запчасти",
      "Резервное копирование данных",
    ]
  },
  {
    name: "Корпоратив",
    price: "19 990 ₽",
    period: "в месяц",
    best: false,
    label: "Для компаний",
    features: [
      "Обслуживание до 20 ПК",
      "Выделенный менеджер",
      "SLA — ответ за 2 часа",
      "Скидка 25% на запчасти",
      "Ежемесячный аудит парка",
    ]
  }
];

// ===== РЕНДЕР КАРТОЧЕК СБОРОК =====
function renderBuilds() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;

  builds.forEach(build => {
    const card = document.createElement("div");
    card.className = "build-card" + (build.featured ? " featured" : "");

    const specsHTML = build.specs
      .map(s => `<div class="spec-row"><span>${s.label}</span><span>${s.value}</span></div>`)
      .join("");

    const imageHTML = build.image 
      ? `<img src="${build.image}" alt="${build.name}" class="build-card__image">`
      : `<div class="build-card__emoji">${build.emoji}</div>`; // fallback на эмодзи если фото нет

    card.innerHTML = `
      ${build.badge ? `<div class="build-card__badge">${build.badge}</div>` : ""}
      ${imageHTML}  <!-- ← ФОТО ВСТАВЛЯЕТСЯ СЮДА -->
      <div class="build-card__body">
        <div class="build-card__name">${build.name}</div>
        <div class="build-card__desc">${build.desc}</div>
        <div class="build-card__specs">${specsHTML}</div>
        <div class="build-card__price">${build.price}</div>
        <button class="btn btn--primary" style="width:100%" onclick="handleOrder('${build.name}')">Заказать</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ===== РЕНДЕР ТАРИФОВ =====
function renderPricing() {
  const grid = document.getElementById("pricingGrid");
  if (!grid) return;

  pricingPlans.forEach(plan => {
    const card = document.createElement("div");
    card.className = "price-card" + (plan.best ? " best" : "");

    const featuresHTML = plan.features.map(f => `<li>${f}</li>`).join("");

    card.innerHTML = `
      ${plan.label ? `<div class="price-card__label">${plan.label}</div>` : ""}
      <div class="price-card__name">${plan.name}</div>
      <div class="price-card__price">${plan.price}</div>
      <div class="price-card__period">${plan.period}</div>
      <ul class="price-card__features">${featuresHTML}</ul>
      <button class="btn btn--${plan.best ? 'primary' : 'outline'}" style="width:100%" onclick="handleOrder('Тариф: ${plan.name}')">Выбрать план</button>
    `;

    grid.appendChild(card);
  });
}

// ===== ОБРАБОТКА КНОПКИ "ЗАКАЗАТЬ" =====
function handleOrder(name) {
  const section = document.getElementById("contact");
  if (section) section.scrollIntoView({ behavior: "smooth" });

  const msgField = document.getElementById("message");
  if (msgField) {
    msgField.value = `Хочу заказать: ${name}`;
    msgField.focus();
  }
}

// ===== ФОРМА ОБРАТНОЙ СВЯЗИ =====
function initForm() {
  const btn = document.getElementById("submitBtn");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const name    = document.getElementById("name").value.trim();
    const phone   = document.getElementById("phone").value.trim();
    const msgEl   = document.getElementById("formMsg");

    if (!name || !phone) {
      msgEl.textContent = "Пожалуйста, заполните имя и телефон.";
      msgEl.className = "form__msg error";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Отправляем...";

    setTimeout(() => {
      msgEl.textContent = "Заявка принята! Свяжемся с вами в ближайшее время.";
      msgEl.className = "form__msg success";
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
      btn.disabled = false;
      btn.textContent = "Отправить заявку";
    }, 1000);
  });
}

// ===== БУРГЕР-МЕНЮ =====
function initBurger() {
  const burger = document.getElementById("burger");
  const nav    = document.getElementById("nav");
  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    nav.classList.toggle("open");
  });

  nav.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      nav.classList.remove("open");
    });
  });
}

// ===== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ =====
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav__link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.id;
    });
    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
  });
}

// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ =====
function initScrollAnimation() {
  const items = document.querySelectorAll(".service-card, .build-card, .price-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = entry.target.classList.contains("best")
          ? "translateY(-6px)"
          : "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(16px)";
    item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    observer.observe(item);
  });
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener("DOMContentLoaded", function () {
  renderBuilds();
  renderPricing();
  initForm();
  initBurger();
  initScrollSpy();
  setTimeout(initScrollAnimation, 100);
});
