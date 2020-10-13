import { gql } from '@apollo/client';

export const directorsQuery = gql`
  query directorsQuery($name: String) {
    directors(name: $name) {
      id
      name
      age
      movies {
        name
        id
      }
    }
  }
`;
