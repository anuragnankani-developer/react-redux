import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AsyncAwait() {
    const [records, setRecords] = useState([])
    console.log(records)
    useEffect(()=>{
        const result =(async()=>{
           const res= await axios.get('https://68b598bfe5dc090291af9414.mockapi.io/users')
        console.log(res,'res')
            // setRecords(res.data)
        })
        result()
    },[])

    const getApiData = (async()=>{
        try{

const res= await axios.get('https://68b598bfe5dc090291af9414.mockapi.io/users')
        console.log(res,'res')
            setRecords(res.data)
        }catch(err){
            console.log(err);
        }
    })
    
    useEffect(()=>{
        getApiData()
    },[])
  return (
    <>
    <div>AsyncAwait</div>
    </>
  )
}

export default AsyncAwait