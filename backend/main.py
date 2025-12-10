from fastapi import FastAPI
from pydantic import BaseModel
import os

app = FastAPI()

class OptimizeRequest(BaseModel):
    goal: str
    snapshot: dict  # will fill later


class OptimizeResponse(BaseModel):
    actions: list


@app.post("/optimize-layout", response_model=OptimizeResponse)
async def optimize_layout(req: OptimizeRequest):
    
    # For now, return a fake set of actions
    # Later this will be replaced with OpenAI response
    fake_actions = [
        {"type": "highlight_canvas"},
        {"type": "log_message", "text": "AI would fix layout here"}
    ]

    return OptimizeResponse(actions=fake_actions)

