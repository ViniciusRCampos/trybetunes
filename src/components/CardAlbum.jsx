import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CardAlbum extends Component {
  render() {
    const { artworkUrl100, artistName, collectionPrice,
      releaseDate, trackCount, collectionId,
      collectionName } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ artistName } />
        <h3>{ artistName }</h3>
        <p>{ collectionPrice }</p>
        <p>{ releaseDate }</p>
        <p>{ trackCount }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          {collectionName}
        </Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artworkUrl100: PropTypes.string,
  artistName: PropTypes.string,
  collectionPrice: PropTypes.number,
  releaseDate: PropTypes.instanceOf(Date),
  trackCount: PropTypes.number,
  collectionId: PropTypes.number,
  collectionName: PropTypes.string,
}.isRequired;
