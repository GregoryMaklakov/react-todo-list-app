import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./ColorDot.module.css";

export const ColorDot = ({ className, color }) => {
    return (
        <span
            style={{ backgroundColor: color }}
            className={clsx(className, styles.container)}
        ></span>
    );
};

ColorDot.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string.isRequired,
};
