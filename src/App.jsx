import { useEffect, useState,useRef } from 'react'
import { useCallback } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [char, setChar] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (char) str += "!@$#%^&*()_"

    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(randomIndex);

    }
    setPassword(pass)
  }, [length, char, numberAllowed,setPassword

  ]) // for optimization, and keep it in cache

  const copyPasswordOnClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
      window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=> {
  passwordGenerator()
},[numberAllowed,char,length,passwordGenerator]) // for changing run again fnc 

  return (
    <>
      <div className="bg-gray-600 h-[125px] w-[400px] flex justify-center items-center relative rounded-2xl">
        <div className="absolute top-[8px] w-full flex flex-row items-center justify-between px-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="text-white pt-1.5 pb-1.5 pl-2 border rounded-lg bg-transparent w-full"
            readOnly    
            ref={passwordRef}
          />
          <button onClick={copyPasswordOnClipboard} className="ml-2 bg-black text-white px-3 py-1 rounded-lg">Copy</button>
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="flex items-center justify-items-center mt-9 gap-x-1">
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label >Length :{length}</label>
          </div>
          <div className="flex items-center justify-items-center mt-9 gap-x-1">
                  <input type="checkbox" 
                  defaultChecked ={numberAllowed}
                  onChange={()=> {
                    setNumberAllowed((prev) => !prev)
                  }}
                  />
                  <label htmlFor="">Number</label>
          </div>
          <div className="flex items-center justify-items-center mt-9 gap-x-1">
                  <input type="checkbox" 
                  defaultChecked ={char}
                  onChange={()=> {
                    setChar((prev) => !prev)
                  }}
                  />
                  <label htmlFor="">Char</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
