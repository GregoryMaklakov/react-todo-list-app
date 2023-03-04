import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Popup.module.css';

export const Popup = ({ children, className }) => {

    useEffect(() => {
        document.documentElement.classList.add('popup-open');
        return () => {
            document.documentElement.classList.remove('popup-open');
        }
    }, []);
    return (
        <div className={styles.container}>
            <div className={clsx(styles.card, className)}>{children}</div>
        </div>
    )
}

Popup.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}
