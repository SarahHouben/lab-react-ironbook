import React, { Component } from "react";
import users from "./users";
import uuidv4 from "uuid/v4";
import "./App.css";

class App extends Component {
  state = {
    users: users,
    search: "",
    teacher: false,
    student: false,
    campus: ""
  };

  //function for name-filter
  handleChange = event => {
    const value = event.target.value;
    this.setState({
      search: value
    });
  };

  //function for role-filter
  handleCheckboxChange = event => {
    const name = event.target.name;
    const check = event.target.checked;
    this.setState({
      [name]: check
    });
  };

  // //function for campus-filter
  handleSelectChange = event => {
    const value = event.target.value;
    this.setState({
      campus: value
    });
  };

  render() {
    const filtered = this.state.users.filter(user => {
      //filter according to search input (name)
      let nameMatched =
        user.lastName.toLowerCase().includes(this.state.search.toLowerCase()) ||
        user.firstName.toLowerCase().includes(this.state.search.toLowerCase());

      //sort according to role
      let role = "";
      if (this.state.teacher) {
        role = "teacher";
      }
      if (this.state.student) {
        role = "student";
      }
      let roleMatched = user.role.includes(role);

      //sort according to campus
      let campusMatched = this.state.campus
        ? user.campus === this.state.campus
        : true;
      // console.log(user.campus);
      // console.log(campusMatched);
      // console.log(this.state.campus);
      return nameMatched && roleMatched && campusMatched;
    });

    const bookUsers = filtered.map(el => {
      const id = uuidv4();
      return (
        <tr key={id}>
          <td>{el.firstName}</td>
          <td>{el.lastName}</td>
          <td>{el.campus}</td>
          <td>{el.role}</td>
          <td>
            {el.linkedin ? (
              <a href={el.linkedin}>
                <img
                  className="linkedin-logo"
                  src="linkedin.png"
                  alt="linkedin Logo"
                />
              </a>
            ) : (
              <p></p>
            )}
          </td>
        </tr>
      );
    });

    function campusFilter(value, index, self) {
      // return self.indexOf(value) === index;
      let foundIndex = self.findIndex(function(element) {
        return value.campus === element.campus;
      });
      return foundIndex === index;
    }

    let uniqueCampus = users.filter(campusFilter);
    // console.log(uniqueCampus);

    const campusSelection = uniqueCampus.map(el => {
      return (
        <option key={el.campus} value={el.campus}>
          {el.campus}
        </option>
      );
    });

    return (
      <div className="App">
        <h1>Ironbook</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search"></label>
          <input
            type="search"
            name="search"
            id="search"
            value={this.state.search}
            onChange={this.handleChange}
          />

          <label htmlFor="student">Student</label>
          <input
            type="checkbox"
            name="student"
            id="student"
            checked={this.state.student}
            onChange={this.handleCheckboxChange}
          />

          <label htmlFor="teacher">Teacher</label>
          <input
            type="checkbox"
            name="teacher"
            id="teacher"
            checked={this.state.teacher}
            onChange={this.handleCheckboxChange}
          />
        </form>

        <select
          name="campus"
          id="campus"
          value={this.state.campus}
          onChange={this.handleSelectChange}
        >
          <option value=""></option>
          {campusSelection}
        </select>

        <table>
          <thead>
            <tr>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Campus</td>
              <td>Role</td>
              <td>Links</td>
            </tr>
          </thead>
          <tbody>{bookUsers}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
