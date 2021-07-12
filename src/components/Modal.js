import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
    typography: {
        padding: '2%',
        border: '2px solid #000',
        margin: '2%',
    },
}));

export default function SimplePopover(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const calculateAmount = (a, b) => {
        return (a * b);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                {props.title}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <CloseIcon className="close" id={id} open={open} anchorEl={anchorEl} onClick={handleClose} />
                <Typography className={classes.typography}>
                    <div className="">
                        <div className="flex w-100">
                            <div className="flex w-40 bold">
                                <p>{props.details.title}</p>
                                <p>{props.details.payment}</p>
                            </div>
                            <div className="flex w-60 company__details">
                                <p className="bold">{props.details.companyName}</p>
                                <p>{props.details.gst}</p>
                                <p>{props.details.companyAddress}</p>
                                <p>{props.details.companyAddress2}</p>
                                <p>{props.details.companyCountry}</p>
                            </div>
                        </div>
                        <div className="flex w-100">
                            <div className="flex client__details w-40">
                                <p className="bold">{props.details.billTo}</p>
                                <p>{props.details.clientName}</p>
                                <p>{props.details.clientAddress}</p>
                                <p>{props.details.clientAddress2}</p>
                                <p>{props.details.clientCountry}</p>
                            </div>
                            <div className="dates flex w-60">
                                <div className="flex">
                                    <p className="mr-10">{props.details.invoiceTitleLabel}</p>
                                    <p>: {props.details.invoiceTitle}</p>
                                </div>
                                <div className="flex">
                                    <p className="mr-10">{props.details.invoiceDateLabel}</p>
                                    <p>: {props.details.invoiceDate}</p>
                                </div>
                                <div className="flex">
                                    <p className="mr-10">{props.details.invoiceDueDateLabel}</p>
                                    <p>: {props.details.invoiceDueDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="table__headings grid bold theadings">
                            <p>{props.details.productLineDescription}</p>
                            <p>{props.details.productLineQuantity}</p>
                            <p>{props.details.productLineQuantityRate}</p>
                            <p>{props.details.productLineQuantityAmount}</p>
                        </div>
                        {props.details.productLines.map(items => {
                            return (<div className="table__headings grid">
                                <p>{items.description}</p>
                                <p>{items.quantity}</p>
                                <p>{items.rate}</p>
                                <p>{calculateAmount(items.quantity,items.rate)}</p>
                            </div>
                            )
                        })}
                        <div className="total__grid">
                            <p className="right">{props.details.subTotalLabel} :</p>
                            <p className="values">{props.details.subTotal}</p></div>
                        <div className="total__grid">
                            <p className="right">{props.details.taxLabel} :</p>
                            <p className="values">{props.details.tax}</p>
                        </div>
                        <div className="total__grid total">
                            <p className="right bold">{props.details.totalLabel} :</p>
                            <p className="values rs">{props.details.currency} {props.details.total}</p>
                        </div>
                        <p className="bold">{props.details.banklabel}</p>
                        <p>{props.details.bank}</p>
                        <p className="bold">{props.details.notesLabel}</p>
                        <p>{props.details.notes}</p>
                        <p className="bold">{props.details.termLabel}</p>
                        <p>{props.details.term}</p>
                        <p>{props.details.status}</p>
                    </div>

                </Typography>
            </Popover>
        </div>
    );
}