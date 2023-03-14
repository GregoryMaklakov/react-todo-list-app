import { useCallback, useState, useMemo } from 'react';
import { editItemInArray } from '../utils/editItemInArray';
import { deleteItemFromArray } from '../utils/deleteItemFromArray';

export const useTodo = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: 'todo 1',
            text: 'text 1',
            done: false,
            tags: [1, 2],
        },
        {
            id: 2,
            title: 'todo 2',
            text: 'text 2',
            done: false,
            tags: [1],
        },
        {
            id: 3,
            title: 'todo 3',
            text: 'text 3',
            done: true,
            tags: [2, 3],
        },
    ]);
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const hideDoneTodos = () => {
        const copyTodos = [...todos];
        const doneTodo = copyTodos.filter((todo) => !todo.done);
        setTodos(doneTodo);
    };

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
            setEditId(null);
        },
        [setTodos]
    );

    const onSaveTodo = useCallback(
        (newTodo) => {
            editItemInArray({
                list: todos,
                item: { id: editId, ...newTodo },
                setState: setTodos,
                onCleanup: setEditId,
            });
        },
        [todos, setTodos, setEditId]
    );

    const onDeleteTodo = useCallback(
        () =>
            deleteItemFromArray({
                list: todos,
                id: deleteId,
                setState: setTodos,
                onCleanup: setDeleteId,
            }),
        [todos, deleteId, setTodos, setDeleteId]
    );

    const todoEditing = useMemo(() => {
        if (editId === 'new') {
            return {};
        }
        return todos.find(({ id }) => id === editId);
    }, [editId, todos]);

    return {
        data: todos,
        setData: setTodos,
        editId,
        deleteId,
        setDeleteId,
        setEditId,
        todoEditing,
        create: onCreateTodo,
        delete: onDeleteTodo,
        update: onSaveTodo,
        hideDoneTodos,
    };
};