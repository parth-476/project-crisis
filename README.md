# CrisisBrain (Evaluation Project)

Simple full stack project for backend + frontend evaluation.

## Run

```bash
npm install
npm start
```

Open `http://localhost:3000`

## Optional Native HTTP Module Demo

```bash
npm run start:http
```

Open `http://localhost:4000/api/info`

## Backend Features (Simple and Understandable)

- Public report submission (`POST /api/reports`)
- Fetch reports (`GET /api/disasters`, `GET /api/disasters/:id`)
- Risk prediction scoring (`GET /api/risk-zones`)
- Real-time alert demo (`POST /api/alerts/test`)
- Auto resource suggestion (`POST /api/resources/suggest`)
- Emergency simulation mode (`POST /api/simulate`)

## Third-Photo Syllabus Coverage

- Node.js setup and modules (`require`, local modules)
- File handling and dependencies (`fs/promises`, JSON store)
- HTTP module endpoint demo (`basic-http-server.js`)
- Express framework usage (`server.js`)
- Routing methods and route parameters (`GET`, `POST`, `:id`)
- Route handlers and response methods (`res.json`, `res.status`)
- Static files serving (`public/` with `express.static`)
- Static page with file stream (`GET /report-guide`)
- Exception handling (404 middleware + global error handler)

## Syllabus to Project Mapping (Kaha Use Ho Raha Hai)

| Syllabus Topic | Project Implementation | Kaha Use Ho Raha Hai (Demo) |
| --- | --- | --- |
| Node.js + setup + modules | `server.js`, `src/modules/*.js` with `require(...)` | Backend startup `npm start`; modules split karke clean structure dikhaya gaya |
| File handling + dependencies | `src/modules/dataStore.js` uses `fs/promises`; data in `data/reports.json` | `POST /api/reports` new report save karta hai; `GET /api/disasters` file se read karta hai |
| HTTP module basics | `basic-http-server.js` with `http.createServer(...)` | `npm run start:http` and open `http://localhost:4000/api/info` |
| Express framework | `server.js` with `const app = express()` | Main backend APIs Express se run ho rahi hain |
| Routing methods | `GET` + `POST` routes in `server.js` | Frontend buttons/forms in `public/app.js` inhi routes ko call karte hain |
| Route parameters | `GET /api/disasters/:id` | Specific report by id fetch karne ka demo endpoint |
| Route handlers + response methods | `res.json(...)`, `res.status(...)` in `server.js` | Har API response JSON me return hota hai, 201/400/404/500 statuses ke saath |
| Static files | `app.use(express.static("public"))` in `server.js` | Browser par `http://localhost:3000` open karte hi `public/index.html` load hoti hai |
| Static page with file stream | `GET /report-guide` + `fs.createReadStream(...)` | Frontend header me "Open Streamed Static Guide" link se dikhaya ja sakta hai |
| Exception handling | 404 middleware + global error middleware in `server.js` | Wrong route par 404; internal issue par 500 JSON response |

## Backend to Frontend Connection (Exactly Kaha)

- `public/app.js` -> `loadReports()` calls `GET /api/disasters` and table render karta hai.
- `public/app.js` -> form submit calls `POST /api/reports` and new report store ho jata hai.
- `public/app.js` -> `loadRiskPrediction()` calls `GET /api/risk-zones`.
- `public/app.js` -> `generateAlert()` calls `POST /api/alerts/test`.
- `public/app.js` -> `loadResourcePlan()` calls `POST /api/resources/suggest`.
- `public/app.js` -> `runSimulation()` calls `POST /api/simulate`.

## Quick Viva Script (1 minute)

1. "Backend Node.js + Express me hai, routes `server.js` me defined hain."
2. "Data DB me nahi, file store me hai (`data/reports.json`) through `dataStore.js`."
3. "Form se report submit hoti hai via `POST /api/reports`, aur list `GET /api/disasters` se aati hai."
4. "Prediction, alert, resource suggestion, simulation ke separate APIs banaye hain."
5. "Syllabus cover karne ke liye native HTTP module demo `basic-http-server.js` bhi add kiya hai."
6. "Static files + stream page + exception middleware sab implemented hai."

## Frontend

- Single-page dashboard in plain HTML/CSS/JS
- API integration using `fetch`
- Mobile-friendly layout
