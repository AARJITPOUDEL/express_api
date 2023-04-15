const express = require("express");
const app = express();

const houses = [
  { price: 240000, city: "baltimore" },
  { price: 300000, city: "austin" },
  { price: 400000, city: "austin" },
  { price: 1000000, city: "seattle" },
  { price: 325000, city: "baltimore" },
  { price: 550000, city: "seattle" },
  { price: 250000, city: "boston" },
];

app.get("/v1/zillow/zestimate", (req, res) => {
  const sqft = parseInt(req.query.sqft);
  const bed = parseInt(req.query.bed);
  const bath = parseInt(req.query.bath);

  if (!sqft || !bed || !bath) {
    res.status(400).json({ error: "Invalid parameters" });
    return;
  }

  const zestimate = sqft * bed * bath * 10;

  res.json({ zestimate });
});

app.get("/v1/zillow/houses", (req, res) => {
  const city = req.query.city;

  if (!city) {
    res.json([]);
    return;
  }

  const filteredHouses = houses.filter((house) => house.city === city);

  if (filteredHouses.length === 0) {
    res.json([]);
  } else {
    res.json(filteredHouses);
  }
});

app.get("/v1/zillow/prices", (req, res) => {
  const usd = parseInt(req.query.usd);

  if (!usd) {
    res.json([]);
    return;
  }

  const filteredHouses = houses.filter((house) => house.price <= usd);

  if (filteredHouses.length === 0) {
    res.json([]);
  } else {
    res.json(filteredHouses);
  }
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Invalid endpoint" });
});

const port = process.argv[2] || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
