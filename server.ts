import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("krafty.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT, -- 'client' or 'worker'
    full_name TEXT,
    location TEXT,
    latitude REAL,
    longitude REAL,
    specialty TEXT,
    bio TEXT,
    experience_years INTEGER,
    rating REAL DEFAULT 0,
    avatar_url TEXT
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER,
    client_id INTEGER,
    rating INTEGER,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(worker_id) REFERENCES users(id),
    FOREIGN KEY(client_id) REFERENCES users(id)
  );
`);

// Seed data
const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
if (userCount === 0) {
  const insertUser = db.prepare(`
    INSERT INTO users (email, password, role, full_name, location, specialty, bio, experience_years, rating, avatar_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const workers = [
    ["moussa@example.com", "pass", "worker", "Moussa Diop", "Dakar, Sénégal", "Plombier", "Expert en plomberie sanitaire et industrielle avec 10 ans d'expérience.", 10, 4.8, "https://picsum.photos/seed/moussa/400/400"],
    ["fatou@example.com", "pass", "worker", "Fatou Sow", "Abidjan, Côte d'Ivoire", "Électricienne", "Spécialisée en installation solaire et maintenance électrique.", 7, 4.9, "https://picsum.photos/seed/fatou/400/400"],
    ["kofi@example.com", "pass", "worker", "Kofi Mensah", "Accra, Ghana", "Maçon", "Maître maçon spécialisé dans la construction écologique.", 15, 4.7, "https://picsum.photos/seed/kofi/400/400"],
    ["amina@example.com", "pass", "worker", "Amina Traoré", "Bamako, Mali", "Peintre", "Artiste peintre et décoratrice d'intérieur.", 5, 4.6, "https://picsum.photos/seed/amina/400/400"],
    ["jean@example.com", "pass", "worker", "Jean Kabore", "Ouagadougou, Burkina Faso", "Menuisier", "Création de meubles sur mesure et charpente.", 12, 4.9, "https://picsum.photos/seed/jean/400/400"],
    ["sarah@example.com", "pass", "worker", "Sarah Okafor", "Lagos, Nigeria", "Soudeuse", "Soudure de précision et structures métalliques.", 8, 4.5, "https://picsum.photos/seed/sarah/400/400"],
  ];

  workers.forEach(w => insertUser.run(...w));
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API Routes
  app.get("/api/workers", (req, res) => {
    const { specialty, search } = req.query;
    let query = "SELECT id, full_name, specialty, rating, avatar_url, location FROM users WHERE role = 'worker'";
    const params = [];

    if (specialty) {
      query += " AND specialty = ?";
      params.push(specialty);
    }
    if (search) {
      query += " AND (full_name LIKE ? OR specialty LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    const workers = db.prepare(query).all(...params);
    res.json(workers);
  });

  app.get("/api/workers/:id", (req, res) => {
    const worker = db.prepare("SELECT * FROM users WHERE id = ? AND role = 'worker'").get(req.params.id);
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    
    const reviews = db.prepare("SELECT r.*, u.full_name as client_name FROM reviews r JOIN users u ON r.client_id = u.id WHERE r.worker_id = ?").all(req.params.id);
    res.json({ ...worker, reviews });
  });

  app.post("/api/register", (req, res) => {
    const { email, password, role, full_name, location, specialty } = req.body;
    try {
      const info = db.prepare("INSERT INTO users (email, password, role, full_name, location, specialty) VALUES (?, ?, ?, ?, ?, ?)")
        .run(email, password, role, full_name, location, specialty);
      res.json({ id: info.lastInsertRowid, email, role, full_name });
    } catch (e) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT id, email, role, full_name FROM users WHERE email = ? AND password = ?").get(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
