import React from 'react'
import { useEffect, useState } from "react";






const Cart = ({ cartArray, setCartArray, setrerenderHeader }) => {
  console.log(cartArray);

  const [rerender, setrerender] = useState(false);
  let total = 0;

  function deleteClick(ind) {
    const newarray = cartArray;
    newarray.splice(ind, 1);
    setCartArray(newarray);
    setrerender(!rerender);
    setrerenderHeader(ind);
  }

  if (cartArray.length) {
    total = cartArray
      .map((item) => item.price)
      .reduce((prev, next) => prev + next);
  }

  return (
    <div className="cartbox">
      <div className="container">
        <div className="row ">
          <h5 className="mb-4">My Movies</h5>
        </div>

        {cartArray.map((elm, index) => (
          <div key={index} className="row align-items-center mb-2">
            <div className="col">
              <img src={elm.image} className="cartimg" alt={elm.name} />
            </div>
            <div className="col ">{elm.name}</div>
            <div className="col">${elm.price.toLocaleString()}</div>
            <div className="col-1 ">
              <i
                class="fa fa-times fa-lg"
                onClick={() => deleteClick(index)}
                style={{cursor:"pointer"}}
              ></i>
            </div>
          </div>
        ))}

        <div className="row mb-2 mt-4 border-top pt-2">
          <div className="col h5">Total:</div>
          <div className="col h5"> $ {total.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart

