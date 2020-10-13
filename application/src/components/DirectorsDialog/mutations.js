import { gql } from '@apollo/client';

export const deleteDirectorMutation = gql`
  mutation deleteDirector($id: ID) {
    deleteDirector(id: $id) {
      id
    }
  }
`;
