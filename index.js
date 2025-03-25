import express from "express";
import bodyParser from "body-parser";
import path from "path";


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', function (req, res) {
    console.log('Home page accessed');
    res.render("index.ejs");
  });
  
  // Route for the Simon Game page
app.get('/simon-game', function (req, res) {
  res.render("simon-game.ejs"); // Serve the Simon Game page (create this page in your views folder)
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
  res.render("about.ejs",  { wishes: wishesList }); // Serve the About page (create this page in your views folder)
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
  res.render("about.ejs", { wishes: wishesList });

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
  res.render('about.ejs', { wishes: wishesList });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})