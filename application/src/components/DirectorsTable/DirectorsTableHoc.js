import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from '@apollo/react-hoc';

import { directorsQuery } from './queries';

import { styles } from './styles';

const withGraphQL = graphql(directorsQuery, {
  options: ({ name = '' }) => ({
    variables: { name },
  }),
});

export default compose(withStyles(styles), withGraphQL);
