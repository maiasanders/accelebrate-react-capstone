import { useContext } from 'react'
import MenuItemCard from '../MenuItemCard/MenuItemCard'
import styles from './HomePage.module.css'
import MenuItemContext from '../../context/MenuItemContext'

const HomePage = () => {
    const menuItems = useContext(MenuItemContext)

    return (<main id={styles.homePage}>
        {menuItems.map(item => (<MenuItemCard key={item.id} menuItem={item} />))}
    </main>)
}

export default HomePage
