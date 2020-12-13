const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const dotEnv = require("dotenv");
const DataLoader = require("dataloader");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { connection } = require("./database/util");
const { verifyUser } = require("./helper/context");
const loaders = require("./loaders");

dotEnv.config();

const app = express();
app.use(cors());

app.use(express.json());

// db connection
connection();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    const contextObject = {};
    if (req) {
      await verifyUser(req);
      contextObject.email = req.email;
      contextObject.loggedInUserId = req.loggedInUserId;
    }
    contextObject.loaders = {
      user: new DataLoader((keys) => loaders.user.batchUsers(keys)),
    };
    return contextObject
  },
  formatError: (error) => {
    console.log(error)
    return {
      message: error.message
    };
  }
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

const PORT = process.env.PORT || 3000;

app.use("/", (req, res, next) => {
  res.send({ message: "hello" });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Listeng on ${PORT}`);
  console.log(`Graphql Endpoint ${apolloServer.graphqlPath}`);
});

apolloServer.installSubscriptionHandlers(httpServer);
// eEFV4LFNIoVu3lfB
