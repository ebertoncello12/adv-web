import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {useLoading} from "../../hooks/LoadingContext.jsx";

const LoadingIndicator = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;


  return (
        <div style={backdropStyle}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: '#45070D' }} spin />} />
        </div>
  );
};

const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

export default LoadingIndicator;
