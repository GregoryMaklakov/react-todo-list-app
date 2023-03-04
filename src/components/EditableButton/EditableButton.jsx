import clsx from "clsx";
import PropTypes from "prop-types";
import { Button } from "../Button";
import styles from "./EditableButton.module.css";
import { useState, useRef, useEffect } from "react";
import { ICON_TYPES } from "../Icon/Icon";
import { Input } from '../Input';

export const EditableButton = ({
    className,
    children,
    icon,
    onChange,
    value,
    onSave
}) => {
    const inputRef = useRef(null);

    const [isInputActive, setisInputActive] = useState(false);
    const onBlur = async () => {
        setisInputAvtine(false);
        const ok = await onSave();
        if (ok) {
            setisInputAvtine(false);
            onChange("");
        }
    };

    useEffect(() => {
        if (inputRef && isInputActive) {
            inputRef.current.focus();
        }
    }, [isInputActive, inputRef])
    return (
        <div className={clsx(className)}>
            {isInputActive ? (
                <Input
                    ref={inputRef}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    size="small"
                ></Input>
            ) : (
                <Button
                    onClick={() => setisInputActive(true)}
                    variant="dashed"
                    icon={icon}
                    fluid
                >
                    {children}
                </Button>
            )}
        </div>
    );
};

EditableButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
    icon: PropTypes.oneOf(ICON_TYPES),
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
