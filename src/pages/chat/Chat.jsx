import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { LeftSidebar, MiddleSideCard ,CornerSideBar} from '../../component';

import './style.scss'

const Chat = () => {
  return (
    <div className='chat'>
    <LeftSidebar />
    <Routes>
      <Route path='/' element={<MiddleSideCard/>} />
      <Route path='/chat/:id' element={<MiddleSideCard />} />
    </Routes>
    <CornerSideBar />
    </div>
  )
}

export default Chat
