import "./app-info.css";
const AppInfo = ({ employees }) => {
  console.log(employees.length);
  return (
    <div className='app-info'>
      <h1>Учет сотрудников в компании N</h1>
      <h2>Общее число сотрудников - {employees.length}</h2>
      <h2>Премию получат:</h2>
    </div>
  );
};

export default AppInfo;
