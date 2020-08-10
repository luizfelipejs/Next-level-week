import React, {SelectHTMLAttributes} from 'react';


interface propSchema extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    name: string
    options: Array<{
        option: string,
        label: string
    }>
}


const Select: React.FC<propSchema> = ({label, options, name, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={label}>{name}</label>  
                <select defaultValue="" id={label} {...rest}>
                    <option defaultValue="" disabled hidden>Selecione uma opçao</option>
                    {options.map(option => {
                        return (
                            <option key={option.label} value={option.label}>
                                {option.option}
                            </option>
                        )
                    })}
                </select>
        </div>
    )
}


export default Select