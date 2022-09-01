import React from 'react';
// import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    favoriteList: [],
    loading: true,
  };

  componentDidMount() {
    this.favorite();
  }

  favorite = async () => {
    const favoriteList = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteList,
    });
  };

  handleCheckbox = async ({ target }) => {
    const { id } = target;
    const { favoriteList } = this.state;
    const track = favoriteList.find((element) => element.trackId === Number(id));
    this.setState({ loading: true }, async () => {
      if (!target.checked) { await removeSong(track); }
      const updateFavorite = await getFavoriteSongs();
      this.setState({
        favoriteList: updateFavorite,
        loading: false,
      });
    });
  };

  render() {
    const { favoriteList, loading } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          Favorites
        </div>
        {loading ? <Loading />
          : (
            <section>
              { favoriteList.map((track, position) => {
                const { trackId, trackName, previewUrl,
                  artworkUrl100, artistName, collectionName } = track;
                return (
                  <section className="favoritemusic" key={ position }>
                    <img
                      src={ artworkUrl100 }
                      alt={ collectionName }
                    />
                    <p>{`${artistName} - ${collectionName}`}</p>
                    <MusicCard
                      key={ trackId }
                      trackId={ trackId }
                      trackName={ trackName }
                      previewUrl={ previewUrl }
                      handleCheckbox={ this.handleCheckbox }
                      checked={ favoriteList.some(
                        (element) => element.trackId === track.trackId,
                      ) }
                    />
                  </section>
                );
              })}
            </section>
          )}
      </div>
    );
  }
}

export default Favorites;
