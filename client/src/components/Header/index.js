import React from 'react';
import Header from './Header';
import UserHeader from './UHeader';
import ProfessionalHeader from './PHeader';
import { Redirect } from 'react-router-dom';
import AdminHeader from '../Admin/AdminHeader/AHeader';
import UserHeaderPay from './UserHeaderPay';
class Navbar extends React.Component {
  render() {
    return (
      <div>
        {this.props.role === 'user' &&
        localStorage.getItem('amountPaid') == 0 ? (
          <UserHeaderPay />
        ) : this.props.role === 'user' &&
          localStorage.getItem('amountPaid') == 500 ? (
          <UserHeader />
        ) : this.props.role === 'professional' ? (
          <ProfessionalHeader />
        ) : this.props.role === 'admin' ? (
          <AdminHeader />
        ) : (
          <Header />
        )}
      </div>
    );
  }
}

export default Navbar;
