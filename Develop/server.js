var path = require("path");
var express = require("express");
const fs = require("fs");
var app = express();
var PORT = 3000;

const htmlRoutes = require("./routes/html_routes.js");
const apiRoutes = require("./routes/api_routes.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
apiRoutes(app);
htmlRoutes(app);




app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))