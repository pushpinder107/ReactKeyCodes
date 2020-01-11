import React from 'react';

const Card = ({header, children, className=''}) =>
  <div className={`card ${className}`}>
    <div className='card-header'>{header}</div>
    <div className='card-body'>
      <div className='card-description'>{children}</div>
    </div>
  </div>;

export default Card;
