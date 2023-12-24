import axios from "axios";
import { useEffect, useState } from "react";
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
import Swal from "sweetalert2";

const NewStudent = () => {
  //modla show
  const [modal, setmodal] = useState(false);

  const createmodalshow = () => {
    setmodal(true);
    setinput({
      name: "",
      age: "",
      roll: "",
      photo: "",
    });
  };
  const createmodalhide = () => {
    setmodal(false);
  };

  //single modal show
  const [showmodal, showsetmodal] = useState(false);

  const showmodalshow = () => {
    showsetmodal(true);
  };

  const showmodalhide = () => {
    showsetmodal(false);
  };
  //get all student usestate

  const [students, setstdents] = useState([]);

  //edite student usestate

  const [editemodal, seteditemodal] = useState(false);

  const [ediedata, seteditedata] = useState([]);

  const editemodalshow = () => {
    seteditemodal(true);
  };

  const editemodalhide = () => {
    seteditemodal(false);
  };
  //single student usestate

  const [singlestudents, setsinglestdents] = useState([]);
  const [input, setinput] = useState({
    name: "",
    age: "",
    roll: "",
    photo: "",
  });
  const handleinputchange = (e) => {
    setinput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  //sumit create student
  const createsubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:7070/sutdents", input);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    setinput({ name: "", age: "", roll: "", photo: "" });
    createmodalhide();
    getallstudents();
  };
  //get all student data
  const getallstudents = async () => {
    const res = await axios.get("http://localhost:7070/sutdents");
    setstdents(res.data);
  };
  useEffect(() => {
    getallstudents();
  }, []);

  //delete student data

  const deltestudent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:7070/sutdents/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        getallstudents();
      }
    });
  };

  //show stdent data
  const showstudent = async (id) => {
    // const res=await axios.get(`http://localhost:7070/sutdents/${id}`)

    setsinglestdents(students.find((item) => item.id == id));

    showmodalshow();
  };

  //edite stdent data
  const editemodals = (id) => {
    // const res=await axios.get(`http://localhost:7070/sutdents/${id}`)

    setinput(students.find((item) => item.id == id));

    editemodalshow();
  };

  //edite submit form

  const editesubmit = async(e) => {
    e.preventDefault();
axios.patch(`http://localhost:7070/sutdents/${input.id}`,input)


editemodalhide()
getallstudents()

  };
  return (
    <>
      <Container>
        <Row className="justify-content-center my-5">
          <Col md={8}>
            <button onClick={createmodalshow} className="btn btn-primary">
              create Student
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
                  <tbody>
                    {students.length == 0
                      ? "no data fond"
                      : students?.map((item, index) => {
                          return (
                            <tr key={index} className="align-middle">
                              <td>{index + 1}</td>
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
                                <Button
                                  onClick={() => showstudent(item.id)}
                                  className="mr-2"
                                  variant="info"
                                >
                                  <BiSolidShow />
                                </Button>
                                <Button
                                  onClick={() => editemodals(item.id)}
                                  className="mr-2"
                                  variant="warning"
                                >
                                  <MdEditSquare />
                                </Button>
                                <Button
                                  onClick={() => deltestudent(item.id)}
                                  variant="danger"
                                >
                                  <MdDelete />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={modal} onHide={createmodalhide}>
        <Modal.Header>
          <Modal.Title>create student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={createsubmit} action="">
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

      <Modal show={showmodal} onHide={showmodalhide}>
        <Modal.Header>
          <Modal.Title>create student</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            style={{
              width: "170px",
              height: "170px",
              objectFit: "cover",
            }}
            src={singlestudents.photo}
            alt=""
          />
          <h2>{singlestudents.name}</h2>
          <p>{singlestudents.roll}</p>
        </Modal.Body>
      </Modal>

      <Modal show={editemodal} onHide={editemodalhide}>
        <Modal.Header>
          <Modal.Title>edite student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editesubmit} action="">
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
    </>
  );
};

export default NewStudent;
