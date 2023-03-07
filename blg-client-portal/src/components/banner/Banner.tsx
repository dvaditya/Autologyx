import { useContext } from 'react';
import styles from '../../styles/components/banner.module.scss'
import logo from '../../img/BLG_Logo.png'
import Avatar from '@mui/material/Avatar';
import { StoreContextType } from "../../store/StoreProvider"
import { StoreContext } from '../../store/StoreProvider';

const Banner = () => {
    const {state} = useContext(StoreContext) as StoreContextType
    const firstName = state?.extractedForm?.fieldState?.firstname ? state?.extractedForm?.fieldState?.firstname : ""
    const lastName = state?.extractedForm?.fieldState?.lastname ? state?.extractedForm?.fieldState?.lastname : ""
    return (
        <div className={styles.bannerContent}>
            <img src={logo} alt='company logo' />
            <div className={styles.nameContainer}>
                <Avatar className={styles.avatar}>{firstName[0]}{lastName[0]}</Avatar>
                <span>{firstName} {lastName}</span>
            </div>
        </div>
    )
}

export default Banner