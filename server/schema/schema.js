const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/director');
const Serials = require('../models/serial');

const SerialType = new GraphQLObjectType({
  name: 'Serial',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    watched: { type: new GraphQLNonNull(GraphQLBoolean) },
    rate: { type: GraphQLInt },
  })
})

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    watched: { type: new GraphQLNonNull(GraphQLBoolean) },
    rate: { type: GraphQLInt },
		director: {
			type: DirectorType,
			resolve({ directorId }, args) {
				return Directors.findById(directorId);
			}
		}
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
		movies: {
			type: new GraphQLList(MovieType),
			resolve({ id }, args) {
				return Movies.find({ directorId: id });
			},
		},
  }),
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
    addSerial: {
      type: SerialType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
      },
      resolve(parent, { name, genre, watched, rate }) {
        const serial = new Serials({
          name,
					genre,
          watched,
          rate,
        });

        return serial.save();
      }
    },
    updateSerial: {
      type: SerialType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
      },
      resolve(parent, { id, name, genre, watched, rate }) {
        return Serials.findByIdAndUpdate(
          id, 
          { $set: { name, genre, watched, rate } },
          { new: true },
        );
      }
    },
    deleteSerial: {
      type: SerialType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Serials.findByIdAndDelete(id);
      }
    },
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, { name, age }) {
				const director = new Directors({
					name,
					age,
				});
				return director.save();
			},
    },
    deleteDirector: {
			type: DirectorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Directors.findByIdAndRemove(id);
			}
    },
    updateDirector: {
			type: DirectorType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, { id, name, age }) {
				return Directors.findByIdAndUpdate(
					id,
					{ $set: { name, age } },
					{ new: true },
				);
			},
		},
		addMovie: {
			type: MovieType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: GraphQLID },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
			},
			resolve(parent, { name, genre, directorId, watched, rate }) {
				const movie = new Movies({
					name,
					genre,
					directorId,
          watched,
          rate,
				});
				return movie.save();
			},
		},
		deleteMovie: {
			type: MovieType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Movies.findByIdAndRemove(id);
			}
		},
		updateMovie: {
			type: MovieType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: GraphQLID },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
			},
			resolve(parent, { id, name, genre, directorId, watched, rate }) {
				return Movies.findByIdAndUpdate(
					id,
					{ $set: { name, genre, directorId, watched, rate } },
					{ new: true },
				);
			},
		},
	}
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
				return Movies.findById(id);
      },
    },
    movies: {
			type: new GraphQLList(MovieType),
      args: { name: { type: GraphQLString } },
			resolve(parent, { name }) {
				return Movies.find({ name: { $regex: name, $options: "i" } });
			}
		},
		director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
				return Directors.findById(id);
      },
    },
		directors: {
			type: new GraphQLList(DirectorType),
      args: { name: { type: GraphQLString } },
			resolve(parent, { name }) {
				return Directors.find({ name: { $regex: name, $options: "i" } });
			}
    },
    serial: {
      type: SerialType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Serials.findById(id);
      }
    },
    serials: {
      type: new GraphQLList(SerialType),
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return Serials.find({});
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: Query,
	mutation: Mutation,
});
