// const addOne = "addOne";
import { addOne } from "./ActionType";
export const minusOne = "minusOne";
export const getAllData = "getAllData";
export const postAllData = "postAllData";
import axios from "axios";

export const increment={
    type: "addOne"
};
export const decrement ={
    type: minusOne
}

export const getTheData=(data)=>({
    type: getAllData,
    payload: data
});

export const postTheData=(data)=>({
    type: postAllData,
    payload: data
});


export const allData=()=>(dispatch)=>{
     axios.get('https://68b598bfe5dc090291af9414.mockapi.io/users')
    .then((res)=>{
        console.log(res,'resss')
        dispatch(getTheData(res.data))
    })
}

export const postData=(studentData)=>(dispatch)=>{
     axios.post('https://68b598bfe5dc090291af9414.mockapi.io/users',studentData)
    .then((res)=>{
        console.log(res,'resss')
        dispatch(postTheData(res.data))
    })
    .catch((err)=>{
        console.log(err);
    })
}

