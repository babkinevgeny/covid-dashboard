import React, { Component } from 'react';
import {
  IconButton,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import PropTypes from 'prop-types';
import CountriesTable from '../CountriesTable';
import {
  pagerConstants,
  dataPostfixMap,
  keyConstants,
  getIndicatorTitleByKey,
  populationBase,
} from '../../helpers';
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

  getRadioGroup = ({
    ariaLabel,
    fieldName,
    defValue,
    onChangeHandler,
    className,
    labelValues,
  }) => (
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
  )

  getCurrentFieldName = ({
    dataGroup,
    dataFields,
    tablePage,
    perPopulation,
  }) => `${dataGroup}${dataFields[tablePage]}${dataPostfixMap[perPopulation]}`

  render() {
    const {
      tablesData,
      global,
      dataFields,
      tablePage,
      dataGroup,
      perPopulation,
      newCountryOnRowClickHandler,
    } = this.props;
    const currentIndicator = this.getCurrentFieldName({
      dataGroup,
      dataFields,
      tablePage,
      perPopulation,
    });

    const timeConstLabels = [{ label: 'Total', value: 'Total' }, { label: 'New', value: 'New' }];
    const amountConstLabels = [
      { label: 'Total', value: 'total' },
      {
        label: `Per ${populationBase.toLocaleString()} Population`,
        value: keyConstants.perPopulationKey,
      }];

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
              labelValues: amountConstLabels,
            })}
            {this.getRadioGroup({
              ariaLabel: keyConstants.dataGroupKey,
              fieldName: keyConstants.dataGroupKey,
              defValue: dataGroup,
              onChangeHandler: this.handleDataGroupChange,
              className: 'data_group_radio',
              labelValues: timeConstLabels,
            })}
          </div>
          <div key={currentIndicator}>
            <h3>{getIndicatorTitleByKey(currentIndicator)}</h3>
            <div className="global">
              <span>Global &nbsp;</span>
              <span>{global[currentIndicator]}</span>
            </div>
            <CountriesTable
              data={tablesData}
              field={currentIndicator}
              newCountryOnRowClickHandler={newCountryOnRowClickHandler}
            />
          </div>
        </div>
        <nav className="tables_pagination">
          <ul className="tables_pagination-ul">
            <li>
              <IconButton
                onClick={(event) => this.handlePageChange(event)}
                id={pagerConstants.arrowBackId}
              >
                <ArrowBack />
              </IconButton>
            </li>
            <li>
              <IconButton
                onClick={(event) => this.handlePageChange(event)}
                id={pagerConstants.arrowForwardId}
              >
                <ArrowForward />
              </IconButton>
            </li>
          </ul>
        </nav>
      </div>

    );
  }
}

const globalShape = {
  TotalConfirmed: PropTypes.number,
  TotalConfirmedPer100000Population: PropTypes.number,
  NewConfirmed: PropTypes.number,
  NewConfirmedPer100000Population: PropTypes.number,
  TotalDeaths: PropTypes.number,
  TotalDeathsPer100000Population: PropTypes.number,
  NewDeaths: PropTypes.number,
  NewDeathsPer100000Population: PropTypes.number,
  TotalRecovered: PropTypes.number,
  TotalRecoveredPer100000Population: PropTypes.number,
  NewRecovered: PropTypes.number,
  NewRecoveredPer100000Population: PropTypes.number,
  latlng: PropTypes.arrayOf(PropTypes.number),
};

TablesPager.propTypes = {
  tablesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  global: PropTypes.shape(globalShape).isRequired,
  dataFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  tablePage: PropTypes.number.isRequired,
  onPageChangeHandler: PropTypes.func.isRequired,
  onDataGroupChangedHandler: PropTypes.func.isRequired,
  onPerPopulationChangedHandler: PropTypes.func.isRequired,
  dataGroup: PropTypes.string.isRequired,
  perPopulation: PropTypes.string.isRequired,
  newCountryOnRowClickHandler: PropTypes.func.isRequired,
};

export default TablesPager;
