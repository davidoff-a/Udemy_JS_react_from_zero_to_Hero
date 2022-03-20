import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "John C.", salary: 800, increase: false, id: 1 },
        { name: "Sarah C.", salary: 3000, increase: true, id: 2 },
        { name: "T1000 C.", salary: 15000, increase: false, id: 3 },
      ],
    };
    this.maxId = 4;
  }
  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((elem) => elem.id !== id),
      };
    });
  };

  addEmployee = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      id: this.maxId++,
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleIncrease = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, increase: !item.increase };
        }
        return item;
      }),
    }));
  };

  onToggleRise() {
    console.log("Господа, оставьте меня, ибо вы воруете у меня радость");
  }

  render() {
    return (
      <div className='app'>
        <AppInfo employees={this.state.data} />
        <div className='search-panel'>
          <SearchPanel />
          <AppFilter />
        </div>
        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onIncrease={this.onToggleIncrease}
        />
        <EmployeesAddForm onAdd={this.addEmployee} />
      </div>
    );
  }
}

export default App;
