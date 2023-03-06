import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./TodoCard.module.css";
import { Button } from "../Button";
import { ColorDot } from "../ColorDot";
import { Checkbox } from "../Checkbox";

export const TodoCard = ({
    text,
    title,
    tags,
    onDelete,
    onEdit,
    done,
    onDoneChange,
}) => {
    return (
        <div className={clsx(styles.cardTodo)}>
            <header className={styles.cardHeader}>
                <h2 className={clsx(styles.title)}>{title}</h2>
                <div className={clsx(styles.headerButtons)}>
                    <Button
                        className={styles.cardBtn}
                        variant="icon"
                        icon="IconEdit"
                        onClick={onEdit}
                    />
                    <Button
                        className={styles.cardBtn}
                        variant="icon"
                        icon="IconDelete"
                        onClick={onDelete}
                    />
                </div>
            </header>
            <p className={done ? styles.textChecked : styles.text}>{text}</p>
            <footer className={clsx(styles.footer)}>
                <div className={clsx(styles.colorWrraper)}>
                    {tags.map(({ color, id }) => (
                        <ColorDot className={styles.colorTag} key={id} color={color} />
                    ))}
                </div>
                <Checkbox
                    className={clsx(styles.cardCheckbox)}
                    checked={done}
                    onChange={onDoneChange}
                >
                    Done
                </Checkbox>
            </footer>
        </div>
    );
};

TodoCard.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDoneChange: PropTypes.func.isRequired,
    done: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            color: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
};

TodoCard.defaultTypes = {
    tags: [],
};
