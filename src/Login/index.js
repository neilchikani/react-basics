import React, { useState, useEffect } from 'react';
import {
  FormWrapper,
  Button,
  InputController,
  InputWrapper,
} from '../Layout/Form';
import UserList from '../User';
import { requestAPI } from '../Hook/Request/index';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    success: false,
    error: false,
    loading: false,
  });
  useEffect(() => {
    if (window.localStorage && window.localStorage.getItem('token')) {
      setFormData({
        success: true,
      });
    }
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      loading: true,
    });
    const { json, error } = await requestAPI(
      'https://apertum-interview.herokuapp.com/api/user/login',
      {
        method: 'POST',
        body: JSON.stringify({
          accountId: formData.username,
          pswd: formData.password,
        }),
      }
    );
    if (json) {
      setFormData({
        ...formData,
        loading: false,
        success: true,
      });
      window.localStorage.setItem('token', json.token);
    }
    if (error) {
      setFormData({
        ...formData,
        loading: false,
        error,
      });
    }
  };
  const onChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { username, password, success, loading, error } = formData;
  if (loading)
    return (
      <div className="loader">
        <h2> Loading.... </h2>
      </div>
    );
  if (success) return <UserList />;
  if (error)
    return (
      <div>
        <h2> Some error has been occured</h2>
      </div>
    );
  return (
    <div className="App">
      <h2> Login </h2>
      <FormWrapper onSubmit={onSubmit}>
        <InputWrapper>
          <InputController
            name="username"
            onChange={onChange}
            value={username}
            type="text"
            placeholder="Username"
          />
        </InputWrapper>
        <InputWrapper>
          <InputController
            name="password"
            onChange={onChange}
            value={password}
            type="password"
            placeholder="Passowrd"
          />
        </InputWrapper>
        <InputWrapper>
          <Button Primary type="submit">
            {' '}
            Submit{' '}
          </Button>
        </InputWrapper>
      </FormWrapper>
    </div>
  );
}

export default Login;
