from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Any

app = FastAPI()

# CORS – allow everything for dev (you can tighten later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["https://www.canva.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class OptimizeRequest(BaseModel):
    goal: str
    snapshot: Dict[str, Any]


class Action(BaseModel):
    type: str
    text: str | None = None


class OptimizeResponse(BaseModel):
    actions: List[Action]


@app.post("/optimize-layout", response_model=OptimizeResponse)
async def optimize_layout(req: OptimizeRequest):
    """
    For now this just returns fake actions so we can wire everything.
    Later this is where we'll plug in OpenAI and real layout logic.
    """
    print("🔌 Received goal:", req.goal)
    print("🖼  Snapshot payload:", req.snapshot)

    actions = [
        Action(type="highlight_canvas"),
        Action(type="log_message", text=f"Goal I received: {req.goal}"),
    ]

    return OptimizeResponse(actions=actions)
