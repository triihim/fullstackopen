require("dotenv").config();
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./schemas/book");
const Author = require("./schemas/author");
const User = require("./schemas/user");
const jwt = require("jsonwebtoken");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
process.on("SIGINT", function() {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected on app termination");
    process.exit(0);
  });
});

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),

    authorCount: () => Author.countDocuments(),

    allAuthors: () => Author.find({}),

    allBooks: async (root, args) => {
      const filter = {};
      if(args.author) filter.author = args.author;
      if(args.genre) filter.genre = args.genre;
      return Book.find(filter).populate("author");
    },

    me: (root, args, context) => context.currentUser

  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if(!currentUser) throw new Error("Unauthorized");
      let author = await Author.findOne({name: args.author});
      if(!author) {
        author = new Author({ name: args.author });
        await author.save();
      }
      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch(e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
      return book;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if(!currentUser) throw new Error("Unauthorized");
      const author = await Author.findOne({ name: args.name });
      if(!author) return null;
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch(e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
      return author;
    },

    createUser: async (root, args) => {
      const user = new User(args);
      try {
        await user.save();
      } catch(e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
      return user;
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      if(!user) throw new UserInputError("Invalid username");
      if(password !== process.env.GLOBAL_PASSWORD) throw new UserInputError("Invalid password");
      const userForToken = {
        username: user.username,
        id: user._id.toString()
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }

  },

  Author: {
    bookCount: (root) => Book.countDocuments({ author: root.id })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
