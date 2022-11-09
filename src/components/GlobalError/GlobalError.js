import React from 'react'
import { Alert } from 'antd'

const GlobalError = () => (
  <div className="movies__alert">
    <Alert
      message="Ooops, something gone wrong"
      showIcon
      description="Please refresh page or contact your administrator"
      type="error"
    />
  </div>
)

export default GlobalError
