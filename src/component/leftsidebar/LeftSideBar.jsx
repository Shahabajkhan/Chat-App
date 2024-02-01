import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.scss";

const LeftSidebar = () => {
  const [search, setSearch] = useState("");
  const [openConversation, setOpenConversation] = useState(false);

  // store
  const contactList = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  // searched contact
  const filteredContactList = contactList.filter((contact) => {
    return contact.name.toLowerCase().includes(search.toLowerCase());
  });

  // refereing contact details
  const contact = useRef();
  const image = useRef();

  // add new contact to list
  const addContact = (e) => {
    e.preventDefault();
    let n = contactList.length + 2;
    let id = `${n}`;
    let name = contact.current.value;
    let avatar = image.current.value;
    if (name === "" && avatar === "") {
      setOpenConversation(false);
      toast.warning("Please enter a name and avatar");
      return;
    }
    const newContact = {
      id: id,
      name: name,
      avatar: avatar,
      messages: [],
    };
    contactList.push(newContact);
    dispatch({
      type: "CONTACT_LIST",
      payload: contactList,
    });
    contact.current.value = "";
    image.current.value = "";
    setOpenConversation(false);
    toast.success("Contact Added");
  };

  return (
    <section className="left">
      <div className="fixed" style={{ background: 'rgb(182, 182, 182)' }}>
        <Link to="/" className="user" style={{background:"white"}}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb0YnsN-En1g485qO2RdP4QYaRG2HXGdx-iA&usqp=CAU"
            alt="user"
          />
          <h2>Shahabajkhan</h2>
        </Link>
        <div className="searchbox">
          <input
            type="search"
            className="searchInput"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            placeholder="Search for conversation"
          />
        </div>
        <div>
          {openConversation ? (
            <>
              <div className="addCon">
                <p>CONVERSATIONS</p>
              </div>
              <form onSubmit={addContact} className="search">
                <input type="text" ref={contact} placeholder="Enter name" />
                <input type="url" ref={image} placeholder="Enter image url" />
                <button>+ Add</button>
              </form>
            </>
          ) : (
            <div className="addCon">
              <p>NEW CONVERSATIONS</p>
              <button onClick={() => setOpenConversation(true)}>+</button>
            </div>
          )}
        </div>
      </div>

      <div className="contactList">
        {filteredContactList &&
          filteredContactList.map((item, index) => {
            return (
              <Link
                key={index}
                to={`/chat/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="contact">
                  <img src={item.avatar} alt="" />
                  <div className="contactText">
                    <p className="name">{item.name}</p>
                    {item.lastMessage && <p>{item.lastMessage}</p>}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <ToastContainer/>
    </section>
  );
};

export default LeftSidebar;
