import React from 'react';
import { Text } from '@react-pdf/renderer';
import compose from '../styles/compose';

const EditableInput = ({ className, placeholder, value, onChange, pdfMode }) => {
    return (React.createElement(React.Fragment, null, pdfMode ? (React.createElement(Text, { style: compose('span ' + (className ? className : '')) }, value)) : (React.createElement("input", { type: "text", className: 'input ' + (className ? className : ''), placeholder: placeholder || '', value: value || '', onChange: onChange ? (e) => onChange(e.target.value) : undefined }))));
};
export default EditableInput;