import React from 'react';
import css from './index.module.css';

function Card({ user }) {
  return (
    <div className={css.Card}>
      <p>Firstname : {user.firstName}</p>
      <p>Lastname: {user.lastName}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default Card;
