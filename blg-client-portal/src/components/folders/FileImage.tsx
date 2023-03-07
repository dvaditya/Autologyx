import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFileImage,
    faFileAlt,
    faFilePdf,
    faFileWord,
    faFileExcel,

} from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/components/getExtImage.module.scss'

export default ({type}: {type:string}) => {
    
    switch(type){
        case 'image/png':
            return <FontAwesomeIcon className={`${styles.fileImg} ${styles.orange}`} icon={faFileImage} />
        case 'application/pdf':
            return <FontAwesomeIcon className={`${styles.fileImg} ${styles.red}`} icon={faFilePdf} />
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return <FontAwesomeIcon className={`${styles.fileImg} ${styles.blue}`} icon={faFileWord} />
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return <FontAwesomeIcon className={`${styles.fileImg} ${styles.green}`} icon={faFileExcel} />
        default:
            return <FontAwesomeIcon className={`${styles.fileImg} ${styles.grey}`} icon={faFileAlt} />
    }

    
} 