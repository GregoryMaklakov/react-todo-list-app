export const deleteItemFromArray = ({ list, id, setState, onCleanup }) => {
    const shallowCopy = [...list];
    const idx = shallowCopy.findIndex((item) => id === item.id);
    if (idx >= 0) {
        shallowCopy.splice(idx, 1);
        setState(shallowCopy);
        onCleanup(null);
    }
};