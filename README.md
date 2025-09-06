A full-stack Angular 20 SSR application for exploring and managing music data, integrated with MusicBrainz API. The app demonstrates modern Angular practices such as Signals, Interceptors, Server-Side Rendering (SSR), State Management, and Token-based Authentication.

🚀 Features

🔎 Search & Browse Music – fetch artists, albums, and tracks from the MusicBrainz API

👤 Authentication System – JWT token storage with SSR-safe cookies

🔄 Global State Management – orchestrated via a custom RootStore

🌐 SSR (Server-Side Rendering) – improved SEO and faster first load

🍪 Cookie Management Service – universal cookie handling for both browser and server

🔐 Auth Interceptor – automatically injects tokens into request headers (works in browser & SSR)

🎨 TailwindCSS Integration – responsive and modern UI styling



🛠️ Tech Stack

Frontend: Angular 20, TypeScript, RxJS, Angular Signals

SSR: Angular Universal with Express

API: MusicBrainz REST API

State: RootStore + Signals

Auth: JWT + Cookie Service + Interceptor

⚡ Getting Started
1️⃣ Install Dependencies
npm install

2️⃣ Run in Development Mode
npm run dev:ssr

3️⃣ Build & Run Production
npm run build:ssr
npm run serve:ssr
