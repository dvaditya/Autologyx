# AUM Portal

## Development setup

Create a .env file at the root of the project with the following variables: -

- REACT_APP_TITLE="Borden Ladner Gervais LLP (BLG)"
- REACT_APP_LAMBDA_KEY=
- REACT_APP_API_URL=blg.api.autologyx.com
- REACT_APP_ALX_INSTANCE=https://dev-blg.autologyx.com/
- REACT_APP_API_KEY=
- ALX_INSTANCE=https://dev-blg.autologyx.com/
- PORT=3001
- REACT_APP_PROXY_PORT=8000

Run the below: -

```
make dev
```

This will run both the proxy server and client environment.

## Production Build

To create a production build, you will need to run the below: -

```
make build
```

This will output the project into a single JS and CSS file (as opposed to chunked), that can then be added to the dynamic form.

# BLG AUM Portal 

 

### App Overview 

The BLG AUM portal is a an application that allows AUM lawyers to process AML audits for their clients. Client’s and their contacts can be added into the system and Audits initiated for those clients.  

Once an audit is kicked off, a link to the client portal is emailed to the primary contact who will add documents and submit for the AUM lawyer to complete. 

Audits are configured via Audit Configuration records which correspond to Audit Modules/Tasks against the Audit. See the audit confiiguration document for more details. 

Audit modules have the same tree structure as in the client portal. Auditors can navigate to folders and display the corresponding form if there is one, they can also view, upload and delete documents within folders. 

### Technology 

Language – Javascript 

State Management – Redux 

### Commands 

make dev (starts dev server along with a proxy) 

npm run build (builds app for deployment) 

### .env 
```
REACT_APP_TITLE="Borden Ladner Gervais LLP (BLG)" 
REACT_APP_LAMBDA_KEY=166 
REACT_APP_API_URL=blg.api.autologyx.com 
REACT_APP_ALX_INSTANCE=https://dev-blg.autologyx.com/ 
REACT_APP_API_KEY=243 
REACT_APP_PROXY_PORT=8001 
ALX_INSTANCE=https://dev-blg.autologyx.com/ 
PORT=3001 
REACT_APP_PROXY_PORT=8000 
```

### Redux State 

 

Matters – clients and table columns 
User – the logged in user 
Users – the list of active auditors 
Global – alerts, global loader, errors etc 
ClientContacts – a list of client contacts 
CurrentAudit – the selected audit 
AuditTasks – the current audit’s tasks 
AuditClient the current audit’s client 
Audits – paginated audit list and the table columns 
CurrentTask – the current task the auditor has selected 
CurrentTaskDocuments – list of documents for the current task 
CurrentTaskResponseData – the tree of data for that task 


### Code layout 
```
API – wrappers for the ALX API 
    Components 
        Lib - Potentially re-usable components and those that fall outside of view specific usage 
        Util – alerts, userWrapper etc 
        Views  
            AuditListing – the audits listing page – navigatable from the menu 
            Audits – has the audit sidebar which details the audit, shows the tasks and has actions such as archive etc 
            ClientCreation – form for creating client and initial contact 
            ClientManagementList – clients listing page and client audits / contacts sidebar 
            Task – an audit module 
               CurrentDocuments – documents at the selected path 
                FormDisplay – the task form component and associated components 
                TaskMetadata – just task details such as who updated and when 
                TaskNavigation – folder navigation allowing selection of form and document paths NavItem is the primary component here 
        Store – redux actions, reducers and constants 
        Utils – various reusable helpers 
````

### Data extraction for DocAssemble 

All audit modules have their deficienceies extracted to JSON which is stored on the audit.  

The code for this is extractDeficienciesAndSummaries in the file currentAuditActions 

The structure of this JSON is as follows where subfolders follow the same pattern as “module1 “ - 
```
{ 
    contact: { 
        field_active: true, 
        field_active_to_receive_audit_link: true, 
        field_client_name: '', 
        field_email: '', 
        field_firstname: '', 
        field_lastname: '', 
        field_owner: '', 
        field_primary_contact: true, 
        field_role: '' 
    }, 
    deficiencies: { 
        module1: { 
            deficiencies: { 
                ascertaining_identity_summary: 'Ascertaining Identity Summary', 
                evidence_of_ongoing_monitoring_summary: 'Evidence Of Ongoing Monitoring Summary', 
                intended_use_of_account_summary: 'Intended Use of Account Summary', 
                politically_exposed_persons_and_heads_of_international_organizations_summary: 'Politically Exposed Persons and Heads of International Organizations Summary', 
                third_party_determination_summary: 'Third Party Determination Summary', 
        subfolders: { 

        } 
        } 
        }, 
    }, 
    summary_fields: [ 
        { 
        fields: { 
            'Compliance Report Outcome': 'Revise the compliance manual in accordance with the instructions in Schedule A' 
            }, 
        module_name: 'Module 1' 
        }, 
    ] 
} 

```
 

### Notes on Audit 

A few scenarios play out in the currentAuditActions. 

When an audit is opened and the config exists on the audit but the tasks created flag is not set, one task for each module config will be created. 

When all tasks are completed, the answers are extracted and added to the audit (this kicks off the doc generation) 

### Notes on Task 

When a task loads, if there are no answers on the task, the answers structure is created and put into state. InitializeResponseData in currentTaskActions generates empty task answers. 

 