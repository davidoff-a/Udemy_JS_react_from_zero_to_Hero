import "./app-info.css";
const AppInfo = ({ employees }) => {
  const awarded = employees.filter((item) => item.increase).length;
  return (
    <div className='app-info'>
      <h1>Учет сотрудников в компании N</h1>
      <h2>Общее число сотрудников - {employees.length}</h2>
      <h2>Премию получат - {awarded}</h2>
    </div>
  );
};

export default AppInfo;
