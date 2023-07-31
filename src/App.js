import React,{useRef, useReducer,useMemo,useCallback, createContext} from 'react';
import { produce } from 'immer';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';



function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user=>user.active).length;
}

const initialState={
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
    case 'create_user':
      return produce(state,draft=>{
        draft.users.push(action.user);
      })
      // return {
      //   inputs:initialState.inputs, 
      //   users: state.users.concat(action.user)
      // };

    case 'toggle_user':
      return produce(state,draft=>{
        const user = draft.users.find(user=>user.id===action.id);
        user.active = !user.active;
      })
      // return{
      //   ...state,
      //   users:state.users.map(user=>
      //     user.id===action.id ? {...user,active: !user.active} : user)
      // };

    case 'remove_user':
      return produce(state,draft=>{
        const index = draft.users.findIndex(user=>user.id===action.id);
        draft.users.splice(index,1);
      })
      // return {
      //   ...state, users: state.users.filter(user=>user.id != action.id)
      // };

    default:
      throw new Error('unhandled')
  }
}

export const UserDispatch = createContext(null);

function App() {
  const [state,dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username : '',
    email: '',
  });

  const {username,email} = form;
  const nextId = useRef(4);
  const {users} = state;

  

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
    reset();
  },[username,email,reset]);



  const count = useMemo(()=>countActiveUsers(users),[users])
  return (
    <UserDispatch.Provider value={dispatch}>
    <CreateUser 
    username={username} 
    email={email} 
    onChange={onChange}
    onCreate={onCreate} />

    <UserList users={users}/>
    <div>활동 사용자 수 : {count} </div>
  
    </UserDispatch.Provider>
  
  );
}

export default App;
