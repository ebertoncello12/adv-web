import React from 'react';
import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Meta } = Card;

export const CardQuantityDashboard = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '300px',
                margin: '0 auto',
            }}
        >
            <div style={{ width: '300px' }}>
                <Card
                    hoverable
                    style={{ width: '100%', cursor: 'pointer' }}
                    {...props}
                >
                    <div style={{ textAlign: 'center' }}>
                        <>
                            <Typography.Title level={1}>
                                {props.quantity || 0}
                            </Typography.Title>
                            <Typography.Title level={5}>
                                {props.title || 'Title'}
                            </Typography.Title>
                        </>
                    </div>
                </Card>
            </div>
        </div>
    );
};

CardQuantityDashboard.propTypes = {
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
};
