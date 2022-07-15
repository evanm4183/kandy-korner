import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [topPriced, setTopPriced] = useState(false)
    const navigate = useNavigate()

    const localUser = JSON.parse(localStorage.getItem("kandy_user"))

    useEffect(() => {
        fetch(`http://localhost:8088/products?_expand=type&_sort=name`)
        .then(res => res.json())
        .then(products => {
            setProducts(products)
            setFiltered(products)
        })
    }, [])
    
    useEffect(() => {
        if (topPriced) {
            const filtered = products.filter(product => product.unitPrice > 2)
            setFiltered(filtered.sort((p1, p2) => p2.unitPrice - p1.unitPrice))
        } else {
            setFiltered(products)
        }
    }, [topPriced])

    return (
        <>
            <h2>Our Products</h2>
            <button onClick={() => {setTopPriced(true)}}>Top Price</button>
            <button onClick={() => {setTopPriced(false)}}>All Candy</button>
            {
                localUser.staff 
                    ? <button onClick={() => navigate("/products/create")}>Add Candy</button>
                    : ""
            }       
            <article className="products">
            {
                filteredProducts.map(product => 
                    <section className="product" key={product.id}>
                        <div>Product Name: {product.name}</div>
                        <div>Product Price: {product.unitPrice}</div>
                        <div>Product Category: {product.type.name}</div>
                    </section>
                )
            }
            </article>
        </>
    )
}