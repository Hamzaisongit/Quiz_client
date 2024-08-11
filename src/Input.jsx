import React, { useEffect, useState } from "react";

const ans = ["hamza", "isa", "good", "great"];
const ansSet = new Set(ans);

const ph2Ans = {
    place1: 1,
    place2: 2,
    place3: 3,
    place4: 4,
    place5: 5,
    place6: 6,
    place7: 7,
    place8: 8,
    place9: 9,
    place10: 10,
  };

let scr = 0;

const Input = ({ socket }) => {
  // INITIAL SETUP
  useEffect(() => {
    socket.on("connect", () => {
      console.log("works here too");
      setFlag("connected");
    });

    socket.on("welcome", (data) => {
      console.log(data);
    });
  }, []);

  // HOOKS...
  const [input, setInput] = useState({
    name: "",
    answer1: "",
    answer2: "",
    place1: "",
    place2: "",
    place3: "",
    place4: "",
    place5: "",
    place6: "",
    place7: "",
    place8: "",
    place9: "",
    place10: "",
  });

  const [flag, setFlag] = useState("wait we're connecting...");

  const handleChange = (e) => {
    setInput((p) => {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  };

  const scoreCalc = (str,ph2) => {
    const inputSet = new Set(str.split(","));
    
    //phase1 calculation
    inputSet.forEach((e) => {
      console.log(ansSet.has(e));
      ansSet.has(e) ? scr++ : (scr = scr - 0.5);
    });
    console.log(scr);
    //phase2 calculation
    for(let i in ph2){
        if(input[i]!=""){
            // console.log(ph2[i],ph2[i] == input[i])
            Number(ph2[i]) == Number(input[i]) ? scr++ : (scr = scr - 0.5);
        }
    }
    
    console.log(scr);
  };

  const handleClick = () => {
    scoreCalc(input.answer2,ph2Ans);
    console.log("hi");
    console.log({
      ...input,
      score: scr,
    });
    socket.emit("message", {
      ...input,
      score: scr,
    });
    scr = 0;
    console.log("hellow");
  };

  return (
    <>
      <h1>Hamza {flag}</h1>
      <input
        placeholder="Your name"
        type="text"
        onChange={handleChange}
        value={input.name}
        name="name"
      ></input>
      <br></br>
      <input
        placeholder="answer"
        type="text"
        onChange={handleChange}
        value={input.answer1}
        name="answer1"
      ></input>
      <br></br>
      <textarea
        placeholder="answer"
        type="text"
        onChange={handleChange}
        value={input.answer2}
        name="answer2"
        cols={20}
        style={{ resize: "none" }}
      ></textarea>
      <br></br>
      <h3>Phase 2</h3>
      <br></br>
      <div>
        <label>Place 1: </label>
        <input
          placeholder="Place 1"
          type="number"
          onChange={handleChange}
          value={input.place1}
          name="place1"
        ></input>
        <br></br>
      </div>
      <div>
        <label>Place 2: </label>
        <input
          placeholder="Place 2"
          type="number"
          onChange={handleChange}
          value={input.place2}
          name="place2"
        ></input>
        <br></br>
      </div>
      <div>
        <label>Place 3: </label>
        <input
          placeholder="Place 3"
          type="number"
          onChange={handleChange}
          value={input.place3}
          name="place3"
        ></input>
        <br></br>
      </div>
      <div>
        <label>Place 4: </label>
        <input
          placeholder="Place 4"
          type="number"
          onChange={handleChange}
          value={input.place4}
          name="place4"
        ></input>
        <br></br>
      </div>
      <div>
        <label>Place 5: </label>
        <input
          placeholder="Place 5"
          type="number"
          onChange={handleChange}
          value={input.place5}
          name="place5"
        ></input>
        <br></br>
      </div>
      <div>
        <label>Place 6: </label>
        <input
          placeholder="Place 6"
          type="number"
          onChange={handleChange}
          value={input.place6}
          name="place6"
        ></input>
        <br></br>
      </div>
      <div>
        <label>Place 7: </label>
        <input
          placeholder="Place 7"
          type="number"
          onChange={handleChange}
          value={input.place7}
          name="place7"
        ></input>
        <br></br>
      </div>
      <div>
        <label>Place 8: </label>
        <input
          placeholder="Place 8"
          type="number"
          onChange={handleChange}
          value={input.place8}
          name="place8"
        ></input>
        <br></br>
      </div>
      <div>
        <label>Place 9: </label>
        <input
          placeholder="Place 9"
          type="number"
          onChange={handleChange}
          value={input.place9}
          name="place9"
        ></input>
        <br></br>
      </div>
      <div>
        <label>Place 10: </label>
        <input
          placeholder="Place 10"
          type="number"
          onChange={handleChange}
          value={input.place10}
          name="place10"
        ></input>
        <br></br>
      </div>
      <button onClick={handleClick}>Click</button>
    </>
  );
};

export default Input;
