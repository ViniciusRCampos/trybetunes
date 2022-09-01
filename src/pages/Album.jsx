import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    loading: false,
    musicList: [],
    favoriteList: [],
    artworkUrl100: '',
    collectionName: '',
    artistName: '',
  };

  componentDidMount() {
    this.musics();
  }

  musics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    const favoriteList = await getFavoriteSongs();
    const album = musicList[0];
    const { artworkUrl100, collectionName, artistName } = album;
    this.setState({ musicList,
      loading: false,
      artworkUrl100,
      collectionName,
      artistName,
      favoriteList,
    });
  };

  handleCheckbox = async ({ target }) => {
    const { id } = target;
    const { musicList } = this.state;
    const track = musicList.find((element) => element.trackId === Number(id));
    this.setState({ loading: true }, async () => {
      if (target.checked) await addSong(track);
      const favoriteList = await getFavoriteSongs();
      this.setState({
        favoriteList,
        loading: false,
      });
    });
  };

  render() {
    const { musicList, loading, artworkUrl100,
      collectionName, artistName, favoriteList } = this.state;
    const music = musicList.filter((element) => element.kind === 'song');
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          Album
        </div>
        {loading ? <Loading />
          : (
            <section>
              <section>
                <img
                  src={ artworkUrl100 }
                  alt={ collectionName }
                  id={ collectionName }
                />
                <h2 data-testid="album-name">{ collectionName }</h2>
                <h3 data-testid="artist-name">{ artistName }</h3>
              </section>
              <section>
                { music.map((track) => {
                  const { trackId, trackName, previewUrl } = track;
                  return (
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
                  );
                })}
              </section>
            </section>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;

export default Album;
