import "./employees-add-form.css";

const EmployeesAddForm = () => {
  return (
    <div className='app-add-form'>
      <h3>Добавьте нового сотрудника</h3>
      <form action='#' className='add-form d-flex'>
        <input
          type='text'
          className='form-control new-post-label'
          placeholder='Как его зовут?'
        />
        <input
          type='number'
          className='form-control new-post-label'
          placeholder='З/П в 1?'
        />
        <button className='btn btn-outline-light' type='submit'>
          Добавить
        </button>
      </form>
    </div>
  );
};

export default EmployeesAddForm;