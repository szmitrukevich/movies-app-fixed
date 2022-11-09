import React from 'react'
import PropTypes from 'prop-types'
import './Movie.css'
import { format } from 'date-fns'
import FilmRate from '../FilmRate'
import GenreList from '../GenreList'

export default class Movie extends React.Component {
  static changeBorderColor = (num) => {
    let border
    if (num < 3) {
      border = '2px solid #E90000'
    }
    if (num >= 3 && num < 5) {
      border = '2px solid #E97E00'
    }
    if (num >= 5 && num < 7) {
      border = '2px solid #E9D100'
    }
    if (num >= 7) {
      border = '2px solid #66E900'
    }
    return border
  }

  static cutOverview = (text, maxSymbols) => {
    if (text.length < maxSymbols) {
      return text
    }

    const shortText = `${text.substring(0, text.lastIndexOf(' ', maxSymbols))}...`
    return shortText
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { originalTitle, releaseDate, overview, posterPath, rate, movieId, genres } = this.props
    const titleStyle = { fontSize: '20px' }

    let convertOverview = Movie.cutOverview(overview, 225)

    if (originalTitle.length > 34) {
      titleStyle.fontSize = '16px'
    }

    if (originalTitle.length > 20) {
      convertOverview = Movie.cutOverview(overview, 190)
    }

    const src = posterPath ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${posterPath}` : '../no-image.png'
    const convertTime = releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : null

    let border = Movie.changeBorderColor(rate)

    return (
      <li className="movies__item">
        <div className="movies__wrapper">
          <div className="movies__img">
            <img
              src={src}
              alt="logo"
            />
          </div>
          <div className="movies__info">
            <div
              className="movies__title"
              style={titleStyle}
            >
              {originalTitle}
            </div>
            <div className="movies__date">{convertTime}</div>
            <GenreList genres={genres} />
            <div
              className="movies__score"
              style={(border = { border })}
            >
              {rate}
            </div>
            <div className="movies__article">{convertOverview}</div>
            <FilmRate movieId={movieId} />
          </div>
        </div>
      </li>
    )
  }
}

Movie.defautProps = {
  movieId: 1,
  originalTitle: '',
  releaseDate: '',
  overview: '',
  posterPath: '../no-image.png',
  rate: '0',
  genres: [],
}

Movie.propTypes = {
  movieId: PropTypes.number.isRequired,
  originalTitle: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  releaseDate: PropTypes.string,
  overview: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  posterPath: PropTypes.string,
  rate: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.number).isRequired,
}
