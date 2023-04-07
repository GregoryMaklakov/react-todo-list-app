import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Button.module.css";
import { Icon } from "../Icon";
import { ICON_TYPES } from "../Icon";

export const Button = ({
    variant,
    className,
    children,
    onClick,
    disabled,
    size,
    icon,
    fluid,
}) => {
    return (
        <button
            className={clsx(
                className,
                styles.button,
                styles[`variant-${variant}`],
                styles[`size-${size}`],
                {
                    [styles.hasIcon]: icon && variant !== "icon",
                    [styles.fluid]: fluid,
                }
            )}
            type={onClick ? "button" : "submit"}
            onClick={onClick}
            disabled={disabled}
        >
            {!!icon && <Icon name={icon} />}
            {/* {icon ? <Icon name={icon} className={styles.icon} /> : null} */}
            {variant !== "icon" && <span>{children}</span>}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(["primary", "text", "icon", "danger", "dashed", "mobile"]),
    className: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func,
    disebled: PropTypes.bool,
    size: PropTypes.oneOf(["small", "medium", "large", "mobile"]),
    icon: PropTypes.oneOf(ICON_TYPES),
    fluid: PropTypes.bool,
};

Button.detaultProps = {
    variant: "primary",
};
