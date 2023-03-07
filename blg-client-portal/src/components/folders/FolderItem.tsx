import React from "react";
import styles from '../../styles/components/sidebar.module.scss'

export default ({ name, selected, onClick }: { name: string, selected: boolean, onClick: () => void }) => {
    return <div
        className={`${styles.sidebarItem} ${selected ? styles.active : ''}`}
        onClick={onClick}
    >
        <h5>{name}</h5>
    </div>
}