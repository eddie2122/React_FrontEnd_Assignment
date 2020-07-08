import React, { Component } from "react";
import "./App.css";
import DataTable from "./Components/DataTable";
class App extends Component {
  constructor(props) {
    super(props);

    let model = {
      headers: [
        {
          title: <td type="button" style={{ color: "rgb(9, 176, 210)" }}> Things to do</td>,
          accessor: "item",
          width: "300px",
          index: 2,
          cell: (row) => (
            <div className="item">
              <p>New Item</p>
            </div>
          ),
        },
        {
          title: "",
          accessor: "chat_img",
          index: 3,
          cell: row =>(
           <p>hi</p>
          )
            
        },

        {
          title: "Owner",
          accessor: "owner",
          width: "50px",
          index: 4,
          cell: {
            type: "image",
            style: {
              "width": "25px",
            },
          },
        },
        {
          title: <td className = "StatusHead">Status</td>,
          accessor: "status",
          index: 5,
          "width": "50px",
          cell: (row) => (
            <div className="button">
              <select className="status" name="ststus" onchange="test(this);">
                <option className="workingOnIt" value="workingOnIt">
                  Working on it
                </option>
                <option className="stuck" value="stuck" select="stuck">
                  Stuck
                </option>
                <option className="WaitingForReview" value="WaitingForReview">
                  WaitingForReview
                </option>
                <option className="green" value="Done">
                  Done
                </option>
                <option value="Blank2" className="option1"></option>
                <option value="Blank1" className="option2"></option>
                <option value="Critical" className="critical">
                  Critical
                </option>
              </select>
            </div>
          ),
        },

        {
          title: <td className="StatusHead"></td>,
          accessor: "completion_img",
          index: 6,
          cell: {
            type: "image", 
              style: {
              "width": "20px",
              "align-items": "right",
            },
          },
        },
        { title: "Due_date", accessor: "due_date", index: 7, width: "10px" },
        {
          title: "Priority",
          accessor: "priority",
          index: 8,
          cell: (row) => (
            <div>
              <td type="button" className="status" name="ststus" onchange="test(this);">
              <div style={{display:"none"}}>
                <option className="workingOnIt" value="workingOnIt">
                  Working on it
                </option>
                <option className="stuck" value="stuck" select="stuck">
                  Stuck
                </option>
                <option className="WaitingForReview" value="WaitingForReview">
                  WaitingForReview
                </option>
                <option className="green" value="Done">
                  Done
                </option>
                <option value="Blank2" className="option1"></option>
                <option value="Blank1" className="option2"></option>
                <option value="Critical" className="critical">
                  Critical
                </option>
                </div>
              </td>
            
            </div>
          ),
        },
      ],

      data: [
        {
          item: "New Item",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "workingOnIt",
          completion_img: "completion.png",
          due_date: "April 9",
          priority: "Urgent",
        },
        {
          item: "New Item",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "stuck",
          completion_img: "completion.png",
          due_date: "April 10",
          priority: "High",
        },
        {
          item: "New Item",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "",
          completion_img: "completion.png",
          due_date: "April 11",
          priority: "Medium",
        },
        {
          item: "New Item",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "",
          completion_img: "completion.png",
          due_date: "April 12",
          priority: "Low",
        },
        {
          item: "mnhjbnkl",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "",
          completion_img: "completion.png",
          due_date: "April 13",
          priority: "",
        },
        {
          item: "Task2",
          chat_img: "chat.png",
          owner: "prefilenew1.png",
          status: "",
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
