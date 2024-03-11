import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "vivek"; //postman using post: https://secrets-api.appbrewery.com/register
const yourPassword = "pandey";
const yourAPIKey = "05e873e9-d780-47cd-8999-1a03569d309f"; //postman using get: https://secrets-api.appbrewery.com/generate-api-key
const yourBearerToken = "f0878483-2a65-4ee5-81ea-4bc768a77ac4"; //postman using post: https://secrets-api.appbrewery.com/get-auth-token

app.get("/", (req, res) => {
  res.render("index.ejs", { content: `API Response Coming.....` });
});

// NoAuth
// app.get("/noAuth", (req, res) => {
//   axios.get("https://secrets-api.appbrewery.com/random")
//   .then(response=>{
//     const content = JSON.stringify(response.data);
//     res.render("index.ejs",{content:content});
//   })
//   .catch(error => {
//     console.error('Error fetching data from /random endpoint: ', error);
//     res.status(500).send('Error fetching data from /random endpoint');
//   });
  
// });

// BasicAuth
// app.get("/basicAuth", async (req, res) => {
//   try {
//     const result = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
//       auth: {
//         username: yourUsername,
//         password: yourPassword,
//       },
//     });
//     res.render("index.ejs", { content: JSON.stringify(result.data) });
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

// ApiKeyAuth
// app.get("/apiKey", (req, res) => {
//   axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`)
//   .then(response=>{
//     const content = JSON.stringify(response.data);
//     res.render("index.ejs",{content:content})
//   })
//   .catch(error=>{
//     console.error('Error fetching data from /filter endpoint: ', error);
//     res.status(500).send('Error fetching data from /filter endpoint');
//   })
// });

// BearerTokenAuth
app.get("/bearerToken", (req, res) => {
  axios.get("https://secrets-api.appbrewery.com/secrets/1",{
    headers:{
      Authorization:`Bearer ${yourBearerToken}`
    }
  })
  .then(response=>{
    res.render("index.ejs",{content:JSON.stringify(response.data)})
  })
  .catch(error=>{
    console.error('Error fetching data from /secrets endpoint: ', error);
    res.status(500).send('Error fetching data from /secrets endpoint');
  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 