import React from 'react'
import PropTypes from 'prop-types'
import MovieDataContext from '../MovieDataContext'
import GenreItem from '../GenreItem'

export default class GenreList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { genres } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    const { genres: genresList } = this.context.genres

    const elements = genresList
      ? genres.map((id) => {
          const filterById = (item) => {
            if (id === item.id) {
              return true
            }
            return false
          }
          const result = genresList.filter(filterById)[0].name
          return (
            <GenreItem
              key={id}
              result={result}
            />
          )
        })
      : []

    return <div className="movies__genres">{elements}</div>
  }
}
GenreList.contextType = MovieDataContext

GenreList.defautProps = { genres: [] }

GenreList.propTypes = { genres: PropTypes.arrayOf(PropTypes.number).isRequired }
