import {
    EMPLOYEE_COST_OF_BENEFITS,
    DEPENDENT_COST_OF_BENEFITS,
    PAYCHECK_PER_YEAR,
    DISCOUNT_PERCENTAGE,
    DEFAULT_DISCOUNT_PERCENTAGE,
    DISCOUNT_APPLY_FOR_NAME_SATRTS_WITH
} from '../../constants/index';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {

    const hasDependents = employee.dependents.length > 0;

    // This function helps to calculate the total cost of the health care benefits per employee
    const calculateCost = (employee) => {
        const discount = (name) => name.toUpperCase().startsWith(DISCOUNT_APPLY_FOR_NAME_SATRTS_WITH) ? DISCOUNT_PERCENTAGE : DEFAULT_DISCOUNT_PERCENTAGE
        const total = (EMPLOYEE_COST_OF_BENEFITS * discount(employee.name)) +
            employee.dependents.reduce((sum, dep) => dep.name && sum + (DEPENDENT_COST_OF_BENEFITS * discount(dep.name)), 0);

        return (total / PAYCHECK_PER_YEAR).toFixed(2);
    }

    return (
        <div className="employee-card">
            <h2>{employee.name}</h2>
            {
                hasDependents &&
                <p>Dependents: {employee.dependents.map(dependent => dependent.name).join(', ')}</p>
            }
            <p>Cost Per Paycheck:{employee.name && calculateCost(employee)}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}

export default EmployeeCard;