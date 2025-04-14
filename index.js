require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// HubSpot custom object type and property names
const HUBSPOT_BASE_URL = "https://api.hubapi.com";
const CUSTOM_OBJECT_TYPE = "Pup"; 
const PROPERTIES = ["Name", "Bio", "Breed"];

const headers = {
  Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

// Home route - list records
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}?properties=${PROPERTIES.join(",")}`,
      { headers }
    );
    const objects = response.data.results;
    res.render("homepage", {
      title: "Custom Object Table",
      objects,
      properties: PROPERTIES,
    });
  } catch (err) {
    res.status(500).send("Error fetching objects: " + err.message);
  }
});

// Show form
app.get("/update-cobj", (req, res) => {
  res.render("updates", {
    title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
  });
});

// Submit form
app.post("/update-cobj", async (req, res) => {
  const { name, bio, breed } = req.body;
  try {
    await axios.post(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`,
      {
        properties: { Name, Bio, Breed },
      },
      { headers }
    );
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error creating record: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));