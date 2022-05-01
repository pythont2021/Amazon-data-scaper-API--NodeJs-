const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const myApiKey = "58ba214808a70913f4185e57c1010b28";
// const baseUrl = `http://api.scraperapi.com?api_key=${myApiKey}&autoparse=true`;

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//GET Amazon product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`
    );
    console.log("GET info successful");
    res.json(JSON.parse(response));
  } catch (error) {
    console.log("GET info unsuccessful");
    res.json(error);
  }
});

//GET Amazon Product Review
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.in/product-reviews/${productId}`
    );
    console.log("GET reviews successful");
    res.json(JSON.parse(response));
  } catch (error) {
    console.log("GET reviews unsuccessful");
    res.json(error);
  }
});

//GET Amazon Product Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.in/gp/offer-listing/${productId}`
    );
    console.log("GET offers successful");
    res.json(JSON.parse(response));
  } catch (error) {
    console.log("GET offers unsuccessful");
    res.json(error);
  }
});

//Serch Amazon Products
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.in/s?k=${searchQuery}`
    );
    console.log("GET Search Query successful");
    res.json(JSON.parse(response));
  } catch (error) {
    console.log("GET Search Query unsuccessful");
    res.json(error);
  }
});

//listen port
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
