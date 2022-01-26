import React, { useState } from 'react';
import styles from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import MUIDataTable from "mui-datatables";


const Wrapper = styles.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border-top: solid rgba(1, 208, 83, 1);
  // border-bottom: solid rgba(1, 208, 83, 1);
`;

// 요청을 보내서 다음과 같은 응답을 받았다고 가정
const tempData = [
  {
    roomId: 12321,
    name: '1번방',
    type: '인성',
    manager: 'jang',
    maxnumber: '6'
  },
  {
    roomId: 11,
    name: '2번방',
    type: '인성',
    manager: 'nam',
    maxnumber: '6'
  }
]

const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "company",
    label: "Company",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "city",
    label: "City",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "state",
    label: "State",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const data = [
  {
    name: "Joe James",
    company: "Test Corp",
    city: "Yonkers",
    state: "NY",
  },
  {
    name: "John Walsh",
    company: "Test Corp",
    city: "Hartford",
    state: "CT",
  },
  {
    name: "Bob Herm",
    company: "Test Corp",
    city: "Tampa",
    state: "FL",
  },
  {
    name: "James Houston",
    company: "Test Corp",
    city: "Dallas",
    state: "TX",
  },
];

const options = {
  filterType: "checkbox",
};

function RoomArray() {

  return (
    //   <div style={{ height: 250, width: '100%' }}>
    //   <DataGrid
    //     columns={[
    //       { field: 'roomid' },
    //       { field: 'name' },
    //       { field: 'type' },
    //       { field: 'manager' },
    //       { field: 'maxnumber' },

    //   ]}
    //     rows={[
    //       { roomid: '1', name: 'React', type: '인성' },
    //       { roomid: '2', name: 'MUI', type: '인성 '},
    //       // { roomid: 12321, name: '1번방', type: '인성', manager: 'jang', maxnumber: '6'},
          
    //     ]}
    //   />
    // </div>
    <MUIDataTable
      title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

 
  
export default RoomArray;