import React from 'react';
import { View as PdfView } from '@react-pdf/renderer';
import compose from '../styles/compose';

const View = ({ className, pdfMode, children }) => {
    return (React.createElement(React.Fragment, null, pdfMode ? (React.createElement(PdfView, { style: compose('view ' + (className ? className : '')) }, children)) : (React.createElement("div", { className: 'view ' + (className ? className : '') }, children))));
};
export default View;