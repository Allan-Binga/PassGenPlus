import React, { useState } from 'react'
import {toast, ToastContainer} from 'react-toastify'
import './App.css';
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './characters'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message';

function App() {
  const [password, setPassword] = useState('')
  const[passwordLength, setPasswordLength]= useState(20)
  const[includeUppercase, setIncludeUppercase] = useState(false)
  const[includeLowercase, setIncludeLowercase] = useState(false)
  const[includeNumbers, setIncludeNumbers] = useState(false)
  const[includeSymbols, setIncludeSymbols] = useState(false)

  const handlegeneratePassword = (e) => {
    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
      notify('Select at least one option!',true)
    }
    let characterList = ''

    if(includeLowercase){
      characterList = characterList + lowerCaseLetters
    }

    if(includeUppercase){
      characterList = characterList + upperCaseLetters
    }

    if(includeNumbers){
      characterList = characterList + numbers
    }

    if(includeSymbols){
       characterList = characterList + specialCharacters
    }
    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length
    for(let i=0; i < passwordLength; i++){
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () =>{
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    }else{
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    }
  
  }

  const handleCopyPassword = (e) =>{
    if(password === ''){
      notify('Nothing to copy : (', true)
    }else{
      copyToClipboard()
      notify(COPY_SUCCESS)
    } 
  }
  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator__header">
            Password Generator
          </h2>
          <div className="generator__password">
            <h3>{password}</h3>
            <button onClick={handleCopyPassword}className="copy__btn">
              <i className="far fa-clipboard"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">Password Length</label>
            <input defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)}type="number" id="password-length" name="password-strength" max="20" min="10"></input>
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Include Uppercase letters</label>
            <input checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)}type="checkbox" id="uppercase-letters" name="uppercase-letters" ></input> 
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Include Lowercase letters</label>
            <input checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)}type="checkbox" id="lowercase-letters" name="lowercase-letters" ></input>
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input  checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)}type="checkbox" id="include-numbers" name="include-numbers" ></input>
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input  checked={includeSymbols} onChange={(e) => setIncludeSymbols (e.target.checked)} type="checkbox" id="include-symbols" name="Include-symbols" ></input>
          </div>
          <button onClick={handlegeneratePassword}className="generator__btn">Generate Password</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
