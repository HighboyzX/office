import { useEffect, forwardRef } from 'react';
import LabelWithAsterisk from './LabelWithAsterisk';

const CustomFileInput = forwardRef(({ label, id, isRequired, onChange }, ref) => {
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
                        ref={ref}
                        onChange={onChange}
                        required={isRequired}
                    />
                    <label className="custom-file-label" htmlFor={id}><span className='text-sm text-muted'></span></label>
                </div>
            </div>
        </div>
    );
});

export default CustomFileInput;
