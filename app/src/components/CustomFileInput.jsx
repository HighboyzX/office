import { useEffect, useRef } from 'react'

import LabelWithAsterisk from './LabelWithAsterisk';

function CustomFileInput({ label, id, isRequired, onChange }) {
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (window.bsCustomFileInput) {
            window.bsCustomFileInput.init();
        }
    }, []);
    return (
        <div className="form-group mb-0">
            <LabelWithAsterisk label={label} isRequired={isRequired} />
            <div className="input-group mt-1">
                <div className="custom-file">
                    <input
                        type="file"
                        id={id}
                        name={id}
                        className="custom-file-input"
                        ref={fileInputRef}
                        onChange={onChange}
                        required={isRequired}
                    />
                    <label className="custom-file-label" htmlFor={id}>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CustomFileInput