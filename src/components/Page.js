import React from 'react';
import { Page as PdfPage } from '@react-pdf/renderer';
import compose from '../styles/compose';
const Page = ({ className, pdfMode, children }) => {
    return (React.createElement(React.Fragment, null, pdfMode ? (React.createElement(PdfPage, { size: "A4", style: compose('page ' + (className ? className : '')) }, children)) : (React.createElement("div", { className: 'page ' + (className ? className : '') }, children))));
};
export default Page;