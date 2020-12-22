import { shallow } from 'enzyme';
import CountriesTable from "../CountriesTable";

const MIN_PROPS = {
  data: [
    {
      Country: 'Country1',
      TestField: 123,
    },
    {
      Country: 'Country2',
      TestField: 321,
    },
  ],
  field: 'TestField',
  newCountryOnRowCLickHandler: jest.fn(),
};

describe('CountriesTable functional component testing', () => {
  
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CountriesTable {...MIN_PROPS} />);
  });

  it('CountriesTable must have a correct snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('CountriesTable data are sorted', () => {
    const firstRow = wrapper.find('.countries_table_row').at(0);
    expect(firstRow.childAt(0).text()).toBe('Country2');
    expect(firstRow.childAt(1).text()).toBe('321');
  });

});