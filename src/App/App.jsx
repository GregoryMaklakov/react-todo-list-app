import styles from "./App.module.css";
import { useState, useEffect } from "react";
import {
  Input,
  PopupDelete,
  Button,
  Checkbox,
  EditableButton,
  TodoCard,
  Tag,
} from "../components";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);

  const [done, onDoneChange] = useState(false);

  const [onDelete, setOnDelete] = useState(false);
  const [onDeleted, setOnDeleted] = useState(true);

  useEffect(() => {
    return () => setOnDelete(false);
  }, [onDeleted]);

  const onSave = async (value) => {
    return true;
  };

  return (
    <div className={styles.container}>
      <Input value={inputValue} onChange={setInputValue} />
      <div className={styles.buttonsAll}>
        <Checkbox checked={check} onChange={setCheck}>
          Done
        </Checkbox>
        <Button className={styles.buttonPrimary} variant="primary">
          Button
        </Button>
        <Button className={styles.buttonDanger} variant="danger">
          Button
        </Button>

        <Button
          className={styles.buttonDashed}
          variant="dashed"
          icon="IconAdd"
          fluid
        >
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

      <EditableButton onSave={onSave} icon="IconAdd">
        add new value
      </EditableButton>

      {onDelete && (
        <PopupDelete
          onDeleted={() => setOnDeleted(!onDeleted)}
          title="Do you really want to delete this task?"
        />
      )}

      {onDeleted && (
        <TodoCard
          title="Task title 1"
          text="Maecenas libero quis laoreet natoque. Auctor magna urna ipsum amet et. Sem porttitor egestas turpis sem elementum nulla adipiscing mi pulvinar. Vitae sapien volutpat sit sed fames aenean sit. Sit sed adipiscing eget enim et."
          done={done}
          onDelete={() => setOnDelete(!onDelete)}
          onEdit={() => undefined}
          onDoneChange={onDoneChange}
          tags={[]}
        ></TodoCard>
      )}
      <Tag
        color="red"
        isEditable
        active
        onSave={async () => true}
        onEdit={() => undefined}
        onClick={() => undefined}
        onDelete={() => undefined}
      >
        Tag
      </Tag>
    </div>
  );
}

export default App;
