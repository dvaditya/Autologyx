import React, { useState, useEffect } from 'react';
import audtitsStyles from './audits.styles';
import TaskList from './TaskList';
import { Fade } from '@material-ui/core';
import { SkeletonLoader, Input, Select, } from 'components/lib';
import { setGlobalLoader, addAlert as addAlertAction, setGlobalMessage } from 'store/actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAudit, clearCurrentAudit, regenerateAuditReport, editCurrentAudit } from "store/actions/currentAuditActions"
import Button from 'components/lib/Button';
import DeletDocumentsModal from "./RemoveDocumentModal/RemoveDocumentModal"
import UpdateAuditModal from './UpdateAuditModal/UpdateAuditModal';
import ReviewAuditModal from './ReviewAuditModal.js/ReviewAuditModal';
import EmailClientModal from './EmailClientModal/EmailClientModal';
import axios from 'axios';
import { get_build, get_build_prefix } from 'utils/build';
import AuditPseudoTask from './AuditPseudoTask';
import { useHistory } from 'react-router';
import { sortAudits } from 'store/actions/auditActions';
import { updateDelectedDocuments } from 'api/audits.api';

const R = require("ramda")

const { REACT_APP_LAMBDA_KEY, REACT_APP_API_URL } = process.env;
const BUILD = get_build()

