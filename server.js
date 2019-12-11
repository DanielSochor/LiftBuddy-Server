require('dotenv').config();
require('./config/db_connection');

const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const baseURL = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_SERVER_URL : process.env.REACT_APP_LOCAL_URL;
//TODO: create an origin whitelist with both URLS

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors());
//app.use(cors({credentials: true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
};

// Add routes
//require("./routes")(app);
var userRoute = require("./controllers/users.js");
app.use(userRoute);
//require('./routes/routes')(app);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);