import React, {useContext,useEffect} from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({ user}) {
    const {username,email,id,active}=user;
    const dispatch = useContext(UserDispatch)
    useEffect(()=>{
      console.log('user값이 설정됨')
      console.log(user);
      return ()=>{
        console.log('user값이 바뀌기전');
        console.log(user);
      }
    },[user]);

  return (
    <div>
        <b style={{
            color : active ? 'green':'black',
            cursor : 'pointer'
        }}
        onClick={()=>dispatch({
          type: 'toggle_user',
          id
        })}
        >
            {username}
        </b>
        &nbsp;
      <span>({email})</span> 
      <button onClick={()=>dispatch({
        type:'remove_user',
        id
      })}>삭제</button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id}  />
      ))}
    </div>
  );
}

export default React.memo(UserList,(prevProps,nextProps)=>nextProps.users===prevProps.users);