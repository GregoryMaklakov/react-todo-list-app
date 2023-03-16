import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./copy.module.css";
import { Icon } from "../Icon";


export const Checkbox = ({ className, children, checked, onChange }) => {
    return (
        <label className={clsx(styles.container, className)}>
            <input
                type="checkbox"
                hidden=''
                className={styles.checkboxInput}
                checked={checked}
                onChange={() => onChange(!checked)}
            />
            <span className={styles.checkboxLabel}>
                {/* <span className={styles.checkboxIcon}>
                    <Icon name='IconCheckbox' />
                </span> */}
            </span>
            <span className={styles.checkboxText}>{children}</span>
        </label>
    );
};

Checkbox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
};

