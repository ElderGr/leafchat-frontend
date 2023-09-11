'use client'
import { Button, Col, Divider, Dropdown, Modal, Row, Table } from "antd";
import Private from "../components/Layout/Private";
import { ColumnsType, TableProps } from "antd/es/table";
import { User } from "../domain/user/user.types";
import {
  MoreOutlined
} from '@ant-design/icons';
import { TableRowSelection } from "antd/es/table/interface";
import { UserModal } from "./components/User-Modal";
import { useListUsers } from "../domain/user/user.hook";
import UserProvider, { useUserContext } from "../context/users";
import { DeleteUserModal } from "./components/delete-user-modal";

type DataType = Omit<User, 'password' | 'create_at' | 'updated_at'>

export default function UserContainer() {
  return(
    <Private>
        <UserProvider>
          <UserApp />
        </UserProvider>
    </Private>
  )
}


function UserApp() {
    const { data, isLoading } = useListUsers()

    const { openUserForm, openDeleteUserForm } = useUserContext()

    const columns: ColumnsType<DataType> = [
      {
        title: 'Nome',
        dataIndex: 'name',
      },
      {
        title: 'Avatar',
        dataIndex: 'avatar_url',
      },
      {
        title: 'Acessos',
        dataIndex: 'roles',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: '',
        render: (user) => {
          return (
            <div>
                <Dropdown 
                  menu={{ 
                    items: [
                      { 
                        key: '1', 
                        label: 'Editar',  
                        onClick: () => {
                          openUserForm(user)
                        }
                      },
                      { 
                        key: '2', 
                        label: 'Excluir',  
                        onClick: () => {
                          openDeleteUserForm(user)
                        }
                      },
                    ]
                  }}
                 >
                  <a>
                    <MoreOutlined />
                  </a>
                </Dropdown>
            </div>
          )
        }
      }
    ];


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };
      
    const rowSelection: TableRowSelection<DataType> = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };


    return (
      <>
        <Row justify='space-between'>
          <h2>Usuários</h2>
          <Button 
                type='primary' 
                htmlType='button'
                onClick={() => openUserForm(null)}
                size="large"
            >
              Adicionar
            </Button>
          <UserModal />
          <DeleteUserModal />
        </Row>
        <Divider />
        <Table 
          columns={columns} 
          dataSource={data} 
          onChange={onChange}
          loading={isLoading}
          rowSelection={rowSelection}
          pagination={{
            pageSize: 10,
            current: 1
          }}
        />
      </>
    )
  }
  