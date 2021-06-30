import React from 'react';
import { Document as PdfDocument } from '@react-pdf/renderer';
const Document = ({ pdfMode, children }) => {
    return React.createElement(React.Fragment, null, pdfMode ? React.createElement(PdfDocument, null, children) : React.createElement(React.Fragment, null, children));
};
export default Document;