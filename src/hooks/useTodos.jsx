import { useCallback, useState, useMemo, useEffect } from "react";
import { editItemInArray } from "../utils/editItemInArray";
import { deleteItemFromArray } from "../utils/deleteItemFromArray";

const TODOS_LOCAL_STORAGE = "todosList";

export const useTodos = (activeTagId) => {
    const [todosList, setTodosList] = useState(() => {
        const storageTodos = localStorage.getItem(TODOS_LOCAL_STORAGE);

        if (storageTodos) {
            return JSON.parse(storageTodos);
        } else {
            return [
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
            ];
        }
    });

    useEffect(() => {
        localStorage.setItem(TODOS_LOCAL_STORAGE, JSON.stringify(todosList));
    }, [todosList]);

    const [editTodoId, setEditTodoId] = useState(null);
    const [deleteTodoId, setDeleteTodoId] = useState(null);

    const [showDone, setShowDone] = useState(true);
    const handleToggleShowDone = () => {
        setShowDone(!showDone);
    };

    const todos = useMemo(() => {
        let result = [...todosList];

        if (!showDone) {
            result = todosList.filter((todo) => !todo.done);
        }
        if (activeTagId) {
            result = result.filter(({ tags }) => tags.includes(activeTagId));
        }
        return result;
    }, [todosList, activeTagId, showDone]);

    const onSaveTodo = useCallback(
        (todo) =>
            editItemInArray({
                item: { id: todo.id || editTodoId, ...todo },
                list: todos,
                setState: setTodosList,
                onCleanup: setEditTodoId,
            }),
        [todos, setTodosList, setEditTodoId, editTodoId]
    );

    const todoEditing = useMemo(() => {
        if (editTodoId === "new") {
            return {};
        }
        return todos.find(({ id }) => id === editTodoId);
    }, [editTodoId, todos]);

    const onDeleteTodo = useCallback(
        () =>
            deleteItemFromArray({
                list: todos,
                id: deleteTodoId,
                setState: setTodosList,
                onCleanup: setDeleteTodoId,
            }),
        [todos, setTodosList, deleteTodoId, setDeleteTodoId]
    );

    const onCreateNewTodo = useCallback(
        (todo) => {
            const newTodo = {
                id: Date.now(),
                ...todo,
            };
            setTodosList((prevState) => [...prevState, newTodo]);
            setEditTodoId(null);
        },
        [setTodosList, setEditTodoId]
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
        create: onCreateNewTodo,
        delete: onDeleteTodo,
        update: onSaveTodo,
    };
};
