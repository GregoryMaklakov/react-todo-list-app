import { useCallback, useState, useMemo } from "react";
import { editItemInArray } from "../utils/editItemInArray";
import { deleteItemFromArray } from "../utils/deleteItemFromArray";

export const useTodos = (activeTagId) => {
    const [todosList, setTodosList] = useState([
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
    // const filteredTasks = showDone ? todos : todos.filter((todo) => !todo.done);
    const handleToggleShowDone = () => {
        setShowDone(!showDone);
    };

    const todos = useMemo(() => {
        if (!showDone) {
            return todosList.filter((todo) => !todo.done)
        }
        if (activeTagId) {
            return todosList.filter(({ tags }) => tags.includes(activeTagId))
        }
        return todosList;
    }, [todosList, activeTagId, showDone, setShowDone, setEditTodoId])

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
                setState: setTodosList,
                onCleanup: setEditTodoId,
            }),
        [todos, setTodosList, setEditTodoId, editTodoId]
    );

    // without useCallback
    // const onSaveTodo = (todo) =>
    //     editItemInArray({
    //         item: { id: editTodoId, ...todo },
    //         list: todos,
    //         setState: setTodos,
    //         onCleanup: setEditTodoId,
    //     });

    const onCreateTodo = useCallback(
        (newTodo) => {
            setTodosList((prevState) => [
                ...prevState,
                {
                    id: Date.now(),
                    done: false,
                    ...newTodo,
                },
            ]);
            setEditTodoId(null);
        },
        [setTodosList]
    );

    const onDeleteTodo = useCallback(
        () =>
            deleteItemFromArray({
                list: todos,
                id: deleteTodoId,
                setState: setTodosList,
                onCleanup: setDeleteTodoId,
            }),
        [todos, deleteTodoId, setTodosList, setDeleteTodoId]
    );

    return {
        data: todos,
        setData: setTodosList,
        todoEditing,
        editTodoId,
        deleteTodoId,
        setDeleteTodoId,
        setEditTodoId,
        handleToggleShowDone,
        showDone,
        todos,
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
