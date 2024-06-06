const LabelWithAsterisk = ({ label, isRequired }) => (
    <span>
        {isRequired && <span style={{ color: 'red' }}>*</span>} {label}:
    </span>
);

export default LabelWithAsterisk;