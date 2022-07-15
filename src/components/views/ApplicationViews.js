import { Route, Routes } from "react-router-dom"
import {LocationsList} from "../tickets/Locations"
import { ProductsList } from "../tickets/Products"
import { ProductForm } from "../tickets/ProductForm"
import { FindCandy } from "../tickets/FindCandy"
import { EmployeesList } from "../tickets/Employees"

export const ApplicationViews = () => {
	return (
	<>
		<Routes>
			<Route path="/" element={<h1>Kandy Korner</h1>} />
			<Route path="locations" element={<LocationsList />} />
			<Route path="products" element={<ProductsList />} />
			<Route path="products/create" element={<ProductForm />} />
			<Route path="/search" element={<FindCandy />} />
			<Route path="/employees" element={<EmployeesList />} />
			<Route path="/employees/create" element={<FindCandy />} />
		</Routes>
	</>
	)
}

