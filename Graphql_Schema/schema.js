let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
    nameid: "1",
    fake: "hello there",
  },
];

let name = [
  {
    id: "1",
    name: "ravi maurya",
    age: 23,
  },
];

const typeDefs = `
  type Query {
      info: String!
      feed: [Link!]!
    }
    
    type Mutation {
      post(url: String!, description: String): Link!
  
      updateLink(id: ID!, url: String!, description: String!): Link!
  
      deleteLink(id: ID!): String!
    }
    
    type Link {
      id: ID!
      description: String!
      url: String!
      name: Name!
    }  

    type Name{
      id: ID!
      name: String!
      age: Int!
    }
  `;

//Length of links array
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let i = 0;
      for (i = 0; i < links.length; i++) {
        if (links[i].id === args.id) {
          links[i] = {
            id: args.id,
            url: args.url,
            description: args.description,
          };
          break;
        }
      }
      return links[i];
    },
    deleteLink: (parent, args) => {
      let array = links.filter((link) => link.id !== args.id);
      links = array;
      return "Link are deleted";
    },
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
    name: (parent) => {
      for (let i = 0; i < name.length; i++) {
        if (name[i].id === parent.nameid) {
          return name[i];
        }
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
