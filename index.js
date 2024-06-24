import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

//express app instance
const app = express();
const port = 3000;

//declare express-public middleware 
app.use(express.static("public"));

//declare body-parser middleware to parse user inputs from form
app.use(bodyParser.urlencoded({ extended: true }));

//setup home route for the random activity endpoint
app.get("/", async (req, res) => {
  try {
    //we send a get request to the /random endpoint
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

//render homepage with get request
app.get("/", (req, res) =>{
res.render("index.ejs", {});
});

//get a particular activity
app.post("/", async (req, res) => {

//the try block
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
