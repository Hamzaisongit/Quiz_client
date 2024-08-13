import React, { useEffect, useState } from "react";
import './Input.css'; // Import the CSS file

const ans = [
  "scissors", "cutter",
  "syringe", "needle",
  "ring", "jewelry",
  "turtle", "tortoise",
  "rainbow", "colors",
  "moon", "crescent",
  "cat", "kitten",
  "burger", "sandwich",
  "monitor", "screen",
  "cupcake", "muffin",
  "cheese", "dairy",
  "christmas-tree", "christmas",
  "hot-air-balloon", "balloon", "airship",
  "sunglasses", "shades",
  "bicycle", "bike",
  "dress", "clothes",
  "traffic-light", "signal", "lights",
  "laptop", "computer",
  "hat", "cap",
  "dog", "puppy",
  "star", "shape",
  "screwdriver", "tool",
  "camera", "photograph",
  "washing-machine", "machine", "washer",
  "headphones", "earphones",
  "truck", "lorry",
  "cola", "soda",
  "cake", "dessert",
  "snake", "serpent",
  "cow", "animal",
  "lipstick", "makeup",
  "necklace", "jewelry",
  "flower", "blossom",
  "lollipop", "candy",
  "lightbulb", "lamp",
  "milk", "drink",
  "mountain", "peak",
  "ant", "insect",
  "fish", "seafood",
  "balloons", "party",
  "books", "reading",
  "glass-of-water", "water", "drink",
  "leaf", "plant",
  "watch", "time",
  "shoes", "heels",
  "cookie", "biscuit",
  "pen", "write",
  "sun", "sunshine",
  "tomato", "vegetable",
  "shirt", "clothes",
  "coffee", "drink",
  "ice-cube", "ice", "cube",
  "chili-pepper", "chili", "pepper",
  "pizza", "food",
  "ice-cream-cone", "ice-cream", "dessert",
  "airplane", "flight",
  "candle", "light",
  "watermelon", "fruit",
  "rose", "flower",
  "trees", "nature",
  "butterfly", "insect"
];

const ansSet = new Set(ans);

const ph2Ans = {
  place1: 8,
  place2: 11,
  place3: 1,
  place4: 3,
  place5: 6,
  place6: 2,
  place7: 9,
  place8: 5,
  place9: 7,
  place10: 4
};

const ph3Ans = {
  q1: 'b',
  q2: 'a',
  q3: 'b',
  q4: 'a',
  q5: 'g',
  q6: 'd',
  q7: 'c',
  q8: 'k'
};

let scr = 0;

