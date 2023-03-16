import { useCallback, useState, useMemo } from "react";
import { editItemInArray } from "../utils/editItemInArray";
import { deleteItemFromArray } from "../utils/deleteItemFromArray";

export const useTodos = () => {
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

    const [editTodoId, setEditTodoId] = useState(null);
    const [deleteTodoId, setDeleteTodoId] = useState(null);

    // показать и скрыть done task
    const [showDone, setShowDone] = useState(true);
    const filteredTasks = showDone ? todos : todos.filter(todo => !todo.done);
    const handleToggleShowDone = () => {
        setShowDone(!showDone);
    };

    const todoEditing = useMemo(() => {
        if (editTodoId === "new") {
            return {};
        }
        return todos.find(({ id }) => id === editTodoId);
    }, [editTodoId, todos]);

    const onSaveTodo = useCallback(
        (todo) =>
            editItemInArray({
                item: { id: editTodoId, ...todo },
                list: todos,
                setState: setTodos,
                onCleanup: setEditTodoId,
            }),
        [todos, setTodos, setEditTodoId, editTodoId]
    );

    const onCreateTodo = useCallback(
        (newTodo) => {
            setTodos((prevState) => [
                ...prevState,
                {
                    id: Date.now(),
                    done: false,
                    ...newTodo,
                },
            ]);
            setEditTodoId(null);
        },
        [setTodos]
    );

    const onDeleteTodo = useCallback(
        () =>
            deleteItemFromArray({
                list: todos,
                id: deleteTodoId,
                setState: setTodos,
                onCleanup: setDeleteTodoId,
            }),
        [todos, deleteTodoId, setTodos, setDeleteTodoId]
    );

    return {
        data: todos,
        setData: setTodos,
        todoEditing,
        editTodoId,
        deleteTodoId,
        setDeleteTodoId,
        setEditTodoId,
        handleToggleShowDone,
        filteredTasks,
        showDone,
        create: onCreateTodo,
        delete: onDeleteTodo,
        update: onSaveTodo,
    };
};

    // вернутся к этому методу фильтрации(если handleToggleShowDone не сработает)
    // const hideDoneTodos = () => {
    //     const copyTodos = [...todos];
    //     const doneTodo = copyTodos.filter((todo) => !todo.done);
    //     const unDoneTodo = copyTodos.filter((todo) => todo.done);
    //     switch (setTodos) {
    //         case "done":
    //             setTodos(doneTodo)
    //             break;
    //         case "undone":
    //             setTodos(!unDoneTodo)
    //             break;
    //         default:
    //             setTodos(doneTodo);
    //             break;
    //     }
    // };