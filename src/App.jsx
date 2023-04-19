
import './App.css'
import { useEffect } from 'react'
import useState from 'react-usestateref';
import { evaluate, format } from 'mathjs'

export default function App() {
  const [fullDisplay, setFullDisplay, fullDisplayRef] = useState("");
  const [display, setDisplay, displayRef] = useState({type: "number", value: "0"});
  const [isMaxInputMessage, setIsMaxInputMessage] = useState(false);

  function handleClick(e) {
    if (e.target.id == "clear") {
      resetState();
    }else if (e.target.className.includes("operator")) {
      updateStateWithOperator(e.target.value);
    }else if (e.target.id == "decimal") {
      updateStateWithDecimal();
    }else if (e.target.id == "equals") {
      calculateOutput();
    }else {
      updateStateWithNumber(e.target.value);
    }
  }

  function resetState() {
    setFullDisplay("");
    setDisplay({type:"number", value:"0"});
  }

  function updateStateWithOperator(operator) {
    if (displayRef.current.type == "output") {
      setFullDisplay(displayRef.current.value);
    }else if (displayRef.current.type == "number") {
      if (displayRef.current.value[displayRef.current.value.length - 1] == ".") {
        setFullDisplay(fullDisplayRef.current + " " + displayRef.current.value.slice(0, -1));
      }else {
        setFullDisplay(fullDisplayRef.current + " " + displayRef.current.value);
      }
    }
    if (displayRef.current.type == "operator" && operator == "-") {
      setDisplay({type: "operator", value: displayRef.current.value + " -"});
    }else {
      setDisplay({type: "operator", value: operator});
    }
  }

  function updateStateWithDecimal() {
    if (displayRef.current.type == "output") {
      setFullDisplay(displayRef.current.value);
      setDisplay({type: "number", value: "0."})
    } else if (displayRef.current.type == "operator") {
      setFullDisplay(fullDisplayRef.current + " " + displayRef.current.value);
      setDisplay({type: "number", value: "0."})
    } else if (displayRef.current.value.indexOf(".") == -1){
      setDisplay({...displayRef.current, value: displayRef.current.value.concat(".")});
    }
  }

  function calculateOutput() {
    if (displayRef.current.type == "output") {
      return;
    }
    let input;
    if (displayRef.current.type == "operator") {
      input = fullDisplayRef.current;
    }else {
      input = fullDisplayRef.current + " " + displayRef.current.value;
    }
    const output = format(evaluate(input), {precision: 5});
    setFullDisplay(input + " = " + output);
    setDisplay({type: "output", value:output});
  }
  
  function updateStateWithNumber(number) {
    //check to see if input is too large to fit display
    const displayWidth = document.getElementById('display').offsetWidth;
    if (displayWidth > 205) {
      setIsMaxInputMessage(true);
      setTimeout(() => {
        setIsMaxInputMessage(false);
      }, 1000);
      return
    }

    if (displayRef.current.type == "output") {
      setFullDisplay("");
    } else if (displayRef.current.type == "operator") {
      setFullDisplay(fullDisplayRef.current + " " + displayRef.current.value);
    }

    if (displayRef.current.value == "0" || displayRef.current.type == "operator" || displayRef.current.type == "output") {
      setDisplay({type: "number", value: number.toString()});
    }else {
      setDisplay({type: "number", value: displayRef.current.value.concat(number)});
    }
  }
  
  useEffect(() => {
    const buttons = document.getElementsByTagName('button');
    for (let button of buttons) {
      button.addEventListener('click', handleClick);
    }
  }, []);

  return (
    <div className="App">
      <div className="Calculator">
        
        <div id="display-outer-container">
          <div id="display-container">
            <div id="full-display">{fullDisplay}</div>
            <div id="display">{isMaxInputMessage ? "MAX INPUT" : display.value}</div>
          </div>
        </div>

        <div className="button-grid">
          <button id="clear" >AC</button>
          <button id="divide" className="operator" value="/" >/</button>
          <button id="multiply" className="operator" value="*" >x</button>
          <button id="seven" value="7" >7</button>
          <button id="eight" value="8" >8</button>
          <button id="nine" value="9" >9</button>
          <button id="subtract" className="operator" value="-" >-</button>
          <button id="four" value="4" >4</button>
          <button id="five" value="5" >5</button>
          <button id="six" value="6" >6</button>
          <button id="add" className="operator" value="+" >+</button>
          <button id="one" value="1" >1</button>
          <button id="two" value="2" >2</button>
          <button id="three" value="3" >3</button>
          <button id="zero" value="0" >0</button>
          <button id="decimal" >.</button>
          <button id="equals" >=</button>
        </div>

      </div>
    </div>
  )
}

