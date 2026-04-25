const components = [

  // --- ПРОЦЕССОРЫ ---
  {
    category: "CPU",
    name: "Intel Core i9-14900K",
    desc: "Флагманский процессор для игр и стриминга",
    price: "42 900 ₽",
    badge: "Топ",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Ядра / потоки", value: "24 / 32" },
      { label: "Частота", value: "до 6.0 ГГц" },
      { label: "TDP", value: "125 Вт" },
    ]
  },
  {
    category: "CPU",
    name: "AMD Ryzen 9 7950X",
    desc: "Лучший выбор для рендеринга и многозадачности",
    price: "38 500 ₽",
    badge: null,
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Ядра / потоки", value: "16 / 32" },
      { label: "Частота", value: "до 5.7 ГГц" },
      { label: "TDP", value: "170 Вт" },
    ]
  },
  {
    category: "CPU",
    name: "Intel Core i5-14600K",
    desc: "Оптимальный процессор для игрового ПК",
    price: "18 900 ₽",
    badge: "Хит",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Ядра / потоки", value: "14 / 20" },
      { label: "Частота", value: "до 5.1 ГГц" },
      { label: "TDP", value: "125 Вт" },
    ]
  },
  {
    category: "CPU",
    name: "AMD Ryzen 5 7600X",
    desc: "Бюджетный процессор с отличной производительностью",
    price: "14 200 ₽",
    badge: null,
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Ядра / потоки", value: "6 / 12" },
      { label: "Частота", value: "до 5.3 ГГц" },
      { label: "TDP", value: "105 Вт" },
    ]
  },

  // --- ВИДЕОКАРТЫ ---
  {
    category: "GPU",
    name: "ASUS GeForce RTX 5090 ROG Astral OC Edition",
    desc: "Абсолютный флагман для 4K и трассировки лучей",
    price: "473 999 ₽",
    badge: "Новинка",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Память", value: "24 GB GDDR7" },
      { label: "Шина", value: "384 бит" },
      { label: "TDP", value: "575 Вт" },
    ]
  },
  {
    category: "GPU",
    name: "MSI GeForce RTX 5080 GAMING TRIO OC",
    desc: "Топовая карта для игр в 4K на высоких настройках",
    price: "109 000 ₽",
    badge: "Топ",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Память", value: "16 GB GDDR7" },
      { label: "Шина", value: "256 бит" },
      { label: "TDP", value: "360 Вт" },
    ]
  },
  {
    category: "GPU",
    name: "ASUS GeForce RTX 5070 PRIME OC Edition",
    desc: "Отличный баланс цены и производительности",
    price: "62 000 ₽",
    badge: "Хит",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Память", value: "12 GB GDDR7" },
      { label: "Шина", value: "192 бит" },
      { label: "TDP", value: "250 Вт" },
    ]
  },
  {
    category: "GPU",
    name: "Sapphire AMD Radeon RX 7800 XT NITRO+",
    desc: "Мощная карта AMD для игр в 1440p",
    price: "44 900 ₽",
    badge: null,
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Память", value: "16 GB GDDR6" },
      { label: "Шина", value: "256 бит" },
      { label: "TDP", value: "263 Вт" },
    ]
  },

  // --- ОПЕРАТИВНАЯ ПАМЯТЬ ---
  {
    category: "RAM",
    name: "Kingston Fury Beast DDR5",
    desc: "Высокоскоростная DDR5 память для новых платформ",
    price: "8 900 ₽",
    badge: "Хит",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Объём", value: "32 GB (2×16)" },
      { label: "Частота", value: "6000 МГц" },
      { label: "Тайминги", value: "CL36" },
    ]
  },
  {
    category: "RAM",
    name: "G.Skill Trident Z5 DDR5",
    desc: "RGB память премиум-класса с подсветкой",
    price: "12 400 ₽",
    badge: null,
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Объём", value: "64 GB (2×32)" },
      { label: "Частота", value: "6400 МГц" },
      { label: "Тайминги", value: "CL32" },
    ]
  },
  {
    category: "RAM",
    name: "Corsair Vengeance DDR4",
    desc: "Надёжная DDR4 память для платформ AM4 / LGA1700",
    price: "4 200 ₽",
    badge: null,
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Объём", value: "16 GB (2×8)" },
      { label: "Частота", value: "3200 МГц" },
      { label: "Тайминги", value: "CL16" },
    ]
  },

  // --- НАКОПИТЕЛИ ---
  {
    category: "SSD",
    name: "Samsung 990 Pro 2TB",
    desc: "Самый быстрый NVMe SSD для геймеров и профессионалов",
    price: "14 900 ₽",
    badge: "Топ",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Объём", value: "2 TB" },
      { label: "Чтение", value: "7450 МБ/с" },
      { label: "Запись", value: "6900 МБ/с" },
    ]
  },
  {
    category: "SSD",
    name: "WD Black SN850X 1TB",
    desc: "Игровой NVMe SSD с технологией Game Mode",
    price: "9 500 ₽",
    badge: "Хит",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Объём", value: "1 TB" },
      { label: "Чтение", value: "7300 МБ/с" },
      { label: "Запись", value: "6600 МБ/с" },
    ]
  },
  {
    category: "SSD",
    name: "Kingston NV3 500GB",
    desc: "Бюджетный NVMe SSD для системного диска",
    price: "3 200 ₽",
    badge: null,
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Объём", value: "500 GB" },
      { label: "Чтение", value: "3500 МБ/с" },
      { label: "Запись", value: "2100 МБ/с" },
    ]
  },

  // --- БЛОКИ ПИТАНИЯ ---
  {
    category: "PSU",
    name: "Corsair RM1000x 1000W",
    desc: "Модульный блок питания 80+ Gold для мощных сборок",
    price: "16 800 ₽",
    badge: null,
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Мощность", value: "1000 Вт" },
      { label: "Сертификат", value: "80+ Gold" },
      { label: "Кабели", value: "Модульные" },
    ]
  },
  {
    category: "PSU",
    name: "be quiet! Dark Power 850W",
    desc: "Тихий и надёжный блок питания Platinum",
    price: "14 200 ₽",
    badge: "Топ",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Мощность", value: "850 Вт" },
      { label: "Сертификат", value: "80+ Platinum" },
      { label: "Кабели", value: "Модульные" },
    ]
  },

  // --- КОРПУСА ---
  {
    category: "CASE",
    name: "Fractal Design Torrent",
    desc: "Просторный корпус с отличным охлаждением",
    price: "12 900 ₽",
    badge: "Хит",
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Форм-фактор", value: "ATX Mid Tower" },
      { label: "Вентиляторы", value: "3× 140 мм" },
      { label: "Длина GPU", value: "до 461 мм" },
    ]
  },
  {
    category: "CASE",
    name: "Lian Li PC-O11 Dynamic",
    desc: "Популярный корпус с двойной камерой и RGB",
    price: "10 400 ₽",
    badge: null,
    image: "ФОТО ГОТОВИТСЯ",
    specs: [
      { label: "Форм-фактор", value: "ATX Mid Tower" },
      { label: "Вентиляторы", value: "до 9 × 120 мм" },
      { label: "Длина GPU", value: "до 420 мм" },
    ]
  },
];