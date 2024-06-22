import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalPrice = cartList.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.quantity
      }, 0)
      const totalItems = cartList.length
      return (
        <div className="cart-summary-container">
          <h1 className="cart-summary-header">
            Order Total : <span>RS {totalPrice}/-</span>
          </h1>
          <p lclassName="cart-summary-para">{totalItems} items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
