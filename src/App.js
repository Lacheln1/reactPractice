import React,{useRef, useReducer,useMemo,useCallback} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';


function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user=>user.active).length;
}

const initialState={
  inputs:{
    username:'',
    email:'',
  },
  users:[
    {
        id: 1,
        username:'lacheln',
        email:'psio@naver.com',
        active : true,
    },
    {
        id:2,
        username:'test1',
        email: 'test@naver.com',
        active : false,
    },
    {
        id:3,
        username:'test2',
        email:'test2@naver.com',
        active : false
    }
]
}

function reducer(state,action){
  switch (action.type){
    case'change_input':
    return {
      ...state,
      inputs:{
        ...state.inputs,
        [action.name] : action.value
      }
    };
    case 'create_user':
      return {
        inputs:initialState.inputs,
        users: state.users.concat(action.user)
      }
    default:
      throw new Error('unhandled')
  }
}

function App() {
  const [state,dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const {users} = state;
  const{username,email} = state.inputs;
  const onChange = useCallback(e=>{
    const {name,value} = e.target;
    dispatch({
      type:'change_input',
      name,
      value
    })
  },[]);

  const onCreate = useCallback(()=>{
    dispatch({
      type : 'create_user',
      user:{
        id:nextId.current,
        username,
        email,
      }
    });
    nextId.current+=1;
  },[username,email])
  return (
    <>
    <CreateUser 
    username={username} 
    email={email} 
    onChange={onChange}
    onCreate={onCreate} />

    <UserList users={users}/>
    <div>활동 사용자 수 : 0 </div>
  
    </>
   
  );
}

export default App;
