"use client"
import React, { useEffect, useState } from 'react';

import Router from "next/router";
import Loader from '../shared/Loader';

import { delay } from '@/functions/delay';

const HomeTemp = () => {
  
    const makeRoute = async() => {
     
      await delay(3000);
      Router.push("/auth");
    }
    
    useEffect(() => {
      makeRoute();
    }, [])

  return (
    <Loader/>
  )
}

export default HomeTemp