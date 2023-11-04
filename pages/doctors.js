import React from 'react'
import Cookies from 'cookies';

import Doctors from '../components/layout/Doctors/index'
import verifyToken from '@/apis/verifyToken'

const doctors = ({sessionData}) => {
    
  return (
    <Doctors sessionData={sessionData} />
  )
}

export default doctors

export async function getServerSideProps({ req, res }) {
    const sessionRequest = await verifyToken(Cookies, req, res);
  
    return {
      props: { sessionData: sessionRequest },
    };
  }