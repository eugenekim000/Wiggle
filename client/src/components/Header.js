import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import { connect } from 'react-redux';
import Modal from './Modal';
import history from '../history';

const Header = ({ isSignedIn }) => {
  const [infoToggled, setToggle] = useState(true);

  function renderCreate() {
    if (isSignedIn)
      return (
        <div style={{ textAlign: 'right' }}>
          <Link
            to='/streams/new'
            className='ui inverted violet button stream-button'
          >
            Create Stream
          </Link>
        </div>
      );
  }

  function renderContent() {
    return 'test';
  }
  function renderActions() {
    return (
      <button onClick={() => history.push('/')} className='ui button negative'>
        Close
      </button>
    );
  }

  function renderModal() {
    console.log('clicked');
    return (
      <Modal
        title='Delete Stream'
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }

  return infoToggled ? (
    <div className='ui secondary pointing menu'>
      <Link to='/' className='item header-text' style={{ color: '#a970ff' }}>
        Streamy
      </Link>
      <div className='right menu center'>
        <i
          class='question circle icon'
          onClick={() => setToggle(!infoToggled)}
        ></i>
        {renderCreate()}
        <GoogleAuth />
      </div>
    </div>
  ) : (
    <div>
      <i
        class='question circle icon'
        onClick={() => setToggle(!infoToggled)}
      ></i>
      {renderModal()}
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
