import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';
import CountriesTable from '../CountriesTable';
import { pagerConstants, dataPostfixMap } from '../../helpers';
import './index.scss';

class TablesPager extends Component {
  handleDataGroupChange = (event) => {
    const { value } = event.target;
    const { onDataGroupChangedHandler } = this.props;
    onDataGroupChangedHandler(value);
  }

  handlePageChange= (event) => {
    const { id } = event.currentTarget;
    this.updatePageIndex(id);
  }

  updatePageIndex = (buttonId) => {
    const {
      onPageChangeHandler,
      dataFields,
      tablePage,
    } = this.props;
    const pageSize = dataFields.length;
    const incOrDec = buttonId === pagerConstants.arrowBackId ? -1 : 1;
    const nextPage = (tablePage + incOrDec + pageSize) % pageSize;
    onPageChangeHandler(nextPage);
  }

  render() {
    const {
      tablesData,
      global,
      dataFields,
      tablePage,
      dataGroup,
    } = this.props;
    const currentField = `${dataFields[tablePage]}${dataPostfixMap[dataGroup]}`;
    return (
      <div>
        <div className="tables_pager">
          <RadioGroup
            aria-label="dataGroup"
            name="dataGroup"
            defaultValue={dataGroup}
            onChange={this.handleDataGroupChange}
            className="data_group_radio"
          >
            <FormControlLabel value="total" control={<Radio color="primary" />} label="Total" />
            <FormControlLabel value="per100" control={<Radio color="primary" />} label="Per 100.000 of Population" />
          </RadioGroup>
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
  onDataGroupChangedHandler: PropTypes.func.isRequired,
  dataGroup: PropTypes.string.isRequired,
};

export default TablesPager;
