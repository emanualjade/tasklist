const { GraphQLDateTime } = require("graphql-iso-date");

const customDateScalarResolver = {
  Date: GraphQLDateTime
}

const userResolver = require("./user");
const taskResolver = require("./task");

module.exports = [userResolver, taskResolver, customDateScalarResolver];
