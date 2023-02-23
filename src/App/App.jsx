import { Input } from "../components/Input/Input";
//import styles from "./App.module.css";
import { useState } from 'react';


function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <Input value={inputValue} onChange={setInputValue} />
    </div>
  )
}

export default App
