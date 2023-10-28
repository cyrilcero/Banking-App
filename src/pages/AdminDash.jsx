import React, { useState } from 'react';
import GreetingDash from '../components/GreetingDash';
import AdminNavBar from '../components/AdminNavbar';
import addUserImg from '../assets/admindashAddUser.png'

function AdminDash() {
  return (
    <>
      <section className='admindash'>
        <div className='admin-navbar'>
          <AdminNavBar />
        </div>

        <div className="admindash-content">
          <GreetingDash />

          <div className="panel-admindash">
            <div className="content1">
              <img id='add-user-img' src= {addUserImg}  alt="add_user_img" />
              <button>
                <h3>Create New Account</h3>
              </button>
            </div>

            <div className="content2"></div>
            <div className="content3"></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminDash
