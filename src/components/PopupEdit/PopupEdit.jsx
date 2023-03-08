import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./PopupEdit.module.css";
import { Popup } from "../Popup";
import { Button } from "../Button";
import { useState } from "react";
import { Input } from "../Input";
import { Tag } from "../Tag";

export const PopupEdit = ({ onSave, onClose, tags, title, text }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    return (
        isPopupVisible && (
            <Popup className={styles.container}>
                <header className={styles.popupHeader}>
                    <Button
                        className={styles.popupClose}
                        onClick={onClose}
                        variant="text"
                    >
                        Cancel
                    </Button>
                    <Button onClick={onSave}>Save</Button>
                </header>
                <div>
                    <Input />
                </div>
                <div>
                    <Input />
                </div>

                <div>
                    <p>Tags</p>
                    <ul>
                        {tags.map((tag) => {
                            return (
                                <Tag
                                    onClick={() => undefined}
                                    key={tag.id}
                                    name={tag.name}
                                    color={tag.color}
                                ></Tag>
                            );
                        })}
                    </ul>
                </div>
            </Popup>
        )
    );
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
};

PopupEdit.defaultProps = {
    tags: [],
    tags: "",
    title: "",
};
