import clsx from "clsx";
import PropTypes from "prop-types";
import { Button } from "../Button";
import { ICON_TYPES } from "../Icon/Icon";
import { Input } from "../Input";
import { useEditable } from "../../hooks/useEditable";

export const EditableButton = ({ className, children, icon, onSave }) => {
    const { inputRef, isInputActive, handelSave, onChange, value, setIsInputActive } = useEditable({
        onSave,
        cleanAfterSuccess: true,
    });
    return (
        <div className={clsx(className)}>
            {isInputActive ? (
                <Input
                    ref={inputRef}
                    onBlur={handelSave}
                    value={value}
                    onChange={onChange}
                    size="small"
                    onEnterPress={handelSave}
                ></Input>
            ) : (
                <Button
                    onClick={() => setIsInputActive(true)}
                    variant="dashed"
                    icon={icon}
                    fluid
                >
                    {children}
                </Button>
            )}
        </div>
    );
};

EditableButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
    icon: PropTypes.oneOf(ICON_TYPES),
    onSave: PropTypes.func.isRequired,
};
