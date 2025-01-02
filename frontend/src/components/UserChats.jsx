import React from 'react'
import { useChatStore } from '../store/useChatStore'

const UserChats = () => {

 const {messages}= useChatStore()
 console.log("messagesmessages>>",messages)

  return (
    <div className='flex-1 overflow-y-auto p-3'>
      {messages.map((message)=>(
        <div
        key={message.id}
        >
            akash
        </div>
      ))}
    </div>
  )
}

export default UserChats
