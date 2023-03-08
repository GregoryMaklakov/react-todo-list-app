export const editItemInArray = async ({ list, item, setState, needMatchKey }) => {
    const copy = [...list];
    const idx = copy.findIndex(({ id }) => id === item.id);
    //hasMatch проверяем на наличии такого же value(имени) в теге
    const hasMatch = copy.some(
        ({ name }) => name.toLowerCase() === tag.name.toLowerCase()
    );
    if (idx >= 0 && needMatchKey && !hasMatch) {
        copy.splice(idx, 1, tag);
        setState(copy);
        return true;
    }
    return false;
}