import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(data => setPlants(data))
  }, [])

  function handleNewPlant(newPlant){
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {
        "name": newPlant.name,
        "image": newPlant.image,
        "price": newPlant.price
      } )
    })
    .then(r => r.json())
    .then(data => setPlants([...plants, data]))
  }

  function handleSearch(searchTerm){
    setSearch(searchTerm)
  }
  const plantsToDisplay = plants.filter(plant =>{
    if (search.length > 0) {
      return (plant.name.includes(search))
    } else {
      return true
    }
  })

  function handleDelete(id){
    const updatedPlants = plants.filter(plant => plant.id === id ? null : true)
    setPlants(updatedPlants)
  }

  function handlePriceChange(priceChangedPlant){
    const updatedPrices = plants.map(plant => plant.id === priceChangedPlant.id ? priceChangedPlant : plant)
    setPlants(updatedPrices)
  }

  return (
    <main>
      <NewPlantForm onNewPlant={handleNewPlant}/>
      <Search onSearch={handleSearch}/>
      <PlantList 
        plants={plantsToDisplay} 
        onDelete={handleDelete}
        onPriceChange={handlePriceChange} />
    </main>
  );
}

export default PlantPage;
