# Документация проекта BOTANICA

## Обзор проекта

**BOTANICA** — это современный интернет-магазин растений, построенный на Next.js 15 с использованием TypeScript и Tailwind CSS. Приложение предоставляет минималистичный и элегантный интерфейс для просмотра, фильтрации и покупки комнатных растений.

### Технологический стек

- **Framework**: Next.js 15 (App Router)
- **Язык**: TypeScript
- **Стилизация**: Tailwind CSS
- **Управление состоянием**: React Context API
- **Хранение данных**: localStorage (для корзины)
- **Изображения**: Next.js Image с оптимизацией

---

## Структура проекта

```
next-js/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Корневой layout с провайдерами
│   ├── page.tsx             # Главная страница (каталог)
│   ├── checkout/
│   │   └── page.tsx         # Страница оформления заказа
│   └── globals.css          # Глобальные стили
├── components/              # React компоненты
│   ├── Cart.tsx            # Боковая панель корзины
│   ├── Header.tsx          # Шапка сайта
│   ├── PlantCard.tsx       # Карточка растения
│   └── PlantDetails.tsx    # Модальное окно с деталями
├── context/                 # React Context
│   └── CartContext.tsx     # Контекст корзины покупок
├── data/                    # Данные приложения
│   └── plants.ts           # База данных растений
├── types/                   # TypeScript типы
│   └── plant.ts            # Интерфейсы Plant и CartItem
└── public/                  # Статические файлы
```

---

## Архитектура приложения

### 1. Типы данных (`types/plant.ts`)

#### `Plant` Interface
Определяет структуру данных для растения:

```typescript
interface Plant {
  id: number;              // Уникальный идентификатор
  name: string;            // Название на русском
  latinName: string;       // Латинское название
  price: number;           // Цена в MDL
  image: string;           // URL изображения
  description: string;     // Описание растения
  care: string;            // Инструкции по уходу
  light: 'low' | 'medium' | 'high';    // Требования к освещению
  water: 'low' | 'medium' | 'high';    // Требования к поливу
  category: 'indoor' | 'outdoor' | 'succulent' | 'tropical';
}
```

#### `CartItem` Interface
Расширяет `Plant` добавлением количества:

```typescript
interface CartItem extends Plant {
  quantity: number;        // Количество в корзине
}
```

---

### 2. Управление состоянием (`context/CartContext.tsx`)

#### CartContext API

**Провайдер**: `CartProvider`
- Оборачивает всё приложение в `app/layout.tsx`
- Управляет состоянием корзины
- Синхронизирует с localStorage

**Хук**: `useCart()`
Возвращает объект с методами и данными:

```typescript
{
  cart: CartItem[];                    // Массив товаров в корзине
  addToCart: (plant: Plant) => void;   // Добавить растение
  removeFromCart: (id: number) => void; // Удалить по ID
  updateQuantity: (id: number, quantity: number) => void; // Изменить количество
  clearCart: () => void;               // Очистить корзину
  totalItems: number;                  // Общее количество товаров
  totalPrice: number;                  // Общая сумма в MDL
}
```

#### Логика работы

1. **Инициализация**: При монтировании загружает корзину из `localStorage`
2. **Добавление товара**: 
   - Если товар уже есть → увеличивает количество
   - Если новый → добавляет с quantity = 1
3. **Обновление количества**: 
   - Если quantity ≤ 0 → удаляет товар
   - Иначе → обновляет количество
4. **Автосохранение**: При каждом изменении сохраняет в `localStorage` с ключом `'botanica-cart'`

---

### 3. База данных растений (`data/plants.ts`)

Экспортирует массив `plants: Plant[]` с 28 растениями.

#### Категории растений:
- **indoor** (8 растений): Общие комнатные растения
- **tropical** (9 растений): Тропические растения, требующие влажности
- **succulent** (8 растений): Суккуленты и кактусы
- **outdoor** (0 растений): Пока не используется

#### Примеры данных:

```typescript
{
  id: 1,
  name: 'Monstera',
  latinName: 'Monstera deliciosa',
  price: 450,
  image: 'https://images.unsplash.com/...',
  description: 'Тропическое растение с большими резными листьями...',
  care: 'Поливайте раз в неделю, протирайте листья...',
  light: 'medium',
  water: 'medium',
  category: 'tropical'
}
```

