import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { BiSolidShow } from "react-icons/bi";

import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./Student.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Student = () => {
  const [editemodal, seteditemodal] = useState(false);
  const [viewmodal,setviewmodal]=useState(false)
  const [singles,setSingles]=useState([])

  const [modal, setmodal] = useState(false);
  const [input, setinput] = useState({
    name: "",
    age: "",
    roll: "",
    photo: "",
  });

  const [students, setstudents] = useState([]);

  const getallstudents = async () => {
    const res = await axios.get("http://localhost:7070/sutdents");

    setstudents(res.data);
  };

  useEffect(()=>{
    getallstudents()
  },[])
  const handleinputchange = (e) => {
    setinput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  const handlemodalshow = () => {
    setmodal(true);
  };
  const handlemodalhide = () => {
    setmodal(false);

  };

  const handleeditemodalshow = () => {
    seteditemodal(true);
  };
  const handleeditemodalhide = () => {
    seteditemodal(false);
    setinput({
      name: "",
      age: "",
      roll: "",
      photo: "",
    });
  };

  const viewmodalshow = () => {
    setviewmodal(true);

  };
  const viewmodalhide = () => {
    setviewmodal(false);

  };

  const handlecreatesutdent = async (e) => {
    e.preventDefault();
    if (input.name || input.age || input.roll || input.photo){
      await axios.post("http://localhost:7070/sutdents", input);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data create succefully",
        showConfirmButton: false,
        timer: 1500
      });
    setinput({
      name: "",
      age: "",
      roll: "",
      photo: "",
    });
    handlemodalhide();
    getallstudents()
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
  };
  //student delte
  const handledelte=(id)=>{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
         axios.delete(`http://localhost:7070/sutdents/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        getallstudents()
      }
    });

  }

  //edite
  const handleeditesutdent=(id)=>{
setinput(students.find((item)=>item.id==id))

    handleeditemodalshow()
  }

    //view
    const singleshow=(id)=>{
      setSingles(students.find((item)=>item.id==id))

      viewmodalshow()
        }

  //update form
  const handleupdatesutdent=async(e)=>{
e.preventDefault()
await axios.patch(`http://localhost:7070/sutdents/${input.id}`,input)
getallstudents()
handleeditemodalhide()
  }
    return (
    <>
      <Container>
        <Row className="justify-content-center my-5">
          <Col md={8}>
            <button onClick={handlemodalshow} className="btn btn-primary">
              create student
            </button>
            <br />
            <br />
            <Card>
              <Card.Header>
                <Card.Title>All student</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Photo</th>

                      <th>Name</th>
                      <th>Age</th>
                      <th>Roll</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  {students.length==0?'no data found':students.map((item,index)=>{
                    return <tbody key={index}>
                    <tr className="align-middle">
                      <td>{index +1}</td>
                      <td>
                        <img
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                          src={item.photo}
                          alt=""
                        />
                      </td>

                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.roll}</td>

                      <td>
                        <Button onClick={()=>singleshow(item.id)} className="mr-2" variant="info">
                          <BiSolidShow />
                        </Button>
                        <Button onClick={()=>handleeditesutdent(item.id)} className="mr-2" variant="warning">
                          <MdEditSquare />
                        </Button>
                        <Button onClick={()=>handledelte(item.id)} variant="danger">
                          <MdDelete />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                  })}
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={modal} onHide={handlemodalhide}>
        <Modal.Header>
          <Modal.Title>Crate a student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlecreatesutdent} action="">
            <div className="my-2">
              <label htmlFor="">name</label>
              <input
                name="name"
                value={input.name}
                onChange={handleinputchange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="my-2">
              <label htmlFor="">age</label>
              <input
                name="age"
                value={input.age}
                onChange={handleinputchange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="my-2">
              <label htmlFor="">Roll</label>
              <input
                name="roll"
                value={input.roll}
                onChange={handleinputchange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="my-2">
              <label htmlFor="">photo</label>
              <input
                value={input.photo}
                onChange={handleinputchange}
                className="form-control"
                type="text"
                name="photo"
              />
            </div>
            <div className="my-2">
              <button type="submit" className="btn btn-primary">
                submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

{/* ----edite and update modal---------- */}
      <Modal show={editemodal} onHide={handleeditemodalhide}>
        <Modal.Header>
          <Modal.Title>Update a student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleupdatesutdent} action="">
            <div className="my-2">
              <label htmlFor="">name</label>
              <input
                name="name"
                value={input.name}
                onChange={handleinputchange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="my-2">
              <label htmlFor="">age</label>
              <input
                name="age"
                value={input.age}
                onChange={handleinputchange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="my-2">
              <label htmlFor="">Roll</label>
              <input
                name="roll"
                value={input.roll}
                onChange={handleinputchange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="my-2">
              <label htmlFor="">photo</label>
              <input
                value={input.photo}
                onChange={handleinputchange}
                className="form-control"
                type="text"
                name="photo"
              />
            </div>
            <div className="my-2">
              <button type="submit" className="btn btn-primary">
                submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* ----view modal---------- */}
      <Modal show={viewmodal} onHide={viewmodalhide}>
        <Modal.Header>
          <Modal.Title>singles a student</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">

      <div  className="main">
            <img  src={singles.photo} alt="" />
          <h1>{singles.name}</h1>
          <p>{singles.roll}</p>
      </div>

        </Modal.Body>
      </Modal>
    </>
  );
};

export default Student;
