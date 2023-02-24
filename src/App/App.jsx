import { Input } from "../components/Input/Input";
import styles from "./App.module.css";
import { useState } from 'react';
import { Checkbox } from "../components/Checkbox/Checkbox";


function App({ }) {
  const [inputValue, setInputValue] = useState('');
  const [check, setCheck] = useState(false);

  return (
    <div className={styles.container}>
      <Input value={inputValue} onChange={setInputValue} />
      <br /><br />
      <Checkbox checked={check} onChange={setCheck}>Done</Checkbox>
    </div>
  )
}

export default App
