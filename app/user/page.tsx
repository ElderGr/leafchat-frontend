'use client'
import { Button, Col, Divider, Dropdown, Modal, Row, Table } from "antd";
import Private from "../components/Layout/Private";
import { ColumnsType, TableProps } from "antd/es/table";
import { User } from "../domain/user/user.types";
import {
  MoreOutlined
} from '@ant-design/icons';
import { TableRowSelection } from "antd/es/table/interface";
import { AddUserModal } from "./components/AddUserModal";

type DataType = Omit<User, 'password' | 'create_at' | 'updated_at'>

const columns: ColumnsType<DataType> = [
  {
    title: 'Avatar',
    dataIndex: 'avatar_url',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
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
    render: () => {
      return (
        <div>
            <Dropdown menu={{ 
              items: [
                { key: '1', label: 'Editar'},
                { key: '2', label: 'Excluir' },
              ]
             }}>
              <a>
                <MoreOutlined />
              </a>
            </Dropdown>
        </div>
      )
    }
  }
];

const data: DataType[] = Array.from({length: 20}, (_, index) => {
  return {
    id: `${index}`,
    avatar_url: 'Avatar url',
    email: 'gabriel@email.com',
    name: 'Gabriel', 
    roles: '11',
  }
})

export default function User() {
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
      <Private>
        <Row justify='space-between'>
          <h2>Usuários</h2>
          <AddUserModal />
        </Row>
        <Divider />
        <Table 
          columns={columns} 
          dataSource={data} 
          onChange={onChange} 
          rowSelection={rowSelection}
          pagination={{
            pageSize: 10,
            current: 1
          }}
        />
      </Private>
    )
  }
  