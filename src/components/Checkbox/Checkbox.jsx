import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Checkbox.module.css";
import { Icon } from "../Icon";

export const Checkbox = ({ children, checked, onChange }) => {

    return (
        <label className={clsx(styles.container)}>
            <input
                className={styles.checkboxInput}
                checked={checked}
                onChange={() => onChange(!checked)}
                type="checkbox"
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
    children: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

