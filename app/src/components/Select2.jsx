import { _msg } from "../messages/MsgTh";

export const Select2 = ({ className, value, id, name, onChange, options, isDisabled }) => {
    return (
        <select
            className={className}
            value={value}
            id={id}
            name={name}
            disabled={isDisabled}
            onChange={onChange}
        >
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};
export const SelectStatus = ({ className, value, id, name, onChange, isDisabled }) => {
    return (
        <select
            className={className}
            value={value}
            id={id}
            name={name}
            disabled={isDisabled}
            onChange={onChange}
        >
            <option value={0}>{_msg.disable}</option>
            <option value={1}>{_msg.enable}</option>
        </select>
    );
};
export const SelectGender = ({ className, value, id, name, onChange, isDisabled }) => {
    return (
        <select
            className={className}
            value={value}
            id={id}
            name={name}
            disabled={isDisabled}
            onChange={onChange}
        >
            <option value={1}>{_msg.gender_male}</option>
            <option value={2}>{_msg.gender_female}</option>
        </select>
    );
};