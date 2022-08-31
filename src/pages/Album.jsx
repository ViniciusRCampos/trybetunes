import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    loading: true,
    musicList: [],
  };

  componentDidMount() {
    this.musics();
  }

  musics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({ musicList, loading: false });
  };

  render() {
    const { musicList, loading } = this.state;
    const music = musicList.filter((element) => element.kind === 'song');
    const album = musicList[0];
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          Album
        </div>
        {loading ? <Loading />
          : (
            <section>
              <MusicCard
                artworkUrl100={ album.artworkUrl100 }
                collectionName={ album.collectionName }
                artistName={ album.artistName }
                music={ music }
              />
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
