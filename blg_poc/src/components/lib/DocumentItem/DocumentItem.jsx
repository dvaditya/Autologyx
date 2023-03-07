import React from 'react'
import documentItemStyles from './documentItem.styles';
import { alx, date, file } from 'utils';
import { ReactComponent as PDFIcon } from 'img/pdf.svg';
import { ReactComponent as DOCXIcon } from 'img/docx.svg';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';

const DocumentItem = ({ createdAt, templateName, docType, docUrl, handleClick }) => {
    const classes = documentItemStyles()

    return (
        <li
            className={classes.li}
            onClick={() => {
                handleClick(docUrl, docType === 'PDF');
            }}
        >
            <div>
                <div>
                    {templateName}.{docType.toLowerCase()}
                </div>
                <div className={classes.date}>
                    {createdAt}
                </div>
            </div>
            <div>
                <div className={classes.iconWrapper}>
                    {docType === 'PDF' ? (
                        <PDFIcon className={classes.pdfIcon}></PDFIcon>
                    ) : (
                        <DOCXIcon className={classes.docxIcon}></DOCXIcon>
                    )}
                    <GetAppOutlinedIcon className={classes.downloadIcon} />
                </div>
            </div>
        </li>
    )
}

export default DocumentItem
