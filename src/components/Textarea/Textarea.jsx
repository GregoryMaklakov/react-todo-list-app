import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Textarea.module.css";
import { forwardRef } from "react";

export const Textarea = forwardRef(
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
            maxLength,
            minLength,
        },
        ref
    ) => {
        const onKeyUp = (e) => {
            if (e.keyCode === 13 && onEnterPress) {
                onEnterPress();
            }
        };
        return (
            <textarea
                cols="40"
                rows="5"
                required={true}
                minLength={minLength}
                maxLength={maxLength}
                id={id}
                ref={ref}
                type={type}
                placeholder={placeholder}
                name={name}
                className={clsx(styles.textarea, styles[size], className)}
                disabled={disabled}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
            />
        );
    }
);

Textarea.propTypes = {
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
    minLength: PropTypes.number.isRequired,
    maxLength: PropTypes.number.isRequired,
};
Textarea.defaultProps = {
    size: "large",
};
