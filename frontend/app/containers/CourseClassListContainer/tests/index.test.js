import React from 'react';
import { shallow } from 'enzyme';
import CourseClassListContainer from '../';

describe('<CourseClassListContainer />', () => {
  it('should render ListComponent', () => {
    const renderedComponent = shallow(<CourseClassListContainer />);
    expect(renderedComponent).toBe(renderedComponent);
  });
});
