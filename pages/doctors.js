import React,{useEffect} from 'react'
import Cookies from 'cookies';
import { useRouter } from 'next/router';

import Doctors from '../components/layout/Doctors/index'
import verifyToken from '@/apis/verifyToken'

const doctors = ({sessionData}) => {
  const router = useRouter()
    useEffect(() => {
        if (!sessionData.isAuthorized) {
          router.push("/");
        } 
      }, []);
    
  return (
    <React.Fragment>
      <Doctors/>
    </React.Fragment>
  )
}

export default doctors

export async function getServerSideProps({ req, res }) {
    const sessionRequest = await verifyToken(Cookies, req, res);
  
    return {
      props: { sessionData: sessionRequest },
    };
  }