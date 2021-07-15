import { React, useState } from 'react';
import { db } from '../firebase';
import SimplePopover from './Modal';
import firebase from 'firebase';

function Invoices() {
    const [invoices, setInvoices] = useState(null);
    const user = firebase.auth().currentUser; 
    
    if(user){   
    db.collection('invoices')
        .doc(user.uid)
        .collection('invoicedetails')
        .get()
        .then(e => {
            const invoices = [];
            e.forEach(doc => {
                const data = doc.data();
                invoices.push(data);
            })
            setInvoices(invoices);
        })
    }
    
    return (
        <div>
            <div className="grid table__headings">
                <p className="w-20">Invoice No.</p>
                <p className="w-20">Client Name</p>
                <p className="w-20">Date</p>
                <p className="w-20">Due Date</p>
                <p className="w-20">Status</p>
            </div>
            {
                invoices && invoices.map((invoice,i) => {
                    return (
                        <div className="grid table__headings" key={i}>
                            <p className="w-20"><SimplePopover title={invoice.invoiceTitle} details={invoice} /></p>
                            <p className="w-20">{invoice.clientName}</p>
                            <p className="w-20">{invoice.invoiceDate}</p>
                            <p className="w-20">{invoice.invoiceDueDate}</p>
                            <p className="w-20">{invoice.status}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Invoices;