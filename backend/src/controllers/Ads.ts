import { validate } from "class-validator";
import { dataSource } from "../datasource";
import { Ad } from "../entities/Ad";
import express from "express";

app.get("/ads", async (req: express.Request, res: express.Response) => {
  try {
    const ads = await Ad.find({ relations: { category: true } });
    res.send(ads);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/ads", async (req: express.Request, res: express.Response) => {
  try {
    const ad = new Ad();
    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.imgSrc = req.body.imgSrc;
    ad.price = req.body.price;
    ad.category = req.body.category;

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
