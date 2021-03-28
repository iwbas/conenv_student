import './ExitForm.css';

import React from "react";
const { ipcRenderer } = window.require("electron");

class ExitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // Обработка пароля
    // confirmPassword();

    if (this.state.value === '123') {
      console.log(this.state.value);
      ipcRenderer.send('close-by-pass');
    }

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Пароль:</label>
        <input
          type="password"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input type="submit" value="Подтвердить" />
      </form>
    );
  }
}

export default ExitForm;
