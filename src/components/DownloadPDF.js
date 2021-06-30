import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePage from './InvoicePage';
const Download = ({ data }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(false);
        const timeout = setTimeout(() => {
            setShow(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, [data]);
    return (React.createElement("div", { className: 'download-pdf ' + (!show ? 'loading' : ''), title: "Save PDF" }, show && (React.createElement(PDFDownloadLink, { document: React.createElement(InvoicePage, { pdfMode: true, data: data }), fileName: `${data.title ? data.title.toLowerCase() : 'invoice'}.pdf`, "aria-label": "Save PDF" }))));
};
export default Download;