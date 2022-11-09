import React from 'react'
import { Alert } from 'antd'
import PropTypes from 'prop-types'

const ErrorMessage = ({ error }) => {
  if (error) {
    return (
      <div className="movies__alert">
        <Alert
          message="Ooops, something gone wrong"
          showIcon
          description="Please refresh page or contact your administrator"
          type="error"
        />
      </div>
    )
  }
  return null
}

export default ErrorMessage

ErrorMessage.defautProps = { error: false }

ErrorMessage.propTypes = { error: PropTypes.bool.isRequired }
