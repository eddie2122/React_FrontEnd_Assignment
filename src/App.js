import React, { Component } from 'react';
import './App.css';
import DataTable from './Components/DataTable';
class App extends Component {
  constructor(props){
  super(props);


  let model = {
    headers: [
      {title: "", accessor: "id", index: 0, width:10,  cell:{
        type:"image",
        style:{
          "width": "50px",
        }}},
     
      {title:"Item", accessor: "item", width: "10px", index: 2, },
      {title:"", accessor : "chat_img", index: 3, cell:{
        type:"image",
        style:{
          "width": "50px",
        }}},
    
      {title: "Person", accessor: "owner", width: "100px", index: 4, cell:{
        type: "image",
        style: {
          "width": "50px",
        }
      }},
      {title: "Status", accessor: "status", index:5, width: "2000px", cell: row => (
        <div className = "dropdown">
          <div class="container">
            <div class="dropdown">
              <button type="button" class="btn btn-default dropdown-toggle"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Status
             </button>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="profile.com">Working on it</a>
                    <a class="dropdown-item" href="profile.com">Stuck</a>
                    <a class="dropdown-item" href="profile.com">Done</a>
                    <a class="dropdown-item" href="profile.com">Waiting for review</a>
                    <a class="dropdown-item" href="profile.com">Critical</a>

                </div>
            </div>
          </div>
              
          {row}</div> 
      )},
      {title: "", accessor: "completion_img", index:6, cell:  {
        type:"image",
        style:{
          "width": "50px",
        }}},
      {title: "Due_date", accessor: "due_date", index:7},
      {title: "Priority", accessor: "priority", index:8},
      {title: "button" , accessor:"button", index:9 }
    ],
    
      data: [
        {id: "id.bmp", item:"New Item", chat_img: "chat.png", owner: "profile.png", status: "", 
        completion_img: "completion.png", due_date: "April 9", priority: "Urgent"},
        {id: "id.bmp", item:"New Item", chat_img: "chat.png", owner: "profile.png", status: "", 
        completion_img: "completion.png", due_date: "April 10", priority: "High"},
        {id: "id.bmp", item:"New Item", chat_img: "chat.png", owner: "profile.png", status: "", 
        completion_img: "completion.png", due_date: "April 11", priority: "Medium"},
        {id: "id.bmp", item:"New Item", chat_img: "chat.png", owner: "profile.png", status: "", 
        completion_img: "completion.png", due_date: "April 12", priority: "Low"},
        {id: "id.bmp", item:"mnhjbnkl", chat_img: "chat.png", owner: "profile.png", status: "", 
        completion_img: "completion.png", due_date: "April 13", priority: ""},
        {id: "id.bmp", item:"Task2", chat_img: "chat.png", owner: "profile.png", status: "", 
        completion_img: "completion.png", due_date: "April 14", priority: ""},

      ]
  }
  this.state = model;
}

onUpdateTable = (field, id,value) => {

}
render() {
  return (
    <div className="App">
      <DataTable className="data-table"
        title="Things to do"
        keyField="id"
        edit={true}
        pagination={{
          enabled: true,
          pageLength: 15,
          type: "Long" //Long, Short
        }}
        width="100%"
        headers={this.state.headers}
        data={this.state.data}
        noData="No Records" 
        onUpdate={this.onUpdateTable} />
    </div>
  );
}
}

export default App;
