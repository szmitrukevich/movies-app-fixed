import React from 'react'
import PropTypes from 'prop-types'

const GenreItem = ({ result }) => <span className="movies__genre">{result}</span>
export default GenreItem

GenreItem.defautProps = { result: '' }

GenreItem.propTypes = { result: PropTypes.string.isRequired }
