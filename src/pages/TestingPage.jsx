import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function TestingComponent() {

    const [studentData, setStudentData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username:"",
        mobile:"",
        password:""
    });

       const [data, setData] = useState([]);
    
    const [showForm, setShowForm] = useState(false);
    const [hideTable, setHideTable] = useState(true);

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
        debugger
        const { firstname,lastname, email, username, mobile, password} = studentData;
        if(!firstname || !lastname || ! email || !username || !mobile|| !password){
         return alert('All fields are required');
        }
        axios.post('https://68b598bfe5dc090291af9414.mockapi.io/users',studentData)
        .then((res)=>{
            // console.log(res)
            setData([...data, res.data]) //show data in current state
        })
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
    const openTheForm=()=>{
        
        setShowForm(true)
        setHideTable(false)
    }
    
  return (
    <>
    <Button onClick={openTheForm}> Add User </Button>
    <div>TestingComponent</div>
    {hideTable && (
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
        {/* {
            data?.map((value, index)=>{
               return <tr key={index} >
                    <td> { index + 1 } </td>
                    <td> {value.firstname} </td>
                    <td> {value.lastname} </td>
                    <td> {value.email} </td>
                    <td> {value.mobile} </td>
                    <td> {value.username} </td>
                    <td> {value.password} </td>
                    <td> <Button variant="info">Edit</Button>
                    <Button variant="danger" onClick={()=>handelDelete(value.id)} >Delete</Button></td>
                </tr>
            })
        } */}
      </tbody>
    </Table>
    )}
  

{
    showForm &&(
<Form onSubmit={handelRegisterData} >
        <h1> Student Registration Form </h1>
        <Form.Group className="mb-3">
        
        <Form.Control type="text" name='firstname' placeholder="Enter First Name" onChange={handelChange}  />
      </Form.Group>
      <Form.Group className="mb-3">
       
        <Form.Control type="text" name='lastname' placeholder="Enter Last Name" onChange={handelChange} />
      </Form.Group>
        <Form.Group className="mb-3">
       
        <Form.Control type="text" name='username' placeholder="Enter User Name" onChange={handelChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control type="email" name='email' placeholder="Enter email" onChange={handelChange} />
      </Form.Group>
          <Form.Group className="mb-3">
        <Form.Control type="text" name='mobile' placeholder="Enter Mobile" onChange={handelChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Control type="password" name='password' placeholder="Password" onChange={handelChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    )
}
    


    </>
  )
}

export default TestingComponent;