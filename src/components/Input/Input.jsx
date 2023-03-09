import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Input.module.css";
import { forwardRef } from "react";

export const Input = forwardRef(
    (
        {
            className,
            onChange,
            disabled,
            value,
            size,
            type,
            name,
            onBlur,
            onEnterPress,
            id,
        },
        ref
    ) => {
        const onKeyUp = (e) => {
            if (e.keyCode === 13 && onEnterPress) {
                onEnterPress();
            }
        };
        return (
            <input
                id={id}
                ref={ref}
                type={type}
                name={name}
                className={clsx(styles.input, styles[size], className)}
                disabled={disabled}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
            ></input>
        );
    }
);

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["small", "large"]),
    onBlur: PropTypes.func,
    onEnterPress: PropTypes.func,
};
Input.defaultProps = {
    size: "large",
};
