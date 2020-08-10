import React, {TextareaHTMLAttributes} from 'react';

interface propSchema  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label: string
}


const Textarea: React.FC<propSchema> = ({label, name, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>
                {label}
                <textarea id={name} {...rest} ></textarea>
            </label>
        </div>  
    );
}

export default Textarea