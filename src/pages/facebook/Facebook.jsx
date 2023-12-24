import { MdDelete } from "react-icons/md";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Faceboo.css";
import { FaCaretDown } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

import logo from "../../images/logo.png";
import notification from "../../images/notification.png";
import inbox from "../../images/inbox.png";
import video from "../../images/video.png";
import search from "../../images/search.png";
import profile from "../../images/profile-pic.png";
import feedback from "../../images/feedback.png";
import setting from "../../images/setting.png";
import arrow from "../../images/arrow.png";
import help from "../../images/notification.png";
import display from "../../images/display.png";
import news from "../../images/news.png";
import friends from "../../images/friends.png";
import group from "../../images/group.png";
import marketplace from "../../images/marketplace.png";
import watch from "../../images/watch.png";
import shortcut_1 from "../../images/shortcut-1.png";
import shortcut_2 from "../../images/shortcut-2.png";
import shortcut_3 from "../../images/shortcut-3.png";
import shortcut_4 from "../../images/shortcut-4.png";
import upload from "../../images/upload.png";
import member_1 from "../../images/member-1.png";
import member_2 from "../../images/member-2.png";
import member_3 from "../../images/member-3.png";
import member_4 from "../../images/member-4.png";
import live_video from "../../images/live-video.png";
import photo from "../../images/photo.png";
import feeling from "../../images/feeling.png";
import feed_image from "../../images/feed-image-1.png";
import like_blue from "../../images/like-blue.png";
import comments from "../../images/comments.png";
import share from "../../images/share.png";

