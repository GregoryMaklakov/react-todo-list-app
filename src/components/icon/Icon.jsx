import PropTypes from 'prop-types';
import styles from './Icon.module.css';

export const ICON_TYPES = ['IconAdd', 'IconArrow', 'IconClose', 'IconDelete', 'IconEdit', 'IconMore'];

export const Icon = ({ className, size }) => {
    switch (name) {

    }
}

Icon.propTypes = {
    className: PropTypes.string.isRequired,
    size: PropTypes.oneOfType(PropTypes.string, PropTypes.number),

}