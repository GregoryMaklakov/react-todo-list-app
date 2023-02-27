import { Input } from "../components/Input";
import styles from "./App.module.css";
import { useState } from "react";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";

function App({ }) {
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);

  return (
    <div className={styles.container}>
      <Input value={inputValue} onChange={setInputValue} />
      <br />
      <br />

      <div className={styles.buttonsAll}>
        <Checkbox checked={check} onChange={setCheck} icon='IconCheckbox' variant='icon'>
          Done
        </Checkbox>
        <Button className={styles.buttonPrimary} variant="primary">
          Button
        </Button>
        <Button className={styles.buttonText} variant="text">
          Add New Task
        </Button>
        <Button
          className={styles.buttonIcon}
          variant="icon"
          icon="IconAdd"
          size="large"
        ></Button>
        <Button
          className={styles.buttonIcon}
          variant="icon"
          icon="IconMore"
          size="medium"
        ></Button>
        <Button
          className={styles.buttonIcon}
          variant="icon"
          icon="IconClose"
          size="medium"
        ></Button>
        <Button
          className={styles.buttonIcon}
          variant="icon"
          icon="IconArrow"
          size="medium"
        ></Button>
        <Button
          className={styles.buttonIcon}
          variant="icon"
          icon="IconDelete"
          size="medium"
        ></Button>
        <Button
          className={styles.buttonIcon}
          variant="icon"
          icon="IconEdit"
          size="medium"
        ></Button>
      </div>
    </div>
  );
}

export default App;
