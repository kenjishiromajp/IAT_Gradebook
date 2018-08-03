import React from 'react';
import { Helmet } from 'react-helmet';
import CourseClassListContainer from '../../CourseClassListContainer/index';
import GradeTableList from '../../../components/GradeTableList/index';

const UserPage = () => (
  <div>
    <Helmet>
      <title>IAT - GradeBook Page</title>
    </Helmet>
    <h1>Your GradeBook</h1>
    <h3>List of your classes</h3>
    <CourseClassListContainer component={GradeTableList} />
  </div>
);

export default UserPage;
