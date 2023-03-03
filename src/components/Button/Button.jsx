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
    disebled,
    size,
    icon,
}) => {
    return (
        <button
            className={clsx(
                className,
                styles.button,
                styles[`variant-${variant}`],
                styles[`size-${size}`],
                { [styles.hasIcon]: icon && variant !== "icon" }
            )}
            type={onClick ? "button" : "submit"}
            onClick={onClick}
            disabled={disebled}
        >
            {!!icon && <Icon name={icon} />}
            {/* {icon ? <Icon name={icon} className={styles.icon} /> : null} */}
            {variant !== "icon" && <span>{children}</span>}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(["primary", "text", "icon", "danger", "dashed"]),
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
