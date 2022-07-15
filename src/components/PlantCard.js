import React, { useState } from "react";

function PlantCard({ id, name, image, price, onDelete, onPriceChange }) {
  const [stockButton, setStockButton] = useState(true)
  const [newPrice, setNewPrice] = useState(0)

  function changeStockButton(){
    setStockButton((stockButton) => !stockButton)
  }

  function handleDelete(){
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    onDelete(id)
  }

  function handlePriceInput(e){
    setNewPrice(e.target.value)
  }

  function handlePriceUpdate(e){
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "price": newPrice
      })
    })
    .then(r => r.json())
    .then(data => onPriceChange(data))
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <form onSubmit={handlePriceUpdate}>
        <input 
          type="number" 
          step="0.01" 
          placeholder="New Price"
          onChange={handlePriceInput} />
        <button>Update Price</button>
      </form>
      {stockButton ? (
        <button className="primary" onClick={changeStockButton}>In Stock</button>
      ) : (
        <button onClick={changeStockButton}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
