// server.js
const express = require("express");
const app = express();
const port = 3000;


app.set("view engine", "ejs");

// Require the drinks data from the drinks.js file
let drinks = require("./models/drinks");


drinks = drinks.map((drink) => {
  return {
    ...drink,
    name: capitalizeFirstLetter(drink.name),
  };
});

// function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get("/", (req, res) => {
  res.send("Welcome to the Gitpub App!");
});

app.get("/drinks", (req, res) => {
  res.render("index", { drinks: drinks });
});

app.get("/drinks/:id", (req, res) => {
  const drinkId = req.params.id;
  const drink = drinks[drinkId];

  if (drink) {
    res.render("show", { drink: drink });
  } else {
    res.send("Drink not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});