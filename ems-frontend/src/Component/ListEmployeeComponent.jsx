import React, { useEffect, useState } from "react";
import { listEmployees } from "../Services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  //employees → this is the "state variable" that holds your data (the employee list)
  //setEmployees() = function used to update that state. when you call useState()

  const navigator = useNavigate();

  //useEffect is used to perform side tasks like fetching data when the component loads
  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Employees: ", error);
      });
  }, []);
  //response.data holds the actual employee array from the backend, so it’s stored in setEmployees
  //[] - empty dependency array [] tells React to Run this effect only once — right after the component mounts


  //Onclick Function for (Add Employee)
  function addNewEmployee() {
    navigator("/add-employee");
  }

  //Onclick Function for (update Employee)
  function updateEmployee(id){
    navigator(`/update-employee/${id}`);
  }

  //showing the O/P using dummy data (For Testing)
  //     const dummyData = [
  //         {
  //             "id":1,
  //             "firstName": "Deepak",
  //             "lastName": "dev",
  //             "email": "deepak@gmail.com"
  //         },
  //         {
  //             "id":2,
  //             "firstName": "Senthil",
  //             "lastName": "kumar",
  //             "email": "senthil@gmail.com"
  //         },
  //         {
  //             "id":3,
  //             "firstName": "Nagaraj",
  //             "lastName": "vel",
  //             "email": "nagaraj@gmail.com"
  //         }
  //     ]

  //creating a table
  return (
    <div className="container">
      <h2> List Of Employees </h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            //.map-->it's a callback function that callback each element 1 time in an array
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button className="btn btn-info" onClick={()=>updateEmployee(employee.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
