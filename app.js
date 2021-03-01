const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./Graphql_Schema/new_schema.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.log("Error" + error);
    } else {
      console.log("Connected To Database");
    }
  }
);

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.use("/", (req, res) => {
  res.status(200);
  res.send("Hello");
  res.end();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
