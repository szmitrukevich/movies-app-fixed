import React from 'react'
import { Spin } from 'antd'
import PropTypes from 'prop-types'

const Spinner = ({ loading }) => {
  if (loading) {
    return (
      <div className="movies__loading">
        <Spin tip="Content loading" />
      </div>
    )
  }
  return null
}

export default Spinner

Spinner.defautProps = { loading: true }

Spinner.propTypes = { loading: PropTypes.bool.isRequired }
