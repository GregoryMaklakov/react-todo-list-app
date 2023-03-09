export const editItemInArray = async ({
    list,
    item,
    setState,
    onCleanup,
    extraConditional = true,
}) => {
    const copy = [...list];
    const idx = copy.findIndex(({ id }) => id === item.id);
    if (idx >= 0 && extraConditional) {
        copy.splice(idx, 1, item);
        setState(copy);
        if (onCleanup) onCleanup(null);
        return true;
    }
    return false;
};
