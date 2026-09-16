# AI Sports GM 🏆

AI-powered multi-sport front-office decision-support platform for NFL + NBA teams.

## MVP
- NFL / NBA sport selection
- Team dashboard
- Player database
- Player evaluation
- Team needs
- Team fit
- Contract evaluation
- AI GM recommendation panel
- FastAPI backend
- React + TypeScript frontend

## Stack
- Frontend: React + TypeScript + Vite
- Backend: Python + FastAPI
- Database: PostgreSQL (planned)
- Analytics: Pandas + NumPy (planned)
- ML: scikit-learn → PyTorch (planned)
- Charts: Recharts
- AI: LLM API + analytics/recommendation layer

## Run

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The current version uses mock data so you can build the UI before connecting real sports data.
