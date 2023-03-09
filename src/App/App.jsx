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
import { useTags } from '../hooks/useTags';

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

  const tagsState = useTags();
  //сохранять todo id(edit)
  const [editTodoId, setEditTodoId] = useState(null);
  const [deleteTodoId, setDeleteTodoId] = useState(null);

  //Удалять теги
  // const [deleteTagId, setDeleteTagId] = useState(null);

  // //Tags
  // const [activeTagId, setActiveTagId] = useState(null);
  // // ======
  // const [inputValue, setInputValue] = useState("");
  // const [check, setCheck] = useState(false);
  // const [done, onDoneChange] = useState(false);
  // const [onDelete, setOnDelete] = useState(false);

  //кашируем наш todos
  const todoEditing = useMemo(() => {
    if (editTodoId === "new") {
      return {};
    }
    return todos.find(({ id }) => id === editTodoId);
  }, [editTodoId, todos]);

  const onSaveTodo = (newTodo) => {
    editItemInArray({
      item: { id: editTodoId, ...newTodo },
      list: todos,
      setState: setTodos,
      onCleanup: setEditTodoId,
    });
  };

  const onDeleteTodo = () =>
    deleteItemFromArray({
      list: todos,
      id: deleteTodoId,
      setState: setTodos,
      onCleanUp: setDeleteTodoId,
    });
  //====================================================================
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
              tags={tagsState.getParsedTags(todo.tags)}
            ></TodoCard>
          );
        })}
      </div>

      {/* открываем попап edit */}
      {!!todoEditing && (
        <PopupEdit
          title={todoEditing?.title}
          text={todoEditing?.text}
          tags={tagsState.data}
          selectedTags={todoEditing?.tags}
          onClose={() => setEditTodoId(null)}
          onSave={editTodoId === "new" ? onCreateTodo : onSaveTodo}
        />
      )}

      <div className={styles.container}>
        <div>
          {tagsState.data.map((tag) => {
            return (
              <Tag
                key={tag.id}
                color={tag.color}
                active={tagsState.activeId === tag.id}
                isEditable
                onClick={() => tagsState.setActiveId(tag.id)}
                onSave={(name) => tagsState.update({ ...tag, name })}
                onDelete={() => tagsState.setDelitingId(tag.id)}
              >
                {tag.name}
              </Tag>
            );
          })}
        </div>

        <EditableButton onSave={tagsState.create} icon="IconAdd">
          add new value
        </EditableButton>

        {tagsState.delitingId && (
          <PopupDelete
            title="Do you really want to delete this tag?"
            onClose={() => tagsState.setDelitingId(null)}
            onDelete={tagsState.delete}
          />
        )}

        {deleteTodoId && (
          <PopupDelete
            title="Do you really want to delete this tag?"
            onClose={() => setDeleteTodoId(null)}
            onDelete={onDeleteTodo}
          />
        )}
      </div>
    </>
  );
}

export default App;
