import moment from 'moment';
import { getStartOfYear, getMaxValue, getRandomIntInclusive } from './helpers';

describe('Utilities methods testing', () => {

  it('Expect getStartOfYear return value to be moment', () => {
    expect(moment.isMoment(getStartOfYear(new Date()))).toBe(true);
  });

  it('Expect getStartOfYear to return the first year\'s date', () => {
    const currentYear = new Date().getUTCFullYear();
    const yearStart = new Date('2020-01-01');
    yearStart.setUTCFullYear(currentYear, 0, 1);
    const returned = getStartOfYear(new Date());

    expect(returned.date()).toEqual(moment.utc(yearStart).date());
  });

  it('Expect getMaxValue to return maximum', () => {
    expect(getMaxValue([1,3,5,2,4])).toEqual(5);
  });

  it('Expect getRandomIntInclusive to fit upper bound', () => {
    expect(getRandomIntInclusive(5, 20)).toBeLessThanOrEqual(20);
  });

  it('Expect getRandomIntInclusive to fit lower bound', () => {
    expect(getRandomIntInclusive(8, 13)).toBeGreaterThanOrEqual(8);
  });
});