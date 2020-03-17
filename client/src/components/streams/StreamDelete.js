import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { render } from '@testing-library/react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    return (
      <>
        <button className='ui button negative'>Delete</button>
        <button className='ui button'>Cancel</button>
      </>
    );
  }

  renderContent() {
    return !this.props.stream
      ? 'Are you sure you want to delete this stream?'
      : `Are you sure you want to delete ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title='Delete Stream'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamDelete);
