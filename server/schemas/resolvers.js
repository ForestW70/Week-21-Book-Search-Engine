const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (p, a, context) => {
        if (!context.user) {
            throw new Error('Log in to continue!')
        }

        return await User.findOne({
            _id: context.user._id
        }).populate('savedBooks');
    }
  },

  Mutation: {
    addUser: async (p, newUserData) => {
        const newUser = await User.create(newUserData);
        const token = signToken(newUser);

        return { token, user: newUser }
    },

    login: async (p, { email, password }) => {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Error! Please make sure you are using your correct log-in info and try again!');
        }

        const correctPassword = await user.isCorrectPassword({ password })
        if (!correctPassword) {
            throw new Error('Error! Please make sure you are using your correct log-in info and try again!');
        }

        const token = signToken(user)
        return { token, user }
    },

    saveBook: async (p, { bookId }, context) => {
        if (!context.user) {
            throw new Error('Please log in to save books!')
        }

        // add book if not present already in savedBooks array
        const action = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookId } },
            { new: true }
        );

        return action
    },

    removeBook: async (p, { bookId }, context) => {
        if (!context.user) {
            throw new Error('Please log in to save books!')
        }

        const action = await User.findOneAndRemove(
            { _id: context.user._id },
            { $pull: { savedBooks: bookId } },
            { new: true }
        )

        return action
    }
  },
};

module.exports = resolvers;
