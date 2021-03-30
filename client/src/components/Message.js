import React from 'react'

const Message = (props) => {
    return (
        <div>
            <div className="messages">
                {props.message.msgBody}
            </div>
        </div>
    )
}

export default Message
