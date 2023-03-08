export const deleteItemFromArray = ({ list, id, setState, onCleanUp }) => {
    const copy = [...list];
    const idx = copy.findIndex((item) => id === item.id);
    if (idx >= 0) {
        copy.splice(idx, 1);
        setState(copy);
        onCleanUp(null)
    }
}

