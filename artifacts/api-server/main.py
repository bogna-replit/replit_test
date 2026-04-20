import os
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Task Picker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthStatus(BaseModel):
    status: str


class PickedPerson(BaseModel):
    name: str
    emojis: str


@app.get("/api/healthz", response_model=HealthStatus)
def health_check():
    return HealthStatus(status="ok")


PEOPLE = ["Bogna", "Dominik", "Javi", "Marita", "Daniel", "Adrian", "Anca", "Felix", "Goncalo", "Bruno", "Janine", "Julian"]

EMOJIS = ["🎉🏆✨🎯🦸‍♀️", "🚀⭐🎯💪🏆", "🌟🎊✨🦁🎉", "🏅💡🎯🔥🌟"]

@app.get("/api/pick-person", response_model=PickedPerson)
def pick_person():
    idx = random.randrange(len(PEOPLE))
    return PickedPerson(name=PEOPLE[idx], emojis=EMOJIS[idx])
