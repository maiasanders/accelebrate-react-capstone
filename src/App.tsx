import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import Header from './components/Header/Header'
import { Suspense, useEffect, useReducer, useState } from 'react'
import cartReducer from './reducers/cartReducer'
import CartContext from './context/CartContext'
import CartDispatchContext from './context/CartDispatchContext'
import CartPage from './components/CartPage/CartPage'
import OrderHistoryPage from './components/OrderHistoryPage/OrderHistoryPage'
import OrderDetails from './components/OrderDetails/OrderDetails'
import MenuItemContext from './context/MenuItemContext'
import { MenuItem } from './utils/types'
import { getMenuItems } from './utils/apiUtils'

function App() {
  const [cart, dispatch] = useReducer(cartReducer, [])

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    getMenuItems().then(r => setMenuItems(r.data))
  }, [])

  return (
    <MenuItemContext.Provider value={menuItems}>
      <CartContext.Provider value={cart}>
        <CartDispatchContext.Provider value={dispatch}>
          <Header />
          <Suspense fallback={<p>...loading...</p>}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/checkout' element={<CartPage />} />
              <Route path='/orderhistory' element={<OrderHistoryPage />} />
              <Route path='/order/:id/details' element={<OrderDetails />} />
            </Routes>

          </Suspense>
        </CartDispatchContext.Provider>
      </CartContext.Provider>
    </MenuItemContext.Provider>
  )
}

export default App
