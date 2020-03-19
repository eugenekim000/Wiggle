import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import { connect } from 'react-redux';

const Header = ({ isSignedIn }) => {
  function renderCreate() {
    if (isSignedIn)
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui button primary'>
            Create Stream
          </Link>
        </div>
      );
  }

  return (
    <div className='ui secondary pointing menu'>
      <Link to='/' className='item header-text' style={{ color: '#a970ff' }}>
        Streamy
      </Link>
      <div className='right menu'>
        {renderCreate()}
        <GoogleAuth />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(mapStateToProps)(Header);
