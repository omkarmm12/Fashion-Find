import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const oldProduct = cartList.find(item => item.id === product.id)
    if (oldProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newQuantity = (oldProduct.quantity += 1)
      const filtered = cartList.filter(item => item.id !== product.id)
      const newProduct = {...oldProduct, quantity: newQuantity}
      this.setState({cartList: [...filtered, newProduct]})
    }
  }
  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(product => product.id !== id)
    this.setState({cartList: filteredList})
  }

  incrementCartItemQuantity = product => {
    const {cartList} = this.state
    let filterdList = cartList.filter(item => item.id !== product.id)
    this.setState({cartList: [...filterdList, product]})
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state
    let filterdList = cartList.filter(item => item.id !== product.id)
    this.setState({cartList: [...filterdList, product]})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
