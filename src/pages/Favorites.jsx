import React from 'react';
// import PropType from 'prop-types';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          Favorites
        </div>
      </div>
    );
  }
}

export default Favorites;
