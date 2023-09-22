import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { validate } from "class-validator";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./tgc.sqlite",
  entities: [Ad, Category],
  synchronize: true,
  logging: true,
});

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Hello there !" });
});

app.get("/ads", async (req: express.Request, res: express.Response) => {
  try {
    const ads = await Ad.find();
    res.send(ads);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get(
  "/categories/:categoryId/ads",
  (req: express.Request, res: express.Response) => {}
);

app.post("/ads", async (req: express.Request, res: express.Response) => {
  try {
    const ad = new Ad();
    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.price = req.body.price;

    const errors = await validate(ad);
    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
    } else {
      await dataSource.manager.save(ad);
      res.send(ad);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.delete("/ads/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id);
    await Ad.delete({ id });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.patch("/ads/:id", (req: express.Request, res: express.Response) => {});

app.put("/ads/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id);
    const ad = await Ad.findOneBy({ id });

    if (ad) {
      ad.title = req.body.title;
      ad.description = req.body.description;
      ad.price = req.body.price;

      const errors = await validate(ad);
      if (errors.length === 0) {
        await dataSource.manager.save(ad);
        res.send(ad);
      } else {
        throw new Error(`Validation failed!`);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/categories", async (req: express.Request, res: express.Response) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/categories", (req: express.Request, res: express.Response) => {
  try {
    const category = new Category();
    category.name = req.body.name;
    category.save();

    res.send(category);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.put(
  "/categories/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const category = await Category.findOneBy({ id });

      if (category) {
        category.name = req.body.name;
        category.save();
      }

      res.send(category);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

app.delete(
  "/categories/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      await Category.delete({ id });

      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server is running at 🚀 http://localhost:${port} 🚀`);
});
