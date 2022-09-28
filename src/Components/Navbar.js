import React from 'react'

const Navbar = props => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5em' }}>
      <h1>NHIL</h1>
      {props.currentUser ? <button onClick={props.handleLogOut} className="Logout-button">Log out</button> : null}

    </div>
  )
}

export default Navbar