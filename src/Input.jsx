import React, { useEffect, useState } from "react";

const Input = ({socket})=>{

useEffect(()=>{
    socket.on("connect", ()=>{
        console.log("works here too")
    })

    socket.on("welcome",(data)=>{
        console.log(data)
    })
},[])

const [input, setInput] = useState({
    name : "",
    answer : ""
})

const handleChange = (e)=>{
    if(e.target.name==="name"){
      setInput((p)=>{
        return {
            ...p,
            [e.target.name] : e.target.value
        }
      })
    }else{
        setInput((p)=>{
            return {
                ...p,
                [e.target.name] : e.target.value
            }
          })
    }
}

const handleClick = ()=>{
    console.log("hi")
    console.log(input.answer + " " + input.name)
    socket.emit("message",input)
    console.log("hellow")
  }

    return(
        <>
<input placeholder="Your name" type="text" onChange={handleChange} value={input.name} name="name"></input>
<br></br>
<input placeholder="answer" type="text" onChange={handleChange} value={input.answer} name="answer"></input>
<br></br>
<button onClick={handleClick}>click</button>
        </>
    )
}

export default Input;