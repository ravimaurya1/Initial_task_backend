const typeDefs = `
    type Query{
        info(id: ID!): product
    }
    type product{
        id: ID!
        condition: String!
        slugName: String!
        price: Int!
        offerPrice: Int!
        imageLinks: [String]
        categoryType: String
        zefoPrice: Int
        extraDiscount: Int
        stockSize: Int
        availability: Boolean
    }
`;
