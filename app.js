const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./Graphql_Schema/product_schema.js");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Serve the static files from the React app
app.use(express.static(path.join(__dirname,'build')));

server.applyMiddleware({ app });

// app.use("/", (req, res) => {
//   res.status(200);
//   res.send("Hello");
//   res.end();
// });

app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname,'/build/index.html'));
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
