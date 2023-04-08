
import PropTypes from "prop-types";
import styles from "./PopupDelete.module.css";
import { Popup } from "../Popup/";
import { Button } from "../Button/";

export const PopupDelete = ({ onDelete, title, onClose }) => {

    return (
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
                <Button onClick={onDelete} variant="danger">
                    Delete
                </Button>
            </div>
        </Popup>
    );
};

Popup.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    onDelete: PropTypes.func,
    onClose: PropTypes.func,
};