---

## Компоненты

### 1. Layout (`app/layout.tsx`)

**Назначение**: Корневой layout приложения

**Функции**:
- Настройка HTML структуры
- Подключение шрифтов Google (Geist Sans, Geist Mono)
- SEO метаданные
- Обёртка `CartProvider` для глобального доступа к корзине

**Метаданные**:
```typescript
title: "BOTANICA — Магазин растений"
description: "Минималистичный магазин комнатных растений"
```

---

### 2. Главная страница (`app/page.tsx`)

**Назначение**: Каталог растений с фильтрацией и сортировкой

#### Состояние компонента:
```typescript
const [isCartOpen, setIsCartOpen] = useState(false);
const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
const [sortBy, setSortBy] = useState<SortOption>('default');
const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
```

#### Опции сортировки:
- `default`: Исходный порядок
- `price-asc`: По возрастанию цены
- `price-desc`: По убыванию цены
- `name`: По алфавиту

#### Опции фильтрации:
- `all`: Все растения
- `indoor`: Комнатные
- `tropical`: Тропические
- `succulent`: Суккуленты

#### Оптимизация:
Использует `useMemo` для фильтрации и сортировки — пересчитывает только при изменении `sortBy` или `filterCategory`.

#### Структура UI:
1. **Header**: Логотип + кнопка корзины
2. **Фильтры**: Кнопки категорий + dropdown сортировки
3. **Grid**: Responsive сетка карточек (1-4 колонки)
4. **Модальные окна**: Cart (sidebar) и PlantDetails (modal)

---

### 3. Header (`components/Header.tsx`)

**Назначение**: Шапка сайта

**Элементы**:
- Логотип "BOTANICA" (font-light, tracking-wide)
- Кнопка корзины с иконкой
- Badge с количеством товаров (если > 0)

**Стили**:
- Sticky позиционирование (остаётся при скролле)
- Backdrop blur эффект
- Hover эффекты на кнопке

**Props**:
```typescript
interface HeaderProps {
  onCartClick: () => void;  // Callback для открытия корзины
}
```

---

### 4. PlantCard (`components/PlantCard.tsx`)

**Назначение**: Карточка растения в каталоге

**Структура**:
1. **Изображение**: 
   - Квадратный aspect ratio
   - Hover эффект (scale 105%)
   - Клик открывает детали
2. **Информация**:
   - Название и латинское название
   - Краткое описание (2 строки max)
   - Цена в MDL
3. **Кнопка**: "Добавить в корзину"

**Props**:
```typescript
interface PlantCardProps {
  plant: Plant;
  onDetailsClick: (plant: Plant) => void;
}
```

**Интерактивность**:
- Hover: тень и увеличение изображения
- Клик на изображение → открывает PlantDetails
- Клик на кнопку → добавляет в корзину

---

### 5. PlantDetails (`components/PlantDetails.tsx`)

**Назначение**: Модальное окно с полной информацией о растении

**Структура**:
1. **Backdrop**: Полупрозрачный фон (клик закрывает)
2. **Modal**: Центрированное окно
3. **Содержимое**:
   - Большое изображение (aspect-video)
   - Название + латинское название
   - Полное описание
   - Требования (освещение, полив)
   - Инструкции по уходу
   - Цена + кнопка "Добавить в корзину"

**Поведение**:
- Если `plant === null` → не рендерится
- Кнопка "Добавить" → добавляет в корзину и закрывает modal
- Кнопка X или клик на backdrop → закрывает modal

**Responsive**:
- Mobile: Full-screen modal
- Desktop: Центрированное окно (max-width: 2xl)

---

### 6. Cart (`components/Cart.tsx`)

**Назначение**: Боковая панель корзины покупок

**Структура**:
1. **Header**: Заголовок "Коș" + кнопка закрытия
2. **Список товаров** (scrollable):
   - Изображение товара
   - Название + цена
   - Контролы количества (+/-)
   - Кнопка удаления (X)
