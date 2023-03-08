import styles from "./App.module.css";
import { useState, useEffect, useMemo } from "react";
import {
  Input,
  PopupDelete,
  Button,
  Checkbox,
  EditableButton,
  TodoCard,
  Tag,
  PopupEdit,
} from "../components";
import { deleteItemFromArray, editItemInArray } from '../utils'
import uniqolor from "uniqolor";

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
      done: true,
      tags: [3],
    },
  ]);
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

  //сохранять todo id(edit)
  const [editTodoId, setEditTodoId] = useState(null);
  const [deleteTodoId, setDeleteTodoId] = useState(null);

  //Удалять теги
  const [deleteTagId, setDeleteTagId] = useState(null);

  //Tags
  const [activeTagId, setActiveTagId] = useState(null);
  // ======
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);
  const [done, onDoneChange] = useState(false);
  const [onDelete, setOnDelete] = useState(false);

  //кашируем наш todos
  const todoEditing = useMemo(() => {
    return todos.find(({ id }) => id === editTodoId);
  }, [editTodoId, todos]);

  const getPatsedTags = (tagIds = []) => {
    return tags.filter(({ id }) => tagIds.includes(id));
  };

  //меняем значения тега
  const onSaveTag = async (tag) =>
    editItemInArray({
      item: tag,
      list: tags,
      setState: setTags,
      extraConditional: !tags.some(
        ({ name }) => name.toLowerCase() === tag.name.toLowerCase()
      ),
    });

  const onSaveTodo = (newTodo) =>
    editItemInArray({
      item: newTodo,
      list: todos,
      setState: setTodos,
    });

  const onDeleteTodo = () =>
    deleteItemFromArray({
      list: todos,
      id: deleteTodoId,
      setState: setTodos,
      onCleanUp: setDeleteTodoId,
    });

  const onDeleteTag = () =>
    deleteItemFromArray({
      list: tags,
      id: deleteTagId,
      setState: setTags,
      onCleanUp: setDeleteTagId,
    });

  // создаем новый тег при нажании на editableButton
  const onCreateNewTag = async (name) => {
    const newTag = {
      id: Date.now(),
      name,
      color: uniqolor(name, {
        saturation: [50, 70],
        lightness: [70, 80],
        differencePoint: 50,
      }).color,
    };
    setTags((prevState) => [...prevState, newTag]);
    return true;
  };

  //========================================================================================
  return (
    <>
      <div>
        {todos.map((todo) => {
          return (
            <TodoCard
              key={todo.id}
              done={todo.done}
              onDelete={() => setDeleteTodoId(todo.id)}
              onDoneChange={(done) => onSaveTodo({ ...todo, done })}
              onEdit={() => setEditTodoId(todo.id)}
              text={todo.text}
              title={todo.title}
              tags={getPatsedTags(todo?.tags)}
            ></TodoCard>
          );
        })}
      </div>

      {/* открываем попап рпи нажатии на удалить */}
      {deleteTagId && (
        <PopupDelete
          title="Do you really want to delete this task?"
          onClose={() => setDeleteTagId(null)}
          onDelete={onDeleteTag}
        />
      )}

      {deleteTodoId && (
        <PopupDelete
          title="Do you really want to delete this task?"
          onClose={() => setDeleteTodoId(null)}
          onDelete={onDeleteTodo}
        />
      )}

      {/* открываем попап edit */}
      {editTodoId && (
        <PopupEdit
          title={todoEditing.title}
          text={todoEditing.text}
          tags={getPatsedTags(todoEditing.tags)}
          onClose={setEditTodoId(null)}
          onSave={() => undefined}
        ></PopupEdit>
      )}

      <div className={styles.container}>
        <div>
          {tags.map((tag) => {
            return (
              <Tag
                key={tag.id}
                color={tag.color}
                active={activeTagId === tag.id}
                isEditable
                onClick={() => setActiveTagId(tag.id)}
                onSave={(name) => onSaveTag({ ...tag, name })}
                onDelete={() => setDeleteTagId(tag.id)}
              >
                {tag.name}
              </Tag>
            );
          })}
        </div>

        <EditableButton onSave={onCreateNewTag} icon="IconAdd">
          add new value
        </EditableButton>

        {onDelete && (
          <PopupDelete
            onDeleted={() => setOnDeleted(!onDeleted)}
            title="Do you really want to delete this task?"
          />
        )}
      </div>
    </>
  );
}

export default App;
