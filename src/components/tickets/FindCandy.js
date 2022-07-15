import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const FindCandy = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [quantities, setQuantities] = useState([])
    const [word, updateWord] = useState(undefined)

    useEffect(() => {
        fetch(`http://localhost:8088/products?_sort=name`)
        .then(response => response.json())
        .then(products => {
            setProducts(products)

            return fetch(`http://localhost:8088/quantities?_expand=location&_sort=locationId`)
        })
        .then(response => response.json())
        .then(quantites => {setQuantities(quantites)})
    }, [])

    useEffect(() => {
        if (word !== "") {
            const filtered = products.filter(product => product.name.startsWith(word))
            setFiltered(filtered)
        } else {
            setFiltered(undefined)
        }
    }, [word])

    return (<>
        <fieldset>
            <div className="form-group">
                <label>What Candy are you looking for?</label>
                <input type="text"
                onChange={
                    e => {
                        updateWord(e.target.value)
                    }
                }
                ></input>
            </div>
        </fieldset>
        {
            filteredProducts
                ? filteredProducts.map(product => 
                    <section className="product" key={product.id}>
                            <div>Product Name: {product.name}</div>
                            <div>Product Price: {product.unitPrice}</div>
                            <button 
                            onClick={
                                e => {
                                    const matchingQuantities = quantities.filter(quantity => quantity.productId === product.id)
                                    window.alert(`
                                        Locations With Candy:
                                        ${matchingQuantities.map(quantity => 
                                            `${quantity.location.address}`
                                        )}
                                    `)
                                }
                            }
                            >Show me Where</button>
                    </section>
                )
                : ""
        }   
    </>)
}