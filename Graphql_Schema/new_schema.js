const Product = require("../Models/Product");

const typeDefs = `
    type Query{
        product(name: String!): product
    }

    type product{
        id: ID
        name: String
        category: String
        quantity: Int
        price: Int
        discount: Int
        warranty: String
        img: [String]
        dimimage: [String]
        quality: String
        delivery: String
        returns: String
        pricing: String
    }
`;

const resolvers = {
  Query: {
    product: (parent, args) => {
      Product.find({ name: args.name }, (err, products) => {});
      console.log(x);
      return {
        id: "hello",
        name: "sa",
        category: "asf",
        quantity: 123,
        price: 123,
        discount: 21,
        warranty: "asd",
        img: ["sad"],
        dimimage: ["asf"],
        quality: "saf",
        delivery: "dsdg",
        returns: "sagsdg",
        pricing: "asgdg",
      };
      //   Product.find({ name: args.name }, (err, products) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //     console.log(typeof products);
      //     console.log(products);
      //     console.log(args.name);
      //     return {
      //       id: "hello",
      //       name: "sa",
      //       category: "asf",
      //       quantity: 123,
      //       price: 123,
      //       discount: 21,
      //       warranty: "asd",
      //       img: ["sad"],
      //       dimimage: ["asf"],
      //       quality: "saf",
      //       delivery: "dsdg",
      //       returns: "sagsdg",
      //       pricing: "asgdg",
      //     };
      //   });
    },
  },
  product: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    category: (parent) => parent.category,
    quantity: (parent) => parent.quantity,
    price: (parent) => parent.price,
    discount: (parent) => parent.discount,
    warranty: (parent) => parent.warranty,
    img: (parent) => parent.img,
    dimimage: (parent) => parent.dimimg,
    quality: (parent) => parent.quality,
    delivery: (parent) => parent.delivery,
    returns: (parent) => parent.returns,
    pricing: (parent) => parent.pricing,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
