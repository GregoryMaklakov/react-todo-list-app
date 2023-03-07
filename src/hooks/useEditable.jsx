import { useState, useRef, useEffect } from 'react';


export const useEditable = ({ cleanAfterSuccess, onSave }) => {

    const inputRef = useRef(null);
    const [isInputActive, setIsInputActive] = useState(false);
    const [value, setValue] = useState('');

    const onBlur = async () => {
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

    return { onBlur, isInputActive, inputRef, onChange: setValue, value, setIsInputActive };
}