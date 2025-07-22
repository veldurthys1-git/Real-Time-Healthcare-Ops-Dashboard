# 🏥 Real-Time Hospital Operations Dashboard

This project presents a modern, real-time dashboard to monitor hospital operations including patient metrics, staff availability, alerts, bed occupancy, and department statuses. It's built using a full-stack TypeScript and React framework, delivering intuitive insights for healthcare administrators.

---

## 📁 Project Structure

### Frontend Logic:
The interface displays key metrics:
- **Patients**: Total, admitted, discharged, waiting room
- **Staff**: Doctors, nurses, on-duty personnel
- **Departments**: Real-time status (normal, busy, critical)
- **Equipment**: Availability and maintenance info
- **Alerts**: Info, warning, and critical messages per department

Icons and dynamic UI components are provided using `lucide-react`.

### Data Simulation:
Static placeholder data is used in the initial version, but it's structured to be replaced with live API data or socket streams for real-time performance.

---

## ⚙️ Installation

To run this project, ensure you have the following installed:

- Node.js (v18+)
- pnpm or npm
- TypeScript

Install dependencies:

```bash
pnpm install
# or
npm install
```

---

## 🚀 Usage

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Visit: `http://localhost:5173` in your browser.

---

## 🧬 Features

- ⏱ Real-time timekeeping
- 🧍 Patient and staff metrics
- 🛏 Bed occupancy tracking
- 🏥 Department-level status
- ⚠️ Critical alerts monitoring
- 🛠 Equipment availability display

---

## 💡 Tech Stack

- **Frontend:** React (TypeScript), Vite
- **UI Icons:** lucide-react
- **Styling:** Tailwind CSS
- **Bundler:** Vite
- **Language:** TypeScript

---

## 📦 Deployment

To build for production:

```bash
pnpm build
# or
npm run build
```

Then host the `dist/` folder on any static site host (e.g., Vercel, Netlify, AWS S3).
