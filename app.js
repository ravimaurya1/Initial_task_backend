const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./Graphql_Schema/schema.js");
const dotenv = require("dotenv");

dotenv.config();

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
