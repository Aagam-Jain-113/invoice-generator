import React, { useState, useEffect } from 'react';
import { initialInvoice, initialProductLine } from '../data/initialData';
import EditableInput from './EditableInput';
import EditableSelect from './EditableSelect';
import EditableTextarea from './EditableTextarea';
import EditableCalendarInput from './EditableCalendarInput';
import countryList from '../data/countryList';
import payment from '../data/Payment';
import Document from './Document';
import Page from './Page';
import View from './View';
import Text from './Text';
import { Font } from '@react-pdf/renderer';
import Download from './DownloadPDF';
import format from 'date-fns/format';
import { db } from '../firebase';
import status from '../data/paymentStatus';

Font.register({
    family: 'Nunito',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf' },
        { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf', fontWeight: 600 },
    ],
});
const InvoicePage = ({ data, pdfMode }) => {
    const [invoice, setInvoice] = useState(data ? Object.assign({}, data) : Object.assign({}, initialInvoice));
    const [subTotal, setSubTotal] = useState();
    const [saleTax, setSaleTax] = useState();
    const [itemAmount, setItemAmount] = useState(0);
    const dateFormat = 'MMM dd, yyyy';
    const invoiceDate = invoice.invoiceDate !== '' ? new Date(invoice.invoiceDate) : new Date();
    const invoiceDueDate = invoice.invoiceDueDate !== ''
        ? new Date(invoice.invoiceDueDate)
        : new Date(invoiceDate.valueOf());
    if (invoice.invoiceDueDate === '') {
        invoiceDueDate.setDate(invoiceDueDate.getDate() + 7);
    }
    const handleChange = (name, value) => {
        if (name !== 'productLines') {
            const newInvoice = Object.assign({}, invoice);
            newInvoice[name] = value;
            setInvoice(newInvoice);
        }
    };
    const handleProductLineChange = (index, name, value) => {
        const productLines = invoice.productLines.map((productLine, i) => {
            if (i === index) {
                const newProductLine = Object.assign({}, productLine);
                if (name === 'description') {
                    newProductLine[name] = value;
                }
                else {
                    if (value[value.length - 1] === '.' ||
                        (value[value.length - 1] === '0' && value.includes('.'))) {
                        newProductLine[name] = value;
                    }
                    else {
                        const n = parseFloat(value);
                        newProductLine[name] = (n ? n : 0).toString();
                    }
                }
                return newProductLine;
            }
            return Object.assign({}, productLine);
        });
        setInvoice(Object.assign(Object.assign({}, invoice), { productLines }));
    };
    const handleRemove = (i) => {
        const productLines = invoice.productLines.filter((productLine, index) => index !== i);
        setInvoice(Object.assign(Object.assign({}, invoice), { productLines }));
    };
    const handleAdd = () => {
        const productLines = [...invoice.productLines, Object.assign({}, initialProductLine)];
        setInvoice(Object.assign(Object.assign({}, invoice), { productLines }));
    };
    const calculateAmount = (quantity, rate) => {
        const quantityNumber = parseFloat(quantity);
        const rateNumber = parseFloat(rate);
        const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
        return amount.toFixed(2);
    };

    useEffect(() => {
        let amount = 0;
        let subTotal = 0;
        invoice.productLines.forEach((productLine) => {
            const quantityNumber = parseFloat(productLine.quantity);
            const rateNumber = parseFloat(productLine.rate);
            const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
            subTotal += amount;
        });
        setSubTotal(subTotal);
        setItemAmount(amount);
    }, [invoice.productLines]);
    useEffect(() => {
        const match = invoice.taxLabel.match(/(\d+)%/);
        const taxRate = match ? parseFloat(match[1]) : 0;
        const saleTax = subTotal ? (subTotal * taxRate) / 100 : 0;
        setSaleTax(saleTax);
    }, [subTotal, invoice.taxLabel]);
    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('invoices').add({
            title: invoice.title,
            payment: invoice.payment,
            companyName: invoice.companyName,
            gst: invoice.gst,
            companyAddress: invoice.companyAddress,
            companyAddress2: invoice.companyAddress2,
            billTo: invoice.billTo,
            clientName: invoice.clientName,
            clientAddress: invoice.clientAddress,
            clientAddress2: invoice.clientAddress2,
            clientCountry: invoice.clientCountry,
            invoiceTitleLabel: invoice.invoiceTitleLabel,
            invoiceTitle: invoice.invoiceTitle,
            invoiceDateLabel: invoice.invoiceDateLabel,
            invoiceDate: invoice.invoiceDate,
            invoiceDueDateLabel: invoice.invoiceDueDateLabel,
            invoiceDueDate: invoice.invoiceDueDate,
            productLineDescription: invoice.productLineDescription,
            productLineQuantity: invoice.productLineQuantity,
            productLineQuantityRate: invoice.productLineQuantityRate,
            productLineQuantityAmount: invoice.productLineQuantityAmount,
            productLines: invoice.productLines,
            amount: itemAmount,
            subTotalLabel: invoice.subTotalLabel,
            subTotal: subTotal,
            taxLabel: invoice.taxLabel,
            tax: saleTax,
            totalLabel: invoice.totalLabel,
            total: subTotal + saleTax,
            currency: invoice.currency,
            banklabel: invoice.banklabel,
            bank: invoice.bank,
            notesLabel: invoice.notesLabel,
            notes: invoice.notes,
            termLabel: invoice.termLabel,
            term: invoice.term,
            status: invoice.status,
        }).then(() => {
            alert('Invoice generated')
        })
            .catch((error) => {
                alert(error.message);
            });

    }
    return (
        <Document pdfMode={pdfMode}>
            <Page className="invoice-wrapper" pdfMode={pdfMode}>
                {!pdfMode && <Download data={invoice} />}

                <View className="flex" pdfMode={pdfMode}>
                    <View className="w-40" pdfMode={pdfMode}>
                        <EditableInput
                            className="fs-20 right bold"
                            placeholder="Tax Invoice "
                            value={invoice.title}
                            onChange={(value) => handleChange('title', value)}
                            pdfMode={pdfMode}
                        />
                        <EditableSelect
                            className="fs-20 right bold"
                            options={payment}
                            value={invoice.payment}
                            onChange={(value) => handleChange('payment', value)}
                            pdfMode={pdfMode}
                        />
                    </View>
                    <View className="w-60" pdfMode={pdfMode}>
                        <EditableInput
                            className="fs-20 bold"
                            placeholder="Your Company"
                            value={invoice.companyName}
                            onChange={(value) => handleChange('companyName', value)}
                            pdfMode={pdfMode}
                        />
                        <EditableInput
                            placeholder="GSTIN"
                            value={invoice.gst}
                            onChange={(value) => handleChange('gst', value)}
                            pdfMode={pdfMode}
                        />
                        <EditableInput
                            placeholder="Company's Address"
                            value={invoice.companyAddress}
                            onChange={(value) => handleChange('companyAddress', value)}
                            pdfMode={pdfMode}
                        />
                        <EditableInput
                            placeholder="City, State Zip"
                            value={invoice.companyAddress2}
                            onChange={(value) => handleChange('companyAddress2', value)}
                            pdfMode={pdfMode}
                        />
                        <EditableSelect
                            options={countryList}
                            value={invoice.companyCountry}
                            onChange={(value) => handleChange('companyCountry', value)}
                            pdfMode={pdfMode}
                        />
                    </View>
                </View>

                <View className="flex mt-40" pdfMode={pdfMode}>
                    <View className="w-55" pdfMode={pdfMode}>
                        <EditableInput
                            className="bold dark mb-5"
                            value={invoice.billTo}
                            onChange={(value) => handleChange('billTo', value)}
                            pdfMode={pdfMode}
                        />
                        <EditableInput
                            placeholder="Your Client's Name"
                            value={invoice.clientName}
                            onChange={(value) => handleChange('clientName', value)}
                            pdfMode={pdfMode}
                        />
                        <EditableInput
                            placeholder="Client's Address"
                            value={invoice.clientAddress}
                            onChange={(value) => handleChange('clientAddress', value)}
                            pdfMode={pdfMode}
                        />
                        <EditableInput
                            placeholder="City, State Zip"
                            value={invoice.clientAddress2}
                            onChange={(value) => handleChange('clientAddress2', value)}
                            pdfMode={pdfMode}
                        />
                        <EditableSelect
                            options={countryList}
                            value={invoice.clientCountry}
                            onChange={(value) => handleChange('clientCountry', value)}
                            pdfMode={pdfMode}
                        />
                    </View>
                    <View className="w-45" pdfMode={pdfMode}>
                        <View className="flex mb-5" pdfMode={pdfMode}>
                            <View className="w-40" pdfMode={pdfMode}>
                                <EditableInput
                                    className="bold"
                                    value={invoice.invoiceTitleLabel}
                                    onChange={(value) => handleChange('invoiceTitleLabel', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                            <View className="w-60" pdfMode={pdfMode}>
                                <EditableInput
                                    placeholder="INV-2021"
                                    value={invoice.invoiceTitle}
                                    onChange={(value) => handleChange('invoiceTitle', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                        </View>
                        <View className="flex mb-5" pdfMode={pdfMode}>
                            <View className="w-40" pdfMode={pdfMode}>
                                <EditableInput
                                    className="bold"
                                    value={invoice.invoiceDateLabel}
                                    onChange={(value) => handleChange('invoiceDateLabel', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                            <View className="w-60" pdfMode={pdfMode}>
                                <EditableCalendarInput
                                    value={format(invoiceDate, dateFormat)}
                                    selected={invoiceDate}
                                    onChange={(date) =>
                                        handleChange(
                                            'invoiceDate',
                                            date && !Array.isArray(date) ? format(date, dateFormat) : ''
                                        )
                                    }
                                    pdfMode={pdfMode}
                                />
                            </View>
                        </View>
                        <View className="flex mb-5" pdfMode={pdfMode}>
                            <View className="w-40" pdfMode={pdfMode}>
                                <EditableInput
                                    className="bold"
                                    value={invoice.invoiceDueDateLabel}
                                    onChange={(value) => handleChange('invoiceDueDateLabel', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                            <View className="w-60" pdfMode={pdfMode}>
                                <EditableCalendarInput
                                    value={format(invoiceDueDate, dateFormat)}
                                    selected={invoiceDueDate}
                                    onChange={(date) =>
                                        handleChange(
                                            'invoiceDueDate',
                                            date && !Array.isArray(date) ? format(date, dateFormat) : ''
                                        )
                                    }
                                    pdfMode={pdfMode}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-30 bg-dark flex" pdfMode={pdfMode}>
                    <View className="w-48 p-4-8" pdfMode={pdfMode}>
                        <EditableInput
                            className="white bold"
                            value={invoice.productLineDescription}
                            onChange={(value) => handleChange('productLineDescription', value)}
                            pdfMode={pdfMode}
                        />
                    </View>
                    <View className="w-17 p-4-8" pdfMode={pdfMode}>
                        <EditableInput
                            className="white bold right"
                            value={invoice.productLineQuantity}
                            onChange={(value) => handleChange('productLineQuantity', value)}
                            pdfMode={pdfMode}
                        />
                    </View>
                    <View className="w-17 p-4-8" pdfMode={pdfMode}>
                        <EditableInput
                            className="white bold right"
                            value={invoice.productLineQuantityRate}
                            onChange={(value) => handleChange('productLineQuantityRate', value)}
                            pdfMode={pdfMode}
                        />
                    </View>
                    <View className="w-18 p-4-8" pdfMode={pdfMode}>
                        <EditableInput
                            className="white bold right"
                            value={invoice.productLineQuantityAmount}
                            onChange={(value) => handleChange('productLineQuantityAmount', value)}
                            pdfMode={pdfMode}
                        />
                    </View>
                </View>

                {invoice.productLines.map((productLine, i) => {
                    return pdfMode && productLine.description === '' ? (
                        <Text key={i}></Text>
                    ) : (
                        <View key={i} className="row flex" pdfMode={pdfMode}>
                            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
                                <EditableTextarea
                                    className="dark"
                                    rows={2}
                                    placeholder="Enter item name/description"
                                    value={productLine.description}
                                    onChange={(value) => handleProductLineChange(i, 'description', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                            <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                                <EditableInput
                                    className="dark right"
                                    value={productLine.quantity}
                                    onChange={(value) => handleProductLineChange(i, 'quantity', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                            <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                                <EditableInput
                                    className="dark right"
                                    value={productLine.rate}
                                    onChange={(value) => handleProductLineChange(i, 'rate', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                            <View className="w-18 p-4-8 pb-10" pdfMode={pdfMode}>
                                <Text className="dark right" pdfMode={pdfMode}>
                                    {calculateAmount(productLine.quantity, productLine.rate)}
                                </Text>
                            </View>
                            {!pdfMode && (
                                <button
                                    className="link row__remove"
                                    aria-label="Remove Row"
                                    title="Remove Row"
                                    onClick={() => handleRemove(i)}
                                >
                                    <span className="icon icon-remove bg-red"></span>
                                </button>
                            )}
                        </View>
                    )
                })}

                <View className="flex" pdfMode={pdfMode}>
                    <View className="w-50 mt-10 add__item" pdfMode={pdfMode}>
                        {!pdfMode && (
                            <button className="link" onClick={handleAdd}>
                                <span className="icon icon-add bg-green mr-10"></span>
                                Add Line Item
                            </button>
                        )}
                    </View>
                    <View className="w-50 mt-20" pdfMode={pdfMode}>
                        <View className="flex" pdfMode={pdfMode}>
                            <View className="w-50 p-5" pdfMode={pdfMode}>
                                <EditableInput
                                    value={invoice.subTotalLabel}
                                    onChange={(value) => handleChange('subTotalLabel', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                            <View className="w-50 p-5" pdfMode={pdfMode}>
                                <Text className="right bold dark" pdfMode={pdfMode}>
                                    {subTotal?.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                        <View className="flex" pdfMode={pdfMode}>
                            <View className="w-50 p-5" pdfMode={pdfMode}>
                                <EditableInput
                                    value={invoice.taxLabel}
                                    onChange={(value) => handleChange('taxLabel', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                            <View className="w-50 p-5" pdfMode={pdfMode}>
                                <Text className="right bold dark" pdfMode={pdfMode}>
                                    {saleTax?.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                        <View className="flex bg-gray p-5" pdfMode={pdfMode}>
                            <View className="w-50 p-5" pdfMode={pdfMode}>
                                <EditableInput
                                    className="bold"
                                    value={invoice.totalLabel}
                                    onChange={(value) => handleChange('totalLabel', value)}
                                    pdfMode={pdfMode}
                                />
                            </View>
                            <View className="w-50 p-5 flex" pdfMode={pdfMode}>
                                <EditableInput
                                    className="dark bold right ml-30"
                                    value={invoice.currency}
                                    onChange={(value) => handleChange('currency', value)}
                                    pdfMode={pdfMode}
                                />
                                <Text className="right bold dark w-auto" pdfMode={pdfMode}>
                                    {(typeof subTotal !== 'undefined' && typeof saleTax !== 'undefined'
                                        ? subTotal + saleTax
                                        : 0
                                    ).toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-20" pdfMode={pdfMode}>
                    <EditableInput
                        className="bold w-100"
                        value={invoice.banklabel}
                        onChange={(value) => handleChange('banklabel', value)}
                        pdfMode={pdfMode}
                    />
                    <EditableTextarea
                        className="w-100"
                        rows={2}
                        value={invoice.bank}
                        onChange={(value) => handleChange('bank', value)}
                        pdfMode={pdfMode}
                    />
                </View>
                <View className="mt-20" pdfMode={pdfMode}>
                    <EditableInput
                        className="bold w-100"
                        value={invoice.notesLabel}
                        onChange={(value) => handleChange('notesLabel', value)}
                        pdfMode={pdfMode}
                    />
                    <EditableTextarea
                        className="w-100"
                        rows={2}
                        value={invoice.notes}
                        onChange={(value) => handleChange('notes', value)}
                        pdfMode={pdfMode}
                    />
                </View>
                <View className="mt-20" pdfMode={pdfMode}>
                    <EditableInput
                        className="bold w-100"
                        value={invoice.termLabel}
                        onChange={(value) => handleChange('termLabel', value)}
                        pdfMode={pdfMode}
                    />
                    <EditableTextarea
                        className="w-100"
                        rows={2}
                        value={invoice.term}
                        onChange={(value) => handleChange('term', value)}
                        pdfMode={pdfMode}
                    />
                </View>
                <View className="w-20 right">
                    <EditableSelect
                        className="fs-20 right bold w-100"
                        options={status}
                        value={invoice.status}
                        onChange={(value) => handleChange('status', value)}
                        pdfMode={pdfMode}
                    />
                </View>
                <View pdfMode={pdfMode}>
                    <View className="mt-10 submit" pdfmode={pdfMode}>
                        {!pdfMode && (<button className="submit-btn link" onClick={handleSubmit} >
                        <span className="mr-10" />
                        Submit
                        </button>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
export default InvoicePage;