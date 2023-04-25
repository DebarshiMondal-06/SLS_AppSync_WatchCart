/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useQuery } from "@apollo/client";
import { LOAD_USER_CART, LOAD_WATCHES } from './Queries';


const createGlobalContext = createContext();


const ContextGlobal = ({ children }) => {
  const [cookie] = useCookies();
  const [userItem, setUserItem] = useState([]);
  const watchData = useQuery(LOAD_WATCHES);
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useQuery(LOAD_USER_CART, {
    variables: { user_id: cookie.authToken },
    skip: cookie && cookie.authToken ? false : true,
  });


  useEffect(() => {
    if (data) {
      setUserItem(data.getUserOrders)
    }
  }, [data]);



  return <createGlobalContext.Provider value={{
    watchData,
    userItem,
    refetch,
    setLoading,
    loading
  }}>
    {children}
  </createGlobalContext.Provider>
}


export { ContextGlobal, createGlobalContext };
