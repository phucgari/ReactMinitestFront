import React from 'react';

function Cart(props) {
    const {cart,setCart}=props
    function Buy(){
        console.log(cart)
        setCart([])
    }
    return (
        <table>
            <h3>Cart</h3>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Categories</th>
                <th>Number Of Product</th>
            </tr>
            {cart.map((product) =>
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                        {product.categories.map(category =>
                            <>
                                <label>{category.name}</label>
                                <br/>
                            </>
                        )}
                    </td>
                    <td>
                        {product.number}
                    </td>
                </tr>
            )}
            <button onClick={Buy}>Buy</button>
        </table>
    );
}

export default Cart;