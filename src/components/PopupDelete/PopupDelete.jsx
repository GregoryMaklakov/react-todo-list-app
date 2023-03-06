import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./PopupDelete.module.css";
import { Popup } from "../Popup/";
import { Button } from "../Button/";
import { useState } from 'react'

export const PopupDelete = ({ onDeleted, title }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const onClose = () => setIsPopupVisible(!isPopupVisible);
    return (
        isPopupVisible && (
            <Popup className={styles.container}>
                <Button
                    className={styles.popupClose}
                    onClick={onClose}
                    icon="IconClose"
                    variant="icon"
                />
                <p className={styles.popupTitle}>{title}</p>
                <div className={styles.popupButtons}>
                    <Button onClick={onClose} variant="text">
                        Cancel
                    </Button>
                    <Button onClick={onDeleted} variant="danger">
                        Delete
                    </Button>
                </div>
            </Popup>
        )
    );
};

Popup.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
