import { useState, useEffect } from "react"

export const EmployeesList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/employees?_expand=user&_expand=location&_sort=locationId`)
        .then(response => response.json())
        .then(employees => {setEmployees(employees)})
    }, [])

    return (
        <>
            <h2>Employees</h2>
            {
                employees.map(employee => 
                    <section className="employee" key={employee.id}>
                        <div>Employee Name: {employee.user.fullName}</div>
                        <div>Employee Location: {employee.location.address}</div>
                    </section>
                )
            }
        </>
    )
} //test