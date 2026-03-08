# CrisisBrain - Frontend Dashboard

A stunning, modern Next.js-based crisis management dashboard that connects to the CrisisBrain backend API.

## Features

### 🎯 Dashboard
- **Real-time Risk Assessment**: Visualize the top 5 at-risk zones with live risk scores
- **Risk Scoring**: Advanced algorithm combining severity, population, and weather factors
- **Interactive Zone Cards**: Click-to-expand detailed information for each zone

### 🚨 Alert Generation
- **Zone-based Alerts**: Generate emergency alerts for specific zones
- **Smart Advisory System**: Automated recommendations based on risk levels
- **Alert Tracking**: Full audit trail with timestamp and alert IDs

### 📦 Resource Allocation
- **Intelligent Suggestions**: Automatic resource recommendations for affected zones
- **Resource Distribution**:
  - Ambulances for medical response
  - Rescue Teams for emergency operations
  - Food Kits for humanitarian aid
- **Risk-based Scaling**: Resource allocation adjusts based on risk severity

### 📋 Disaster Reporting
- **Easy Report Submission**: Simple form-based disaster reporting
- **Multi-field Reporting**:
  - Zone identification
  - Severity assessment (Low, Medium, High, Critical)
  - Issue type classification
  - Population impact estimation
  - Additional notes
- **Real-time Dashboard Updates**: Dashboard refreshes automatically after report submission

### 📊 Live Disaster Tracking
- **Report History**: View all submitted disaster reports
- **Sortable List**: Sort by severity, date, zone
- **Detailed Information**: Population affected, issue type, notes

## Architecture

### Components Structure
- **Header.tsx**: Navigation and system status indicator
- **RiskZoneCard.tsx**: Individual zone risk visualization
- **AlertGenerator.tsx**: Alert generation interface
- **ResourceAllocator.tsx**: Resource suggestion engine UI
- **DisasterReporter.tsx**: Disaster reporting form

### Styling
- **Dark theme** optimized for 24/7 emergency operations
- **Color-coded severity levels**: Critical (Red), High (Orange), Medium (Yellow), Low (Green)
- **Responsive design**: Desktop-first with mobile support
- **Accessibility**: WCAG 2.1 AA compliant

## Setup & Running

### Prerequisites
- Node.js 16.x or higher
- Backend server running on `http://localhost:3000`

### Installation
```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development
```bash
# Start backend server (in separate terminal)
npm start

# Start frontend development server (in another terminal)
npm run dev
```

The frontend will be available at `http://localhost:3000` (frontend Next.js server runs on a different port if backend is also on 3000).

### Production Build
```bash
npm run build
npm run start:frontend
```

## API Integration

The frontend connects to the following backend endpoints:

### Disasters
- `GET /api/disasters` - Fetch all disaster reports
- `GET /api/disasters/:id` - Fetch specific disaster report
- `POST /api/reports` - Submit new disaster report

### Risk Assessment
- `GET /api/risk-zones` - Get top risk zones with predictions
- `GET /api/risk-zones?rainfall=35&windSpeed=25&temperature=30` - Custom weather parameters

### Alerts
- `POST /api/alerts/test` - Generate alert for a zone

### Resources
- `POST /api/resources/suggest` - Get resource allocation suggestions

### System
- `GET /api/health` - Backend health check

## Design System

### Color Palette
- **Primary**: #10b981 (Green) - Success, safe actions
- **Secondary**: #3b82f6 (Blue) - Information
- **Accent**: #f59e0b (Amber) - Warnings
- **Critical**: #ef4444 (Red) - Critical alerts
- **High**: #f97316 (Orange) - High risk
- **Medium**: #eab308 (Yellow) - Medium risk
- **Low**: #22c55e (Green) - Low risk

### Background
- **Primary**: #0f1419 (Very Dark Blue)
- **Secondary**: #1a1f2e (Dark Blue)
- **Tertiary**: #252d3d (Slightly Lighter)

## Performance Optimizations

- **Auto-refresh**: Dashboard refreshes every 30 seconds
- **Lazy Loading**: Components load on demand
- **Client-side Caching**: SWR integration ready
- **Image Optimization**: Next.js Image component ready
- **Code Splitting**: Automatic with Next.js

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast ratios > 4.5:1
- Focus indicators for all interactive elements

## Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Advanced mapping with GIS integration
- [ ] Historical data visualization
- [ ] Predictive modeling with ML
- [ ] Mobile app with React Native
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] User authentication and roles

## License

ISC
