import React from "react";
import { Popconfirm, Table, Space } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./__userItem.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeModalTitle,
  setUserEditing,
  showModal,
  deleteUser,
} from "../../redux/actions";
import { renderNote } from "../../utils";

const UserItem = ({ listUser }) => {
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.user.allUser);

  const handleEditModal = (item) => {
    dispatch(showModal());
    dispatch(changeModalTitle("Edit user"));
    dispatch(setUserEditing(item));
  };

  function confirm(item) {
    dispatch(
      deleteUser({ id: item.id, page: allUser.page, limit: allUser.limit })
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text, record) => {
        return renderNote(record.note);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <Space size="middle">
            <EditOutlined
              onClick={() => {
                handleEditModal(item);
              }}
            />
            <Popconfirm
              title={`Are you sure to delete user ${item.name}?`}
              onConfirm={() => {
                confirm(item);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        pagination={false}
        dataSource={listUser.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        })}
      />
    </>
  );
};

export default UserItem;
