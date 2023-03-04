import styles from "./App.module.css";
import { useState } from "react";
import { Input, PopupDelete, Button, Checkbox, EditableButton, } from "../components";



function App({ }) {
  const [inputValue, setInputValue] = useState("");
  //const [check, setCheck] = useState(false);
  const [newValue, setNewValue] = useState('');

  const onSave = async () => {
    return true;
  }
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Input value={inputValue} onChange={setInputValue} />
      {/* <div className={styles.buttonsAll}>
        <Checkbox checked={check} onChange={setCheck}>
          Done
        </Checkbox>
        <Button className={styles.buttonPrimary} variant="primary">
          Button
        </Button>
        <Button className={styles.buttonDanger} variant="danger">
          Button
        </Button>

        <Button className={styles.buttonDashed} variant="dashed" icon="IconAdd" fluid>
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


      </div> */}
      <Button variant='primary' onClick={() => setIsPopupOpen(true)}>open</Button>


      <EditableButton value={newValue} onChange={setNewValue} onSave={onSave} icon='IconAdd'>add new value</EditableButton>

      {isPopupOpen && <PopupDelete></PopupDelete>}
    </div>
  );
}

export default App;
