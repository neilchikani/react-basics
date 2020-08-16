import React from 'react';
import css from './Form.module.css';
export const FormWrapper = ({ children, onSubmit }) => (
  <form className={css.FormWrapper} onSubmit={onSubmit}>
    {children}
  </form>
);

export const InputController = (props) => {
  return <input className={css.InputController} {...props} />;
};

export const Button = ({ type, children, ...rest }) => {
  return (
    <button {...rest} type={type}>
      {' '}
      {children}{' '}
    </button>
  );
};

export const InputWrapper = ({ children }) => {
  return <div className={css.InputWrapper}>{children}</div>;
};
