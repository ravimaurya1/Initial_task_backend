const axios = require("axios");

// Helper Function to extract data from response
const info_filter = require("../helper");

const typeDefs = `
    type Query{
        info(id: ID!): product
    }
    type product{
        id: ID!
        title: String
        description: String
        condition: String!
        slugName: String!
        price: Int!
        offerPrice: Int!
        imageLinks: [String]
        categoryType: String
        stockSize: Int
        availability: Boolean
    }
`;

const resolvers = {
  Query: {
    info: async (parent, args) => {
      const res = await axios.get(
        `http://gozefo.com:3000/api/products/v2/${args.id}/view/device/desktop`,
        {
          headers: {
            Cookie:
              "zefo.sid=fa5af78f-7a85-4d91-9735-08cdb05a7809; zefo.sid.sig=qCkJ4xUV5CeQPNyVSv7ejHH3xhU; isAuthenticated=; isAuthenticated.sig=WJ_5zRNCEtNSz9tmqC8I_ZDBqtA; userId=; userId.sig=i9jK1caKUJnByJyj7vOhgMv2tAM; abRanddesktop=2; abRanddesktop.sig=nb0hDEmZ19neH7RLmbhzpc_NtW0; expirySetAt=1614591127038; expirySetAt.sig=YZgX-tJQBKelqfDUu8IP9VolOXU",
          },
        }
      );
      return info_filter(res.data);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
