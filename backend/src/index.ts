import express from "express";
import sqlite from "sqlite3";

const db = new sqlite.Database("tgc.sqlite", (err) => {
  if (err) {
    console.error("Error : Could not connect to Database");
  } else {
    console.log("Database is connected !");
  }
});

db.get("PRAGMA foreign_keys = ON;");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Hello there !" });
});

app.get("/ads", (req: express.Request, res: express.Response) => {
  db.all(
    "SELECT Ad.*, Category.name FROM Ad LEFT JOIN Category ON Category.id = Ad.categoryId",
    (err, rows) => {
      res.send(rows);
    }
  );
});

app.get(
  "/categories/:categoryId/ads",
  (req: express.Request, res: express.Response) => {
    try {
      const categoryId = Number(req.params.categoryId);
      const sql =
        "SELECT Ad.*, Category.name FROM Ad INNER JOIN Category ON Category.id = Ad.categoryId WHERE Category.id = ?";
      db.all(sql, [categoryId], (err, rows) => {
        try {
          res.send(rows);
        } catch (error) {
          res.status(500).json({ success: false, message: "GET went wrong!" });
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "GET went wrong!" });
    }
  }
);

app.post("/ads", (req: express.Request, res: express.Response) => {
  const timeNow = new Date().toISOString().split("T")[0];
  const sql =
    "INSERT INTO Ad (title, owner, price, location, createdAt, categoryId) VALUES (?, ?, ?, ?, ?, ?)";
  db.run(sql, [
    req.body.title,
    req.body.owner,
    req.body.price,
    req.body.location,
    timeNow,
    req.body.categoryId,
  ]);
  res.sendStatus(204);
});

app.delete("/ads/:id", (req: express.Request, res: express.Response) => {
  try {
    const adId: number = Number(req.params.id);

    const sql: string = "DELETE FROM Ad WHERE id = ?;";

    db.run(sql, [adId]);

    res.send({ success: true, message: "Deleted !" });
  } catch (error) {
    res.status(500).json({ success: false, message: "DELETE went wrong!" });
  }
});

app.patch("/ads/:idAd", (req: express.Request, res: express.Response) => {
  try {
    const idAd = req.params.idAd;
    const newUpdate = req.body;

    let sql: string = "UPDATE Ad";

    sql += ` SET ${Object.keys(newUpdate).join(" = ? , ")} = ?`;
    sql += ` WHERE id = ${idAd};`;

    const options: (string | number)[] = Object.values(newUpdate);

    db.run(sql, options, (err) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      console.log("Patch successfull !");
      res.sendStatus(204);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "PATCH went wrong!" });
  }
});

app.put("/ads/:adId", (req: express.Request, res: express.Response) => {
  try {
    const updatedAd = req.body;
    const adId = Number(req.params.adId);
    const sql =
      "UPDATE Ad SET title = ?, owner = ?, price = ?, location = ?, categoryId =? WHERE id = ?;";
    db.run(sql, [
      updatedAd.title,
      updatedAd.owner,
      updatedAd.price,
      updatedAd.location,
      updatedAd.categoryId,
      adId,
    ]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ success: false, message: "PUT went wrong!" });
  }
});

app.get("/categories", (req: express.Request, res: express.Response) => {
  db.all("SELECT * FROM Category", (err, rows) => {
    res.send(rows);
  });
});

app.post("/categories", (req: express.Request, res: express.Response) => {
  try {
    const sql = "INSERT INTO Category (name) VALUES (?)";
    db.run(sql, [req.body.name]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ success: false, message: "POST went wrong!" });
  }
});

app.put(
  "/categories/:categoryId",
  (req: express.Request, res: express.Response) => {
    try {
      const updatedCategory = req.body;
      const categoryId = Number(req.params.categoryId);
      const stmt = db.prepare("UPDATE Category SET name = ? WHERE id = ?;");
      stmt.run([updatedCategory.name, categoryId]);
      res.send({ message: "Updated !" });
    } catch (error) {
      res.status(500).json({ success: false, message: "PUT went wrong!" });
    }
  }
);

app.delete(
  "/categories/:categoryId",
  (req: express.Request, res: express.Response) => {
    try {
      const categoryId: number = Number(req.params.categoryId);

      const sql: string = "DELETE FROM Category WHERE id = ?;";

      db.run(sql, [categoryId]);

      res.send({ success: true, message: "Deleted !" });
    } catch (error) {
      res.status(500).json({ success: false, message: "DELETE went wrong!" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} !`);
});
