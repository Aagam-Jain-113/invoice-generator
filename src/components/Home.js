import React from 'react';
import invoiceimage from '../images/invoice.svg';

function Home() {
    return (
        <div className="home">
            <h2>Invoice Generator</h2>
            <p> Confused about where to create the invoices and store them 🤔 ? You have come to the right place.
            </p>
            <p>Go and create your first <span className="bold">INVOICE</span> now! 😀</p>
            <img src={invoiceimage} alt="abc" className="invoice__image" />
        </div>
    )
}

export default Home
