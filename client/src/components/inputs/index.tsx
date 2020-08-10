import React, {InputHTMLAttributes} from 'react';

import './index.css'


interface propSchema  extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    name: string
}


const input: React.FC<propSchema> = ({label, name,  children, ...rest}) => {
   
    return (
        <div className="input-block">
            <label htmlFor={label}>
                {name} {children}
                <input type="text" id={name} {...rest}/>
            </label>  
        </div>
    )
}


export default input