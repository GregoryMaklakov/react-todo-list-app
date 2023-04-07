import PropTypes from "prop-types";
import styles from "./PopupEdit.module.css";
import { Popup } from "../Popup";
import { Button } from "../Button";
import { useState, useEffect } from "react";
import { Input } from "../Input";
import { Tag } from "../Tag";
import { Textarea } from "../Textarea";


export const PopupEdit = ({
    onClose,
    onSave,
    tags,
    title,
    text,
    selectedTags,
}) => {
    const [state, setState] = useState({
        title: "",
        text: "",
        selectedTags: [],
    });

    useEffect(() => {
        setState({
            title,
            text,
            selectedTags,
        });
    }, []);

    const onInputChange = (key) => (value) => {
        setState((prevState) => ({ ...prevState, [key]: value }));
    };
    const handleSave = () => {
        onSave({ title: state.title, text: state.text, tags: state.selectedTags });
    };

    const onSelectedTagsChange = (tagId) => {
        const shallowCopy = [...state.selectedTags];
        const idx = shallowCopy.findIndex((id) => id === tagId);
        if (idx >= 0) {
            shallowCopy.splice(idx, 1);
        } else {
            shallowCopy.push(tagId);
        }
        setState((prevState) => ({
            ...prevState,
            selectedTags: shallowCopy,
        }));
    };
    return (
        <Popup className={styles.container}>
            <header className={styles.popupHeader}>
                <Button className={styles.popupClose} onClick={onClose} variant="text">
                    Cancel
                </Button>
                <Button disabled={!state.title} onClick={handleSave} variant="primary">
                    Save
                </Button>
            </header>
            <label htmlFor="title" className={styles.inputLabel}>Title</label>
            <Input
                minLength={3}
                maxLength={20}
                placeholder="Add a title..."
                className={styles.input}
                value={state.title}
                onChange={onInputChange('title')}
                id="title"
            />

            <label htmlFor="description" className={styles.inputLabel}>
                Description
            </label>
            <Textarea
                cols={20}
                rows={20}
                minLength={3}
                maxLength={260}
                placeholder="Add a description..."
                className={styles.inputDesc}
                value={state.text}
                id="description"
                onChange={onInputChange("text")}
            />
            <p className={styles.inputLabel}>Tags</p>
            <div className={styles.tagList}>
                {tags.map((tag) => {
                    return (
                        <Tag className={styles.tag}
                            onClick={() => onSelectedTagsChange(tag.id)}
                            key={tag.id}
                            active={state.selectedTags.includes(tag.id)}
                            color={tag.color}
                        >
                            {tag.name}
                        </Tag>
                    );
                })}
            </div>
        </Popup>
    );
};

PopupEdit.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
    text: PropTypes.string,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string,
            color: PropTypes.string,
        })
    ),
    selectedTags: PropTypes.arrayOf(PropTypes.number),
};

PopupEdit.defaultProps = {
    tags: [],
    selectedTags: [],
    text: "",
    title: "",
};
