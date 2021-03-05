const axios = require("axios");

// Helper Function to extract data from response
const { info_filter, similar_filter, cart_filter } = require("../helper");

const typeDefs = `
    type Query{
        info(id: ID!): product
        similarProduct(id: ID!):[data]
        sessionId: String
        getcart(id: ID!): [cartproduct]
    }
    type product{
        id: ID!
        title: String
        description: String
        condition: String!
        slugName: String!
        price: Int
        offerPrice: Int!
        imageLinks: [String]
        categoryType: String
        stockSize: Int
        availability: Boolean
        name: String
        question_ans: [ques]
        headingAndDescription: [ques]
        metaInfo: metaData
    }
    type data{
      id : ID
      condition: String
      name: String
      price: Int
      offerPrice: Int
      imagelink: String
    }
    type ques{
      heading: String
      description: String
    }
    type metaData {
      title: String
      description: String
    }
    type cartproduct{
      id: String
      quantity: Int
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
    similarProduct: async (parent, args) => {
      const res = await axios.get(
        `http://gozefo.com:3000/api/products/${args.id}/similar`
      );
      return similar_filter(res.data);
    },
    sessionId: async (parent, args) => {
      const res = await axios.post(
        `http://192.168.124.123:8500/platform/v1/session`,
        {
          headers: {
            "X-quikr-client": "DesktopSite",
            "content-type": "application/json",
          },
          data: {},
        }
      );
      console.log(res.data);
    },
    getcart: async (parent, args) => {
      const res = await axios.get(
        "http://gozefo.com:3000/api/cart/full-data/device/desktop",
        {
          headers: {
            Cookie: `zefo.sid=${args.id}; city=ncr;; isAuthenticated=; userId=; abRanddesktop=43; abRanddesktop.sig=5_voSo-k6Uj3jQb8Eu-FgDf-vg8; isAuthenticated.sig=WJ_5zRNCEtNSz9tmqC8I_ZDBqtA; userId.sig=i9jK1caKUJnByJyj7vOhgMv2tAM; zefo.sid=daa55110-69e0-493e-878b-d763da46a695; zefo.sid.sig=wxJ_UZDZmUQQLeK1esgI-w59FyY; expirySetAt=1614848123909; expirySetAt.sig=Ed9r2T0TfkiiqefF7ko_CYdmP_8`,
          },
        }
      );
      return cart_filter(res.data);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
