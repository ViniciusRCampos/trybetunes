import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { artworkUrl100, collectionName,
      artistName, music = [] } = this.props;

    return (
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
              <section key={ trackId }>
                <p>{trackName}</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </section>

            );
          })}
        </section>
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;
