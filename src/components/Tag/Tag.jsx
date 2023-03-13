import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect } from "react";
import styles from "./Tag.module.css";
import { ColorDot } from "../ColorDot";
import { useEditable } from "../../hooks/useEditable";
import { Button } from "../Button/";
import { Input } from "../Input";

export const Tag = ({
    children,
    onClick,
    onSave,
    color,
    active,
    onDelete,
    className,
    isEditable,
}) => {
    const {
        inputRef,
        isInputActive,
        handelSave,
        onChange,
        value,
        setIsInputActive,
    } = useEditable({
        onSave,
    });
    useEffect(() => {
        onChange(children);
    }, [children]);

    const renderEditableContent = () => {
        if (isEditable && isInputActive) {
            return (
                <Input
                    className={styles.input}
                    ref={inputRef}
                    onBlur={handelSave}
                    value={value}
                    onChange={onChange}
                    size="small"
                    onEnterPress={handelSave}
                />
            );
        }
        if (isEditable && !isInputActive) {
            return (
                <div className={styles.actions}>
                    <Button
                        className={styles.actionButton}
                        variant="icon"
                        size="small"
                        icon="IconEdit"
                        onClick={() => setIsInputActive(true)}
                    />
                    <Button
                        className={styles.actionButton}
                        variant="icon"
                        size="small"
                        icon="IconDelete"
                        onClick={onDelete}
                    />
                </div>
            );
        }
        return null;
    };


    return (
        <div
            className={clsx(styles.container, className, { [styles.active]: active })}
        >
            <div className={styles.inner}>
                <ColorDot className={styles.color} color={color}></ColorDot>
                <button
                    aria-label="tag-button"
                    className={styles.button}
                    onClick={onClick}
                />
                <span className={styles.text}>{children}</span>
            </div>
            {renderEditableContent()}
        </div>
    );
};

Tag.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
    color: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
    isEditable: PropTypes.bool,
    onSave: PropTypes.func,
};
