import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import "./Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

const Home = () => {

    const [devolopers,setdevolopers]=useState([])

    useEffect(()=>{
axios.get('http://localhost:7070/sutdents?_sort=id&_order=desc').then((res)=>{

setdevolopers(res.data)

})
    },[setdevolopers]);

    //delte dta
    const handledelete=(id)=>{
        swal({
            title: "Are you sure?",
            text: "Are you sure you want delte this?",
            icon: "warning",
            buttons:true,
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
                axios.delete(`http://localhost:7070/sutdents/${id}`).then(()=>{
                    setdevolopers(devolopers.filter((data)=>data.id !==id))
                })
            }else{
                swal("your file is safe")
            }
          });

    }

    //view data
    const handleview=(id)=>{

    axios.get(`http://localhost:7070/sutdents/${id}`).then((data)=>{

      })

    }
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col">
            <h1 className="text-center">our devolopers</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <Link to='/create' className="mb-2 btn btn-primary">Add Devolopers</Link>
            <div className="card">
              <div className="card-body">
                <table className="table table-striped table-border">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Skill</th>
                      <th>Photo</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {devolopers.map((devs,index)=>(
                             <tr className="align-middle" key={index}>
                             <td>{index +1}</td>
                             <td>{devs.name}</td>
                             <td>{devs.age}</td>
                             <td>{devs.skill}</td>
                             <td><img className="table-photo" src={devs.photo} alt="" /></td>
                             <td>
                               <button className="btn btn-primary">
                                 <FaEdit />
                               </button>
                             </td>
                             <td>
                               <button onClick={()=> handledelete(devs.id)} className="btn btn-danger">
                                 <FaTrash />
                               </button>
                             </td>
                             <td>
                               <button onClick={()=> handleview(devs.id)} className="btn btn-info">
                                 <FaEye />
                               </button>
                             </td>
                           </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
