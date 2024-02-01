import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { VscRocket } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillCamera } from "react-icons/ai";

import "./style.scss";

const MiddleSideCard = () => {
  const [contact, setContact] = useState(null);
  const { id } = useParams();
  const contactList = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const message = useRef();
  const imageInput = useRef();
  const chatContainerRef = useRef(); // Reference to the chat container

  useEffect(() => {
    setContact(contactList.find((item) => item.id === id));

    // Scroll to the bottom when the component mounts or when the contact changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [contactList, id]);

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = message.current.value;
    const imageFile = imageInput.current.files[0];

    if (!newMessage && !imageFile) {
      toast.warn("Write a message or select an image, please!");
      return;
    }

    const msg = {
      id: "1",
      message: newMessage || null,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb0YnsN-En1g485qO2RdP4QYaRG2HXGdx-iA&usqp=CAU",
      image: imageFile ? URL.createObjectURL(imageFile) : null,
    };

    const newList = contactList.map((contact) => {
      if (contact.id === id) {
        return {
          ...contact,
          messages: [...contact.messages, msg].filter(({ message, image }) => message || image),
          lastMessage: newMessage,
        };
      }
      return contact;
    });

    dispatch({
      type: "CONTACT_LIST",
      payload: newList,
    });

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    toast.success("Successfully sent message");
    message.current.value = "";
    imageInput.current.value = null;
  };

  return (
    <div className="right">
      {contact ? (
        <>
          <section className="nav">
            <img src={contact.avatar} alt="profile" />
            <h2>{contact.name}</h2>
          </section>

          <section className="chats" ref={chatContainerRef}>
            {contact.messages.map((chat, i) =>
              <div key={`${chat.id}${id}${i}`} className={chat.id === "1" ? "rightChat" : "leftChat"}>
                {chat.message && <h4>{chat.message}</h4>}
                {chat.image && <img src={chat.image} alt={chat.id === "1" ? "sent" : "received"} className="image-preview" />}
                <img className="image" src={chat.avatar} alt="profile" />
              </div>
            )}
          </section>

          <section className="msg">
            <form onSubmit={sendMessage} className="send">
              <input type="text" ref={message} placeholder="Type your message here..." />
              <input type="file" ref={imageInput} accept="image/*" style={{ display: "none" }} />
              <button type="button" onClick={() => imageInput.current.click()}>
                <AiFillCamera />
              </button>
              <button type="submit">
                <VscRocket />
              </button>
            </form>
          </section>
        </>
      ) : (
        <>
          <section className="nav">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4564/4564089.png"
              alt="profile"
            />
            <h2>Welcome Shahabajkhan </h2>
          </section>

          <section className="poem">
  <h3>
    We welcome you with a sense of pride and excitement. Our faculty and staff are committed to ensuring that we have a welcoming and safe community for all students. We know that students will find many exciting things at our school.
    We happily welcome you to our institution. You are encouraged to contact us about campus issues in the boxes below. And we promise to take care of them and make your stay enjoyable.
    We are delighted to welcome you to our University and excited by the return of our spirited campus life! We look forward to learning and growing together, no matter where you are in your learning journey with us.
  </h3>
</section>

        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default MiddleSideCard;
