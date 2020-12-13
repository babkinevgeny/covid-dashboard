import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PropTypes from 'prop-types';
import CountriesTable from '../CountriesTable';
import { pagerConstants } from '../../helpers/helpers';

class TablesPager extends Component {
  handlePageChange = (e) => {
    const { id } = e.currentTarget;
    this.updatePageIndex(id);
  }

  updatePageIndex = (buttonId) => {
    const { onPageChangeHandler } = this.props;
    const { dataFields, tablePage } = this.props;
    const pageSize = dataFields.length;
    const incOrDec = buttonId === pagerConstants.arrowBackId ? -1 : 1;
    const nextPage = (tablePage + incOrDec + pageSize) % pageSize;
    onPageChangeHandler(nextPage);
  }

  render() {
    const {
      tablesData, global, dataFields, tablePage,
    } = this.props;
    const currentField = dataFields[tablePage];
    return (
      <div>
        <div className="tables_pager">
          <div key={currentField}>
            <h3>{currentField}</h3>
            <div className="global">
              <span>Global &nbsp;</span>
              <span>{global[currentField]}</span>
            </div>
            <CountriesTable data={tablesData} field={currentField} />
          </div>
        </div>
        <nav className="tables_pagination">
          <ul className="tables_pagination-ul">
            <li>
              <IconButton
                onClick={(e) => this.handlePageChange(e)}
                id={pagerConstants.arrowBackId}
              >
                <ArrowBackIcon />
              </IconButton>
            </li>
            <li>
              <IconButton
                onClick={(e) => this.handlePageChange(e)}
                id={pagerConstants.arrowForwardId}
              >
                <ArrowForwardIcon />
              </IconButton>
            </li>
          </ul>
        </nav>
      </div>

    );
  }
}

TablesPager.propTypes = {
  tablesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  global: PropTypes.objectOf(PropTypes.number).isRequired,
  dataFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  tablePage: PropTypes.number.isRequired,
  onPageChangeHandler: PropTypes.func.isRequired,
};

export default TablesPager;
