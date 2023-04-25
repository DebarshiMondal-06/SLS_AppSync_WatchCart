import React from 'react'
import { useContext } from 'react';
import { createGlobalContext } from './ContextGlobal';


const Checkout = () => {
  const { userItem } = useContext(createGlobalContext);
  let { carts } = (userItem) || {}


  return <main className="container-sm checkout-section">
    <section className="checkout-page">
      {
        carts && !(carts.length > 0)
          ? <article className="text-center mt-5"> <i className="fas fa-ghost fa-3x"></i>
            <br />
            <span className="no_data">No Data</span>
          </article>
          : <section className="checkout-row row">
            <div className="col-md-2"></div>
            <div className="col-md-4 items">
              <p>Items</p>
              {
                carts && carts.map((ele, i) => {
                  const { price, brand } = ele || {};
                  // const { name, brand } = watch || {};
                  return <section key={i} className="items_qunatity">
                    <article className="brand_name text-capitalize"><b></b> {brand} </article>
                    <article className="cart_price"><b></b> ${price}/-</article>
                    <p className="line"></p>
                  </section>
                })
              }
            </div>
            <div className="col-md-4 quanties">
              <p>Quantity</p>
              {
                carts && carts.map((ele, i) => {
                  const { count } = ele || {};
                  return <section key={i} className="items_qunatity">
                    <article className="count">{count}</article>
                  </section>
                })
              }
              <h2 style={{ float: 'right', marginTop: 40, marginBottom: 60 }} className="total">Total:&nbsp;
                <span className="total_num">${
                  carts && carts.reduce((acc, curr) => acc + (curr.price * curr.count), 0)
                }</span>
              </h2>
            </div>
            <div className="col-md-2"></div>
          </section>
      }
    </section>
  </main>
}

export default Checkout;
