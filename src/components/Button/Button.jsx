import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Button.module.css";
import { Icon } from "../icon2";
import { ICON_TYPES } from "../icon2";

export const Button = ({
    variant,
    className,
    children,
    onClick,
    disebled,
    size,
    icon,
}) => {
    return (
        <button
            className={clsx(
                styles.button,
                styles[`variant-${variant}`],
                styles[`size-${size}`],
                className
            )}
            type={onClick ? "button" : "submit"}
            onClick={onClick}
            disabled={disebled}
        >
            {children}
            {icon ? <Icon name={icon} className={styles.icon} /> : null}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(["primary", "text", "icon"]),
    className: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func,
    disebled: PropTypes.bool,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    icon: PropTypes.oneOf(ICON_TYPES),
};

Button.detaultProps = {
    variant: "primary",
};
