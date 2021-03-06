const express = require("express");
const bodyParser = require("body-parser");
const listRouter = require("./routes/list.router.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use("/list", listRouter);

// STATIC files to load at default 
app.use(express.static("server/public"));

//Server listening Port 5000
const PORT = process.env.PORT || 5000;  //enviro for heroku 

app.listen(PORT, () => {
    console.log('listening on PORT', PORT);    
});
