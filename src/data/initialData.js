export const initialProductLine = {
    description: '',
    quantity: '1',
    rate: '0.00',
};

export const initialInvoice = {
    title: 'TAX INVOICE',
    payment: '(Cash)',
    companyName: '',
    gst: '',
    companyAddress: '',
    companyAddress2: '',
    companyCountry: 'INDIA',
    billTo: 'Bill To:',
    clientName: '',
    clientAddress: '',
    clientAddress2: '',
    clientCountry: 'INDIA',
    invoiceTitleLabel: 'Invoice#',
    invoiceTitle: '',
    invoiceDateLabel: 'Invoice Date',
    invoiceDate: '',
    invoiceDueDateLabel: 'Due Date',
    invoiceDueDate: '',
    productLineDescription: 'Item Description',
    productLineQuantity: 'Qty',
    productLineQuantityRate: 'Rate',
    productLineQuantityAmount: 'Amount',
    productLines: [
        {
            description: 'Brochure Design',
            quantity: '2',
            rate: '100.00',
        },
        Object.assign({}, initialProductLine),
        Object.assign({}, initialProductLine),
    ],
    subTotalLabel: 'Sub Total',
    taxLabel: 'GST (18%)',
    totalLabel: 'TOTAL',
    currency: 'Rs.',
    banklabel: 'Bank Details',
    bank: 'Bank name:  IFSC Code: ',
    notesLabel: 'Note',
    notes: 'It was great doing business with you. and if case of any references mention here',
    termLabel: 'Terms & Conditions',
    term: 'Please make the payment by the due date.',
    status: 'Paid',
}