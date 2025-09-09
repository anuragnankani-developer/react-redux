import { useSelector, useDispatch } from 'react-redux';
import  {increment, decrement, allData, postData}  from '../redux/Action';
import { useEffect , useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
function IncrementData() {

    const selectState= useSelector((state)=>state.myState);
    const dispatch = useDispatch();
       const [studentData, setStudentData] = useState({
            firstname: "",
            lastname: "",
            email: "",
            username:"",
            mobile:"",
            password:""
        });
        // console.log('value:', studentData);

    const storeData = useSelector((state)=>state.storeData);
  // console.log(storeData,'storee');
    useEffect(()=>{
      dispatch(allData())
    },[dispatch]);

    const handelChange=(e)=>{
      e.preventDefault();
      setStudentData({...studentData,[e.target.name]:e.target.value});
}

const handelRegisterData=(e)=>{
  e.preventDefault();
  dispatch(postData(studentData))
}

  return (
    <>
    {selectState}
    <button onClick={()=>dispatch(increment)} > Increment </button>
    <button onClick={()=>dispatch(decrement)} > Decrement </button>
    <div>IncrementData</div>

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
            storeData?.map((value, index)=>{
               return <tr key={index} >
                    <td> { index + 1 } </td>
                    <td> {value.firstname} </td>
                    <td> {value.lastname} </td>
                    <td> {value.email} </td>
                    <td> {value.mobile} </td>
                    <td> {value.username} </td>
                    <td> {value.password} </td>
                    {/* <td> <Button variant="info" onClick={()=>handelEdit(value.id)} >Edit</Button> */}
                    {/* <Button variant="danger" onClick={()=>handelDelete(value.id)} >Delete</Button></td> */}
                </tr>
            })
        }
      </tbody>
    </Table>

     <Form 
     onSubmit={handelRegisterData} 
     >
            <h1> Student Registration Form </h1>
            <Form.Group className="mb-3">      
            <Form.Control 
            type="text" 
            name='firstname' 
            // value={studentData.firstname} 
            placeholder="Enter First Name" 
            onChange={handelChange}  
            />
          </Form.Group>
          <Form.Group className="mb-3">
           
            <Form.Control type="text" name='lastname' 
            // value={studentData.lastname} 
            placeholder="Enter Last Name" 
            onChange={handelChange} 
            />
          </Form.Group>
            <Form.Group className="mb-3">
           
            <Form.Control type="text" name='username' 
            // value={studentData.username} 
            placeholder="Enter User Name" 
            onChange={handelChange} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="email" 
            name='email' 
            // value={studentData.email} 
            placeholder="Enter email" 
            onChange={handelChange} 
            />
          </Form.Group>
              <Form.Group className="mb-3">
            <Form.Control type="text" 
            name='mobile' 
            // value={studentData.mobile} 
            placeholder="Enter Mobile" 
            onChange={handelChange} 
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Control 
            type="password" 
            name='password' 
            // value={studentData.password} 
            placeholder="Password" 
            onChange={handelChange} 
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          {/* {editId ? "Update":"Submit"}   */}
          </Button>
        </Form>
    </>
    
  )
}

export default IncrementData