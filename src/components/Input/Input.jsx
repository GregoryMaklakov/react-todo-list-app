import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Input.module.css";
import { forwardRef } from "react";

export const Input = forwardRef(
    (
        {
            className,
            value,
            onChange,
            disabled,
            placeholder,
            id,
            name,
            type,
            size,
            onBlur,
            onEnterPress,
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
                placeholder={placeholder}
                name={name}
                className={clsx(styles.input, styles[size], className)}
                disabled={disabled}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
            />
        );
    }
);

Input.propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.oneOf(["large", "small"]),
    onBlur: PropTypes.func,
    onEnterPress: PropTypes.func,
};
Input.defaultProps = {
    size: "large",
};
