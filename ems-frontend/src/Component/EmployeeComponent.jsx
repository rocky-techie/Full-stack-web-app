import React, { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../Services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  //to get the "id" from the URl
  const { id } = useParams();

  //for "Form Validation"
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate(); //This navigator is called in the saveEmployee()-->createEmployee

  // const handleFirstName = (e) => setFirstName(e.target.value);

  // const handleLastName = (e) => setLastName(e.target.value);

  // const handleEmail = (e) => setEmail(e.target.value);

  //To fetch existing employee data for update
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching employee details:", error);
        });
    }
  }, [id]);

  //For onclick function
  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    //whenever the saveEmployee hits, it calls this "validateForm"
    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      //if "id" is present, then update else create employee
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error("Error updating employee details:", error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error("Error while creating employee:", error);
          });
      }
    }
  }

  //form validation "if given input is empty or invalid"
  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    //FirstName
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    }

    //LastName
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }

    //Email
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  //Function for pageTitle to display Add or Update Employee
  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div>
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {/*Calling the function for pageTitle*/}
            {pageTitle()}

            <div className="card-body">
              <form action="">
                <div className="form-group mb-2">
                  <label className="form-label">First Name: </label>
                  <input
                    type="text"
                    placeholder="Enter Employee First Name"
                    name="firstName"
                    value={firstName}
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback"> {errors.firstName}</div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Last Name: </label>
                  <input
                    type="text"
                    placeholder="Enter Employee Last Name"
                    name="lastName"
                    value={lastName}
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback"> {errors.lastName}</div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Email: </label>
                  <input
                    type="text"
                    placeholder="Enter Employee Email"
                    name="email"
                    value={email}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email}</div>
                  )}
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateEmployee}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
