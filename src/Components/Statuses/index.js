import React from "react";
import "./statuses.css";

export default class Statuses extends React.Component {
  constructor(props) {
    super();
    this.state = {
      colorMapping: {},
      selected: null,
    };
  }

  getBody(selected) {
    const bodyArr = [];
    let dataArray = [];

    for (const val of this.props.statuses) {
      if (dataArray.length === 2) {
        bodyArr.push(<tr>{dataArray}</tr>);
        dataArray = [];
      }

      dataArray.push(
        <td>
          <div style={{ backgroundColor: this.props.colorMapping[val] }}>
            <div
              className={"generic " + val.split()[0].toLowerCase()}
              onClick={() => {
                this.setState({ selected: val });
              }}
            >
              {val}
            </div>
          </div>
        </td>
      );
    }

    if (dataArray.length) bodyArr.push(<tr>{dataArray}</tr>);

    return bodyArr;
  }

  render() {
    if (!this.state.selected) {
      this.setState({ selected: this.props.row || "Working on it" });
    }

    const selected = this.state.selected || "";
    return (
      <div class="dropdown">
        <div
          style={{
            backgroundColor:
              this.props.colorMapping[this.state.selected] || "white",
          }}
        >
          <div class={"generic " + selected.split()[0].toLowerCase()}>
            {this.state.selected}
          </div>
          <div class="dropdown-content">
            <table class="beta">
              <tbody>{this.getBody(this.state.selected, this)}</tbody>
            </table>
            <hr />
            {this.props.nonEditable ? (
              <div />
            ) : (
              <div onClick={() => this.props.insertNewStatus("abc")}>
                Add/Edit Labels
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
