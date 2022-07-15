import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

export const ProductForm = () => {
    const [product, updateProduct] = useState({
        name: "",
        typeId: "",
        unitPrice: ""
    })
    const [productTypes, setTypes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/types`)
        .then(res => res.json())
        .then(types => {setTypes(types)})
    }, [])

    const submitNewCandy = (e) => {
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(() => {navigate("/products")})
    }

    return (
        <>
        <h2>Add a Candy</h2>
        <article className="form">
            <fieldset>
                <div className="form-group">
                    <label>Candy Name</label>
                    <input type="text" value={product.name} 
                    onChange={
                        e => {
                            const copy = {...product}
                            copy.name = e.target.value
                            updateProduct(copy)
                        }
                    }></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Candy Type</label>
                    <select
                    onChange={
                        e => {
                            const copy = {...product}
                            copy.typeId = parseInt(e.target.value)
                            updateProduct(copy)
                        }
                    }>
                        <option value="">Select a Type...</option>
                        {productTypes.map(type => 
                            <option value={type.id} key={type.id}>{type.name}</option>
                        )}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Candy Price</label>
                    <input type="number"
                    onChange={
                        e => {
                            const copy = {...product}
                            copy.unitPrice = parseFloat(e.target.value)
                            updateProduct(copy)
                        }
                    }
                    ></input>
                </div>
            </fieldset>
            <button onClick={e => submitNewCandy(e)}>Submit</button>
        </article>
        </>
    )
}