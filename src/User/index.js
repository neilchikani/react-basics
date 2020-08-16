import React, { useState, useEffect } from 'react';
import Card from '../Card/index';
import { requestAPI } from '../Hook/Request';

export default function UserList() {
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    (async () => {
      const { json, error } = await requestAPI(
        'https://apertum-interview.herokuapp.com/api/users',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (json) {
        setData(json);
        setMainData(json);
      }
      console.log(error);
    })();
  }, []);
  const handleCheckBoxChange = (event) => {
    const checkbox = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    if (checkbox.length > 0) {
      const selectedCboxes = Array.prototype.slice
        .call(checkbox)
        .map((ch) => ch.value);
      const condition = selectedCboxes.join(' && ');
      const filterData = [...mainData]
        .map((value) => {
          let newValue = Object.assign({}, value);
          return newValue;
        })
        .filter((item) => {
          const { age, firstName, lastName } = item;
          const fullName = firstName.length + lastName.length;
          return eval(condition);
        });
      setData(filterData);
    } else {
      setData(mainData);
    }
  };
  if (data.length > 0) {
    return (
      <>
        <div>
          <h2> filter</h2>
          <div>
            <input
              value="age > 20"
              type="checkbox"
              onChange={handleCheckBoxChange}
            />
            {'age >= 20'}
          </div>
          <div>
            <input
              value="age < 30"
              type="checkbox"
              onChange={handleCheckBoxChange}
            />
            {'age<30'}
          </div>
          <div>
            <input
              value="fullName >= 10"
              type="checkbox"
              onChange={handleCheckBoxChange}
            />
            {'fullName >= 10'}
          </div>
        </div>
        <div className="userList">
          {data.map((user) => {
            return <Card key={user.accountId} user={user} />;
          })}
        </div>
      </>
    );
  }
  return null;
}
