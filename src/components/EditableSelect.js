import React, { useState } from 'react';
import { Text } from '@react-pdf/renderer';
import compose from '../styles/compose';
const EditableSelect = ({ className, options, placeholder, value, onChange, pdfMode, }) => {
    const [isEditing, setIsEditing] = useState(false);
    return (React.createElement(React.Fragment, null, pdfMode ? (React.createElement(Text, { style: compose('span ' + (className ? className : '')) }, value)) : (React.createElement(React.Fragment, null, isEditing ? (React.createElement("select", { className: 'select ' + (className ? className : ''), value: value, onChange: onChange ? (e) => onChange(e.target.value) : undefined, onBlur: () => setIsEditing(false), autoFocus: true }, options === null || options === void 0 ? void 0 : options.map((option) => (React.createElement("option", { key: option.text, value: option.value }, option.text))))) : (React.createElement("input", { readOnly: true, type: "text", className: 'input ' + (className ? className : ''), value: value || '', placeholder: placeholder || '', onFocus: () => setIsEditing(true) }))))));
};
export default EditableSelect;