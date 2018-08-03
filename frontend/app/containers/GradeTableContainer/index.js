/**
 *
 * GradeTableContainer
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown, Icon, Input, Menu, Modal } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import './style.less';
import GradeTable from '../../components/GradeTable';
import { editMarks } from '../MarkInputContainer/actions';
import { loadCourseClass } from '../CourseClassListContainer/actions';
import { withLoginUser } from '../../utils/withLoginUser';
const MenuItem = Menu.Item;
class GradeTableContainer extends Component {
  state = {
    checkedMarks: [],
    reasonOfDisapproval: '',
    disapprovalModalVisible: false,
  };
  handleMarkCheck = ({ id: markID }, inserted) => {
    let { checkedMarks } = this.state;
    if (inserted) {
      checkedMarks = [...checkedMarks, markID];
    } else {
      const index = checkedMarks.indexOf(markID);
      if (index !== -1) checkedMarks.splice(index, 1);
      checkedMarks = [...checkedMarks];
    }
    this.setState({
      checkedMarks,
    });
  };
  approveSelectedMarks = () => {
    const { checkedMarks } = this.state;
    const newCheckedMarks = checkedMarks.map((checkedMarkID) => ({
      id: checkedMarkID,
      approved: true,
    }));
    this.props
      .editMarks(newCheckedMarks)
      .then(() => {
        this.props.loadCourseClass();
      })
      .catch(() => {});
  };
  disapproveSelectedMarks = () => {
    const { checkedMarks, reasonOfDisapproval } = this.state;
    const newCheckedMarks = checkedMarks.map((checkedMarkID) => ({
      id: checkedMarkID,
      approved: false,
      description: reasonOfDisapproval,
    }));
    this.props
      .editMarks(newCheckedMarks)
      .then(() => {
        this.props.loadCourseClass();
      })
      .catch(() => {});
  };
  handleChangeReason = ({ target: { value: reasonOfDisapproval } }) => {
    this.setState({
      reasonOfDisapproval,
    });
  };
  renderMenu = () => (
    <Menu>
      <MenuItem key="0">
        <Link to="#" onClick={() => this.approveSelectedMarks()}>
          Approved
        </Link>
      </MenuItem>
      <MenuItem key="2">
        <Link
          to="#"
          onClick={() => this.setState({ disapprovalModalVisible: true })}
        >
          Disapproved
        </Link>
      </MenuItem>
    </Menu>
  );
  render() {
    const {
      checkedMarks,
      disapprovalModalVisible,
      reasonOfDisapproval,
    } = this.state;
    return (
      <div className="grade-table-container">
        {!!checkedMarks.length && (
          <div className="button-mark-selected-mark">
            <Dropdown overlay={this.renderMenu()} trigger={['click']}>
              <Link to="#" style={{ textDecoration: 'none' }}>
                Mark selected Marks as
                <Icon
                  className="trigger"
                  type="down"
                  style={{ lineHeight: '24px', paddingRight: 0 }}
                />
              </Link>
            </Dropdown>
          </div>
        )}
        <Modal
          visible={disapprovalModalVisible}
          onOk={this.disapproveSelectedMarks}
          onCancel={() => this.setState({ disapprovalModalVisible: false })}
        >
          <h3>If you want, you can leave a message of why disapproved</h3>
          <Input
            onChange={({ target: { value: reasonOfDisapproval } }) => {
              this.setState({ reasonOfDisapproval });
            }}
            value={reasonOfDisapproval}
          />
        </Modal>
        <GradeTable
          {...this.props}
          canCheck={this.props.isAdmin() || this.props.isPrincipal()}
          checkedMarks={checkedMarks}
          markCheck={this.handleMarkCheck}
        />
      </div>
    );
  }
}

GradeTableContainer.propTypes = {
  loadCourseClass: PropTypes.func,
  editMarks: PropTypes.func,
  courseClass: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    students: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      email: PropTypes.string,
      marks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        task_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        approved: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        correctionPercentage: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      })),
      totalMarksCorrectionPercentage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })).isRequired,
    subjects: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        markWeightAverage: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        totalMark: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      })),
    })),
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
  }).isRequired,
  actionColumn: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  loadCourseClass: () => {
    dispatch(loadCourseClass());
  },
  editMarks: (mark) =>
    new Promise((resolve, reject) => {
      dispatch(editMarks(mark, resolve, reject));
    }),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withLoginUser)(GradeTableContainer);