const Audit = ({ auditId }) => {
    const dispatch = useDispatch()
    const classes = audtitsStyles();
    const statuses = ["All", "Pending", "In Progress", "Completed"]
    const [deleteDocModalOpen, setDeleteDocModalOpen] = useState(false)
    const [updateAuditModalOpen, setUpdateAuditModalOpen] = useState(false)
    const [auditReviewModalOpen, setAuditReviewModalOpen] = useState(false)
    const [emailClientModalOpen, setEmailClientModalOpen] = useState(false)
    const [selectedAuditStatus, setSelectedAuditStatus] = useState("All")
    const currentAudit = useSelector((state) => state.currentAudit)
    const auditTasks = useSelector((state) => state.auditTasks)
    const auditClient = useSelector((state) => state.auditClient)
    const sortOrder = useSelector((state) => state?.audits?.sortBy)
    const [auditsLoaded, setAuditsLoaded] = useState(true)
    const { email } = useSelector(state => state.user)
    const history = useHistory()
    useEffect(() => {

        if (!auditId) {
            dispatch(clearCurrentAudit())
            setSelectedAuditStatus("All")
            setAuditsLoaded(true)
        } else {
            setAuditsLoaded(false)
            dispatch(setCurrentAudit(auditId))
            setAuditsLoaded(true)
        }
        return () => {
            dispatch(clearCurrentAudit())
        }
    }, [auditId])

    const filterRecords = () => {
        let filtered = auditTasks.tasks
        if (selectedAuditStatus !== "All") {
            filtered = filtered.filter((record) => record.field_module_status === selectedAuditStatus)
        }
        return filtered
    }
    const handleSetDeleteDocsModalOpen = () => {
        setDeleteDocModalOpen(true)
    }

    const handleSetDeleteDocsModalClosed = () => {
        setDeleteDocModalOpen(false)
    }

    const handleSetUpdateAuditModalOpen = () => {
        setUpdateAuditModalOpen(true)
    }

    const handleSetUpdateAuditModalClosed = () => {
        setUpdateAuditModalOpen(false)
    }

    const handleSetReviewAuditModalOpen = () => {
        setAuditReviewModalOpen(true)
    }

    const handleSetReviewAuditModalClosed = () => {
        setAuditReviewModalOpen(false)
    }
    const handleSetEmailClientModalOpen = () => {
        setEmailClientModalOpen(true)
    }

    const handleSetEmailClientModalClosed = () => {
        setEmailClientModalOpen(false)
    }

    const handleDeleteAuditDocuments = async () => {
        dispatch(setGlobalLoader(true))
        dispatch(setGlobalMessage("Please make sure you don't close the page whilst the documents are being deleted."))
        try {
            const { data, status } = await axios(
                `https://${get_build_prefix()}${REACT_APP_API_URL}/documents/audit/delete?build=${BUILD}&authorizer_object_class_id=1&object_class_id=5&limit=1`,
                {
                    method: "DELETE",
                    headers: {
                        // api_key: REACT_APP_LAMBDA_KEY, 
                        uuid: currentAudit?.field_uuid
                    }
                }
            );
            if (data?.error || status < 200 || status >= 300) {
                throw new Error("Error deleting documents")
            } else if (data.backend.count > 0) {
                handleDeleteAuditDocuments()
            } else {
                const { success, payload } = await updateDelectedDocuments(currentAudit?.id, email)
                setDeleteDocModalOpen(false)
                dispatch(setGlobalMessage(null))
                dispatch(setGlobalLoader(false))
                dispatch(addAlertAction({
                    severity: "success",
                    title: "Documents deleted",
                    content: "All documents have successfully been deleted."
                }))
            }
        } catch (e) {
            console.log(e)
            dispatch(addAlertAction({
                severity: "error",
                title: "Unable to delete documents",
                content: "Please try again"
            }))
            setDeleteDocModalOpen(false)
            dispatch(setGlobalLoader(false))
        }
    }

    let reviewStatus = ""
    if (currentAudit.field_review_audit_document_completed === "Yes") {
        reviewStatus = "Completed"
    } else if (currentAudit.field_audit_document) {
        reviewStatus = "In Progress"
    }

    let emailStatus = ""
    if (currentAudit.field_check_to_send_to_client) {
        emailStatus = "Completed"
    } else if (currentAudit.field_review_audit_document_completed === "Yes") {
        emailStatus = "In Progress"
    }

    const handleRegenerateReport = () => {
        dispatch(regenerateAuditReport())
    }

    const handleArchiveAudit = async () => {
        await dispatch(editCurrentAudit(currentAudit.id, currentAudit.field_client_uuid, { field_active: false }))
        dispatch(sortAudits(sortOrder ? { ...sortOrder } : {}))
        history.push(`/management/audit`);
    }
    return (
        <Fade in={true}>
            <div className={classes.root}>
                <div className={classes.heading}>
                    Client: {auditClient.field_company_name} Year: {currentAudit.field_audit_year} Name: {currentAudit.field_name}
                </div>
                <div className={classes.actions}>
                    <Button onClick={handleSetDeleteDocsModalOpen}>Delete All Documents</Button>
                    <Button onClick={handleSetUpdateAuditModalOpen}>Change Audit Owner</Button>
                    {currentAudit.field_audit_answers && <Button onClick={handleRegenerateReport}>Regenerate Report</Button>}
                    <Button onClick={handleArchiveAudit}>Archive</Button>
                </div>
                <div className={classes.filterContainer}>
                    <div className={classes.filter}>
                        <Select
                            label={'Status'}
                            options={statuses}
                            value={selectedAuditStatus}
                            onChange={({ target: { value } }) => {
                                if (value) {
                                    setSelectedAuditStatus(value)
                                } else {
                                    setSelectedAuditStatus('All');
                                }
                            }}
                        />
                    </div>

                </div>
                {!auditTasks.loading ? (

                    <div className={classes.tabContainer}>
                        <div
                            style={{
                                zIndex: 1,
                                height: 'calc(100% - 105px)',
                                overflowY: 'scroll',
                            }}
                        >
                            {auditTasks.tasks.length ? (
                                <>
                                    <TaskList
                                        auditId={auditId}
                                        tasks={filterRecords()}
                                    >
                                        {currentAudit.field_audit_document && (selectedAuditStatus === "All" || selectedAuditStatus === reviewStatus) && <AuditPseudoTask title={"Review Audit Document"} handleClick={handleSetReviewAuditModalOpen} status={reviewStatus} />}
                                        {currentAudit.field_review_audit_document_completed === "Yes" &&  (selectedAuditStatus === "All" || selectedAuditStatus === emailStatus) && <AuditPseudoTask title={"Email to Client"} handleClick={handleSetEmailClientModalOpen} status={emailStatus} />}
                                    </TaskList>
                                </>
                            ) : (
                                <div className={classes.noTasks}>
                                    No modules have been created for this audit
                                </div>
                            )}
                        </div>
                    </div>

                ) : (
                    <div className={classes.loaderWrapper}>
                        <SkeletonLoader height="50px" />
                        <SkeletonLoader height="50px" />
                        <SkeletonLoader height="50px" />
                        <SkeletonLoader height="50px" />
                    </div>
                )}
                <DeletDocumentsModal open={deleteDocModalOpen} toggleOpen={handleSetDeleteDocsModalClosed} handleDelete={handleDeleteAuditDocuments} />
                <UpdateAuditModal open={updateAuditModalOpen} toggleOpen={handleSetUpdateAuditModalClosed} audit={currentAudit} />
                <ReviewAuditModal open={auditReviewModalOpen} toggleOpen={handleSetReviewAuditModalClosed} audit={currentAudit} />
                <EmailClientModal open={emailClientModalOpen} toggleOpen={handleSetEmailClientModalClosed} audit={currentAudit} />
            </div>
        </Fade>
    );
};

export default Audit;