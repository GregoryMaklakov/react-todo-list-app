import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Checkbox.module.css";
import { Icon } from "../Icon";
import { useState } from 'react'
export const Checkbox = ({ className, children }) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.currentTarget.checked);
    }
    return (
        <label className={clsx(styles.container, className)}>
            <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={checked}
                onChange={handleChange}
            />
            <span className={styles.checkboxLabel}>
                <span className={styles.checkboxIcon}>
                    <Icon name='IconCheckbox' />
                </span>
            </span>
            <span className={styles.checkboxText}>{children}</span>
        </label>
    );
};

Checkbox.propTypes = {
    className: PropTypes.string,
    //checked: PropTypes.bool.isRequired,
    // onChange: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
};

