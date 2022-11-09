import React from 'react'
import PropTypes from 'prop-types'
import './MovieList.css'
import Spinner from '../Spinner/Spinner'
import Movie from '../Movie'
import ErrorMessage from '../ErrorMessage'

const MovieList = ({ moviesData, loading, error }) => {
  let display = 'block'
  if (!moviesData.length) {
    display = 'none'
  }
  let elements = []
  if (moviesData) {
    elements = moviesData.map((item) => {
      const itemData = {
        originalTitle: item.original_title,
        releaseDate: item.release_date,
        overview: item.overview,
        posterPath: item.poster_path,
        rate: item.vote_average.toFixed(1),
        movieId: item.id,
        genres: item.genre_ids ? item.genre_ids : item.genres.map((x) => x.id),
      }

      const { id } = item

      return (
        <Movie
          /* eslint-disable react/jsx-props-no-spreading */
          {...itemData}
          key={id}
        />
      )
    })
  }

  const hasData = !(loading || error)
  const content = hasData ? <div className="movies__grid">{elements}</div> : null

  return (
    <>
      <Spinner loading={loading} />
      <ul
        className="movies__list"
        style={(display = { display })}
      >
        <ErrorMessage error={error} />
        {content}
      </ul>
    </>
  )
}

MovieList.defautProps = {
  moviesData: [],
  loading: true,
  error: false,
}

MovieList.propTypes = {
  moviesData: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
}

export default MovieList
