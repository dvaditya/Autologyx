# AUM Client Portal

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Ensure field_audit_uuid is a valid audit uuid in public/index.html 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# BLG Client portal 

###App overview 

Allows documents to be uploaded into configurable folder structures to enable an audit to take place. 

 

###Technology 

Language – Typescript 
State Management – Context & useReducer 
App initialization starts in initialize.ts 

 

###Commands 

`npm start` (starts app for dev) - ensure field_audit_uuid is a valid audit uuid in public/index.html 
`npm run build` (builds app for deployment) 

###.env 

```
REACT_APP_TITLE="Borden Ladner Gervais LLP (BLG)" 
REACT_APP_LAMBDA_KEY=166 
REACT_APP_API_URL=blg.api.autologyx.com 
REACT_APP_ALX_INSTANCE=https://dev-blg.autologyx.com/ 
REACT_APP_API_KEY=166 
REACT_APP_PROXY_PORT=8001 
ALX_INSTANCE=https://dev-blg.autologyx.com/ 
```

###Application Initialization 

Make API call to ALX to get contact details, merge into extracted form values (this gives us the contact details as well as the contact’s UUID which is used for all lambda calls 

Make lambda call to get the audit (audit UUID is on the contact) 

If the field_audit_configuration is not set on the audit 

Make a lambda call to get the audit configs 

Build master config for audit (note the configs are sorted here by field_module_index 

Make Lambda call to update audit with config 

Get all documents and add to store 

###Application State 

Root reducer 
```
type RootState = { 
    appConfig: AppState, 
    clientAuditConfig: ClientAuditConfig, 
    filesState: ModulesState, 
    fileUploadQueue: FileUploadQueue, 
    inProgress: InProgressQueue, 
    extractedForm: ExtractedForm, 
    currentPath: string[], 
    alerts: Alert[] 
} 
```
Root reducer -> appConfig 
```
type AppState = { 
    currentModule: number, 
    pageLoaderOpen: boolean, 
    unrecoverableErrorMessage: string 
} 
```

Root reducer -> clientAuditConfig 
```
type ModuleConfig = { 
    moduleName: string, 
    instructions: string, 
    maxFiles: number, 
    subfolders: Array<ModuleConfig>, 
    hideUnusedSubfolders: boolean, 
    noClientDisplay: boolean 
} 
```

ClientAuditConfig Is just an alias for ModuleConfig – is the config the client app builds itself from. Is created on first load of audit by pulling in the module configs and assembling – then saved to audit. AUM side uses the same config to create modules. At the top level, the subfolders map to module configs. The subfolders are also Module configs which can contain more of themselves to build the folder structure. 

hideUnusedSubfolders will hide all subfolders at the point of the tree after the last that does not have docs yet + 1 

noClientDisplay prevents the folder being shown at all in the client app. 

export type ClientAuditConfig = ModuleConfig  
 
Root Reducer -> filesState 

ModuleState holds a simplified tree of lists of saved and unssaved files, used to display files in the docs pane as well as metadata for the nav 
```
type ModuleState = { 
    moduleName: string, 
    savedFiles: Array<SavedFile>, 
    unsavedFiles: Array<UnsavedFile>, 
    subFolders: {[key: string]: ModuleState} 
} 
```
 
```
type SavedFile = { 
    id: string, 
    path: [string] 
    fileName: string, 
    type: string, 
    extension: string, 
    size: number, 
    dateCreated: string, 
    createdBy: string 
} 
```
 
 
```
type UnsavedFile = { 
    id: string, 
    path: [string] 
    fileName: string, 
    fileObject: File, 
    type: string, 
    extension: string, 
    size: number, 
    failed: boolean 
} 
```

Root Reducer -> fileUploadQueue 

The queue of files to be (attempted) to be uploaded 

`type FileUploadQueue = Array<UnsavedFile> 
`
 

Root Reducer -> inProgress 

Files in upload progress 

`type InProgressQueue = Array<UnsavedFile> 
`
 
Root reducer -> extractedForm 

The dynamic form – partially populated via api call in initialization 
```
type ExtractedForm = { 
    fields: ExtractedFormField[]; 
    apiKey: any; 
    csrfToken: any; 
    urlPath: string; 
    emailId: number; 
    fieldState: { [key: string]: string } 
} 
```
 
```
type ExtractedFormField = { 
    type: string; 
    action: any; 
    id: string; 
    value: any 
} 
```

Root reducer -> currentPath 

The current selected folder path 

`currentPath: string[], `


Root reducer -> alerts 

Any alerts that should be displayed 

`alerts: Alert[] `

##High Level Overview 

###Left hand pane – Folders 

The AuditConfig subfolders are iterated over in FolderSelector. Each subfolder is rendered with a FolderNav which has the initial path. Each subfolder of this is also rendered with a FolderNav appending the subfolder name to the path. Clicking a folder sets the path and therefore the view in the centre pane (documents panel) 

The getFileFolder helper function is used to get a specific file state folder in the tree for use in indicators such as whether there are files in the folder, how many etc.  

 

###Centre Pane Documents 

FolderView is the component that displays the Saved and Unsaved files in the folder. Uploading files puts them in the unsaved list for that folder and also pushes them onto the upload queue. The useFileUploadHook syphons out of the upload queue into the inprogress queue and are then uploaded. Any failures are marked as such on the unsaved file which allows for retries. 


###Code Layout 

Components – react components for app 

Alerts – Alert toasts 

Banner – Top banner for app 

Error_modal – Global error message modal that forces a page reload 

Folders – Tree nav and file listing /upload 

Layout – main app layout 

FolderSelector – Left hand pane top level navigation 

FolderNav – The tree structure for each top level item 

FolderView – the right pane – shows files and the upload component 

File_upload – the upload component  

file_upload 

UseFileUpload – hook to manage file uploads in batches 

Store – reducers to manage the application state 

Styles – most css is contained here 

Util  

Build – get the ALX instance  

ExtractForm – extract the ALX dynamic form 

Formatting – file size units 

Initialize – get app state ready when app loads 

 
