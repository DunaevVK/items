import React from 'react';

const Select = ({options, defaultValue, value, onChange}) => {
    return (
        <div>
            <label htmlFor="brands">Выберите бренд</label>
            <select
                value={value}
                onChange={event => onChange(event.target.value)}
                id="brands">
                <option value="" disabled>{defaultValue}</option>
                {options.map((opt) =>
                    <option key={opt} value={opt}>{opt}</option>
                )
                }
            </select>
        </div>
    );
};

export default Select;