3. **Footer**:
   - Общая сумма
   - Кнопка "Finalizează comanda"
   - Кнопка "Golește coșul"

**Состояния**:
- Пустая корзина: Показывает "Coșul este gol"
- С товарами: Показывает список + footer

**Функции**:
```typescript
const handleCheckout = () => {
  onClose();                    // Закрывает sidebar
  router.push('/checkout');     // Переходит на checkout
};
```

**Props**:
```typescript
interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}
```

---

### 7. Страница Checkout (`app/checkout/page.tsx`)

**Назначение**: Оформление заказа

#### Состояние формы:
```typescript
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  comment: ''
});
```

#### Структура страницы:

**1. Header**: Кнопка "Înapoi la magazin"

**2. Двухколоночный layout**:

**Левая колонка - Форма**:
- Имя и Фамилия (grid 2 колонки)
- Email (required)
- Телефон (required, placeholder: "+373 (__) ___-___")
- Адрес доставки (required)
- Город и Почтовый индекс (grid 2 колонки)
- Комментарий (textarea, optional)
- Кнопка submit: "Plasează comanda pentru {totalPrice} MDL"

**Правая колонка - Сводка заказа**:
- Список товаров с изображениями
- Количество × Цена для каждого
- Подытог
- Доставка (Бесплатная)
- Итого

#### Логика:

**Проверка пустой корзины**:
```typescript
if (cart.length === 0) {
  return <EmptyCartMessage />;
}
```

**Обработка отправки**:
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  alert('Comanda a fost plasată! Vă mulțumim pentru achiziție.');
  clearCart();
  router.push('/');
};
```

**Валидация**: HTML5 валидация через атрибут `required`

---

## Стилизация

### Дизайн система

**Цветовая палитра**:
- Основной: `black` (кнопки, текст)
- Фон: `zinc-50` (светло-серый)
- Границы: `zinc-200`, `zinc-300`
- Текст: `zinc-600`, `zinc-700`
- Hover: `zinc-800`, `zinc-100`

**Типографика**:
- Заголовки: `font-light` (тонкий шрифт)
- Основной текст: `font-medium`
- Латинские названия: `italic`

**Компоненты**:
- Кнопки: `rounded-full` (полностью скруглённые)
- Карточки: `rounded-lg` (слегка скруглённые)
- Тени: `shadow-sm`, `shadow-lg`, `shadow-2xl`

**Эффекты**:
- Backdrop blur: `backdrop-blur-md`
- Transitions: `transition-colors`, `transition-transform`
- Hover: `hover:scale-105`, `hover:bg-zinc-800`

### Responsive дизайн

**Breakpoints**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Grid системы**:
- Каталог: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Checkout: `lg:grid-cols-2`
- Форма: `grid-cols-2` (для имени/фамилии, города/индекса)

---

## Потоки пользователя

### 1. Просмотр каталога
```
Главная страница
  ↓
Фильтрация по категории (опционально)
  ↓
Сортировка (опционально)
  ↓
Просмотр карточек растений
```

### 2. Просмотр деталей
```
Клик на изображение растения
  ↓
Открывается PlantDetails modal
  ↓
Просмотр полной информации
  ↓
[Добавить в корзину] или [Закрыть]
```

### 3. Добавление в корзину
```
Клик "Добавить в корзину"
  ↓
Товар добавляется в cart (Context)
  ↓
Badge на иконке корзины обновляется
  ↓
Данные сохраняются в localStorage
```

### 4. Управление корзиной
```
Клик на иконку корзины
  ↓
Открывается Cart sidebar
  ↓
Изменение количества (+/-)
  ↓
Удаление товаров (X)
  ↓
[Finalizează comanda] или [Golește coșul]
```

### 5. Оформление заказа
```
Клик "Finalizează comanda"
  ↓
Переход на /checkout
  ↓
Заполнение формы
  ↓
Submit формы
  ↓
Alert с подтверждением
  ↓
Очистка корзины
  ↓
