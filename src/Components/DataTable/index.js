import React from 'react';
import './datatable.css';
import ReactDOM from 'react-dom';

export default class DataTable extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
                headers : props.headers,
                data: props.data,
                sortby: null,
                decending: null
          
                
        }
        this.keyField = props.keyField || "id";
        this.noData = props.noData || "No records found!";
        this.width = props.width || "100%";

    }  
     }    
    onDragOver = (e) => {
        e.preventDefault();
    }

    onDragStart = (e, source) => {
        e.dataTransfer.setData('text/plain', source); //eBrowser
    }

    onDrop = (e, target) => {
        e.preventDefault();
        let source = e.dataTransfer.getData('text/plain');
        let headers = [...this.state.headers];
        let srcHeader = headers[source];
        let targetHeader = headers[target];

        let temp =srcHeader.index;// swaping
        srcHeader.index = targetHeader.index;
        targetHeader.index = temp;

        this.setState({
            headers
        });
    }

    renderTableHeader = () => {
        let {headers} = this.state;
        headers.sort((a,b) => {
            if (a.index > b.index) return 1;
            return -1;
        })

        let headerView = headers.map((header, index) => {
            let title = header.title;
            let cleanTitle = header.accrssor;
            let width = header.width;

            return (
                <th key={cleanTitle}
                ref={(th) => this.th =th}
                data-col={cleanTitle}
                onDragStart={(e) =>this.onDragStart(e, index)}
                onDragOver={this.onDragOver}
                onDrop={(e) =>{this.onDrop(e, index)}}>
                        <span draggable className="header-cell">
                            {title}
                        </span>
                </th>
            )
        })
        return headerView;
    }

    renderNoData = () => {
        return (
            <tr>
                <td colSpan={this.props.headers.length}>
                    {this.noData}
                </td>
            </tr>
        );
    }

    renderContent = () => {
        
        let {headers, data} = this.state;
        let contentView = data.map((row, rowIdx) => {
            let id = row[this.keyField];
            let edit = this.state.edit;
            let tds = headers.map((header, index) => {
                let content = row[header.accessor];
                let cell = header.cell;
                if(cell){
                    if(typeof(cell) === "object") {
                        if (cell.type === "image" && content) {
                            content = <img style={cell.style} src={content} alt=
                            "temp" />
                        } 
                        }else if (typeof(cell) === "function") {
                            content = cell(content);
                    }
                }

                if (this.props.edit) {
                    if (header.dataType && (header.dataType === "string"))
                    if(edit && edit.row ===rowIdx && edit.cell === index) {
                        content = (
                            <form  onSubmit={this.onUpdate}>
                                <input type="text" defaultValue={content}
                                onKeyUp={this.onformReset}></input>
                            </form>

                        )
                    }
                }
                return (

                    
                    <td key={index} data-id={id} data-row={rowIdx}>
                        {content}

                    </td>
                );
            });
            return (
                <tr key={rowIdx}> 
                     {tds}
                </tr>
            );
        });

        return contentView;
        
    }

    onSort = (e) => {
        let data = this.state.data.sclice(); // give new array
        let colIndex = ReactDOM.findDOMNODE(e.target).parentNode.cellIndex;

        alert(colIndex);
    }

    onShowEditer = (e) => {
        let item= e.target.dataset.id;
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.eow, 10),
                cell: e.target.cellIndex
            }
        })
    }

    renderTable =() =>{
        let title = this.props.title || "DataTable";
        let headerView =this.renderTableHeader();
        let contentView = this.state.data.length > 0 ?
                            this.renderContent() : 
                            this.renderNoData();

        return (
            <table className="data-inner-table">
                <caption className="data-table-caption">
                    {title}
                </caption>
                <thead onclick={this.sort}>
                    <tr>
                        {headerView}
                    </tr>
                </thead>
                <tbody onDoubleClick={this.onShowEditer}>
                    {contentView}
                </tbody>
            </table>
        )
    }
    render() {
        return (
            <div className={this.props.className}>
                {this.renderTable()}
            </div>
        )
    }
    
