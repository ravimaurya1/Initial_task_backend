const axios = require("axios");

// Helper Function to extract data from response
const { info_filter, similar_filter, cart_filter } = require("../helper");

const typeDefs = `
    type Query{
        info(id: ID!): product
        similarProduct(id: ID!):[data] 
        sessionId: String
        getcart(sessionId: ID!): [cartproduct]

    }

    type Mutation{
      addToCart(sessionId: ID!, productId: ID!): String
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
        `http://192.168.80.45:3000/api/products/v2/${args.id}/view/device/desktop`,
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
        `http://192.168.80.45:3000/api/products/${args.id}/similar`
      );
      return similar_filter(res.data);
    },
    sessionId: async (parent, args) => {
      const res = await axios.post(
        `http://192.168.124.123:8500/platform/v1/session`,
        {
          data: {},
        },
        {
          headers: {
            "X-Quikr-Client": "DesktopSite",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res)
      return(res.data.getSessionResponse.data.sessionId);
    },
    getcart: async (parent, args) => {
      const res = await axios.get(
        "http://192.168.80.45:3000/api/cart/full-data/device/desktop",
        {
          headers: {
            Cookie: `zefo.sid=${args.sessionId}; city=ncr;; isAuthenticated=; userId=; abRanddesktop=43; abRanddesktop.sig=5_voSo-k6Uj3jQb8Eu-FgDf-vg8; isAuthenticated.sig=WJ_5zRNCEtNSz9tmqC8I_ZDBqtA; userId.sig=i9jK1caKUJnByJyj7vOhgMv2tAM; zefo.sid=daa55110-69e0-493e-878b-d763da46a695; zefo.sid.sig=wxJ_UZDZmUQQLeK1esgI-w59FyY; expirySetAt=1614848123909; expirySetAt.sig=Ed9r2T0TfkiiqefF7ko_CYdmP_8`,
          },
        }
      );
      return cart_filter(res.data);
    },
  },
  Mutation: {
    addToCart: async (parent, args) => {
      // product Id have to be in INT
      const res = await axios.post(
        `http://192.168.80.45:3000/api/cart/products/${args.productId}/v2?quantity=1`,
        {
          data: {},
        },
        {
          headers: {
            Connection: "keep-alive",
            Accept: "application/json",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36",
            "Content-Type": "application/json",
            Origin: "http://gozefo.com:3000",
            Referer:
              "http://gozefo.com:3000/ncr/product/hastings-5-seater-sofa-set-401949",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
            Cookie: `_ga=GA1.2.1407986254.1609244984; _gcl_au=1.1.1014141641.1609244994; kapAnalytics=16092449955171607007286; abRandmobile=49; abRandmobile.sig=PBfKQ7kjtMzdKyaY6n5Bh7dHmrs; _gid=GA1.2.1616066524.1614667351; abRanddesktop=12; abRanddesktop.sig=TCIm3CIlJsnG3EqH-WO5rOB7ihA; city=ncr; city.sig=_wgfhlkw2F6HoMivEEIBYtFOZAw; AMP_TOKEN=%24NOT_FOUND; isAuthenticated=; isAuthenticated.sig=WJ_5zRNCEtNSz9tmqC8I_ZDBqtA; userId=; userId.sig=i9jK1caKUJnByJyj7vOhgMv2tAM; zefo.sid=${args.sessionId}; zefo.sid.sig=wxJ_UZDZmUQQLeK1esgI-w59FyY; _gat=1; _uetsid=9ee375f07b2511eb984023e89a8b7908; _uetvid=4243e8b01f3f11eba1c69d87134aae79; _jk_id=044abb00-7c1b-43ea-988d-78cea18e7792.1609245135.0.1614847667.; expirySetAt=1614847692600; expirySetAt.sig=E6BQ-0bQKkInDqfejXUozr1vHCc`,
          },
        }
      );
      return "Added To Cart";
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
