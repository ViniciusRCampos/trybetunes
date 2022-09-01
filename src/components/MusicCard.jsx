import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { trackId, trackName, previewUrl,
      checked, handleCheckbox } = this.props;
    return (
      <section>
        <section key={ trackId }>
          <label
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
          >
            {' '}
            Favorita
            <input
              type="checkbox"
              name="favoriteSong"
              id={ trackId }
              onChange={ handleCheckbox }
              checked={ checked }
            />
          </label>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </section>
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;
