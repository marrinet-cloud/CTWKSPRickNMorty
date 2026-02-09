Rick & Morty Character Explorer

React • Vite • React Router • REST API

A modern, production-ready React application that explores characters from the Rick & Morty universe.
Built to demonstrate real-world React patterns, clean architecture, and resilient UI design.

🔗 Live Demo: (add link when deployed)
📦 Tech Focus: React Hooks, Routing, Data Fetching, State Management, UX States

✨ Why This Project Exists

This project was built as a portfolio-quality React application, not just a tutorial demo.
It focuses on patterns you would use in a real production app:

Clear separation of pages vs reusable components

Robust handling of loading, error, empty, and 404 states

Thoughtful client-side filtering and pagination

Maintainable, readable code with modern React practices

🧠 What This Project Demonstrates
Frontend Engineering Skills

React Hooks (useState, useEffect, useMemo)

Client-side routing with React Router

REST API integration with async data fetching

Component-driven architecture

Controlled inputs and derived state

Persistent UI state with localStorage

UI / UX Considerations

Responsive card-based layout

Clear feedback during loading and error states

Accessible form controls (search & filters)

Predictable navigation and back links

Graceful handling of missing or invalid data

🚀 Features

📃 Character Catalog

Image, name, status, and species cards

🔍 Search

Client-side name filtering

🎛 Filters

Status (Alive / Dead / Unknown)

Species (dynamically generated)

📄 Character Details

Dynamic route: /characters/:id

Extended metadata (origin, location, episodes)

🔄 Pagination

Next / Previous using API metadata

💾 Persistent State

Search, filters, and page saved in localStorage

🚧 Resilient UX

Loading, error, empty, and 404 states

🧰 Tech Stack
Technology	Purpose
React	UI framework
Vite	Development server & bundler
React Router DOM	Client-side routing
Rick & Morty API	External REST API
CSS	Custom styling (no UI library)
🌐 API Integration

Public Rick & Morty API

Base URL:
https://rickandmortyapi.com/api

Endpoints:

/character?page=

/character/:id

No API key required

📁 Project Structure
src/
  components/
    CharacterCard.jsx     # Reusable UI component
  pages/
    Characters.jsx        # List + filters + pagination
    CharacterDetails.jsx  # Dynamic detail page
    NotFound.jsx          # 404 fallback
  App.jsx                 # Route configuration
  main.jsx                # App bootstrap
  style.css               # Global styles

This structure mirrors how real production React apps are organized.

⚙️ Getting Started
Prerequisites

Node.js 18 or 20 (LTS recommended)

npm

⚠️ Node 24 may cause issues with Vite on Windows.

Installation
npm create vite@latest rnm-explorer -- --template react
cd rnm-explorer
npm install
npm install react-router-dom
Run Locally
npm run dev

Open:
👉 http://localhost:5173

🧪 Windows Notes

Avoid & in folder names (CMD breaks npm scripts)

Recommended path:

C:\dev\rnm-explorer

If dependencies break:

rmdir /s /q node_modules
del package-lock.json
npm install
📈 Future Enhancements

Planned or easily extensible improvements:

Server-side search using ?name= query

API response caching

Debounced search input

Dark mode toggle

Unit tests with Vitest

Deployment to Vercel or Netlify
🏁 Summary

This project showcases how to:

Build a clean, maintainable React app

Work with real APIs

Design resilient user experiences

Write code suitable for production, not just demos

If you’re reviewing this as part of my portfolio — thank you for taking the time 🙌
