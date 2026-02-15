import { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    name: "",
    email: "",
    userId: "",
    title: "",
    startTime: "",
    endTime: "",
    message: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  createUser = async () => {
    const { name, email } = this.state;

    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        { name, email }
      );

      this.setState({
        message: "User Created! ID: " + response.data.id
      });

    } catch (error) {
      this.setState({
        message: error.response?.data?.message || "Error creating user"
      });
    }
  };

  createMeeting = async () => {
    const { userId, title, startTime, endTime } = this.state;

    try {
      const response = await axios.post(
        "http://localhost:3000/meetings",
        {
          userId,
          title,
          startTime,
          endTime
        }
      );

      this.setState({
        message: "Meeting Created Successfully!"
      });

      console.log(response.data);

    } catch (error) {
      this.setState({
        message: error.response?.data?.message || "Error creating meeting"
      });
    }
  };

  render() {
    const { name, email, userId, title, startTime, endTime, message } = this.state;

    return (
      <div style={{ padding: "30px", fontFamily: "Arial" }}>
        <h1>Calendar Booking App</h1>

        <h2>Create User</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={this.handleChange}
        />
        <br /><br />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={this.handleChange}
        />
        <br /><br />
        <button onClick={this.createUser}>
          Create User
        </button>

        <hr />

        <h2>Create Meeting</h2>

        <form onSubmit={this.createMeeting}>

          <input
            type="number"
            name="userId"
            value={this.state.userId}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <input
            type="datetime-local"
            name="startTime"
            value={this.state.startTime}
            onChange={this.handleChange}
          />

          <input
            type="datetime-local"
            name="endTime"
            value={this.state.endTime}
            onChange={this.handleChange}
          />

          <button type="submit">
            Book Meeting
          </button>

        </form>


        <hr />

        <h3 style={{ color: "blue" }}>{message}</h3>
      </div>
    );
  }
}

export default App;
