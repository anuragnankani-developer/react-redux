import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Services from './Services';

function RegisterUser() {

 
    // const studentObj ={
    //     firstname: "",
    //     lastname: "",
    //     email: "",
    //     username:"",
    //     mobile:"",
    //     password:""
    // }
    const [studentData, setStudentData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username:"",
        mobile:"",
        password:""
    });

    // console.log(studentData)
       const [data, setData] = useState([]);
    // const [lastName, setLastName] = useState('');
    // const [userName, setUserName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [mobile, setMobile] = useState('');
    


    // useEffect(()=>{
    //      fetch('https://68b598bfe5dc090291af9414.mockapi.io/users')
    // .then((res)=>res.json())
    // .then((res)=>{
    //         setData(res)
    // })
    // .catch((err)=>{
    //     console.error(err)
    // })
    // },[])

    const [editId, setEditId] = useState(null);
    const [storeSearchedValue,setStoreSearchedValue] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('https://68b598bfe5dc090291af9414.mockapi.io/users')
        .then((res)=>{
            setData(res.data)
            // console.log(res.data);
        })
        .catch((err)=>{
            console.log(err,"Server error")
        })
    },[])

    const handelRegisterData = ((e)=>{
        e.preventDefault()
        const { firstname,lastname, email, username, mobile, password} = studentData;
        if(!firstname || !lastname || ! email || !username || !mobile|| !password){
         return alert('All fields are required');
        }
        if(editId){
             axios.put(`https://68b598bfe5dc090291af9414.mockapi.io/users/${editId}`, studentData)
      .then((res)=>{
        console.log(res)
        setEditId(null);
        
      })
      .catch((err)=>{
        console.error(err)
      })
        }else{
         axios.post('https://68b598bfe5dc090291af9414.mockapi.io/users',studentData)
        .then((res)=>{
            // console.log(res)
            setData([...data, res.data]) //show data in current state
            setStudentData({
                firstname: "",
        lastname: "",
        email: "",
        username:"",
        mobile:"",
        password:""
            })
            navigate('/testing')
        })
        }
        
    })
    // [{obj:"abc"},{obj:"abc"},{obj:"abc"},{obj:"abc"},{obj:"abc"},{res:"data"}]

    const handelChange =(e)=>{
      e.preventDefault();
      // let keyName = e.target.name;
      // let objValue = e.target.value;
      setStudentData({...studentData,[e.target.name]:e.target.value});
    }

    const handelDelete=(id)=>{
      console.log(id);
      axios.delete(`https://68b598bfe5dc090291af9414.mockapi.io/users/${id}`)
      .then((res)=>{
        console.log(res)
        const filteredData= data.filter((value, index)=> value.id !== id )
        console.log(filteredData)
        setData(filteredData);
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    const handelEdit=(id)=>{
      console.log(id);
      const findData = data.find((item)=> item.id === id )
      const {username, firstname, lastname, email, mobile, password} = findData;
      
      debugger
      setStudentData({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password:password,
        mobile: mobile,
        username: username
      })
      setEditId(id)
    }

    const getInputValue = (e)=>{
      setStoreSearchedValue(e.target.value)
    }

    const showSpecificData= data.filter((value)=>{
      return  value.firstname.toLowerCase().includes(storeSearchedValue.toLowerCase()) ||
              value.lastname.toLowerCase().includes(storeSearchedValue.toLowerCase()) 
    })
    
  return (
    <>
    <div>Search User</div>

    <input type='text' placeholder='Search By First Name' onChange={getInputValue}  />
    <input type='text' placeholder='Search By Last Name' onChange={getInputValue} />
    <input type='text' placeholder='Search By Last Name' onChange={getInputValue} />
    <input type='text' placeholder='Search By User Name' onChange={getInputValue} />
    <input type='text' placeholder='Search By Email' onChange={getInputValue} />
    <input type='text' placeholder='Search By Mobile' onChange={getInputValue} />

    <div>RegisterUser</div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Mobille</th>
          <th>Password</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            showSpecificData?.map((value, index)=>{
               return <tr key={index} >
                    <td> { index + 1 } </td>
                    <td> {value.firstname} </td>
                    <td> {value.lastname} </td>
                    <td> {value.email} </td>
                    <td> {value.mobile} </td>
                    <td> {value.username} </td>
                    <td> {value.password} </td>
                    <td> <Button variant="info" onClick={()=>handelEdit(value.id)} >Edit</Button>
                    <Button variant="danger" onClick={()=>handelDelete(value.id)} >Delete</Button></td>
                </tr>
            })
        }
      </tbody>
    </Table>


    <Form onSubmit={handelRegisterData} >
        <h1> Student Registration Form </h1>
        <Form.Group className="mb-3">      
        <Form.Control type="text" name='firstname' value={studentData.firstname} placeholder="Enter First Name" onChange={handelChange}  />
      </Form.Group>
      <Form.Group className="mb-3">
       
        <Form.Control type="text" name='lastname' value={studentData.lastname} placeholder="Enter Last Name" onChange={handelChange} />
      </Form.Group>
        <Form.Group className="mb-3">
       
        <Form.Control type="text" name='username' value={studentData.username} placeholder="Enter User Name" onChange={handelChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="email" name='email' value={studentData.email} placeholder="Enter email" onChange={handelChange} />
      </Form.Group>
          <Form.Group className="mb-3">
        <Form.Control type="text" name='mobile' value={studentData.mobile} placeholder="Enter Mobile" onChange={handelChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Control type="password" name='password' value={studentData.password} placeholder="Password" onChange={handelChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
      {editId ? "Update":"Submit"}  
      </Button>
    </Form>


    </>
  )
}

export default RegisterUser;