from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="AI Sports GM API", version="0.1.0")

PLAYERS = [
    {"id": 1, "name": "Marcus Reed", "league": "NFL", "position": "CB", "overall": 87, "fit": 94, "risk": "Moderate", "salary": 14000000},
    {"id": 2, "name": "Jordan Williams", "league": "NFL", "position": "EDGE", "overall": 91, "fit": 89, "risk": "Low", "salary": 21000000},
    {"id": 3, "name": "Darius Cole", "league": "NBA", "position": "Wing", "overall": 88, "fit": 93, "risk": "Low", "salary": 28000000},
    {"id": 4, "name": "Andre Brooks", "league": "NBA", "position": "Center", "overall": 84, "fit": 96, "risk": "Moderate", "salary": 17000000},
]

TEAMS = {
    "Atlanta Falcons": {"league": "NFL", "cap_space": 42000000, "needs": [
        {"name": "CB", "priority": "Critical"},
        {"name": "DL", "priority": "High"},
        {"name": "OL", "priority": "Moderate"},
    ]},
    "Atlanta Hawks": {"league": "NBA", "cap_space": 18000000, "needs": [
        {"name": "Rim Protection", "priority": "Critical"},
        {"name": "Two-Way Wing", "priority": "High"},
        {"name": "Bench Depth", "priority": "High"},
    ]},
}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/players")
def players(league: str | None = None):
    if league:
        return [p for p in PLAYERS if p["league"] == league.upper()]
    return PLAYERS

@app.get("/teams")
def teams():
    return TEAMS

class RecommendationRequest(BaseModel):
    league: str
    team: str
    question: str

@app.post("/ai-gm")
def ai_gm(request: RecommendationRequest):
    team = TEAMS.get(request.team)
    if not team:
        return {"answer": "Team not found."}

    needs = ", ".join(n["name"] for n in team["needs"][:2])
    return {
        "answer": (
            f"For the {request.team}, the current roster model highlights {needs} "
            f"as the main areas to investigate. Review player fit, contract cost, "
            f"risk, and long-term flexibility before making a move."
        ),
        "factors": ["Team need", "Player fit", "Contract cost", "Risk", "Future flexibility"],
        "confidence": 0.78,
    }
