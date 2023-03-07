import React, { useState, useEffect } from 'react';
import audtitsStyles from './audits.styles';
import AuditList from './AuditList';
import { Fade, Tooltip } from '@material-ui/core';
import { SkeletonLoader, Input, Select, Button} from 'components/lib';
import { getAudits } from "api/clientAudits.api"
import {
    audits as auditsApi,
} from 'api';
import { setGlobalLoader, addAlert } from 'store/actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';
import { clearClientContacts, getClientContacts } from 'store/actions/clientContactActions';
import { Alert } from '@material-ui/lab';

const R = require("ramda")

const Audits = ({ currentClient }) => {
    const dispatch = useDispatch()
    const clients = useSelector((state) => state.matters.records)
    const classes = audtitsStyles();
    const [clientAudits, setClientAudits] = useState([])
    const [clientAuditsFetched, setClientAuditsFetched] = useState(true)
    const [auditYears, setAuditYears] = useState([])
    const statuses = ["All", "In Progress", "Completed"]
    const [selectedAuditYears, setSelectedAuditYears] = useState("All")
    const [selectedAuditStatus, setSelectedAuditStatus] = useState("All")
    const [currentClientRecord, setCurrentClientRecord] = useState(null)
    const [ hasRole, setHasRole ] = useState(false)
    const user = useSelector(state => state.user)
    const currentClientDetails = useSelector(state => state.matters.currentMatter)
    const clientContacts = useSelector(state => state.clientContacts)
    const clientAuditDetails = (hasRole && currentClientDetails?.field_company_name && currentClientDetails?.field_street && currentClientDetails?.field_province && currentClientDetails?.field_city && currentClientDetails?.field_country && currentClientDetails?.field_postal_code) ? false : true
   
    useEffect(async () => {
        const fetchPrimaryContact = async () => {
            dispatch(clearClientContacts())
            dispatch(getClientContacts(currentClientDetails.field_client_uuid))
        }
        currentClientDetails?.field_client_uuid && fetchPrimaryContact()
    },[currentClientDetails])

    useEffect(() => {
        if (clientContacts.length) {
            const hasPrimaryContactAndRole = []
            clientContacts.forEach(contact => {
                (contact.field_primary_contact && contact.field_role) && hasPrimaryContactAndRole.push(contact)
            })
            hasPrimaryContactAndRole.length ? setHasRole(true) : setHasRole(false)
        }
    },[clientContacts,currentClient])

    useEffect(() => {
        const fetchAudits = async () => {
            try {
                const clientRecord = R.find(R.propEq('id', parseInt(currentClient)))(clients)
                if (!clientRecord) {
                    setClientAuditsFetched(true)
                    return
                }
                setClientAuditsFetched(false)
                dispatch(setGlobalLoader(true))
                const res = await getAudits(clientRecord.field_client_uuid)
                const { records, success } = res
                dispatch(setGlobalLoader(false))
                if (!success) {
                    throw new Error("Unable to retrieve client audits")
                }
                setClientAuditsFetched(true)
                setClientAudits(records)
                setAuditYears(['All', ...R.uniq(records.map((record) => record.field_audit_year)).sort()])
                setCurrentClientRecord(clientRecord)
            } catch (e) {
                dispatch(setGlobalLoader(false))
                dispatch(addAlert({
                    severity: "error",
                    title: "Unable to retrieve client audits",
                    content: "Please try again"
                }));
            }
        }
        if (!currentClient) {
            setClientAudits([])
            setAuditYears([])
            setSelectedAuditYears("All")
            setSelectedAuditStatus("All")
            setCurrentClientRecord(null)
        } else {
            
            setClientAudits([])
            setAuditYears([])
            setSelectedAuditYears("All")
            setSelectedAuditStatus("All")
            fetchAudits()
        }
    }, [currentClient, clients])

    const filterRecords = () => {
        let filtered = clientAudits
        if (selectedAuditYears !== "All") {
            filtered = filtered.filter((record) => record.field_audit_year === selectedAuditYears)
        }
        if (selectedAuditStatus !== "All") {
            filtered = filtered.filter((record) => record.field_audit_status === selectedAuditStatus)
        }
        return filtered
    }

    const handleCreateNewAudit = async () => {
        dispatch(setGlobalLoader(true))
        try {
            dispatch(addAlert({
                severity: "info",
                title: "Creating new audit",
                content: "Please wait"
            }));
            const year = new Date().getFullYear()
            const audit = await auditsApi.createAudit({
                field_client_uuid: currentClientRecord.field_client_uuid,
                field_audit_year: year,
                field_name: `${currentClientRecord.field_company_name} - ${year}`,
                field_owner: user?.email,
                field_tasks_created: false,
                field_audit_status: "Pending",
                field_active: true,
                field_date_of_commencement: new Date().toISOString()
            })
            dispatch(addAlert({
                severity: "success",
                title: "Audit created",
                content: "A One Time Completion Link has been sent to the client."
            }));
        } catch(e) {
            console.log(e)
            dispatch(addAlert({
                severity: "error",
                title: "Unable to create client audit",
                content: "Please try again"
            }));
            dispatch(setGlobalLoader(false))
            return
        }
        try {
            const res = await getAudits(currentClientRecord.field_client_uuid)
            const { records, success } = res
            dispatch(setGlobalLoader(false))
            if (!success) {
                throw new Error("Unable to retrieve client audits")
            }
            setClientAuditsFetched(true)
            setClientAudits(records)
            setAuditYears(['All', ...R.uniq(records.map((record) => record.field_audit_year)).sort()])
        } catch (e) {
            dispatch(setGlobalLoader(false))
            dispatch(addAlert({
                    severity: "error",
                    title: "Unable to update client audit",
                    content: "Please try again"
                }));
        }
    }

    const currentYear = new Date().getFullYear().toString()
    // console.log("currentYear", currentYear)
    // console.log("auditYears", auditYears)
    const hasAuditForYear = auditYears.filter((year) => year === currentYear).length
    // console.log("hasAuditForYear", hasAuditForYear)
    return (
        <Fade in={true}>
            <div className={classes.root}>
                <div className={classes.actionsContainer}>
                    <Tooltip placement="left" arrow title={(hasAuditForYear || clientAuditDetails) ? (clientAuditDetails ? 'Not all client details present': 'Already has audit for this year') : ''} >
                        <Button disabled={hasAuditForYear || clientAuditDetails} onClick={handleCreateNewAudit}>New Audit</Button>
                    </Tooltip>
                </div>
                {(hasAuditForYear || clientAuditDetails) && <div style={{paddingLeft: '15px'}}>
                        <Alert severity='info'>
                            {hasAuditForYear ? 'Client already has audit for this year' : <div>Not all client details are present. please add the following details...
                                <br />
                                <br />
                                <ul>
                                    {!hasRole && <li>Primary client contact role</li>}
                                    {!currentClientDetails?.field_company_name && <li>Client name</li>}
                                    {!currentClientDetails?.field_street && <li>Client Street</li>}
                                    {!currentClientDetails?.field_province && <li>Client province</li>}
                                    {!currentClientDetails?.field_city && <li>Client city</li>}
                                    {!currentClientDetails?.field_country && <li>Client country</li>}
                                    {!currentClientDetails?.field_postal_code && <li>Client postal code</li>}
                                </ul>
                            </div>}
                        </Alert>
                    </div>}
                <div className={classes.filterContainer}>
                    <div className={classes.filter}>
                        <Select
                            label={'Year'}
                            options={
                                auditYears
                            }
                            value={selectedAuditYears}
                            onChange={({ target: { value } }) => {
                                if (value) {
                                    setSelectedAuditYears(value)
                                } else {
                                    setSelectedAuditYears('All');
                                }
                            }}
                        />
                    </div>
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
                {clientAuditsFetched ? (

                    <div className={classes.tabContainer}>
                        <div
                            style={{
                                zIndex: 1,
                                height: 'calc(100% - 65px)',
                                overflowY: 'scroll',
                            }}
                        >
                            {clientAudits.length ? (
                                <AuditList
                                    clientId={currentClient}
                                    clientAudits={filterRecords(clientAudits)}
                                />
                            ) : (
                                <div className={classes.noTasks}>
                                    No audits have been created for this client
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
            </div>
        </Fade>
    );
};

export default Audits;