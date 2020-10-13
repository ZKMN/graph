import { gql } from '@apollo/client';

export const deleteMovieMutation = gql`
  mutation deleteMovie($id: ID) {
    deleteMovie(id: $id) {
      id
    }
  }
`;
