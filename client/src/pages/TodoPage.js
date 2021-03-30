import React from 'react'

import Todos from '../components/Todos'

const TodoPage = () => {
    return (
        <div>
            <div className="container">
                <div className="todos">
                    <Todos />
                </div>
            </div>
        </div>
    )
}

export default TodoPage
