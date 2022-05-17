import React, { useState } from "react";
import { Modal, Form, Input, Button, Radio, Row, Col } from "antd";
import "./__modalUser.scss";
import {
  addUser,
  hideModal,
  setUserEditing,
  editUser,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const ModalUser = ({ openModal }) => {
  const [openModalAddNote, setOpenModalAddNote] = useState(false);
  const [addNote, setAddNote] = useState("");
  const title = useSelector((state) => state.modal.title);
  const userEdit = useSelector((state) => state.user.userEdit);
  const allUser = useSelector((state) => state.user.allUser);

  const { TextArea } = Input;

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: userEdit ? userEdit.name : "",
    sex: userEdit ? userEdit.sex : "Male",
    phoneNumber: userEdit ? userEdit.phoneNumber : "",
    address: userEdit ? userEdit.address : "",
    note: userEdit ? userEdit.note : "",
  });
  console.log(addNote);

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

  const handleSubmitAddNote = (e) => {
    setUser({
      ...user,
      note: addNote,
    });
    setOpenModalAddNote(false);
  };

  return (
    <>
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
                message: "Please input your user name!",
              },
            ]}
          >
            <Input
              placeholder="Please enter your name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Sex" name="sex">
            <Radio.Group
              onChange={(e) => setUser({ ...user, sex: e.target.value })}
              value={user.sex}
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
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
              placeholder="Please enter your phone number"
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input
              placeholder="Please enter your address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </Form.Item>

          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={() => {
              setOpenModalAddNote(true);
            }}
          >
            Add note
          </Button>

          <Form.Item
            name="note"
            rules={[
              {
                required: true,
                message: "Please input your comment!",
              },
            ]}
          >
            <>
              <TextArea
                rows={4}
                value={user.note}
                onChange={(e) => {
                  setUser({
                    ...user,
                    note: e.target.value,
                  });
                }}
              />
            </>
          </Form.Item>
          <br />
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
      {openModalAddNote && (
        <Modal
          title="Add note"
          visible={openModalAddNote}
          footer={[]}
          onCancel={() => {
            setOpenModalAddNote(false);
          }}
        >
          <Form
            onFinish={(e) => {
              handleSubmitAddNote(e);
            }}
            labelCol={{ span: 6 }}
            initialValues={{ addNote: addNote }}
          >
            <Form.Item
              label="Add note"
              name="addNote"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your add note!",
              //   },
              // ]}
            >
              <TextArea
                placeholder="Please enter your comment"
                rows={4}
                value={addNote}
                onChange={(e) => {
                  setAddNote(e.target.value);
                }}
              />
            </Form.Item>
            <div className="modal-btn">
              <Button
                key="back"
                onClick={() => setOpenModalAddNote(false)}
                style={{ marginRight: "10px" }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
          <br />
        </Modal>
      )}
    </>
  );
};

export default ModalUser;
