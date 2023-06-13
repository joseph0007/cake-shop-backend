const { ApolloServer, gql } = require('apollo-server');
const { findBios } = require('./model/bios.model');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Name {
    first: String
    last: String
  }

  type Awards {
    award: String
    year: String
    by: String
  }

  type Bios {
    _id: String,
    name: Name,
    birth: String!,
    death: String!,
    contribs: [String],
    awards: [Awards]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book],
    bios(skip: Int, limit: Int): [Bios],
    welcome(name: String!): String
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    bios: async ( parent, args ) => {
      const { skip, limit } = args;

      return await findBios( skip, limit );
    },
    welcome: ( parent, args ) => `Welcome ${args.name}`
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