import advertisement from "../../images/advertisement.png";
import member1 from "../../images/member-1.png";
import member2 from "../../images/member-2.png";
import member4 from "../../images/member-4.png";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Facebook = () => {
  const [isSettingMenuVisible, setSettingMenuVisible] = useState(false);
  const [isDarkTheme, setDarkTheme] = useState(false);

  const toggleSettingMenu = () => {
    setSettingMenuVisible(!isSettingMenuVisible);
  };

  const toggleDarkTheme = () => {
    setDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark_theme", isDarkTheme);
  };
  const [students, setstudents] = useState([]);

  console.log(students);
  // -------input value------------

  const [input, setinput] = useState({
    name: "",
    content: "",
    photo: "",
    auth_photo: "",
  });

  // -------input value------------
  const handleinputchange = (e) => {
    setinput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  // --------modal---------
  const [modal, setmodal] = useState(false);

  // --------show modal-------

  const showmodal = () => {
    setmodal(true);
  };

  // ------------hide modal-----------

  const hidemodal = () => {
    setmodal(false);
  };

  // --------modal---------
  const [editemodal, seteditemodal] = useState(false);

  // --------show modal-------

  const showeditemodal = () => {
    seteditemodal(true);
  };

  // ------------hide modal-----------

  const hideeditemodal = () => {
    seteditemodal(false);
    setinput({
      name: "",
      content: "",
      photo: "",
      auth_photo: "",
    });
  };
  // -----------form submit-----------

  const formSubmit = (e) => {
    e.preventDefault();

    if (!input.name || !input.content || !input.photo || !input.auth_photo) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All feild are required!",
        footer: '<a href="#">please all feild filup </a>',
      });
    } else {
      axios.post("http://localhost:7070/sutdents", input);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your post succecfully create",
        showConfirmButton: false,
        timer: 1500,
      });

      hidemodal();
      setinput({
        name: "",
        content: "",
        photo: "",
        auth_photo: "",
      });
      getalldata();
    }
  };

  const getalldata = async () => {
    const res = await axios.get("http://localhost:7070/sutdents");
    setstudents(res.data);
  };

  useEffect(() => {
    getalldata();
  }, []);

  //delte post

  const deletepost = (id) => {
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
        getalldata();
      }
    });
  };

  const editedata = (id) => {
    setinput(students.find((item) => item.id == id));
    showeditemodal()
  };


  //edite submit form

  const editeSubmit=(e)=>{

    e.preventDefault()

axios.patch(`http://localhost:7070/sutdents/${input.id}`,input)
setinput({
  name: "",
  content: "",
  photo: "",
  auth_photo: "",
});

hideeditemodal()
getalldata()
  }


  return (
    <>
      <div>
        <nav>
          <div className="nav-left">
            <a href="index.html">
              {" "}
              <img className="logo" src={logo} alt="" />
            </a>
            <ul>
              <li>
                <img src={notification} alt="" />
              </li>
              <li>
                <img src={inbox} alt="" />
              </li>
              <li>
                <img src={video} alt="" />
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="search-box">
              <img src={search} alt="" />
              <input type="text" placeholder="search" />
            </div>
            <div className="user-icon online">
              <img src={profile} alt="" />
            </div>
          </div>
          {/* setting menu------------- */}
          <div className="setting-menu">
            <div id="dark_btn" onClick={toggleDarkTheme}>
              <span />
            </div>
            <div
              className={`setting-menu-inner ${
                isSettingMenuVisible ? "setting_menu_height" : ""
              }`}
            >
              <div className="user-profile">
                <img src={profile} alt="" />
                <div className="info">
                  <p>Johm Mia</p>
                  <a href="profile.html">See your profile</a>
                </div>
              </div>
              <hr />
              <div className="user-profile">
                <img src={feedback} alt="" />
                <div className="info">
                  <p>Give Feedback</p>
                  <a href>Help us to improve new Design</a>
                </div>
              </div>
              <hr />
              <div className="setting-links">
                <img className={setting} alt="" />
                <a href>
                  Setting and Privacy <img width="10px" src={arrow} alt="" />
                </a>
              </div>
              <div className="setting-links">
                <img className="settings-icon" src={help} alt="" />
                <a href>
                  Help and Suppor <img width="10px" src={arrow} alt="" />
                </a>
              </div>
              <div className="setting-links">
                <img className="settings-icon" src={display} alt="" />
                <a href>
                  Display and Succes{" "}
                  <img width="10px" src="./images/arrow.png" alt="" />
                </a>
              </div>
              <div className="setting-links">
                <img
                  className="settings-icon"
                  src="./images/logout.png"
                  alt=""
                />
                <a href>
                  Logeout <img width="10px" src="./images/arrow.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </nav>
        {/* nave end */}
        <div className="container">
          {/* left sidebar----------- */}
          <div className="left-sidebar">
            <div className="imp-links">
              <a href="#">
                <img src={news} alt="" />
                Latest news
              </a>
              <a href="#">
                <img src={friends} alt="" />
                friends
              </a>
              <a href="#">
                <img src={group} alt="" />
                group
              </a>
              <a href="#">
                <img src={marketplace} alt="" />
                marketplace
              </a>
              <a href="#">
                <img src={watch} alt="" />
                watch
              </a>
              <a href="#">See More</a>
            </div>
            <div className="shorcuts-links">
              <p>Your Shortcuts</p>
              <a href="#">
                <img src={shortcut_1} alt="" />
                Web Devolopers
              </a>
              <a href="#">
                <img src={shortcut_2} alt="" />
                Web Design Course
              </a>
              <a href="#">
                <img src={shortcut_3} alt="" />
                Web Stact Devolopment
              </a>
              <a href="#">
                <img src={shortcut_4} alt="" />
                Webste Expert
              </a>
            </div>
          </div>
          {/* main sidebar----------- */}
          <div className="main-container">
            <div className="story-gallery">
              <div className="story story1">
                <img src={upload} alt="" />
                <p>Post Story</p>
              </div>
              <div className="story">
                <img src={member_1} alt="" />
                <p>Md Azad</p>
              </div>
              <div className="story">
                <img src={member_2} alt="" />
                <p>Md Rasel</p>
              </div>
              <div className="story">
                <img src={member_3} alt="" />
                <p>Johirul Islam</p>
              </div>
              <div className="story">
                <img src={member_4} alt="" />
                <p>Jhon doe</p>
              </div>
            </div>
            <div className="write-post-container">
              <div className="user-profile">
                <img src={profile} alt="" />
                <div className="info">
                  <p>Johm Mia</p>
                  <small>
                    public <FaCaretDown />
                  </small>
                </div>
              </div>
              <div className="post-input-container">
                <button onClick={showmodal}>whats on your mind</button>
              </div>
              <div className="feeling-icon">
                <a href>
                  <img src={live_video} alt="" />
                  Like Video
                </a>
                <a href>
                  <img src={photo} alt="" />
                  Photo Video
                </a>
                <a href>
                  <img src={feeling} alt="" />
                  Feeling Activity
                </a>
              </div>
            </div>

            <div className="all">
              {students.length == 0
                ? "no data found"
                : students.map((item, index) => {
                    return (
                      <div key={index} className="main-post">
                        <div className="post-row">
                          <div className="user-profile">
                            <img src={item.auth_photo} alt="" />
                            <div className="info">
                              <p>{item.name}</p>
                              <span>June 24 2021, 13:23 pm</span>
                            </div>
                          </div>

                          <DropdownButton id="dropdown-basic-button">
                            <Dropdown.Item onClick={() => editedata(item.id)}>
                              <FaEdit />
                              Edite
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => deletepost(item.id)}>
                              <MdDelete />
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        </div>
                        <p className="post-text">
                          {item.content} <a href>#like here</a>
                          <img className="post-img" src={item.photo} alt="" />
                        </p>
                        <div className="post-row">
                          <div className="activity-icon">
                            <div>
                              <img src={like_blue} alt="" />
                              120
                            </div>
                            <div>
                              <img src={comments} alt="" />
                              160
                            </div>
                            <div>
                              <img src={share} alt="" />
                              20
                            </div>
                          </div>
                          <div className="post-profile-icon">
                            <img src={profile} alt="" />
                            <FaCaretDown />
                          </div>
                          <p />
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          {/* right sidebar----------- */}
          <div className="right-sidebar">
            <div className="sidebar-title">
              <h4>Events</h4>
              <a href="#">See all</a>
            </div>
            <div className="event">
              <div className="left-event">
                <h3>18</h3>
                <span>March</span>
              </div>
              <div className="right-event">
                <h4>Social Media</h4>
                <p>
                  <IoLocationSharp />
                  Willson Tech park
                </p>
                <a href>More Info</a>
              </div>
            </div>
            <div className="event">
              <div className="left-event">
                <h3>22</h3>
                <span>March</span>
              </div>
              <div className="right-event">
                <h4>Mobile Marketing</h4>
                <p>
                  <IoLocationSharp />
                  Willson Tech park
                </p>
                <a href>More Info</a>
              </div>
            </div>
            <div className="sidebar-title">
              <h4>Advertisement</h4>
              <a href="#">Close</a>
            </div>
            <img className="sidebar-adds" src={advertisement} alt="" />
            <div className="sidebar-title">
              <h4>Conversation</h4>
              <a href="#">Hide Chat</a>
            </div>
            <div className="online-list">
              <div className="online">
                <img src={member1} alt="" />
              </div>
              <p>Alison Mina</p>
            </div>
            <div className="online-list">
              <div className="online">
                <img src={member2} alt="" />
              </div>
              <p>Smona Mina</p>
            </div>
            <div className="online-list">
              <div className="online">
                <img src={member4} alt="" />
              </div>
              <p>Azad Khan</p>
            </div>
          </div>
        </div>
      </div>

      {/* --------modal--------- */}

      <Modal show={editemodal} onHide={hideeditemodal}>
        <Modal.Header>
          <Modal.Title>edite a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editeSubmit} action="">
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
              <label htmlFor="">Content</label>
              <input
                name="content"
                value={input.content}
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
              <label htmlFor="">author photo</label>
              <input
                value={input.auth_photo}
                onChange={handleinputchange}
                className="form-control"
                type="text"
                name="auth_photo"
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

      <Modal show={modal} onHide={hidemodal}>
        <Modal.Header>
          <Modal.Title>create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmit} action="">
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
              <label htmlFor="">Content</label>
              <input
                name="content"
                value={input.content}
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
              <label htmlFor="">author photo</label>
              <input
                value={input.auth_photo}
                onChange={handleinputchange}
                className="form-control"
                type="text"
                name="auth_photo"
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

export default Facebook;
