import React from "react";

type InputGroupProps = {
    label: string,
    field: string,
    type?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const InputGroup = ({ label, field, type = 'text', onChange }: InputGroupProps) => {
    return (
        <>
            <label className="form-label" htmlFor={field}>{label}</label>
            <input type={type} className="form-control" id={field} name={field} placeholder={label} onChange={onChange} />
        </>
    );
}

export default InputGroup;