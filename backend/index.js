require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

app.get("/jobs", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte hämta jobb" });
  }
});

app.post("/jobs", async (req, res) => {
  try {
    const newJob = await prisma.job.create({
      data: req.body
    });
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte skapa jobb" });
  }
});

app.put("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedJob = await prisma.job.update({
      where: { id },
      data: req.body
    });

    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte uppdatera jobb" });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.job.delete({
      where: { id }
    });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte ta bort jobb" });
  }
});

app.listen(3001, () => {
  console.log("Backend kör på http://localhost:3001");
});
