import React from "react";
import swal from "sweetalert";
import baseUrl from "../../config.js";
import { Button, TextField, Link } from "@material-ui/core";
const axios = require("axios");

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {
    axios
      .post(baseUrl + "register", {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("[REGISTER_ERROR]: " + err.response.data.errorMessage[2]);
        swal({
          // text: err.response.data.errorMessage,
          text: err.message,
          icon: "error",
          type: "error",
        });
      });
  };

  render() {
    return (
      <div style={{ marginTop: "200px" }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
          <TextField
            id="name"
            type="text"
            autoComplete="off"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            placeholder="Enter Full Name"
            required
          />
          <br />
          <br />
          <TextField
            id="username"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="Enter username"
            required
          />
          <br />
          <br />
          <TextField
            id="email"
            type="text"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Your Email"
            required
          />
          <br />
          <br />
          <TextField
            id="password"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Enter Password"
            required
          />
          <br />
          <br />
          <TextField
            id="confirm_password"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder=" Enter Confirm Password"
            required
          />
          <br />
          <br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={
              this.state.username === "" &&
              this.state.email === "" &&
              this.state.password === ""
            }
            onClick={this.register}
          >
            Register
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/">Login</Link>
        </div>
      </div>
    );
  }
}
