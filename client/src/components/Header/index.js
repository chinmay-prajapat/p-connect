import React from 'react';
import Header from './Header';
import UserHeader from './UHeader';
import ProfessionalHeader from './PHeader';
class Navbar extends React.Component {
  render() {
    return (
      <div>
        {this.props.role === 'user' ? (
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
