import React from 'react';
// import PropType from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistname: '',
    loading: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ artistname: value }, () => this.buttonStatus());
  };

  buttonStatus = () => {
    const { artistname } = this.state;
    const minLength = 2;
    if (artistname.length >= minLength) this.setState({ isButtonDisabled: false });
  };

  render() {
    const { isButtonDisabled } = this.state
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          Search
          <form htmlFor="artist-name-input">
            <input
              type="text"
              data-testid="search-artist-input"
              name="artist-name-input"
              placeholder="Artist Name"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              onClick={ this.handleClick }
              disabled={ isButtonDisabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
