import { shallow } from 'enzyme';
import FullPageComponentWrapper from "../FullPageComponentWrapper";

describe('FullPageComponentWrapper class component testing', () => {
  
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
    <FullPageComponentWrapper>
      <div className="div_to_check">
        <h3>Hello, World!</h3>
      </div>
    </FullPageComponentWrapper>);
  });

  it('FullPageComponentWrapper must have a correct snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('FullPageComponentWrapper renders children', () => {
    expect(wrapper.exists('.div_to_check')).toBe(true);
  });

  it('FullPageComponentWrapper change full screen state', () => {
    const nonFullScreenClassFlag = wrapper.exists('.component_wrapper');
    const fullScreenClassFlagAbsent = wrapper.exists('.wrapper_fullscreen');

    wrapper.setState({fullScreen: true});

    const fullScreenClassFlag = wrapper.exists('.wrapper_fullscreen');

    expect(nonFullScreenClassFlag).toBe(true);
    expect(fullScreenClassFlagAbsent).toBe(false);

    expect(fullScreenClassFlag).toBe(true);
  });

});