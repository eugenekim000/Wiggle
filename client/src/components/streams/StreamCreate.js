import React from 'react';
import { connect } from 'react-redux';
import { createStream, createChat } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createStream(formValues);
    this.props.createChat(this.props.currentUserId);
  };

  render() {
    return (
      <div className='stream-form'>
        <h3>Create a stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.auth.userId
  };
};

export default connect(mapStateToProps, { createStream, createChat })(
  StreamCreate
);
