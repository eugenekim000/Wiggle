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
      <button
        onClick={() => setToggle(!infoToggled)}
        className='ui button negative'
      >
        Close
      </button>
    );
  }

  function renderModal() {
    console.log('clicked');
    return (
      <div>
        <div className='ui secondary pointing menu'>
          <Link
            to='/'
            className='item header-text'
            style={{ color: '#a970ff' }}
          >
            Streamy
          </Link>

          <div className='right menu center'>
            <i
              className='question circle icon'
              onClick={() => setToggle(!infoToggled)}
            ></i>
            {renderCreate()}
            <GoogleAuth />
          </div>
        </div>
        <Modal
          title='About this App'
          content={renderContent()}
          actions={renderActions()}
          onDismiss={() => setToggle(!infoToggled)}
        />
      </div>
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
    <div>{renderModal()}</div>
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
