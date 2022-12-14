import React from "react";
import baseUrl from "../../config.js";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import axios from "axios";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {
    //const pwd = bcrypt.hashSync(this.state.password, salt);

    // FIXME: Validate user payload for correctness & uniqueness before proceeeding

    axios
      .post(baseUrl + "/user/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        console.log("[LOGIN] res_payload: " + Object.keys(res));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        // console.log("[LOGIN] err: " + err.response.data.mssg);
        if (err.response && err.response.data && err.response.data.mssg) {
          swal({
            text: err.response.data.mssg,
            icon: "error",
            type: "error",
          });
        }
      });
  };

  render() {
    return (
      <div style={{ marginTop: "200px" }}>
        <div>
          <h2>Login</h2>
        </div>

        <div>
          <TextField
            id="username"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
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
            placeholder="Password"
            required
          />
          <br />
          <br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === "" && this.state.password === ""}
            onClick={this.login}
          >
            Login
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/register">Register</Link>
        </div>
      </div>
    );
  }
}
