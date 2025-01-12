import './styles/reset.css'
import './styles/index.css'

import initialStoreItems from './store-items'
import { useState } from 'react'
import StoreItmes from './StoreItems'

import CartItem from './CartItem'

/*
Here's what a store item should look like
{
  id: '001-beetroot',
  name: 'beetroot',
  price: 0.35
}

What should a cart item look like? 🤔
*/

console.log(initialStoreItems)

export default function App() {
  // Setup state here...
const [storeItem, setStoreItem] = useState(initialStoreItems)
const [cartItems, setCartItems] = useState ([])


// by using the button "add to cart"
// find the item from the storeitems
// and than add the item to the cart
// by clicking button everytime it has to add new item to the cart.
const addItemCart = item => {
const itemsInStore = storeItem.find(items =>
  {
    return items.id === item.target.id
  }) 
  const itemInCart = cartItems.find(itemInCart => {
      return itemInCart.id === item.target.id
      })
      if (itemInCart) {
        itemInCart.quantity++
            setCartItems([...cartItems])
          } else {
            let newCartItem = { ...itemsInStore, quantity: 1 }
            setCartItems([...cartItems, newCartItem])
          }
}

const CalculateCartTotal = () => {
  let currentTotal = 0
  cartItems.forEach(itemInCart => {
    currentTotal += itemInCart.quantity * itemInCart.price
  })
console.log(currentTotal)
  return currentTotal.toFixed(2)
}
  //  increase the quantity of items
const handleIncrement = cartItem => {

  const newCartItems = cartItems.map(targetCartItem => {
    if (targetCartItem.name === cartItem.name) {
    console.log("increase item", targetCartItem)
      return {...targetCartItem, quantity: targetCartItem.quantity +1}
    } else {
      return targetCartItem
    }
  })
 
  setCartItems(newCartItems)
}
// decrement button
// check if the quqntity is more than 1 ,implement decrese 1
// otherwise if it is equal to 1 remove from cart
const handleDecrement =cartItem =>{
  if(cartItem.quantity > 1) {
    const newCartItems = cartItems.map(targetCartItem => {
      if(targetCartItem.name === cartItem.name && targetCartItem.quantity) {
        return {...targetCartItem, quantity: targetCartItem.quantity -1}
      }
      return targetCartItem
    })
    setCartItems(newCartItems)
   
  }else {
    const removeItem = cartItems.filter(targetCartItem =>
      targetCartItem.name !== cartItem.name)
      setCartItems(removeItem)
  
  }
}

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {/* Wrtite some code here... */}
        {storeItem.map(items =>
          (<StoreItmes
          id={items.id}
          name={items.name}
          price={items.price}
          addItemCart ={addItemCart}
          
          />
          ))}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {/* Wrtite some code here... */}
            {cartItems.map(itemInCart =>
              (<CartItem
                id={itemInCart.id}
                name={itemInCart.name}
                price={itemInCart.price}
                quantity={itemInCart.quantity}
                addItemCart ={addItemCart}
                handleIncrement = {handleIncrement}
                handleDecrement = {handleDecrement}
              />
              ))}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">£{CalculateCartTotal()}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}


