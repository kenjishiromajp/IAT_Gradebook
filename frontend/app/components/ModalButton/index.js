/**
 *
 * ModalButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

import './style.less';

class ModalButton extends Component {
  handleOpen = () => {
    this.props.onOpen();
  };
  handleCancel = () => {
    this.props.onCancel();
  };
  render() {
    const {
      buttonLabel,
      visible,
      onCancel,
      onOpen,
      width,
      title,
      ...restProps
    } = this.props;
    return (
      <div className="modal-button">
        <Button onClick={this.handleOpen} {...restProps}>
          {buttonLabel}
        </Button>
        <Modal
          width={width}
          wrapClassName="vertical-center-modal"
          visible={visible}
          title={title}
          footer={null}
          onCancel={this.handleCancel}
        >
          {visible && this.props.children}
        </Modal>
      </div>
    );
  }
}

ModalButton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  buttonLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default ModalButton;
