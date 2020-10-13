import { gql } from '@apollo/client';

export const moviesQuery = gql`
  query moviesQuery($name: String) {
    movies(name: $name) {
      id
      name
      genre
      watched
      rate
      director {
        name
        id
      }
    }
  }
`;
