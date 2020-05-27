import React from 'react';
import Header from './Header';
import UserHeader from './UHeader';
import ProfessionalHeader from './PHeader';
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
        ) : (
          <Header />
        )}
      </div>
    );
  }
}

export default Navbar;
