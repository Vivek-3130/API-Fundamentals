const express = require("express");
const fs = require("fs");
const users = require("./mock_data.json")
const app = express();
const PORT = 8000;

// Middleware -Plugin
app.use(express.urlencoded({extended: true}));

// Routes
// app.get("/users",(req,res)=>{
//     const html = `
//     <ul>
//        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
//     </ul>
//     `
//     res.send(html);
// })

// REST APIs
app.get("/api/users",(req,res)=>{
    return res.json(users)
})

app.get("/api/users/:id",(req,res)=>{
    const id= Number(req.params.id);
    const user = users.find((user => user.id === id));
    return res.json(user);
})

app.post("/api/users",(req,res)=>{
    //TODO Create new user
    const body = req.body;
    // console.log(body);
    users.push({id:users.length + 1,...body});
    fs.writeFile('./mock_data.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"success", id: users.length});
    })
})

app.patch("/api/users/:id",(req,res)=>{
    //TODO Update the user
    // Extract the id from the request parameters and convert it to a number
    const id = Number(req.params.id);

    // Find the index of the user in the users array
    const index = users.findIndex(user => user.id === id);

    // Check if the user with the given id exists
    if (index !== -1) {
        // Update the user properties with the new values from the request body
        users[index] = { ...users[index], ...req.body };
        res.status(200).json({ status: "success", user: users[index] });
        console.log(users[index]);
    } else {
        // If user not found, return 404 Not Found status
        res.status(404).json({ status: "error", message: "User not found" });
    }
})

app.delete("/api/users/:id",(req,res)=>{
    //TODO Delete the user
    const id= Number(req.params.id);
    const index = users.findIndex(user => user.id === id);
     // Check if the user with the given id exists
     if (index !== -1) {
        // Remove the user from the array
        users.splice(index, 1);
        res.status(200).send("User deleted successfully");
    } else {
        // If user not found, return 404 Not Found status
        res.status(404).send("User not found");
    }
    
})


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})