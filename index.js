import express from "express";
import bodyParser from "body-parser";
import path from "path";
import ejs from 'ejs';
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;  // Default port is 3000 if not set by Vercel

// Get the current directory in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Use __dirname to ensure the correct path to your 'public' directory
const indexPage = path.resolve(__dirname, "public", "index.ejs");
const gamePage = path.resolve(__dirname, "public", "simon-game.ejs");
const aboutPage = path.resolve(__dirname, "public", "about.ejs");


app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    console.log('Home page accessed');
    res.render(indexPage);
  });
  
  // Route for the Simon Game page
app.get('/simon-game', function (req, res) {
  res.render(gamePage); // Serve the Simon Game page (create this page in your views folder)
});


// Store wishes in memory (you can later store this in a database)
let wishesList = [];
let id = 0;
// Handle POST request when form is submitted
wishesList.push({
  wish: "I want to go hiking with u",
  reason: "Because it is fun!",
  name: "Ninja",  // You can use any name here
  date: new Date().toLocaleDateString()  // Automatically adds the current date
});

// Route for the About page
app.get('/about', function (req, res) {
  res.render(aboutPage,  { wishes: wishesList }); // Serve the About page (create this page in your views folder)
});


app.post('/about/make-wish', (req, res) => {
  const { wish, reason, name } = req.body;  // Extract the form fields from the request body
  // Create a new wish object
  const newWish = {
    wishId : wishesList.length+1,
    name: name,
    wish: wish,
    reason: reason,
    date: new Date().toLocaleDateString(),  // Add the current date (you can format this as needed)
  };
  // Push the new wish into the wishes list
  wishesList.push(newWish);
  console.log(newWish);
  // Respond by rendering the 'about' page with the updated list of wishes
  res.render(aboutPage, { wishes: wishesList });

});

// Delete wish
// Handling the POST request for deleting a wish
app.post('/about/delete-wish', (req, res) => {
  const { wishId } = req.body;  // Extract the wishId from the form submission
  
  // Find the index of the wish that matches the wishId
  const wishIndex = wishesList.findIndex(wish => wish.wishId === parseInt(wishId));

  if (wishIndex !== -1) {  // If the wish was found
    // Remove the wish from the list
    wishesList.splice(wishIndex, 1);
  }

  // After deletion, render the 'about' page with the updated list of wishes
  res.render(aboutPage, { wishes: wishesList });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
