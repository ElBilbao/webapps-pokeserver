const express = require("express");
const app = express();
const axios = require("axios").default;

app.use(express.static("../Client"));

app.get("/pokemon", (req, res) => {
  const pokeName = req.query.name;

  axios
    .get("https://pokeapi.co/api/v2/pokemon/" + pokeName)
    .then((pokeapi_res) => {
      let pokemon_data = pokeapi_res.data;

      let response = {
        imageURL:
          "https://pokeres.bastionbot.org/images/pokemon/" +
          pokemon_data["id"] +
          ".png",
        moreInfoURL: "https://pokemon.fandom.com/wiki/" + pokemon_data["id"],
        id: pokemon_data["id"],
        abilities: [pokemon_data["abilities"][0], pokemon_data["abilities"][1]],
        name: pokemon_data["name"],
        weight: pokemon_data["weight"] / 10,
      };

      // Avoid CORS Regulation by browers
      // Website you wish to allow to connect (No sensitive data, so everyone)
      res.setHeader("Access-Control-Allow-Origin", "*");

      // Request methods you wish to allow (Only using GET method in this case)
      res.setHeader("Access-Control-Allow-Methods", "GET");

      // Request headers you wish to allow
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader("Access-Control-Allow-Credentials", true);

      console.log(response);
      res.status(200);
      res.json(response);
    })
    .catch(function (error) {
      console.log("ERROR AXIOS REQUEST\n" + error);
      res
        .status(404)
        .send({ status: 404, message: "ERROR: Pokemon not found" });
    });
});

const PORT = 3000;
const HOST = "127.0.0.1";
var server = app.listen(PORT, () => {
  console.log("Server running at http://" + HOST + ":" + PORT);
});
