import React from 'react';
import { Helmet } from 'react-helmet';
import CourseClassListContainer from '../CourseClassListContainer';
import GradeTableList from '../../components/GradeTableList';

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
