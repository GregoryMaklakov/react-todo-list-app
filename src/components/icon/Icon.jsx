import PropTypes from "prop-types";
import styles from "./Icon.module.css";

export const ICON_TYPES = [
    "IconCheckbox",
    "IconAdd",
    "IconArrow",
    "IconClose",
    "IconDelete",
    "IconEdit",
    "IconMore",
];

export const Icon = ({ className, size, fill, name }) => {
    switch (name) {
        case "IconCheckbox":
            return (
                <svg
                    className={styles.iconCheckbox}
                    width={size}
                    height={size}
                    viewBox="0 0 15 14"
                    fill={fill}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* <rect
                        width="14"
                        height="14"
                        transform="translate(0.5)"
                        fill='white'
                    /> */}
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.5791 3.08751C12.807 3.31532 12.807 3.68466 12.5791 3.91247L6.16248 10.3291C5.93467 10.5569 5.56533 10.5569 5.33752 10.3291L2.42085 7.41247C2.19305 7.18466 2.19305 6.81532 2.42085 6.58751C2.64866 6.3597 3.01801 6.3597 3.24581 6.58751L5.75 9.0917L11.7542 3.08751C11.982 2.85971 12.3513 2.85971 12.5791 3.08751Z"
                        fill={fill}
                    />
                </svg>
            );
    }
};

Icon.propTypes = {
    className: PropTypes.string.isRequired,
    size: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
    fill: PropTypes.string,
    name: PropTypes.oneOf(ICON_TYPES).isRequired,
};
