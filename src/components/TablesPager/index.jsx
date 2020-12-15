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
  handlePerPopulationChange = (event) => {
    const { value } = event.target;
    const { onPerPopulationChangedHandler } = this.props;
    onPerPopulationChangedHandler(value);
  }

  handleDataGroupChange = (event) => {
    const { value } = event.target;
    const { onDataGroupChangedHandler } = this.props;
    onDataGroupChangedHandler(value);
  }

  handlePageChange = (event) => {
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

  getRadioGroup = (options) => {
    const {
      ariaLabel,
      fieldName,
      defValue,
      onChangeHandler,
      className,
      labelValues,
    } = options;
    return (
      <RadioGroup
        aria-label={ariaLabel}
        name={fieldName}
        value={defValue}
        onChange={onChangeHandler}
        className={className}
      >
        {labelValues.map((labelValue) => (
          <FormControlLabel
            key={labelValue.value}
            value={labelValue.value}
            control={<Radio color="primary" />}
            label={labelValue.label}
          />
        ))}
      </RadioGroup>
    );
  }

  getCurrentFieldName = (options) => {
    const {
      dataGroup,
      dataFields,
      tablePage,
      perPopulation,
    } = options;
    return `${dataGroup}${dataFields[tablePage]}${dataPostfixMap[perPopulation]}`;
  }

  render() {
    const {
      tablesData,
      global,
      dataFields,
      tablePage,
      dataGroup,
      perPopulation,
    } = this.props;
    const currentField = this.getCurrentFieldName({
      dataGroup,
      dataFields,
      tablePage,
      perPopulation,
    });

    return (
      <div>
        <div className="tables_pager">
          <div className="radio_groups_wrapper">
            {this.getRadioGroup({
              ariaLabel: keyConstants.perPopulationKey,
              fieldName: keyConstants.perPopulationKey,
              defValue: perPopulation,
              onChangeHandler: this.handlePerPopulationChange,
              className: 'per_population_radio',
              labelValues: [{ label: 'Total', value: 'total' }, { label: dataPostfixMap.perPopulation, value: keyConstants.perPopulationKey }],
            })}
            {this.getRadioGroup({
              ariaLabel: keyConstants.dataGroupKey,
              fieldName: keyConstants.dataGroupKey,
              defValue: dataGroup,
              onChangeHandler: this.handleDataGroupChange,
              className: 'data_group_radio',
              labelValues: [{ label: 'Total', value: 'Total' }, { label: 'New', value: 'New' }],
            })}
          </div>
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
                onClick={(event) => this.handlePageChange(event)}
                id={pagerConstants.arrowBackId}
              >
                <ArrowBackIcon />
              </IconButton>
            </li>
            <li>
              <IconButton
                onClick={(event) => this.handlePageChange(event)}
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
  onPerPopulationChangedHandler: PropTypes.func.isRequired,
  dataGroup: PropTypes.string.isRequired,
  perPopulation: PropTypes.string.isRequired,
};

export default TablesPager;
