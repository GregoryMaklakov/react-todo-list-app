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
    onSave
}) => {
    const inputRef = useRef(null);

    const [isInputActive, setIsInputActive] = useState(false);
    const [value, setValue] = useState('');
    const onBlur = async () => {
        setIsInputActive(false);
        const ok = await onSave(value);
        if (ok) {
            setIsInputActive(false);
            setValue("");
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
                    onChange={setValue}
                    size="small"
                ></Input>
            ) : (
                <Button
                    onClick={() => setIsInputActive(true)}
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
    onSave: PropTypes.func.isRequired,
};
