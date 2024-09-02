import { useState , useCallback ,useEffect, useRef} from 'react'

import './App.css'

function App() {
  
  let [length ,setLength] = useState(8)
  let [numbersAllowed ,setNumbersAllowed] = useState(false)
  let [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback (()=>{

    let pass = "";    
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(charAllowed){
      string += `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`;
    }
    if(numbersAllowed){
      string += "0123456789";
    }

    for(let i=0; i<length; i++){
      let indexInString = Math.round(Math.random() * string.length + 1);
      pass += string.charAt(indexInString);
    }
    
    setPassword(pass);

  } , [length, numbersAllowed, charAllowed])


  const generatePassword = ()=>{
    passwordGenerator();
  }

  useEffect(()=>{
    passwordGenerator();
  } , [length , numbersAllowed, charAllowed])

  // Copy Function
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select(); 
    
    window.navigator.clipboard.writeText(password) 
  } , [password])

  return (
  <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <div className="w-full max-w-xl mx-auto shadow-md shadow-white/20 rounded-lg px-8 py-6 my-8 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black/70">
        <h1 className="text-center text-3xl font-bold mb-10 tracking-wide text-black/70 underline">Password Generator</h1>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Password"
            className="flex-1 py-2 px-4 bg-gray-100 text-gray-800 rounded-md focus:outline-none"
            value={password}
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 hover:bg-black text-white px-4 py-2 rounded-3xl focus:outline-none"
          >
            Copy
          </button>

          <button
            onClick={generatePassword}
            className="bg-blue-500 hover:bg-black text-white px-4 py-2 rounded-3xl focus:outline-none"
          >
            Generate
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 font-semibold">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-black/70">Length: {length}</label>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <label className="flex items-center text-black/70 cursor-pointer">
              <input
                type="checkbox"
                checked={numbersAllowed}
                onChange={() => setNumbersAllowed((prev) => !prev)}
                className="form-checkbox focus:ring-blue-500 h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Numbers</span>
            </label>

            <label className="flex items-center text-black/70 cursor-pointer">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="form-checkbox focus:ring-blue-500 h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default App;