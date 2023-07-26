import React,{useRef, useState,useMemo,useCallback} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';


function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user=>user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username:'',
    email:'',
  });
  const {username,email} = inputs;

  const onChange = useCallback (e=>{
    const{name,value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  },[inputs]);
  const [users,setUsers] = useState([
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
]);


const nextId = useRef(4);

const onCreate= useCallback(()=>{
  const user={
    id: nextId.current,
    username,
    email,
  };
  setUsers(users.concat(user));
  setInputs({
    username: '', 
    email:''
  });
  
  nextId.current+=1;
},[username,email,users]);

const onRemove = useCallback(id =>{
  setUsers(users.filter(user=>user.id!==id));
},[username,email,users])

const onToggle = useCallback(id =>{
  setUsers(users.map(
    user=>user.id === id?{...user,active: !user.active}:user
  ));
},[username,email,users]);

const count = useMemo(()=>countActiveUsers(users),users);
  return (
    <>
    <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
    <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    <div>활동 사용자 수 : {count} </div>
  
    </>
   
  );
}

export default App;
