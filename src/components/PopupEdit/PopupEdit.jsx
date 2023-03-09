import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./PopupEdit.module.css";
import { Popup } from "../Popup";
import { Button } from "../Button";
import { useState, useEffect } from "react";
import { Input } from "../Input";
import { Tag } from "../Tag";

export const PopupEdit = ({ onSave, onClose, tags, title, text, selectedTags }) => {
    const [state, setState] = useState({
        title: '',
        text: '',
        selectedTags: [],
    });
    useEffect(() => {
        setState({
            title,
            text,
            selectedTags,
        });
    }, []);
    const onInputChange = () => (key) => (value) => {
        setState((prevState) => ({ ...prevState, [key]: value }));
    }

    const handleSave = () => {
        onSave({ title: state.title, text: state.text, tags: state.selectedTags })
    }
    return (
        <Popup className={styles.container}>
            <header className={styles.popupHeader}>
                <Button
                    className={styles.popupClose}
                    onClick={onClose}
                    variant="text"
                >
                    Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
            </header>
            <label htmlFor="title" className={styles.inputLabel}>Title</label>
            <Input value={state.title} id="title" title={title} onChange={onInputChange('title')} />
            <label htmlFor="description" className={styles.inputLabel}>Description</label>
            <Input value={state.text} id="description" text={text} onChange={onInputChange('text')} />
            <div>
                <p>Tags</p>
                <ul>
                    {tags.map((tag) => {
                        return (
                            <Tag
                                onClick={() => undefined}
                                key={tag.id}
                                color={tag.color}
                                active={state.selectedTags.includes(tag.id)}
                            >{tag.name}</Tag>
                        );
                    })}
                </ul>
            </div>
        </Popup>
    )
};

PopupEdit.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
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
    tags: "",
    title: "",
    selectedTags: [],
};
