import { useId } from 'react';

export default function FormInput ({ label, value, onChange, errorText, containerWidth, ...rest }) {
    const generatedId = useId()
    const inputId = rest.id || generatedId
    const containerId = `${rest.name}-input-container` || `${rest.id}-input-container`

    return (
        <div className={`input-container ${errorText && '--invalid'}`} id={containerId}>
            <label htmlFor={inputId}>{label || 'Input Label'}</label>

            {errorText && <p className="invalid-text">{errorText}</p>}

            <input 
                id={inputId}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </div>
    )
}