Редирект на главную
```

---

## Особенности реализации

### 1. Оптимизация производительности

**useMemo для фильтрации**:
```typescript
const filteredAndSortedPlants = useMemo(() => {
  // Фильтрация и сортировка
}, [sortBy, filterCategory]);
```
Пересчитывается только при изменении зависимостей.

**Next.js Image**:
- Автоматическая оптимизация изображений
- Lazy loading
- Responsive images

### 2. Персистентность данных

**localStorage**:
- Ключ: `'botanica-cart'`
- Формат: JSON
- Автосохранение при каждом изменении
- Загрузка при инициализации

**Защита от гонки**:
```typescript
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  // Загрузка из localStorage
  setIsLoaded(true);
}, []);

useEffect(() => {
  if (isLoaded) {
    // Сохранение в localStorage
  }
}, [cart, isLoaded]);
```

### 3. Типобезопасность

**Строгие типы**:
- Все компоненты типизированы
- Props интерфейсы для каждого компонента
- Enum-подобные типы для категорий и опций

**Type guards**:
```typescript
if (!context) throw new Error('useCart must be used within CartProvider');
```

### 4. Accessibility

**ARIA labels**:
```typescript
aria-label="Închide coșul de cumpărături"
aria-label="Deschide detaliile"
```

**Semantic HTML**:
- `<header>`, `<main>`, `<button>`
- Правильная структура заголовков

**Keyboard navigation**:
- Все интерактивные элементы доступны с клавиатуры
- Focus states

---

## Конфигурация

### next.config.ts

```typescript
const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'encrypted-tbn0.gstatic.com', 'i.pinimg.com'],
  },
};
```

Разрешает загрузку изображений с внешних доменов.

### tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Настройка алиасов для импортов (`@/components`, `@/context`, и т.д.).

### Tailwind CSS

**Конфигурация**: `postcss.config.mjs`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## Зависимости

### Основные (dependencies)

```json
{
  "next": "15.1.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

### Dev зависимости (devDependencies)

```json
{
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "postcss": "^8",
  "tailwindcss": "^3.4.1",
  "eslint": "^9",
  "eslint-config-next": "15.1.6"
}
```

---

## Скрипты

```json
{
  "dev": "next dev",           // Запуск dev сервера (http://localhost:3000)
  "build": "next build",       // Production build
  "start": "next start",       // Запуск production сервера
  "lint": "next lint"          // ESLint проверка
}
```

**Использование**:
```bash
npm run dev      # Разработка
npm run build    # Сборка
npm run start    # Production
npm run lint     # Проверка кода
```

---

## Возможные улучшения

### Функциональность
1. **Backend интеграция**:
   - API для растений
   - Реальная обработка заказов
   - База данных

2. **Аутентификация**:
   - Регистрация/вход
   - История заказов
   - Избранное

3. **Поиск**:
   - Поиск по названию
   - Фильтры по цене
   - Фильтры по требованиям (свет, вода)

4. **Корзина**:
   - Сохранение на сервере
   - Промокоды
   - Расчёт доставки

### UX/UI
1. **Анимации**:
   - Framer Motion для плавных переходов
   - Skeleton loaders

2. **Уведомления**:
   - Toast notifications вместо alert()
   - Подтверждения действий

3. **Изображения**:
   - Галерея для каждого растения
   - Zoom на изображениях

### Производительность
1. **Кэширование**:
   - React Query для данных
   - Service Worker

2. **Оптимизация**:
   - Code splitting
   - Dynamic imports

### SEO
1. **Метаданные**:
   - Динамические meta tags
   - Open Graph
   - Structured data

2. **Страницы**:
   - Отдельные страницы для растений
   - Sitemap
   - robots.txt

---

## Заключение

BOTANICA — это полнофункциональный e-commerce проект, демонстрирующий современные практики разработки на Next.js:

✅ **Современный стек**: Next.js 15, TypeScript, Tailwind CSS
✅ **Чистая архитектура**: Разделение на компоненты, контексты, типы
✅ **Типобезопасность**: Полная типизация TypeScript
✅ **Responsive дизайн**: Адаптивность на всех устройствах
✅ **Оптимизация**: useMemo, Next.js Image, code organization
✅ **UX**: Интуитивный интерфейс, плавные переходы
✅ **Персистентность**: localStorage для корзины

Проект готов к расширению и может служить основой для реального интернет-магазина.
