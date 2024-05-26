import { useEffect, useState } from "react";
import { ERROR_EMPLOYEE_NAME_REQUIRE } from '../../constants/index';


const EmployeeForm = ({ employee, onSave, onCancel }) => {

    const [name, setName] = useState('');
    const [dependents, setDependents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setDependents(employee.dependents);
        }
        else {
            setName('');
            setDependents([]);
        }
        setError(''); // ensuring that any existing errors are cleared
    }, [employee])


    // This function will Add dependents field on click of Add Dependent button
    const handleAddDependent = () => {
        setDependents([...dependents, { name: '' }])
    }

    // This function will update the state of the dependents
    const handleDependentChange = (index, value) => {
        const updatedDependents = dependents.map((dep, i) =>
            i === index ? { name: value } : dep
        );
        setDependents(updatedDependents);
    }

    // This function will validate the form for errors before saving
    const validateForm = () => {
        let isValid = true;
        let error = ''

        if (!name.trim()) {
            error = ERROR_EMPLOYEE_NAME_REQUIRE;
            isValid = false;
        }

        setError(error);
        return isValid;
    };


    // this function will help to update the state back in the parent component( EmployeeHealthCareBenefits )
    const handleSave = () => {
        // Removing the empty filed from the dependent list
        const filteredDependents = dependents.filter(dependent => dependent.name.trim());

        if (validateForm()) {
            setDependents(filteredDependents);
            onSave({ ...employee, name, dependents: filteredDependents });
        }
    };

    // This function will help to empty the dependents for the current employee and to call the oncancel fn in the parent
    const cancel = () => {
        setDependents([]);
        onCancel();
    };


    return (
        <div className="employee-form">
            <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
            <label>
                Name:
                <input type='text'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                    }}
                />
                {error && <span className="error">{error}</span>}
            </label>
            <h3>Dependents</h3>
            {dependents.map((dependent, index) => (
                <label key={index}>
                    Name:
                    <input
                        type="text"
                        value={dependent.name}
                        onChange={(e) => handleDependentChange(index, e.target.value)}
                    />
                </label>
            ))}
            <button onClick={handleAddDependent}>Add Dependent</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={cancel}>Cancel</button>

        </div>
    )
}

export default EmployeeForm;