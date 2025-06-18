import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors("http://localhost:5173"));

app.get("/users", async (req, res) => {

  const allUsers = await prisma.user.findMany();
  res.status(200).json(allUsers);
})

// Register user

app.post("/create-users", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
    },
  });

  res.status(201).json(user);
});

// Edit List of the users registered

app.put("/create-users/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },

    data: {
      address: req.body.address,
    },
  });

  res.status(201).json(user);
});

// Delete users

app.delete("/create-users/:id", async (req, res) => {
  try {
    //const id = req.params.id.toString()

    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao deletar o usuario", error);
    res.status(500).json({ error: "Erro ao deletar usuario" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

//http://localhost:3000/
