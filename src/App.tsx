import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import Header from './components/Header/Header'
import { useReducer } from 'react'
import cartReducer from './reducers/cartReducer'
import CartContext from './context/CartContext'
import CartDispatchContext from './context/CartDispatchContext'
import CartPage from './components/CartPage/CartPage'
import OrderHistoryPage from './components/OrderHistoryPage/OrderHistoryPage'
import OrderDetails from './components/OrderDetails/OrderDetails'

function App() {
  const [cart, dispatch] = useReducer(cartReducer, [])

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/checkout' element={<CartPage />} />
          <Route path='/orderhistory' element={<OrderHistoryPage />} />
          <Route path='/order/:id/details' element={<OrderDetails />} />
        </Routes>
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

export default App
