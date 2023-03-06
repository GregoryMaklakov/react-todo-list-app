import PropTypes from "prop-types";
import clsx from "clsx";
import { useState, useRef, useEffect } from 'react'
import styles from "./Tag.module.css";
import { ColorDot } from "../ColorDot";

export const Tag = ({ children, onClick, onSave, color, active, }) => {
    const [value, setValue] = useState();
    useEffect(() => {
        setValue(children)
    }, [children]);

    const inputRef = useRef(null)
    const [isInputActive, setIsInputActive] = useState(false);
    const onBlur = async () => {
        const ok = await onSave(value);
        if (ok) {
            setIsInputActive(false)
        }
    }

    return <div className={clsx(styles.container, { [styles.active]: active })}>
        <ColorDot color={color}></ColorDot>
        <button onClick={onClick} >
            <span>{children}</span>
        </button>
        <Input ref={inputRef} onBlur={onBlur} value={value} onChange={onChange}></Input>
    </div>;
};

Tag.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
    color: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,

};
