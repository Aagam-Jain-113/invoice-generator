import { React, Component } from 'react';
import { db } from '../firebase';
import SimplePopover from './Modal';

class Invoices extends Component {
    state = {
        invoices: null,
        showModal: false
    }
    componentDidMount() {
        db.collection('invoices')
            .get()
            .then(e => {
                const invoices = [];
                e.forEach(doc => {
                    const data = doc.data();
                    invoices.push(data)
                })
                this.setState({ invoices: invoices })
            })
    }
    render() {
        return (
            <div>
                <div className="table__headings grid">
                    <p className="w-20">Invoice No.</p>
                    <p className="w-20">Client Name</p>
                    <p className="w-20">Date</p>
                    <p className="w-20">Due Date</p>
                    <p className="w-20">Status</p>
                </div>
                {
                    this.state.invoices && this.state.invoices.map(invoice => {
                        return (
                            <div className="table__headings grid">
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
        );
    }
}
export default Invoices;



