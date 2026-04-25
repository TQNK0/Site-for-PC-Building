const categoryLabels = {
  "Все":  null,
  "CPU":  "CPU",
  "GPU":  "GPU",
  "RAM":  "RAM",
  "SSD":  "SSD",
  "PSU":  "PSU",
  "CASE": "CASE",
};

let activeFilter = "Все";
let searchQuery  = "";

function renderFilters() {
  const wrap = document.getElementById("catFilters");
  if (!wrap) return;
  Object.keys(categoryLabels).forEach(label => {
    const btn = document.createElement("button");
    btn.className = "cat-filter-btn" + (label === activeFilter ? " active" : "");
    btn.textContent = label;
    btn.addEventListener("click", () => {
      activeFilter = label;
      document.querySelectorAll(".cat-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderItems();
    });
    wrap.appendChild(btn);
  });
}

function getFiltered() {
  return components.filter(item => {
    const matchCat    = activeFilter === "Все" || item.category === categoryLabels[activeFilter];
    const matchSearch = item.name.toLowerCase().includes(searchQuery) ||
                        item.desc.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

function renderItems() {
  const grid  = document.getElementById("catGrid");
  const empty = document.getElementById("catEmpty");
  const count = document.getElementById("catCount");
  if (!grid) return;

  grid.innerHTML = "";
  const filtered = getFiltered();
  count.innerHTML = `Показано: <span>${filtered.length}</span> из ${components.length} товаров`;

  if (filtered.length === 0) { empty.style.display = "block"; return; }
  empty.style.display = "none";

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";

    const specsHTML = item.specs
      .map(s => `<div class="item-card__spec"><span>${s.label}</span><span>${s.value}</span></div>`)
      .join("");

    const imgHTML = item.image && (item.image.startsWith("http") || item.image.startsWith("img"))
      ? `<img src="${item.image}" alt="${item.name}" class="item-card__img" loading="lazy" />`
      : `<div class="item-card__placeholder">Фото готовится</div>`;

    const safeName = item.name.replace(/'/g, "\\'");

    card.innerHTML = `
      <div class="item-card__img-wrap">
        ${imgHTML}
        <div class="item-card__category">${item.category}</div>
        ${item.badge ? `<div class="item-card__badge">${item.badge}</div>` : ""}
      </div>
      <div class="item-card__body">
        <div class="item-card__name">${item.name}</div>
        <div class="item-card__desc">${item.desc}</div>
        <div class="item-card__specs">${specsHTML}</div>
        <div class="item-card__footer">
          <div class="item-card__price">${item.price}</div>
          <button class="btn btn--primary item-card__btn" onclick="addToOrder('${safeName}')">В заявку</button>
        </div>
      </div>`;

    card.style.opacity = "0";
    card.style.transform = "translateY(16px)";
    grid.appendChild(card);
    requestAnimationFrame(() => {
      card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  });
}

function addToOrder(name) {
  sessionStorage.setItem("orderItem", name);
  window.location.href = "index.html#contact";
}

function initSearch() {
  const input = document.getElementById("catSearch");
  if (!input) return;
  input.addEventListener("input", () => {
    searchQuery = input.value.toLowerCase().trim();
    renderItems();
  });
}

function initBurger() {
  const burger = document.getElementById("burger");
  const nav    = document.getElementById("nav");
  if (!burger || !nav) return;
  burger.addEventListener("click", () => { burger.classList.toggle("open"); nav.classList.toggle("open"); });
  nav.querySelectorAll(".nav__link").forEach(l => l.addEventListener("click", () => { burger.classList.remove("open"); nav.classList.remove("open"); }));
}

function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;
  window.addEventListener("scroll", () => btn.classList.toggle("visible", window.scrollY > 400));
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

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

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderItems();
  initSearch();
  initBurger();
  initScrollTop();
  initThemeToggle();
});