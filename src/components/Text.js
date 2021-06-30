import React from 'react';
import { Text as PdfText } from '@react-pdf/renderer';
import compose from '../styles/compose';
const Text = ({ className, pdfMode, children }) => {
    return (React.createElement(React.Fragment, null, pdfMode ? (React.createElement(PdfText, { style: compose('span ' + (className ? className : '')) }, children)) : (React.createElement("span", { className: 'span ' + (className ? className : '') }, children))));
};
export default Text;