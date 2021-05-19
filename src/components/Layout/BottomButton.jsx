import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ButtomButton({ icon, text, colorClass, handleBtnClick }) {
  return (
    <button
      type="button"
      className={`btn btn-${colorClass} w-100 border-0 rounded-0`}
      onClick={handleBtnClick}
    >
      <FontAwesomeIcon title={text} icon={icon} size="lg" className="me-2" />
      <span>{text}</span>
    </button>
  )
}

ButtomButton.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string,
  colorClass: PropTypes.string,
  handleBtnClick: PropTypes.func
}

ButtomButton.defaultProps = {
  text: '新建'
}

export default ButtomButton
