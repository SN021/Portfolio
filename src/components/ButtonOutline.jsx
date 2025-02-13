import React from 'react'
// node modules
import PropTypes from 'prop-types'

const ButtonOutline = ({
  href,
  target = '_self',
  label,
  icon,
  classes

}) => {
  if(href){
    return(
      <a 
        href={href}
        target={target}
        className={'btn btn-outline ' + classes}
      >
        {label}
        {icon? <span className='material-symbols-rounded' aria-hidden='true'>{icon}</span> : undefined}
      </a>
    )
  }

  else {
    return(
      <button
        className={'btn btn-outline ' + classes}
      >
        {label}
        {icon? <span className='material-symbols-rounded' aria-hidden='true'>{icon}</span> : undefined}
      </button>
    )
  }
}

ButtonOutline.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string
}

export {
  ButtonOutline
}