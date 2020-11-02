import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import withHocs from './MoviesSearchHoc';

const MoviesSearch = ({
  classes,
  name,
  handleChange,
  handleSearch,
}) => (
  <div className={classes.search}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      onChange={handleChange('name')}
      onKeyPress={handleSearch}
      value={name}
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
    />
    <Button
      onClick={handleSearch}
      variant="contained"
      color="primary"
    >
      Search
    </Button>
  </div>
);

export default withHocs(MoviesSearch);
