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
  //сохранять todo
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Todo 1",
      text: "Text 1",
      done: false,
      tags: [1, 2],
    },
    {
      id: 2,
      title: "Todo 2",
      text: "Text 2",
      done: false,
      tags: [1, 3],
    },
    {
      id: 3,
      title: "Todo 3",
      text: "Text 3",
      done: false,
      tags: [3],
    },
  ]);
  //сохранять todo id(edit)
  const [editTodoId, setEditTodoId] = useState(null);
  //Удалять todo id
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  //Tags
  const [tags, setTags] = useState([
    {
      id: 1,
      color: "blue",
      name: "work",
    },
    {
      id: 2,
      color: "red",
      name: "study",
    },
    {
      id: 3,
      color: "purple",
      name: "family",
    },
  ]);
  const [activeTagId, setActideTagId] = useState(null);
  // ======
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
      <div>
        {tags.map((tag) => {
          return (
            <Tag
              key={tag.id}
              color={tag.color}
              active={activeTagId === tag.id}
              isEditable
              onClick={() => setActideTagId(tag.id)}
              onSave={() => {
                const copy = [...tags];
                const idx = copy.findIndex(({ id }) => id === tag.id);
                //hasMatch проверяем на наличии такого же value в теге
                const hasMatch = tags.some(({ name }) => name === value);
                if (idx >= 0 && !hasMatch) {
                  copy.splice(idx, 1, { ...tag, name: value });
                  setTags(copy);
                  return true;
                }
                return false;
              }}
              onDelete={() => {
                const copy = [...tags];
                const idx = copy.findIndex(({ id }) => id === tag.id);

                if (idx >= 0) {
                  copy.splice(idx, 1);
                  setTags(copy);
                }
              }}
            >
              {tag.name}
            </Tag>
          );
        })}
      </div>
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
          tags={[
            { color: "red", id: 1, name: "red" },
            { color: "blue", id: 2, name: "blue" },
          ]}
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
