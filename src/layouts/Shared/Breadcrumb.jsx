import React from 'react';
import { Breadcrumb } from 'antd';


const Breadcrumbs = (props) => {
  return (
    <Breadcrumb separator=">" {...props} />
  )
}

export default Breadcrumbs;
