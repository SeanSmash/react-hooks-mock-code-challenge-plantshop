import React, { useState } from "react";

function NewPlantForm( { onNewPlant }) {
  const [plantName, setPlantName] = useState("")
  const [plantImageURL, setPlantImageURL] = useState("")
  const [plantPrice, setPlantPrice] = useState(0)

  function handleNewPlantName(e){
    setPlantName(e.target.value)
  }

  function handleNewPlantURL(e){
    setPlantImageURL(e.target.value)
  }

  function handleNewPlantPrice(e){
    const priceInt = parseInt(e.target.value, 10)
    setPlantPrice(priceInt)
  }

  function handleNewPlantSubmit(e){
    e.preventDefault()
    const newPlant = {
      name: plantName,
      image: plantImageURL,
      price: plantPrice
    }
    onNewPlant(newPlant)
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleNewPlantSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name"
          onChange={handleNewPlantName} />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL"
          onChange={handleNewPlantURL} />
        <input 
        type="number" 
        name="price" 
        step="0.01" 
        placeholder="Price"
        onChange={handleNewPlantPrice} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
