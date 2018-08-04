/**
 *
 * SelectRoles
 *
 */

import React from 'react';
import { Select } from 'antd';
import './style.less';
import {
  ADMIN_ROLE_ID,
  PRINCIPAL_ROLE_ID,
  STUDENT_ROLE_ID,
  TEACHER_ROLE_ID,
} from '../../utils/constants';
const SelectOption = Select.Option;

const SelectRoles = (props) => (
  <Select className="select-roles" {...props}>
    <SelectOption value={null}>Choose one of Roles</SelectOption>
    <SelectOption value={STUDENT_ROLE_ID}>Student</SelectOption>
    <SelectOption value={ADMIN_ROLE_ID}>Administrator</SelectOption>
    <SelectOption value={PRINCIPAL_ROLE_ID}>Principal</SelectOption>
    <SelectOption value={TEACHER_ROLE_ID}>Teacher</SelectOption>
  </Select>
);

SelectRoles.propTypes = {};

export default SelectRoles;
