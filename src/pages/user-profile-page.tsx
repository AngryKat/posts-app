import { Spin } from 'antd';
import React from 'react';
import { useFetchUser } from 'utils/use-fetch-user';

const UserProfilePage = () => { 
    const { user, isLoading } = useFetchUser();
    if (isLoading) {
        return <Spin />
    }
    
    return (<div style={{ width: 600, margin: '0 auto' }}>Hello! It is your profile! {user.email}</div>)};


export default UserProfilePage;