import React,{createContext, useContext,useState} from "react";

const myContext = createContext('defaultValue');

function Child(){
    const text = useContext(myContext);
    return <div>안녕하세요 {text}</div>
}

function Parent(){
    return <Child/>
}

function GrandParent(){
    return <Parent />
}

function ContextSample(){
    const [value,setValue] = useState(true);
    return(
        <myContext.Provider value={value ? 'good' : 'bad'}>
            <GrandParent/>
            <button onClick={()=>setValue(!value)}>click me</button>
        </myContext.Provider>
         
    )
}

export default ContextSample;