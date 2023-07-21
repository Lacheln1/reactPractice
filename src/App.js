import React from 'react';


import UserList from './UserList';
import InputSample from './inputSample';


function App() {
  const users = [
    {
        id: 1,
        username:'lacheln',
        email:'psio@naver.com'
    },
    {
        id:2,
        username:'test1',
        email: 'test@naver.com'
    },
    {
        id:3,
        username:'test2',
        email:'test2@naver.com'
    }
];
  return (
   <UserList users={users}/>
  );
}

export default App;
