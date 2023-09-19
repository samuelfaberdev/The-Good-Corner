import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const ads = [
  {
    id: 1,
    title: "Bike to sell",
    description:
      "My bike is blue, working fine. I'm selling it because I've got a new one",
    owner: "bike.seller@gmail.com",
    price: 100,
    picture:
      "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Car to sell",
    description:
      "My car is blue, working fine. I'm selling it because I've got a new one",
    owner: "car.seller@gmail.com",
    price: 10000,
    picture:
      "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
];

app.get("/", (req, res) => {
  res.json({ message: "Hello there !" });
});

app.get("/ads", (req, res) => {
  res.json(ads);
});

app.post("/ads", (req, res) => {
  const newAd = req.body;
  newAd.id = ads.length + 1;
  newAd.createdAt = new Date().toJSON();
  ads.push(newAd);
  res.send(newAd);
});

app.delete("/ads/:id", (req, res) => {
  const adId = Number(req.params.id);
  let done = false;
  for (let i = 0; i < ads.length; i++) {
    if (ads[i].id === adId) {
      ads.splice(i, 1);
      done = true;
      break;
    }
  }
  if (done) {
    res.send({ message: "Deleted !" });
  } else {
    res.status(404).send({ error: "This 'id' does not exist !" });
  }
});

app.patch("/ads/:id", (req, res) => {
  const adId = Number(req.params.id);
  const updatedAd = req.body;
  let done = false;
  for (let i = 0; i < ads.length; i++) {
    if (ads[i].id === adId) {
      const ad = ads[i];
      Object.assign(ad, updatedAd);
      done = true;
      break;
    }
  }
  if (done) {
    res.send({ message: "Patched !" });
  } else {
    res.status(404).send({ error: "This 'id' does not exist !" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} !`);
});
