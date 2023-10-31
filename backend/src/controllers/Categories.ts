import express from "express";
import { Category } from "../entities/Category";

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