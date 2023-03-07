import taskStyles from './task.styles';
import { ReactComponent as CloseIcon } from '../../../img/close.svg';
import { useHistory, useParams } from 'react-router';
import TaskDetails from './components/TaskMetadata/TaskDetails';
import TaskNav from './components/TaskNavigation/TaskNav';
import Form from './components/FormDisplay/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTask, clearCurrentTask } from "store/actions/currentTaskActions"
import CurrentDocuments from './components/CurrentDocuments/CurrentDocuments';
import { ErrorBoundary } from 'react-error-boundary';

const R = require("ramda")

const FormFieldErrorPlaceholder = () => {
    return <div>"Error displaying component"</div>;
  };

export default () => {
    const history = useHistory()
    const classes = taskStyles();
    let { auditId, taskId } = useParams()
    const dispatch = useDispatch()
    const [currentPath, setCurrentPath] = useState([])
    const [currentDocumentsPath, setCurrentDocumentsPath] = useState([])
    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const handleSetCurrentPath = (path) => {
        setCurrentTabIndex(0)
        setCurrentPath(path)
        setCurrentDocumentsPath(path)
    }

    const currentTask = useSelector(state => state?.currentTask?.taskMeta)

    useEffect(() => {
        dispatch(clearCurrentTask())
        if (taskId) {
            try {
                dispatch(setCurrentTask(taskId))
            } catch (e) {
                console.log("error getting task", e)
            }
        }

        return () => {
            dispatch(clearCurrentTask())
        }
    }, [])
    return <div className={classes.root}>
        <CloseIcon onClick={() => {
            history.goBack();
        }} className={classes.close} style={{ width: 25, height: 25, }} />
        <div className={classes.details}>
                <TaskDetails task={currentTask ? currentTask : {}} />
                <div></div>
            <div className={classes.documentsWrapper}>
                <TaskNav currentPath={currentPath} setCurrentPath={handleSetCurrentPath} currentDocumentsPath={currentDocumentsPath} setCurrentDocumentsPath={setCurrentDocumentsPath} currentTabIndex={currentTabIndex} setCurrentTabIndex={setCurrentTabIndex} />
                <ErrorBoundary FallbackComponent={FormFieldErrorPlaceholder}><Form auditId={auditId} currentPath={currentPath} currentTabIndex={currentTabIndex} setCurrentTabIndex={setCurrentTabIndex} /></ErrorBoundary>
                <CurrentDocuments currentDocumentsPath={currentDocumentsPath} />
            </div>
        </div>
    </div>
}