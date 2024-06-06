import { useState } from 'react';

const FileInputComponent = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // คุณสามารถจัดการกับไฟล์ที่เลือกได้ที่นี่
        console.log(file);
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="formFile">Upload File</label>
                    <input
                        type="file"
                        className="form-control"
                        id="formFile"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FileInputComponent;
