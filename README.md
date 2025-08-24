# ⚡ РОФЛОБАНК - СИСТЕМА УПРАВЛЕНИЯ ЛИРАМИ ⚡

Рофлобанк - это настольное приложение в стиле "The New Order: Last Days of Europe", построенное на Electron и React, которое обеспечивает систему виртуальной валюты для покупки проектов.

## 📦 Возможности

- **Система виртуальной валюты**: Использует ЛИРЫ как виртуальную валюту
- **Каталог проектов**: Просмотр и покупка различных проектов
- **Центр управления**: Просмотр статистики аккаунта и последних покупок
- **История операций**: Отслеживание всех покупок и депозитов
- **Профиль пользователя**: Управление настройками аккаунта и просмотр достижений
- **Тёмный интерфейс TNO**: Мрачный, брутальный дизайн в стиле холодной войны
- **Кириллический интерфейс**: Полная локализация на русский язык

## 🚀 Getting Started

### Running the Application

The built executable is located in:
```
build/win-unpacked/RofloBank.exe
```

Simply double-click the executable to run the application.

### Настройки пользователя по умолчанию
- Начальный баланс: 1000 ЛИРОВ
- Имя пользователя: ОПЕРАТОР-001 (редактируется)

## 🎮 Доступные проекты

Приложение поставляется с образцами проектов:

1. **ОПЕРАЦИОННАЯ СИСТЕМА ОРДО-66** (150 ЛИР) - Автономная система управления ресурсами
2. **КОММУНИКАТОР ТНО-11** (75 ЛИР) - Система защищённой связи и передачи данных  
3. **ПАКЕТ ИМИТАЦИЙ П-1962** (200 ЛИР) - Комплекс программ симуляции и обучения
4. **РЕДАКТОР ДОКУМЕНТОВ К-7** (100 ЛИР) - Профессиональная система обработки текстов

## 🛠️ Development

### Prerequisites
- Node.js (v16 or later)
- npm

### Building from Source

1. Install dependencies:
```bash
npm install
```

2. Build the React app:
```bash
npm run build
```

3. Run in development:
```bash
npm run electron-dev
```

4. Build executable:
```bash
npm run pack
```

### Project Structure
```
RofloBank/
├── src/                    # React application source
│   ├── components/         # React components
│   ├── App.tsx            # Main React app
│   ├── App.css            # Styling
│   └── index.tsx          # React entry point
├── main.js                # Electron main process
├── preload.js             # Electron preload script
├── build/                 # Built application
│   └── win-unpacked/      # Executable and dependencies
│       └── RofloBank.exe  # Main executable
└── package.json           # Project configuration
```

## 🎯 Features Overview

### Центр управления
- Отображение баланса ЛИРОВ
- Статистика владения проектами
- История последних покупок
- Кнопки быстрых действий

### Каталог проектов
- Просмотр проектов по категориям
- Функция поиска
- Покупка за ЛИРЫ
- Детали и цены проектов

### История операций
- Полный журнал транзакций
- Фильтр по типу операций
- Аналитика доходов/расходов
- Отслеживание статуса операций

### Профиль пользователя
- Управление информацией аккаунта
- Функция пополнения ЛИРОВ
- Прогрессия уровня аккаунта
- Система достижений

## 📱 Future Mobile Version (.apk)

This project is designed to be extensible to mobile platforms. For Android development:

1. Use React Native with similar components
2. Implement native mobile UI patterns
3. Add mobile-specific features like push notifications
4. Integrate with mobile payment systems

## 🔧 Технический стек

- **Фронтенд**: React + TypeScript
- **Десктоп**: Electron
- **Стилизация**: CSS3 с TNO-эстетикой тёмных тонов
- **Сборка**: Webpack + electron-builder
- **Архитектура**: Современный компонентный дизайн
- **Интерфейс**: Моноширинные шрифты, терминальная эстетика

## 📄 License

MIT License - Feel free to modify and distribute.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**РОФЛОБАНК** - Суровые валютные операции в мрачном мире! ⚡