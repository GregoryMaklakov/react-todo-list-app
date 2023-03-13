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

    const [hideTodos, setHideTodos] = useState(false);

    const hideDoneTodo = () => {
        const shallowCopy = [...todos];
        const checkTodos = shallowCopy.filter((todo) => !todo.done);
        setHideTodos(!hideTodos);
        setTodos(!hideTodos ? checkTodos : shallowCopy);
    }

    const todoEditing = useMemo(() => {
        if (editTodoId === "new") {
            return {};
        }
        return todos.find(({ id }) => id === editTodoId);
    }, [editTodoId, todos]);

    const onSaveTodo = useCallback(
        (newTodo) =>
            editItemInArray({
                item: { id: editTodoId, ...newTodo },
                list: todos,
                setState: setTodos,
                onCleanup: setEditTodoId,
            }),
        [todos, setTodos, setEditTodoId]
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

        hideDoneTodo,
        create: onCreateTodo,
        delete: onDeleteTodo,
        update: onSaveTodo,
    }
}