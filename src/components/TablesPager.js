import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CountriesTable from './CountriesTable';
import { Global } from '../data/CountriesStub.json';

class TablesPager extends Component {
  constructor(props) {
    super(props);
    ({ tablesData: this.tableData, data: this.dataFields } = this.props);
    this.state = {
      page: 0,
      pageSize: 3,
      currentField: 'TotalConfirmed',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { id } = e.currentTarget;
    const { page: value, pageSize } = this.state;
    const index = (value + (id === 'back' ? -1 : 1) + pageSize) % pageSize;
    this.setState(
      {
        page: index,
        currentField: this.dataFields[index],
      },
      () => {
      },
    );
  }

  render() {
    const { currentField } = this.state;
    return (
      <div>
        <div className="tables_pager">
          <div key={currentField}>
            <div className="global">
              <span>Global &nbsp;</span>
              <span>{Global[currentField]}</span>
            </div>
            <CountriesTable data={this.tableData} field={currentField} />
          </div>
        </div>
        <nav className="tables_pagination">
          <ul className="tables_pagination-ul">
            <li>
              <IconButton onClick={(e) => this.handleChange(e)} id="back">
                <ArrowBackIcon />
              </IconButton>
            </li>
            <li>
              <IconButton onClick={(e) => this.handleChange(e)} id="forward">
                <ArrowForwardIcon />
              </IconButton>
            </li>
          </ul>
        </nav>
      </div>

    );
  }
}

export default TablesPager;
