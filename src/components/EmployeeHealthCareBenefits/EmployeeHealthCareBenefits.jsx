import { initialEmployeeList } from '../../data/data';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import { useEffect, useState } from "react";

// getting the initial list of the employee
const getInitialEmployeeList = () => {
    const employeeListMemory = localStorage.getItem('employeeList')
    return employeeListMemory ? JSON.parse(employeeListMemory) : initialEmployeeList;
}


const EmployeeHealthCareBenefits = () => {

    const [employeeList, setEmployeeList] = useState(getInitialEmployeeList())
    const [editEmployee, SetEditEmployee] = useState(null);

    // This useState hook will set the employee list on initial load and on every employeeList state change
    useEffect(() => {
        localStorage.setItem('employeeList', JSON.stringify(employeeList));
    }, [employeeList])


    // This function will update the state of the employeelisyt based on add/edit
    const addOrUpdateEmployee = (employee) => {
        if (employee.id) {
            setEmployeeList(employeeList.map(emp => emp.id === employee.id ? employee : emp))
        }
        else {
            var id = employeeList.length ? employeeList[employeeList.length - 1].id + 1 : 1;
            let newEmployee = {id, ...employee}
            setEmployeeList([...employeeList, newEmployee])
        }
        SetEditEmployee(null);
    }

    // This function will delete an employee from the list
    const deleteEmployee = (id) => {
        setEmployeeList(employeeList.filter(emp => emp.id !== id))
    }

    // This function will empty the editemployee state
    const onCancel = () => {
        SetEditEmployee(null)
    }

    return (
        <div className='employeeHealthBenefit'>
            {
                employeeList.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onEdit={() => SetEditEmployee(employee)}
                        onDelete={() => deleteEmployee(employee.id)}
                    />
                ))
            }
            <EmployeeForm
                employee={editEmployee}
                onSave={addOrUpdateEmployee}
                onCancel={onCancel}
            />
        </div>
    )
}

export default EmployeeHealthCareBenefits;