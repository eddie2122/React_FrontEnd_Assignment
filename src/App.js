import React, { Component } from "react";
import "./App.css";
import DataTable from "./Components/DataTable";
import Statuses from "./Components/Statuses";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statuses: ['Working on it', 'Critical', 'Stuck', 'Done', 'Waiting for Review'],
      colorMapping: {},
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
            <Statuses statuses={this.state.statuses} colorMapping={this.state.colorMapping} insertNewStatus={this.insertNewStatus.bind(this)} row={row} />
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
        { title: "DueDate", accessor: "due_date", index: 7, width: "10px" },
        {
          title: "Priority", accessor: "priority", index: 8, cell: (row) => (
            <Statuses statuses={['Urgent', 'High', 'Medium', 'Low']} colorMapping={[]} insertNewStatus={() => { }} row={row || 'Low'} nonEditable={true} />
            // <div className="priority">
            //   <select name="cars" id="cars">
            //     {/* <option value="Urgent" className="Urgent" selected>priority</option> */}
            //     <option value="saab">Urgent</option>
            //     <option value="mercedes">High</option>
            //     <option value="audi">Medium</option>
            //     <option value="audi" selected>Low</option>
            //   </select>
            // </div>
          )
        },
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
  }

  insertNewStatus(statusName) {
    const colorMapping = this.state.colorMapping
    const statuses = this.state.statuses

    colorMapping[statusName] = this.getRandomColor()
    statuses.push(statusName)

    this.setState({ colorMapping, statuses })
  }

  getRandomColor() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  }

  onUpdateTable = (field, id, value) => { };
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