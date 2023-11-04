import React from 'react'
import Cookies from 'cookies';

import verifyToken from '@/apis/verifyToken'
import Clients from '../components/layout/Clients/index'

const clients = ({sessionData}) => {

  return (<Clients sessionData={sessionData} />)
}

export default clients

export async function getServerSideProps({ req, res }) {
    const sessionRequest = await verifyToken(Cookies, req, res);
  
    return {
      props: { sessionData: sessionRequest },
    };
  }