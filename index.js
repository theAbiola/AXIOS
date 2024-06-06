import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

//declare express-public middleware 
app.use(express.static("public"));

//declare body-parser middleware in order to parse user inputs from form
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});
*/


app.get("/", (req, res) =>{
res.render("index.ejs", {});
});

app.post("/", async (req, res) => {


  try {
  console.log(req.body);
  const type = req.body.type;
  const participants = req.body.participants;
  const response = await axios.get(
    `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
  const result = response.data;
  console.log(result);
  res.render("index.ejs", { 
    data: result[Math.floor(Math.random() * result.length)] 
  });
} 
catch (error) {
  console.error("Failed to make request:", error.message);
  res.render("index.ejs", {
    error: "No activities match your request",
  });
}
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