const Input = ({ socket }) => {
  // INITIAL SETUP
  useEffect(() => {
    socket.on("connect", () => {
      console.log("works here too");
      setFlag("connected, we're good to GO!!");
    });

    socket.on("recieved",(data)=>{
      window.alert(data)
    })

    socket.on("welcome", (data) => {
      console.log(data);
    });
  }, []);

  // HOOKS...
  const [input, setInput] = useState({
    name: "",
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
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: ""
  });

  const [flag, setFlag] = useState("Please wait, we're connecting...");

  const handleChange = (e) => {
    setInput((p) => {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  };

  const scoreCalc = (str, ph2, ph3) => {
    const inputSet = new Set(str.split(","));
    
    // Phase 1 calculation
    if(Number(str)!=0){
    inputSet.forEach((e) => {
      console.log(ansSet.has(e));
      ansSet.has(e) ? scr++ : (scr = scr - 0.5);
    });}

    console.log(scr);

    // Phase 2 calculation
    for (let i in ph2) {
      if (input[i] !== "") {
        // Convert to numbers for comparison
        Number(ph2[i]) === Number(input[i]) ? scr++ : (scr = scr - 0.5);
      }
    }

    for (let i in ph3) {
      if (input[i] !== "") {
        
        ph3[i] === input[i] ? scr++ : (scr = scr - 0.5);
      }
    }
    
    console.log(scr);
  };

  const handleClick = () => {
    if(Number(input.name) == 0){
      window.alert("please enter a valid name!")
      return
    }
    scoreCalc(input.answer2, ph2Ans, ph3Ans);
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
    <div className="container">
      <h1>{flag}</h1>
      <input
        placeholder="Your name"
        type="text"
        onChange={handleChange}
        value={input.name}
        name="name"
      />

     <h3>Phase 1 :</h3>
     <p>enter spellings of objects displayed..<br></br>all the spellings should be in lower-case, seperated by a comma & without any spaces inbetween..</p>
     
      <textarea
        placeholder={"example: cat,moon,merry-go-round"}
        onChange={handleChange}
        value={input.answer2}
        name="answer2"
        cols={20}
      />
      <h3>Phase 2</h3>
      <p>eneter numbers associated with corresponding building-blocks</p>
      <div>
        <label>E.C., Env., Rubber, Plastic : </label>
        <input
          placeholder="Place 1"
          type="number"
          onChange={handleChange}
          value={input.place1}
          name="place1"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      <div>
        <label>Mech. Drawing Hall: </label>
        <input
          placeholder="Place 2"
          type="number"
          onChange={handleChange}
          value={input.place2}
          name="place2"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      <div>
        <label>TextileTechnology  : </label>
        <input
          placeholder="Place 3"
          type="number"
          onChange={handleChange}
          value={input.place3}
          name="place3"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      <div>
        <label>Chemical Engg. : </label>
        <input
          placeholder="Place 4"
          type="number"
          onChange={handleChange}
          value={input.place4}
          name="place4"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      <div>
        <label>Admission Cell  : </label>
        <input
          placeholder="Place 5"
          type="number"
          onChange={handleChange}
          value={input.place5}
          name="place5"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      <div>
        <label>LRC Block, Library : </label>
        <input
          placeholder="Place 6"
          type="number"
          onChange={handleChange}
          value={input.place6}
          name="place6"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      <div>
        <label>Civil Drawing Hall: </label>
        <input
          placeholder="Place 7"
          type="number"
          onChange={handleChange}
          value={input.place7}
          name="place7"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      <div>
        <label>Main Block, Principal Office, Civil Conference Room, Maths : </label>
        <input
          placeholder="Place 8"
          type="number"
          onChange={handleChange}
          value={input.place8}
          name="place8"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      <div>
        <label>Annexe Building Classroom & Lab., BM : </label>
        <input
          placeholder="Place 9"
          type="number"
          onChange={handleChange}
          value={input.place9}
          name="place9"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      <div>
        <label>Engg., App. Mech., LAA Office : </label>
        <input
          placeholder="Place 10"
          type="number"
          onChange={handleChange}
          value={input.place10}
          name="place10"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
      
      <h3>Phase 3</h3>
      <p>eneter correct option for the Question in <em>lower-case</em></p>
      <div>
        <label>Q1: </label>
        <input
          placeholder="Q1"
          type="text"
          onChange={handleChange}
          value={input.q1}
          name="q1"
        />
      </div>
      <div>
        <label>Q2: </label>
        <input
          placeholder="Q2"
          type="text"
          onChange={handleChange}
          value={input.q2}
          name="q2"
        />
      </div>
      <div>
        <label>Q3: </label>
        <input
          placeholder="Q3"
          type="text"
          onChange={handleChange}
          value={input.q3}
          name="q3"
        />
      </div>
      <div>
        <label>Q4: </label>
        <input
          placeholder="Q4"
          type="text"
          onChange={handleChange}
          value={input.q4}
          name="q4"
        />
      </div>
      <div>
        <label>Q5: </label>
        <input
          placeholder="Q5"
          type="text"
          onChange={handleChange}
          value={input.q5}
          name="q5"
        />
      </div>
      <div>
        <label>Q6: </label>
        <input
          placeholder="Q6"
          type="text"
          onChange={handleChange}
          value={input.q6}
          name="q6"
        />
      </div>
      <div>
        <label>Q7: </label>
        <input
          placeholder="Q7"
          type="text"
          onChange={handleChange}
          value={input.q7}
          name="q7"
        />
      </div>
      <div>
        <label>Q8: </label>
        <input
          placeholder="Q8"
          type="text"
          onChange={handleChange}
          value={input.q8}
          name="q8"
        />
      </div>

      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Input;
