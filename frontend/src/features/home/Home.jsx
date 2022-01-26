import React from 'react';
import Navbar from '../../common/navbar/navbar'
import CustomizedInputBase from '../roomlist/searchbar2';
import BasicExampleDataGrid from '../roomlist/roomarray';

function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <CustomizedInputBase />
      <BasicExampleDataGrid />
    </div>
  );
}

export default Home;