import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Radio,
  Table,
  Row,
  Col,
  Space,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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

  const [user, setUser] = useState({
    name: userEdit ? userEdit.name : "",
    sex: userEdit ? userEdit.sex : "Male",
    phoneNumber: userEdit ? userEdit.phoneNumber : "",
    address: userEdit ? userEdit.address : "",
    note: userEdit ? userEdit.note : [],
  });

  const [modalChild, setModalChild] = useState({
    open: false,
    item: null,
  });
  const [addNote, setAddNote] = useState("");
  const [dataSource, setDataSource] = useState(
    userEdit ? userEdit.note : user.note
  );

  const columns = [
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <EditOutlined
              onClick={() => {
                setModalChild({ open: true, item: record });
              }}
            />
            <DeleteOutlined
              onClick={() => {
                handleDeleteNote(record);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(hideModal());
  };

  const onFinish = () => {
    if (userEdit && userEdit.id) {
      dispatch(
        editUser({
          ...user,
          id: userEdit.id,
          note: dataSource,
        })
      );
    } else {
      dispatch(
        addUser({
          user: {
            ...user,
          },
          page: allUser.page,
          limit: allUser.limit,
        })
      );
      dispatch(setUserEditing(null));
    }
  };

  const handleAddNote = () => {
    if (modalChild.item) {
      let newDataSource = [...dataSource];
      let index = newDataSource.findIndex(
        (item) => item.key === modalChild.item.key
      );
      if (index !== -1) {
        const _newDataSource = [
          ...newDataSource.slice(0, index),
          { key: modalChild.item.key, content: addNote },
          ...newDataSource.slice(index + 1, newDataSource.length),
        ];

        setUser({
          ...user,
          note: _newDataSource,
        });
        setDataSource(_newDataSource);
      }
    } else {
      setUser({
        ...user,
        note: [...user.note, { content: addNote, key: user.note.length + 1 }],
      });
      setDataSource([
        ...user.note,
        { content: addNote, key: user.note.length + 1 },
      ]);
      setAddNote("");
    }
    setModalChild({ open: false, item: null });
  };

  const handleDeleteNote = (note) => {
    setDataSource([...dataSource].filter((item) => item.key !== note.key));
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
          <Form.Item>
            <Row>
              <Col lg={6} md={6}>
                <Button
                  type="primary"
                  onClick={() => {
                    setModalChild({ open: true, item: null });
                  }}
                >
                  Add note
                </Button>
              </Col>
              {dataSource.length > 0 && (
                <Col lg={18} md={18}>
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                  />
                </Col>
              )}
            </Row>
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
      {modalChild.open && (
        <Modal
          title={modalChild.item ? "Edit note" : "Add note"}
          visible={modalChild.open}
          onCancel={() => {
            setModalChild({ open: false, item: null });
          }}
          onOk={() => {
            handleAddNote();
          }}
          footer={[]}
        >
          <Form
            onFinish={() => handleAddNote()}
            initialValues={{
              addNote: modalChild.item ? modalChild.item.content : addNote,
            }}
          >
            <Form.Item
              label={modalChild.item ? "Edit note" : "Add note"}
              name="addNote"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input.TextArea
                value={addNote}
                name="addNote"
                onChange={(e) => {
                  setAddNote(e.target.value);
                }}
                placeholder="Please enter your comment"
              />
            </Form.Item>
            <div className="modal-btn">
              <Button
                key="back"
                onClick={() => setModalChild({ open: false, item: null })}
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
      )}
    </>
  );
};

export default ModalUser;
