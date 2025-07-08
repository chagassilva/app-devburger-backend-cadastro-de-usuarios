import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

// 🔐 CORS configurado com origens permitidas
const allowedOrigins = [
  "http://localhost:5173",
  "https://api.devusuario.chagassilva.com",
  "https://app-devburger-frontend-cadastro-de.vercel.app",
  "https://devusuario.chagassilva.com" // Adicione aqui seu domínio do frontend
];


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

// 🛡️ Middlewares
app.use(express.json());
app.use(cors(corsOptions));

/////////

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

//http://localhost:3000/
