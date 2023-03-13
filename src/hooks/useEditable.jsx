import { useState, useRef, useEffect } from "react";

export const useEditable = ({ cleanAfterSuccess, onSave }) => {
    const inputRef = useRef(null);
    const [isInputActive, setIsInputActive] = useState(false);
    const [value, setValue] = useState("");

    const handelSave = async () => {
        if (onSave) {
            const ok = await onSave(value);
            if (ok) {
                setIsInputActive(false);
            }
            //працюэ як onBlur
            if (!ok && onSave) {
                setIsInputActive(false);
            }
            if (ok && cleanAfterSuccess) {
                setValue("");
            }
        }
    };

    useEffect(() => {
        if (inputRef?.current && isInputActive) {
            inputRef.current.focus();
        }
    }, [inputRef, isInputActive]);

    return {
        handelSave,
        isInputActive,
        inputRef,
        onChange: setValue,
        value,
        setIsInputActive,
    };
};
