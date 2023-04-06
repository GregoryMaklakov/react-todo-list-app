import { useCallback, useState, useEffect } from "react";
import uniqolor from "uniqolor";
import { editItemInArray } from "../utils/editItemInArray";
import { deleteItemFromArray } from "../utils/deleteItemFromArray";

const TAGS_STORAGE_KEY = "tags";

export const useTags = () => {
    const [tags, setTags] = useState(() => {
        const storageTags = localStorage.getItem(TAGS_STORAGE_KEY);
        if (storageTags) {
            return JSON.parse(storageTags)
        } else {
            return [
                { id: 1, color: "#BCB9FF", name: "work" },
                { id: 2, color: "#76B6FF", name: "study" },
                { id: 3, color: "#FF9960", name: "family" },
                { id: 4, color: "#A0EC83", name: "other" },
            ]
        }

    });

    useEffect(() => {
        localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(tags))
    }, [tags]);

    const [deletingId, setDeletingId] = useState(null);
    const [activeId, setActiveId] = useState(null);

    const toggleActiveId = (id) => {
        if (activeId !== id) {
            setActiveId(id)
        } else {
            setActiveId(null)
        }
    }

    const getParsedTags = useCallback(
        (tagIds = []) => {
            return tags.filter(({ id }) => tagIds.includes(id));
        },
        [tags]
    );

    const onSaveTag = useCallback(
        async (tag) =>
            editItemInArray({
                item: tag,
                list: tags,
                setState: setTags,
                extraConditional: !tags.some(
                    ({ name }) => name.toLowerCase() === tag.name.toLowerCase()
                ),
            }),
        [tags, setTags]
    );

    const onDeleteTag = useCallback(
        () =>
            deleteItemFromArray({
                list: tags,
                id: deletingId,
                setState: setTags,
                onCleanup: setDeletingId,
            }),
        [tags, deletingId, setTags, setDeletingId]
    );

    const onCreateNewTag = useCallback(
        async (name) => {
            if (name.length <= 0) {
                return null;
            }
            if (tags.some((tag) => tag.name === name)) {
                alert(`Tag "${name}" already exists!`);
                return null;
            }
            const newTag = {
                id: Date.now(),
                name,
                // color: uniqolor.random({
                //     saturation: [22, 30],
                //     lightness: 54,
                //     differencePoint: 100,
                // }).color,
                color: uniqolor.random({ format: 'hsl' })
                    // { color: "hsl(89, 55%, 60%)", isLight: true }
                    .color,
            };

            setTags((prevState) => [...prevState, newTag]);
            return true;
        },
        // добавили массив tags в зависимости массива колбэков в useCallback, 
        //чтобы функция onCreateNewTag была пересоздана, когда tags меняется.
        [setTags, tags]
    );

    return {
        data: tags,
        setData: setTags,
        activeId,
        deletingId,
        setDeletingId,
        setActiveId,
        getParsedTags,
        create: onCreateNewTag,
        delete: onDeleteTag,
        update: onSaveTag,

        toggleActiveId,
    };
};
