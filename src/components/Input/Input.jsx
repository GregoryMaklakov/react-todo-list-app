import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Input.module.css";

export const Input = ({ className, onChange, disabled, value }) => {
    return (
        <input
            type="text"
            className={clsx(styles.input, className)}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        ></input>
    );
};

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};
