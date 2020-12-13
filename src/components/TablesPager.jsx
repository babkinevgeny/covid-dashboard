import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PropTypes from 'prop-types';
import CountriesTable from './CountriesTable';
import { Global } from '../data/CountriesStub.json';
import { pagerConstants } from '../helpers/helpers';

class TablesPager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 3,
      currentField: 'TotalConfirmed',
    };
  }

  handlePageChange = (e) => {
    const { id } = e.currentTarget;
    const nextPage = this.updatePageIndex(id);
    this.updateCurrentField(nextPage);
  }

  updatePageIndex = (buttonId) => {
    const { page: currPage, pageSize } = this.state;
    const incOrDec = buttonId === pagerConstants.arrowBackId ? -1 : 1;
    const nextPage = (currPage + incOrDec + pageSize) % pageSize;
    this.setState(
      {
        page: nextPage,
      },
    );
    return nextPage;
  }

  updateCurrentField = (nextPage) => {
    const { data: fieldsData } = this.props;
    this.setState(
      {
        currentField: fieldsData[nextPage],
      },
    );
  }

  render() {
    const { currentField } = this.state;
    const { tablesData } = this.props;
    return (
      <div>
        <div className="tables_pager">
          <div key={currentField}>
            <h3>{currentField}</h3>
            <div className="global">
              <span>Global &nbsp;</span>
              <span>{Global[currentField]}</span>
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
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TablesPager;
