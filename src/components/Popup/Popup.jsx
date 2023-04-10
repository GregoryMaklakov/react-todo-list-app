import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Popup.module.css';
import { motion } from "framer-motion";

export const Popup = ({ children, className }) => {

    useEffect(() => {
        document.documentElement.classList.add('popup-open');
        return () => {
            document.documentElement.classList.remove('popup-open');
        }
    }, []);

    return (
        <div className={styles.container}>
            <motion.div
                className={clsx(styles.card, className)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >{children}
            </motion.div>
        </div>
    )
}

Popup.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}
