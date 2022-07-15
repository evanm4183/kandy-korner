import { useState, useEffect } from "react"
import "./Pages.css"


export const LocationsList = () => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/locations`)
        .then(response => response.json())
        .then(locations => {setLocations(locations)})
    }, [])


    return (
        <>
            <h2>Our Locations</h2>
            <article className="locations">
            {
                locations.map(location => 
                   <section className="location" key={location.id}>
                        <div>Store City: {location.address}</div>
                        <div>Store Size: {location.sqft}sqft</div>
                   </section> 
                )
            }
            </article>
        </>
    )
}