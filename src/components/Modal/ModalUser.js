import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import "./__modalUser.scss";
import {
  addUser,
  hideModal,
  setUserEditing,
  editUser,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const ModalUser = ({ openModal }) => {
  const title = useSelector((state) => state.modal.title);
  const userEdit = useSelector((state) => state.user.userEdit);
  const allUser = useSelector((state) => state.user.allUser);

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: userEdit ? userEdit.name : "",
    sex: userEdit ? userEdit.sex : "",
    phoneNumber: userEdit ? userEdit.phoneNumber : "",
    address: userEdit ? userEdit.address : "",
  });

  const handleCancel = () => {
    dispatch(hideModal());
  };

  const onFinish = () => {
    if (userEdit && userEdit.id) {
      dispatch(editUser({ ...user, id: userEdit.id }));
    } else {
      dispatch(
        addUser({ user: user, page: allUser.page, limit: allUser.limit })
      );
      dispatch(setUserEditing(null));
    }
  };
  return (
    <Modal
      onCancel={() => handleCancel()}
      title={title}
      visible={openModal}
      footer={[]}
    >
      <Form onFinish={onFinish} labelCol={{ span: 6 }} initialValues={user}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            placeholder="Please enter your name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Sex"
          name="sex"
          rules={[
            {
              required: true,
              message: "Please input your sex!",
            },
          ]}
        >
          <Input
            placeholder="Please enter your sex"
            value={user.sex}
            onChange={(e) => setUser({ ...user, sex: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            placeholder="Please enter your address"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            placeholder="Please enter your address"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
        </Form.Item>
        <div className="modal-btn">
          <Button
            key="back"
            onClick={() => handleCancel()}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalUser;
