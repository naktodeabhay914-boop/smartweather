# Skycast

A beautiful, responsive weather dashboard built with React, TypeScript, Vite, and Tailwind CSS. Search any city worldwide, view current conditions, hourly and 7-day forecasts, and save your favorite locations.

## Features

- **City search** — autocomplete search powered by the Open-Meteo geocoding API
- **Geolocation** — detect your current location with one click
- **Current conditions** — temperature, feels-like, humidity, wind, pressure, visibility, and UV index
- **Hourly forecast** — next 24 hours with temperature, weather icon, and precipitation chance
- **7-day forecast** — daily highs/lows, weather, and precipitation probability
- **Sunrise & sunset** — visual sun arc showing the sun's position throughout the day
- **Favorites & recents** — save favorite locations and quickly revisit recent searches
- **Metric / imperial units** — toggle between °C/km/h and °F/mph
- **Dark / light theme** — persisted across sessions
- **Dynamic backgrounds** — gradient changes based on weather and time of day
- **Auto-refresh** — weather data updates every 10 minutes

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Lucide React](https://lucide.dev/) — icons
- [Open-Meteo API](https://open-meteo.com/) — weather and geocoding data (free, no API key required)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/        # UI components
│   ├── Collections.tsx      # Favorites & recent locations
│   ├── CurrentWeather.tsx   # Current conditions card
│   ├── DailyForecast.tsx    # 7-day forecast
│   ├── HourlyForecast.tsx   # 24-hour forecast
│   ├── SearchBar.tsx        # City search with autocomplete
│   ├── States.tsx           # Loading & error states
│   ├── SunArc.tsx           # Sunrise/sunset visualization
│   ├── WeatherDetails.tsx   # Humidity, wind, pressure, etc.
│   └── WeatherIcon.tsx      # Weather code to icon mapping
├── hooks/             # Custom React hooks
│   ├── useClock.ts
│   ├── useCollections.ts
│   ├── useTheme.ts
│   └── useWeather.ts
├── lib/               # Utilities and API logic
│   ├── format.ts
│   ├── storage.ts
│   ├── weatherApi.ts
│   └── weatherCodes.ts
├── types.ts           # TypeScript type definitions
├── App.tsx            # Root component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## Data Source

Weather data is provided by [Open-Meteo](https://open-meteo.com/), a free open-source weather API that requires no API key or registration.

## License

This project is private and unlicensed.
