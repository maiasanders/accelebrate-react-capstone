import menuItems from '../../../menuitems.json'
import MenuItemCard from '../MenuItemCard/MenuItemCard'
import styles from './HomePage.module.css'

const HomePage = () => {
    return (<main id={styles.homePage}>
        {menuItems.map(item => (<MenuItemCard key={item.id} menuItem={item} />))}
    </main>)
}

export default HomePage
