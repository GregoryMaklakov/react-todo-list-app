import { useCallback, useState } from 'react';
import uniqolor from 'uniqolor';
import { editItemInArray } from '../utils/editItemInArray';
import { deleteItemFromArray } from '../utils/deleteItemFromArray';


export const useTags = () => {
    const [tags, setTags] = useState([
        { id: 1, color: 'blue', name: 'work' },
        { id: 2, color: 'green', name: 'study' },
        { id: 3, color: 'red', name: 'family' },
    ]);

    const [delitingId, setDelitingId] = useState(null);
    const [activeId, setActiveId] = useState(null);

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
                id: delitingId,
                setState: setTags,
                onCleanup: setDelitingId,
            }),
        [tags],
        delitingId,
        setTags,
        setDelitingId
    );

    const onCreateNewTag = useCallback(
        async (name) => {
            const newTag = {
                id: Date.now(),
                name,
                color: uniqolor.random({
                    saturation: [50, 70],
                    lightness: [70, 80],
                    differencePoint: 50,
                }).color,
            };
            setTags((prevState) => [...prevState, newTag]);
            return true;
        },
        [setTags]
    );

    return {
        data: tags,
        setData: setTags,
        activeId,
        delitingId,
        setDelitingId,
        setActiveId,
        getParsedTags,
        create: onCreateNewTag,
        delete: onDeleteTag,
        update: onSaveTag,
    };
};