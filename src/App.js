import React, { Component } from "react";
import "./App.css";
import DataTable from "./Components/DataTable";
import { reduceHooks } from "react-table";
//import "./Components/DataTable/status.css";

class App extends Component {
  constructor(props) {
    super(props);

    let model = {
      headers: [
        {
          title: (
            <p type="button" style={{ color: "rgb(9, 176, 210)" }}>
              Things to do
            </p>
          ),
          accessor: "item",
          width: "300px",
          index: 2,
          cell: (row) => (
            <div className="item">
              <p>{row}</p>
            </div>
          ),
        },
        {
          title: "",
          accessor: "chat_img",
          index: 3,
          cell: (row) => (
            <div className="chatImg">
                <i class="material-icons">chat_bubble_outline</i>
            </div>
          ),
        },
        {
          title: "Owner",
          accessor: "owner",
          width: "50px",
          index: 4,
          cell: (row) => (

              <i class="material-icons">account_circle</i>
          ),
        },
        {
          title: <td className="StatusHead">Status</td>,
          accessor: "status",
          index: 5,
          width: "50px",
          cell: (row) => (
            <div class="dropdown">
              <button class="dropbtn">{row}</button>
              <div class="dropdown-content">
                <table class="beta">
                  <tbody>
                    <tr>
                      <option className="working">Working on it</option>
                      <td className="critical">Critical</td>
                    </tr>
                    <tr>
                      <td className="stuck">Stuck</td>
                    </tr>
                    <tr>
                      <td className="done">Done</td>
                    </tr>
                    <tr>
                      <td className="null1">Empty</td>
                    </tr>
                    <tr>
                      <td className="null2">Empty</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <a href="Edit.com">Add/Edit Labels</a>
              </div>
            </div>
          ),
        },

        {
          title: <td className="StatusHead"></td>,
          accessor: "completion_img",
          index: 6,
          cell: (row) => (

            <i class="material-icons">check_circle</i>
          ),
          },
        { title: "Due_date", accessor: "due_date", index: 7, width: "10px" },
        { title: "priority", accessor: "priority", index: 8, cell : (row) =>(
          <div className="priority">
            <select name="cars" id="cars">
              <option value="Urgent" className="Urgent" selected>priority</option>
              <option value="saab">Urgent</option>
              <option value="mercedes">High</option>
              <option value="audi">Medium</option>
              <option value="audi">Low</option>
            </select>
          </div>
        ) },
      ],

      data: [
        {
          item: "New Item",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "working on it",
          completion_img: "completion.png",
          due_date: "April 9",
          priority: "Urgent",
        },
        {
          item: "New Item",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "Stuck",
          completion_img: "completion.png",
          due_date: "April 10",
          priority: "High",
        },
        {
          item: "New Item",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "Waiting for review",
          completion_img: "completion.png",
          due_date: "April 11",
          priority: "Medium",
        },
        {
          item: "New Item",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "Done",
          completion_img: "completion.png",
          due_date: "April 12",
          priority: "Low",
        },
        {
          item: "mnhjbnkl",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "Stuck",
          completion_img: "completion.png",
          due_date: "April 13",
          priority: "",
        },
        {
          item: "Task2",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "Done",
          completion_img: "completion.png",
          due_date: "April 14",
          priority: "",
        },
        //add array
      ],
    };
    this.state = model;
  }

  onUpdateTable = (field, id, value) => {};
  render() {
    return (
      <div className="App">
        <DataTable
          className="data-table"
          keyField="id"
          edit={true}
          pagination={{
            enabled: true,
            pageLength: 15,
            type: "Long", //Long, Short
          }}
          width="100%"
          headers={this.state.headers}
          data={this.state.data}
          noData="No Records"
          onUpdate={this.onUpdateTable}
        />
      </div>
    );
  }
}

export default App;
