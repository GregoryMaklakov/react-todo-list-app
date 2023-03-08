import { useState, useRef, useEffect } from 'react';


export const useEditable = ({ cleanAfterSuccess, onSave }) => {

    const inputRef = useRef(null);
    const [isInputActive, setIsInputActive] = useState(false);
    const [value, setValue] = useState('');

    const handelSave = async () => {
        setIsInputActive(false);
        const ok = await onSave(value);
        if (ok) {
            setIsInputActive(false);

        }
        if (ok && cleanAfterSuccess) {
            setValue('');
        }
    };

    useEffect(() => {
        if (inputRef?.current && isInputActive) {
            inputRef.current.focus()
        }
    }, [inputRef, isInputActive])

    return { handelSave, isInputActive, inputRef, onChange: setValue, value, setIsInputActive };
}