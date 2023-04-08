import styles from "./App.module.css";
import video from "../assets/video/05.mp4";
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const tagsState = useTags();
  const todosState = useTodos(tagsState.activeId);

  // ?========================= ANIMATION ======================================

  const animatedTodo = {
    hidden: {
      opacity: 0,
      delay: 0.3,
      z: 0,
    },
    show: {
      opacity: 1,
      z: 1,
      transition: { staggerChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      delay: 0.3,
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };

  const animatedTag = {
    hidden: { opacity: 0, x: "-100%" },
    show: { opacity: 1, x: 0, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0, x: "-100%", transition: { duration: 0.5 } },
  };

  // ?========================= ANIMATION ======================================

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video
          className={styles.video}
          autoPlay
          preload="true"
          playsInline
          loop
          controls={false}
          muted
          onCanPlay={(e) => e.target.play()}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>To do list</h1>
        <Button
          variant="icon"
          icon="IconAdd"
          size="large"
          onClick={() => todosState.setEditTodoId("new")}
        />
      </header>

      <div className={styles.hero}>
        <aside className={styles.aside}>


          <motion.ul
            className={styles.tagsList}
            variants={animatedTag}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {tagsState.data.map((tag) => {
                return (
                  <motion.li key={tag.id} variants={animatedTag}
                    exit={animatedTag.exit}>
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
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>

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

        <motion.ul
          className={styles.todoList}
          variants={animatedTodo}
          initial="hidden"
          animate="show"
          exitBeforeEnter={true}
        >
          <AnimatePresence positionTransition>
            {todosState.todos.map((todo) => {
              return (
                <motion.li
                  key={todo.id}
                  variants={animatedTodo}
                  exit={animatedTodo.exit}
                  positionTransition={{ ease: "easeInOut", duration: 0.8 }}
                >
                  <TodoCard
                    key={todo.id}
                    done={todo.done}
                    text={todo.text}
                    title={todo.title}
                    onDelete={() => todosState.setDeleteTodoId(todo.id)}
                    onDoneChange={(done) =>
                      todosState.update({ ...todo, done })
                    }
                    onEdit={() => todosState.setEditTodoId(todo.id)}
                    tags={tagsState.getParsedTags(todo.tags)}
                  ></TodoCard>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
        <Button
          className={styles.mobileBtnAdd}
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
