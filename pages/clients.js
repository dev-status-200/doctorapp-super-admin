import React,{useEffect} from 'react'
import Cookies from 'cookies';
import { useRouter } from 'next/router';

import verifyToken from '@/apis/verifyToken'
import Clients from '../components/layout/Clients/index'

const clients = ({sessionData}) => {
  const router = useRouter()
    useEffect(() => {
        if (!sessionData.isAuthorized) {
          router.push("/");
        } 
      }, []);
  return (
    <React.Fragment>
      <Clients/>
    </React.Fragment>
  )
}

export default clients

export async function getServerSideProps({ req, res }) {
    const sessionRequest = await verifyToken(Cookies, req, res);
  
    return {
      props: { sessionData: sessionRequest },
    };
  }