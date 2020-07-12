import React from "react";
import "./datatable.css";

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: props.headers || [],
      data: props.data || [],
      rows: [{}],
      cols: [{}],
    };

    this.keyField = props.keyField || "id";
    this.noData = props.noData || "No records found!";
    this.width = props.width || "100%";
  }

  onDragOver = (e) => {
    e.preventDefault();
  };

  onClick = (e) => {
    document.getElementById("displaytable").style.display = "block";
  };

  onDragStart = (e, source) => {
    e.dataTransfer.setData("text/plain", source); //eBrowser
  };

  onDrop = (e, target) => {
    e.preventDefault();
    let source = e.dataTransfer.getData("text/plain");
    let headers = [...this.state.headers];
    let srcHeader = headers[source];
    let targetHeader = headers[target];

    let temp = srcHeader.index; // swaping
    srcHeader.index = targetHeader.index;
    targetHeader.index = temp;

    this.setState({
      headers,
    });
  };

  renderTableHeader = () => {
    let { headers } = this.state;
    headers.sort((a, b) => {
      if (a.index > b.index) return 1;
      return -1;
    });

    let headerView = headers.map((header, index) => {
      let title = header.title;
      let cleanTitle = header.accrssor;
      let width = header.width;

      return (
        <th
          key={cleanTitle}
          ref={(th) => (this.th = th)}
          data-col={cleanTitle}
          onDragStart={(e) => this.onDragStart(e, index)}
          onDragOver={this.onDragOver}
          onDrop={(e) => {
            this.onDrop(e, index);
          }}
        >
          <span draggable className="header-cell">
            {title}
          </span>
        </th>
      );
    });
    return headerView;
  };

  renderNoData = () => {
    return (
      <tr>
        <td colSpan={this.state.headers.length}>{this.noData}</td>
      </tr>
    );
  };

  renderContent = () => {
    let { headers, data } = this.state;
    let contentView = data.map((row, rowIdx) => {
      let id = row[this.keyField];
      let edit = this.state.edit;
      let tds = headers.map((header, index) => {
        let content = row[header.accessor];
        let cell = header.cell;
        if (cell) {
          if (typeof cell === "object") {
            if (cell.type === "image" && content) {
              content = <img style={cell.style} src={content} alt="temp" />;
            }
          } else if (typeof cell === "function") {
            content = cell(content);
          }
        }

        if (this.props.edit) {
          if (header.dataType && header.dataType === "string")
            if (edit && edit.row === rowIdx && edit.cell === index) {
              content = (
                <form onSubmit={this.onUpdate}>
                  <input
                    type="text"
                    defaultValue={content}
                    onKeyUp={this.onformReset}
                  ></input>
                </form>
              );
            }
        }
        return (
          <td key={index} data-id={id} data-row={rowIdx}>
            {content}
          </td>
        );
      });
      return <tr key={rowIdx}>{tds}</tr>;
    });

    return contentView;
  };
  handleChange = (idx) => (e) => {
    let data = this.state.data.slice(); //Give New Array
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      data,
    });
  };

  handleChangeCol = (idy) => (e) => {
    let data = this.state.data.slice(); //Give New Array
    const { name, value } = e.target;
    const cols = [...this.state.cols];
    cols[idy] = {
      [name]: value,
    };
    this.setState({
      data,
    });
  };

  handleAddRow = () => {
    const item = {
      name: "",
      status: "",
    };
    this.setState({
      data: [...this.state.data, item],
    });
  };
  handleAddCols = () => {
    const itemcol = {
      name: "",
      status: "",
    };
    this.setState({
      headers: [itemcol, ...this.state.headers],
    });
  };
  renderTable = () => {
    let title = this.props.title;
    let headerView = this.renderTableHeader();
    let contentView =
      this.state.data.length > 0 ? this.renderContent() : this.renderNoData();

    return (
      <table className="data-inner-table">
        <caption className="data-table-caption">{title}</caption>
        <thead onclick={this.sort}>
          <tr>{headerView}</tr>
        </thead>
        <tbody>{contentView}</tbody>
      </table>
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        <div>
          {this.renderTable()}
          <tbody className="align">
            {this.state.headers.map((itemcol, idx) => (
              <div className="hide">
                <tr id="addrow" key={idx}>

                  <td>
                    <input
                      className="itemAdd"
                      type="text"
                      name="name"
                      value={this.state.headers[idx].name}
                      onChange={this.handleChange(idx)}
                    />
                  </td>
                  <td>
                    <button>Status </button>{" "}
                  </td>


                  <td>Priority</td>
                </tr>
              </div>
            ))}
          </tbody>

          <button className="Addrow" onClick={this.handleAddRow}>
            Add Row
          </button>
          <thead>
            {this.state.cols.map((item, idy) => (
              <div className="hide">
                <tr id="addrow" key={idy}>
                  <tr>
                    {" "}
                    <img src="id.bmp" alt="||" width="30"></img>
                  </tr>
                  <tr>
                    <input
                      className="itemAddcol"
                      value={this.state.cols[idy].name}
                      onChange={this.handleChange(idy)}
                    />
                  </tr>

                  <tr>
                    <img src="profile.png" alt="||" width="40"></img>
                  </tr>
                </tr>
              </div>
            ))}
          </thead>

          <button className="Addcol" onClick={this.handleAddCols}>
            <i class="material-icons">add_circle</i>
          </button>
        </div>
      </div>
    );
  }
}