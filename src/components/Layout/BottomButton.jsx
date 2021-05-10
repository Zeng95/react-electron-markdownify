import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ButtomButton({ icon, text, colorClass, handleBtnClick }) {
  return (
    <button
      type="button"
      className={`btn btn-${colorClass} border-0 w-full rounded-0`}
      onClick={handleBtnClick}
    >
      <FontAwesomeIcon title={text} icon={icon} size="lg" className="mr-2" />
      {text}
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
