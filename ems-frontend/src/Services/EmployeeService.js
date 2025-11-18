import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

//to get employees
export const listEmployees = () => axios.get(REST_API_BASE_URL);

//to add employees
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

//to get employee by id
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

//to update employee
export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' +employeeId, employee);

//to delete employee
export const deleteEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);