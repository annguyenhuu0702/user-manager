import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import "./__modalUser.scss";
import { addUserSuccess, hideModal, setUserEditing } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const ModalUser = ({ openModal }) => {
  const title = useSelector((state) => state.modal.title);
  const userEdit = useSelector((state) => state.user.userEdit);

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: userEdit ? userEdit.name : "",
    sex: userEdit ? userEdit.sex : "",
    phoneNumber: userEdit ? userEdit.phoneNumber : "",
    address: userEdit ? userEdit.phoneNumber : "",
  });
  const handleOk = () => {
    dispatch(addUserSuccess(user));
    dispatch(setUserEditing(null));
    setUser({
      name: "",
      sex: "",
      phoneNumber: "",
      address: "",
    });
    dispatch(hideModal());
  };

  const handleCancel = () => {
    dispatch(hideModal());
  };

  return (
    <>
      <Modal
        title={title}
        visible={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              placeholder="Please enter your name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Sex">
            <Input
              placeholder="Please enter your sex"
              value={user.sex}
              onChange={(e) => setUser({ ...user, sex: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Phone number">
            <Input
              placeholder="Please enter your phone number"
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              placeholder="Please enter your address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUser;
