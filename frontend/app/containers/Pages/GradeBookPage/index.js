import React from 'react';
import { Helmet } from 'react-helmet';
import CourseClassListContainer from '../../CourseClassListContainer/index';
import GradeTableList from '../../../components/GradeTableList/index';

const GradeBookPage = () => (
  <div>
    <Helmet>
      <title>IAT - GradeBook Page</title>
    </Helmet>
    <h1>GradeBook page</h1>
    <CourseClassListContainer component={GradeTableList} />
  </div>
);

export default GradeBookPage;
