import React from 'react'
import { Pagination as Pag } from 'antd'
import PropTypes from 'prop-types'

const Pagination = ({ total, onChange, current }) => {
  if (current) {
    return (
      <div className="movies__pagination">
        <Pag
          defaultCurrent={1}
          total={total}
          current={current}
          pageSize={20}
          onChange={(page) => onChange(page)}
          showSizeChanger={false}
          hideOnSinglePage
        />
      </div>
    )
  }
  return (
    <div className="movies__pagination">
      <Pag
        defaultCurrent={1}
        total={total}
        pageSize={20}
        onChange={(page) => onChange(page)}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </div>
  )
}

export default Pagination

Pagination.defautProps = { total: 0, onChange: () => null, current: 1 }

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  current: PropTypes.number,
}
