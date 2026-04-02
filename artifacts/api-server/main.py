import os
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


@app.get("/api/pick-person", response_model=PickedPerson)
def pick_person():
    return PickedPerson(name="Bogna", emojis="🎉🏆✨🎯🦸‍♀️")
