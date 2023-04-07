import styles from "./App.module.css";
import video from '../assets/video/05.mp4'
import {
  PopupDelete,
  Button,
  Checkbox,
  EditableButton,
  TodoCard,
  Tag,
  PopupEdit,
} from "../components";
import { useTags } from "../hooks/useTags";
import { useTodos } from "../hooks/useTodos";


function App() {
  const tagsState = useTags();
  const todosState = useTodos(tagsState.activeId);
  //====================================================================
  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video className={styles.video} autoPlay preload='true' playsInline loop controls={false} muted onCanPlay={(e) => e.target.play()}>
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>to do list</h1>
        <Button
          variant="icon"
          icon="IconAdd"
          size="large"
          onClick={() => todosState.setEditTodoId("new")}
        />
      </header>
      <div className={styles.hero}>
        <aside className={styles.aside}>
          <div className={styles.tagsList}>
            {tagsState.data.map((tag) => {
              return (
                <Tag
                  className={styles.tag}
                  key={tag.id}
                  color={tag.color}
                  active={tagsState.activeId === tag.id}
                  isEditable
                  isDeleting={tagsState.deletingId === tag.id}
                  onClick={() => tagsState.toggleActiveId(tag.id)}
                  onSave={(name) => tagsState.update({ ...tag, name })}
                  onDelete={() => tagsState.setDeletingId(tag.id)}
                >
                  {tag.name}
                </Tag>
              );
            })}
          </div>
          <div className={styles.asideAction}>
            <EditableButton
              className={styles.editableButton}
              onSave={tagsState.create}
              icon="IconAdd"
              fluid
            >
              add new value
            </EditableButton>
            <Checkbox
              checked={!todosState.showDone}
              onChange={todosState.handleToggleShowDone}
            >
              Hide Done Task
            </Checkbox>
          </div>
        </aside>
        <div className={styles.todoList}>
          {todosState.todos.map((todo) => {
            return (
              <TodoCard
                key={todo.id}
                done={todo.done}
                text={todo.text}
                title={todo.title}
                onDelete={() => todosState.setDeleteTodoId(todo.id)}
                onDoneChange={(done) => todosState.update({ ...todo, done })}
                onEdit={() => todosState.setEditTodoId(todo.id)}
                tags={tagsState.getParsedTags(todo.tags)}
              ></TodoCard>
            );
          })}
        </div>
        <Button className={styles.mobileBtnAdd}
          variant="mobile"
          icon="IconAdd"
          size="mobile"
          onClick={() => todosState.setEditTodoId("new")}
        />
      </div>

      {/* =========================popups==========================*/}

      {!!todosState.todoEditing && (
        <PopupEdit
          title={todosState.todoEditing?.title}
          text={todosState.todoEditing?.text}
          tags={tagsState.data}
          selectedTags={todosState.todoEditing?.tags}
          onClose={() => todosState.setEditTodoId(null)}
          onSave={
            todosState.editTodoId === "new"
              ? todosState.create
              : todosState.update
          }
        />
      )}

      {tagsState.deletingId && (
        <PopupDelete
          title="Do you really want to delete this tag?"
          onClose={() => tagsState.setDeletingId(null)}
          onDelete={tagsState.delete}
        />
      )}
      {todosState.deleteTodoId && (
        <PopupDelete
          title="Do you really want to delete this task?"
          onClose={() => todosState.setDeleteTodoId(null)}
          onDelete={todosState.delete}
        />
      )}
    </div>
  );
}

export default App;
