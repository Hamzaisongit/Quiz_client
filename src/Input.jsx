import React, { useEffect, useState } from "react";

const ans = ["hamza","isa","good","great"]
const ansSet = new Set(ans)
let scr = 0;

const Input = ({socket})=>{

//INITIAL SETUP
useEffect(()=>{
    socket.on("connect", ()=>{
        console.log("works here too")
        setFlag("connected")
    })

    socket.on("welcome",(data)=>{
        console.log(data)
    })
},[])

//HOOKS...
const [input, setInput] = useState({
    name : "",
    answer1 : "",
    answer2 : ""
})
const [flag, setFlag] = useState("wait we're connecting...")

const handleChange = (e)=>{
    setInput((p)=>{
        return {
            ...p,
            [e.target.name] : e.target.value
        }
    })
}

const scoreCalc = (str)=>{
    const inputSet = new Set(str.split(",")) 
    

    inputSet.forEach((e)=>{
        console.log(ansSet.has(e))
        ansSet.has(e) ? scr++ : scr=scr-0.5;
    })

    console.log(scr)
}

const handleClick = ()=>{
    scoreCalc(input.answer2)
    console.log("hi")
    console.log({
        ...input,
        score : scr
    })
    socket.emit("message",{
        ...input,
        score : scr
    })
    scr = 0;
    console.log("hellow")
  }


    return(
        <>
<h1>Hamza {flag}</h1>
<input placeholder="Your name" type="text" onChange={handleChange} value={input.name} name="name"></input>
<br></br>
<input placeholder="answer" type="text" onChange={handleChange} value={input.answer} name="answer1"></input>
<br></br>
<textarea placeholder="answer" type="text" onChange={handleChange} value={input.answer} name="answer2" cols={20} style={{resize:'none'}}></textarea>
<br></br>
<button onClick={handleClick}>click</button>
        </>
    )
}

export default Input;