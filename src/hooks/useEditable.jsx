import { useState, useRef, useEffect } from "react";

export const useEditable = ({ cleanAfterSuccess, onSave, errorMessage }) => {
    const inputRef = useRef(null);
    const [isInputActive, setIsInputActive] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState(""); // добавляем состояние для ошибки


    const handelSave = async () => {
        if (onSave) {
            const ok = await onSave(value);
            if (ok) {
                setIsInputActive(false);
            }
            // працюэ як onBlur
            if (!ok && onSave) {
                setIsInputActive(false);
            }
            if (ok && cleanAfterSuccess) {
                setValue("");
            }
            if (!ok && errorMessage) {
                setError(errorMessage);

            } else {
                setError(""); // очищаем ошибку
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
        errorMessage: error, // передаем ошибку в компонент

    };
};
