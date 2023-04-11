import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./TodoCard.module.css";
import { Button } from "../Button";
import { ColorDot } from "../ColorDot";
import { Checkbox } from "../Checkbox";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TodoCard = ({
    text,
    title,
    tags,
    onDelete,
    onEdit,
    done,
    onDoneChange,
    className,
}) => {
    // Анимация for backdropFilter
    const [isDelayed, setIsDelayed] = useState(false);
    const animatedCard = {
        hidden: { opacity: 0, backdropFilter: "none" },
        show: {
            opacity: 1,
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            transition: { staggerChildren: 0.4, duration: 1.5 },
        },
        delayed: {
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
            },
        },
        transition: {
            type: "spring",
            damping: 30,
        },
    };

    useEffect(() => {
        setTimeout(() => {
            setIsDelayed(true);
        }, 300);
    }, []);

    return (
        <motion.div
            className={clsx(
                done ? styles.cardTodoChecked : styles.cardTodo,
                className
            )}
            animate={isDelayed ? "delayed" : "show"}
            variants={animatedCard}
            initial="hidden"
        >
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
            <p className={styles.text}>{text}</p>
            <div className={clsx(styles.footer)}>
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
            </div>
        </motion.div>
    );
};

TodoCard.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDoneChange: PropTypes.func.isRequired,
    done: PropTypes.bool,
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
    done: false,
};
