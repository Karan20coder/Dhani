<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,12,24&height=240&section=header&text=DHANI&fontSize=90&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=AI%20Investor%20Super%20App&descSize=24&descAlignY=58" alt="Dhani banner" width="100%"/>

<a href="https://readme-typing-svg.demolab.com">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1200&color=3B82F6&center=true&vCenter=true&width=760&lines=All+your+investments%2C+in+one+place+%F0%9F%93%8A;Go+beyond+stocks%3A+REITs%2C+InvITs+%26+Bonds+%F0%9F%8F%A2;Understand+risk+before+you+invest+%F0%9F%9B%A1%EF%B8%8F;Your+AI+financial+guide%2C+in+plain+language+%F0%9F%A4%96" alt="Typing animation" />
</a>

<br/><br/>

<a href="https://drive.google.com/drive/folders/15b35T0Iab4B-sHwG1jD_HD1FpjaszdtO?usp=sharing">
  <img src="https://img.shields.io/badge/%E2%96%B6%20%20WATCH%20THE%20DEMO%20VIDEO-3B82F6?style=for-the-badge&logo=googledrive&logoColor=white&labelColor=0B1220" alt="Watch the demo video" height="48"/>
</a>

<br/><br/>

![Status](https://img.shields.io/badge/status-hackathon_build-22C55E?style=for-the-badge&logo=rocket&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-3B82F6?style=for-the-badge&logo=opensourceinitiative&logoColor=white)
![Domain](https://img.shields.io/badge/domain-FinTech-F59E0B?style=for-the-badge&logo=cashapp&logoColor=white)
![AI](https://img.shields.io/badge/AI-Gemini_2.0_Flash-8B5CF6?style=for-the-badge&logo=googlegemini&logoColor=white)

<br/>

<a href="#-the-problem">🎯 Problem</a> •
<a href="#-the-solution">💡 Solution</a> •
<a href="#-features">✨ Features</a> •
<a href="#-how-it-works">🔄 How It Works</a> •
<a href="#-beyond-stocks">🧭 Beyond Stocks</a> •
<a href="#-architecture">🏗️ Architecture</a> •
<a href="#-quick-start">🚀 Quick Start</a>

</div>

<br/>

---

## 🎯 The Problem

> **Most retail investors in India hold only stocks.**
> Their holdings are scattered across brokers and depositories, and safer or income-generating options like **REITs, InvITs and Bonds** exist, but they stay away because they don't understand them.

<table>
<tr>
<td width="33%" align="center">

### 🗂️
**Scattered Holdings**

Stocks sit across multiple brokers and depositories (CDSL / NSDL). There is no single true picture of net worth.

</td>
<td width="33%" align="center">

### 🎢
**Stock Over-Concentration**

A portfolio that is 100% equity swings hard with the market, and most investors never notice the imbalance.

</td>
<td width="33%" align="center">

### 🤷
**Alternatives Feel Complex**

REITs, InvITs and bonds sound like jargon, so people skip them out of fear and confusion.

</td>
</tr>
</table>

---

## 💡 The Solution

**Dhani** is an **AI-powered investor super app** that does two things:

<table>
<tr>
<td width="50%" valign="top">

### 📊 1. Unified Portfolio Dashboard
Bring every holding into **one place**:
- 💰 Total portfolio value
- 🥧 Asset allocation
- 📈 Gains and losses
- 🏦 Holdings across multiple brokers and depositories

</td>
<td width="50%" valign="top">

### 🧭 2. Beyond Stocks Discovery
Teach and guide investors beyond equity:
- 📚 Plain-language explainers on REITs, InvITs and Bonds
- ⚠️ Honest risk and return transparency
- 🎯 Concentration check on the user's own portfolio
- 🤖 AI assistant to answer questions

</td>
</tr>
</table>

```mermaid
flowchart LR
    A["😕 Scattered holdings<br/>Multiple brokers"] --> B["📥 Dhani<br/>Import and consolidate"]
    B --> C["📊 One dashboard<br/>Value, allocation, P&L"]
    C --> D["🔍 Concentration<br/>check"]
    D --> E["🧭 Beyond Stocks<br/>REITs, InvITs, Bonds"]
    E --> F["😎 Confident,<br/>diversified investor"]

    classDef pain fill:#7f1d1d,stroke:#ef4444,color:#fff,stroke-width:2px
    classDef core fill:#1e3a8a,stroke:#3b82f6,color:#fff,stroke-width:2px
    classDef dash fill:#134e4a,stroke:#14b8a6,color:#fff,stroke-width:2px
    classDef check fill:#78350f,stroke:#f59e0b,color:#fff,stroke-width:2px
    classDef disc fill:#4c1d95,stroke:#8b5cf6,color:#fff,stroke-width:2px
    classDef win fill:#14532d,stroke:#22c55e,color:#fff,stroke-width:2px
    class A pain
    class B core
    class C dash
    class D check
    class E disc
    class F win
```

---

## ✨ Features

| | Feature | What it does |
|:-:|---|---|
| 📊 | **Unified Portfolio View** | Shows everything an investor owns in a single dashboard |
| 🏦 | **Multi-Broker Aggregation** | Combines holdings coming from more than one broker |
| 🏛️ | **Multi-Depository Aggregation** | Brings together holdings kept with different depositories |
| 📂 | **CSV Portfolio Import** | Load holdings from a simple file (`Name, Type, Quantity, AvgPrice, CurrentPrice, Source`) |
| 🥧 | **Asset Allocation** | Breaks the portfolio down by asset type so imbalance is visible at a glance |
| 📈 | **Gain / Loss Tracking** | Compares average buy price with current price per holding |
| 🧭 | **Beyond Stocks Tab** | Explains REITs, InvITs and Bonds and shows how stock-heavy the user is |
| 🤖 | **AI Financial Assistant** | Chat powered by **Google Gemini 2.0 Flash**, with a local rule-based fallback when no API key is set |
| 🔐 | **Authentication** | Sign-in handled through **Firebase** |
| 🐳 | **One-Command Deploy** | Frontend, backend and database all run through Docker Compose |

---

## 🔄 How It Works

```mermaid
sequenceDiagram
    autonumber
    actor U as 👤 Investor
    participant F as 🖥️ Frontend
    participant A as 🔐 Firebase Auth
    participant B as ⚙️ FastAPI Backend
    participant D as 🗄️ PostgreSQL
    participant G as 🤖 Gemini AI

    U->>F: Open Dhani
    F->>A: Sign in
    A-->>F: Authenticated session
    U->>F: Upload portfolio CSV
    F->>B: Send holdings
    B->>D: Store and aggregate holdings
    D-->>B: Consolidated data
    B-->>F: Value, allocation, P&L
    F-->>U: 📊 Unified dashboard
    U->>F: "What is an InvIT?"
    F->>B: Ask the assistant
    B->>G: Prompt with portfolio context
    G-->>B: Plain-language answer
    B-->>F: Response
    F-->>U: 💬 Simple, honest explanation
```

---

## 🧭 Beyond Stocks

The **Beyond Stocks** tab is the heart of Dhani's mission: removing the barrier that keeps investors away from non-equity options.

```mermaid
flowchart TD
    S(["🧭 Beyond Stocks tab"]) --> A["1️⃣ Show how stock-heavy<br/>the portfolio is"]
    A --> B["2️⃣ Explain why people avoid<br/>REITs, InvITs and Bonds"]
    B --> C["3️⃣ Answer those fears honestly<br/>with transparent risk"]
    C --> D["4️⃣ Suggest options with<br/>clear explanations"]
    D --> E(["✅ Informed decision<br/>by the investor"])

    classDef start fill:#1e3a8a,stroke:#60a5fa,color:#fff,stroke-width:2px
    classDef step fill:#1f2937,stroke:#3b82f6,color:#fff,stroke-width:2px
    classDef done fill:#14532d,stroke:#22c55e,color:#fff,stroke-width:2px
    class S start
    class A,B,C,D step
    class E done
```

### 🧱 The asset classes, in simple words

| | Instrument | In one line | Typical role in a portfolio | Main risks to understand |
|:-:|---|---|---|---|
| 📈 | **Stocks** | Ownership in a company | Long-term growth | Prices can fall sharply |
| 🏢 | **REITs** | Own income-generating real estate (offices, malls) and pass rental income to unit holders | Regular income plus property exposure | Vacancy, interest rates, unit price swings |
| 🛣️ | **InvITs** | Own infrastructure (roads, power lines, towers) and distribute their cash flows | Regular income from infrastructure | Project and regulatory risk, unit price swings |
| 🏦 | **Bonds** | You lend money to a government or company and receive interest | Stability and fixed income | Credit risk, interest-rate risk |

> 💡 REITs and InvITs are listed on exchanges, so they can be bought and sold through the same demat account as stocks.

### 🥧 Example: why concentration matters

```mermaid
pie showData title Example "stocks-only" portfolio (illustrative)
    "Equity" : 100
    "REITs" : 0
    "InvITs" : 0
    "Bonds" : 0
```

```mermaid
pie showData title Example diversified portfolio (illustrative)
    "Equity" : 65
    "REITs" : 10
    "InvITs" : 10
    "Bonds" : 15
```

> ⚠️ These charts are **examples to explain the idea**, not recommendations.

---

## 🏗️ Architecture

```mermaid
flowchart TB
    subgraph CLIENT["🖥️ Frontend  -  Vite  ·  Port 80"]
        UI["Dashboard · Beyond Stocks · AI Chat"]
    end

    subgraph AUTH["🔐 Identity"]
        FB["Firebase Authentication"]
    end

    subgraph SERVER["⚙️ Backend  -  FastAPI  ·  Port 8000"]
        API["REST API"]
        ENG["Portfolio Engine"]
        AI["AI Assistant"]
    end

    subgraph DATA["🗄️ Data  -  PostgreSQL 15  ·  Port 5432"]
        DB[("Holdings and Users")]
    end

    subgraph LLM["🧠 Intelligence"]
        GEM["Google Gemini 2.0 Flash"]
        RULE["Rule-based fallback"]
    end

    UI <--> FB
    UI <--> API
    API --> ENG
    API --> AI
    ENG <--> DB
    AI --> GEM
    AI -.->|"no API key"| RULE

    classDef c1 fill:#1e3a8a,stroke:#3b82f6,color:#fff,stroke-width:2px
    classDef c2 fill:#78350f,stroke:#f59e0b,color:#fff,stroke-width:2px
    classDef c3 fill:#134e4a,stroke:#14b8a6,color:#fff,stroke-width:2px
    classDef c4 fill:#4c1d95,stroke:#8b5cf6,color:#fff,stroke-width:2px
    classDef c5 fill:#1f2937,stroke:#9ca3af,color:#fff,stroke-width:2px
    class UI c1
    class FB c2
    class API,ENG,AI c3
    class GEM,RULE c4
    class DB c5
```

### 🧰 Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,vite,js,tailwind,python,fastapi,postgres,firebase,docker,github&perline=10" alt="Tech stack icons" />

</div>

| Layer | Technology |
|---|---|
| 🖥️ **Frontend** | Vite-based web app with Firebase Authentication, animated with Framer Motion |
| ⚙️ **Backend** | Python **FastAPI** |
| 🗄️ **Database** | **PostgreSQL 15** (Neon, Supabase, Railway or local), with SQLite fallback for local use |
| 🤖 **AI** | **Google Gemini 2.0 Flash**, with a local rule-based engine as fallback |
| 🐳 **DevOps** | **Docker Compose** with a Postgres health check |

---

## 📂 Project Structure

```text
Dhani/
├── 📁 backend/              ⚙️  FastAPI server
├── 📁 frontend/             🖥️  Web app
├── 📁 docs/                 📚  Documentation
├── 🐳 docker-compose.yml    🧩  Runs postgres + backend + frontend
├── 🔑 .env.example          🔧  Environment variable template
├── 📄 sample_portfolio.csv  📊  Portfolio import format
├── 📜 LICENSE               ⚖️  MIT
└── 📖 README.md             👋  You are here
```

---

## 📂 Portfolio CSV Format

Import holdings using this structure:

| Column | Meaning |
|---|---|
| `Name` | Name of the instrument |
| `Type` | Asset class (for example Stock, REIT, InvIT, Bond) |
| `Quantity` | Units held |
| `AvgPrice` | Average buy price |
| `CurrentPrice` | Latest price |
| `Source` | Broker or depository the holding comes from |

```csv
Name,Type,Quantity,AvgPrice,CurrentPrice,Source
```

---

## 🚀 Quick Start

### 📋 Prerequisites

![Docker](https://img.shields.io/badge/Docker-required-2496ED?style=flat-square&logo=docker&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase_project-required-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini_API_key-optional-8B5CF6?style=flat-square&logo=googlegemini&logoColor=white)

### 🧪 Run it

```bash
# 1️⃣ Clone
git clone https://github.com/Karan20coder/Dhani.git
cd Dhani

# 2️⃣ Configure
cp .env.example .env
# open .env and add your Firebase keys (and optionally GEMINI_API_KEY)

# 3️⃣ Launch everything
docker compose up --build
```

| Service | URL |
|---|---|
| 🖥️ Frontend | http://localhost |
| ⚙️ Backend API | http://localhost:8000 |
| 🗄️ PostgreSQL | localhost:5432 |

### 🔧 Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_FIREBASE_*` | Firebase web app configuration for the frontend |
| `VITE_API_URL` | Backend URL used by the frontend (default `http://localhost:8000`) |
| `DATABASE_URL` | PostgreSQL connection string (leave empty to use local SQLite) |
| `FRONTEND_URL` | Allowed frontend origin for CORS |
| `GEMINI_API_KEY` | Enables the Gemini-powered assistant (falls back to rule-based if missing) |

> 🔒 **Never commit your real `.env` file.**

---

## 🎬 Demo

<div align="center">

<a href="https://drive.google.com/drive/folders/15b35T0Iab4B-sHwG1jD_HD1FpjaszdtO?usp=sharing">
  <img src="https://img.shields.io/badge/%E2%96%B6%20%20WATCH%20THE%20FULL%20DEMO-3B82F6?style=for-the-badge&logo=googledrive&logoColor=white&labelColor=0B1220" alt="Watch the full demo" height="44"/>
</a>

</div>

---

## 🗺️ Roadmap

```mermaid
timeline
    title Where Dhani is heading
    section Built
        Unified dashboard : Multi-source holdings in one view
        Beyond Stocks : REIT, InvIT and Bond education
        AI assistant : Gemini with rule-based fallback
    section Next
        Live broker integrations : Real account connections
        CAS statement import : Depository statement parsing
        Smarter diversification : Deeper portfolio-aware guidance
```

---

## ⚠️ Disclaimer

Dhani is built for **education and portfolio awareness**. Nothing in this app is investment advice, a recommendation, or a solicitation to buy or sell any security. All allocations and examples shown are illustrative. Please consult a **SEBI-registered investment adviser** before making investment decisions.

---

## 📜 License

Released under the **MIT License**. See [`LICENSE`](LICENSE) for details.

<div align="center">

<br/>

**Built with 💙 to make every investor a confident investor.**

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,12,24&height=120&section=footer" alt="footer" width="100%"/>

</div>
