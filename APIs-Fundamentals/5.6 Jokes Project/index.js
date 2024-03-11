const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('views engine', 'ejs');

app.get("/", async(req,res)=>{
    try {
        const response = await axios.get("https://api.chucknorris.io/jokes/random");
        const joke = response.data.value;
        res.render("index.ejs",{joke});
    } catch (error) {
        console.error('Error fetching Chuck Norris joke:', error.message);
        res.status(500).send('Error fetching Chuck Norris joke. Please try again later.');
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });