// import  { useEffect, useState } from 'react';
// import { Table } from 'antd';
// // import qs from 'qs';
// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'fullName',
//     // sorter: true,
//     render: (fullName) => `${fullName} ${fullName}`,
//     width: '20%',
//   },
  
//   {
//     title: 'Email',
//     dataIndex: 'email',
    
//   },
//   {
//     title: 'Role',
//     dataIndex: 'role',
//     filters: [
//       {
//         text: 'Admin',
//         value: 'admin',
//       },
//       {
//         text: 'User',
//         value: 'user',
//       },
      
//     ],
//     width: '10%',
//   },
// ];
// const getRandomuserParams = (params) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });

// const GuestListTable = ({allGuests, deleteGuest}) => {
//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(false);
//     const [tableParams, setTableParams] = useState({
//       pagination: {
//         current: 1,
//         pageSize: 10,
//       },
//     });
//     const fetchData = () => {
//       setLoading(true);
//     //   fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
//     //   fetch(`http://localhost:5000/api/user`)
//     //     .then((res) => res.json())
//     //     .then(({ results }) => {
//     //       setData(results);
//     //       setLoading(false);
//     //       setTableParams({
//     //         ...tableParams,
//     //         pagination: {
//     //           ...tableParams.pagination,
//     //           total: 200,
//     //           // 200 is mock data, you should read it from server
//     //           // total: data.totalCount,
//     //         },
//     //       });
//     //     });
//     setData(allGuests);
//           setLoading(false);
//           setTableParams({
//             ...tableParams,
//             pagination: {
//               ...tableParams.pagination,
//               total: 200,
//               // 200 is mock data, you should read it from server
//               // total: data.totalCount,
//             },
//           });
//           console.log(tableParams);
//     };
//     useEffect(() => {
//       fetchData();
//     }, []);
//     const handleTableChange = (pagination, filters, sorter) => {
//       setTableParams({
//         pagination,
//         filters,
//         ...sorter,
//       });
  
//       // `dataSource` is useless since `pageSize` changed
//       if (pagination.pageSize !== tableParams.pagination?.pageSize) {
//         setData([]);
//       }
//     };
//     return (
//       <Table
//         columns={columns}
//         rowKey={(record) => record._id}
//         dataSource={data}
//         pagination={tableParams.pagination}
//         loading={loading}
//         onChange={handleTableChange}
//       />
//     );
//   };

// export default GuestListTable