import clsx from 'clsx';
import PropTypes from 'prop-types';

export const ColorDot = ({ className, color, }) => {
    return <span style={{ backgroundColor: color }} className={clsx(className)}></span>
}

ColorDot.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string.isRequired,
}
