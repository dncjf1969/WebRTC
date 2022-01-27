import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// 요청을 보내서 다음과 같은 응답을 받았다고 가정
const tempData = [
  {
    id: 1221,
    name: '1번방',
    type: '인성',
    manager: 'jang',
    maxnumber: '6'
  },
  {
    id: 11,
    name: '2번방',
    type: '인성',
    manager: 'nam',
    maxnumber: '6'
  }
]

const columns = [
  { field: 'id', headerName: '방아이디', width: 70, type: 'number'},
  { field: 'name', headerName: '방제', width: 130 },
  { field: 'type', headerName: '면접종류', width: 130 },
  {
    field: 'manager',
    headerName: '방장',
    // type: 'number',
    width: 90,
  },
  {
    field: 'maxnumber',
    headerName: '최대인원수',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //     params.getValue(params.id, 'lastName') || ''
    //   }`,
    
  },
];
// id는 필수속성인가봄, 지울시 렌더링x
// const rows = [
//   {
//     id: 12321,
//     name: '1번방',
//     type: '인성',
//     manager: 'jang',
//     maxnumber: '6'
//   },
//   {
//     id: 11,
//     name: '2번방',
//     type: '인성',
//     manager: 'nam',
//     maxnumber: '6'
//   }
// ];
const rows = tempData;

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}