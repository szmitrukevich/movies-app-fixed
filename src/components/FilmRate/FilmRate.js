import React from 'react'
import { Rate } from 'antd'
import PropTypes from 'prop-types'
import MovieDataContext from '../MovieDataContext'

export default class FilmRate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onChange = (num) => {
    const { movieId } = this.props
    const { onChangeRated } = this.context
    onChangeRated(num, movieId)
  }

  render() {
    const { movieId } = this.props
    return (
      <div className="movies__rate">
        <Rate
          count={10}
          allowClear={false}
          allowHalf
          defaultValue={+localStorage.getItem(movieId)}
          onChange={this.onChange}
          style={{ fontSize: 14 }}
        />
      </div>
    )
  }
}

FilmRate.contextType = MovieDataContext
FilmRate.defautProps = { movieId: 1 }
FilmRate.propTypes = { movieId: PropTypes.number.isRequired }
