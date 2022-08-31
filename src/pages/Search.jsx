import React from 'react';
// import PropType from 'prop-types';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from './Loading';
import CardAlbum from '../components/CardAlbum';

class Search extends React.Component {
  state = {
    artistname: '',
    loading: false,
    isButtonDisabled: true,
    albumlist: [],
    artist: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ artistname: value }, () => this.buttonStatus());
  };

  handleClick = () => {
    const { artistname } = this.state;
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(artistname);
      this.setState(
        { artist: artistname,
          albumlist: albums,
          loading: false,
          artistname: '' },
        () => this.buttonStatus(),
      );
    });
  };

  buttonStatus = () => {
    const { artistname } = this.state;
    const minLength = 2;
    if (artistname.length >= minLength) this.setState({ isButtonDisabled: false });
  };

  render() {
    const { isButtonDisabled, loading, albumlist, artist } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          Search
          { loading ? <Loading />
            : (
              <section>
                <form htmlFor="artist-name-input">
                  <input
                    type="text"
                    data-testid="search-artist-input"
                    name="artist-name-input"
                    placeholder="Artist or Band"
                    onChange={ this.handleChange }
                  />
                  <button
                    type="submit"
                    data-testid="search-artist-button"
                    onClick={ this.handleClick }
                    disabled={ isButtonDisabled }
                  >
                    Pesquisar
                  </button>
                </form>
              </section>)}
        </div>
        {!albumlist.length ? 'Nenhum álbum foi encontrado'
          : (
            <section>
              <p>{`Resultado de álbuns de: ${artist}`}</p>
              { albumlist.map(
                (element) => (
                  <div key={ element.collectionId }>
                    <CardAlbum
                      { ...element }
                    />
                  </div>
                ),
              )}
            </section>
          )}

      </div>
    );
  }
}
export default Search;
