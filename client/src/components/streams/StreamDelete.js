import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { render } from '@testing-library/react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const id = this.props.match.params.id;
    return (
      <>
        <button
          onClick={() => this.props.deleteStream(id)}
          className='ui button negative'
        >
          End Stream
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    return !this.props.stream
      ? 'Are you sure you want to end this stream?'
      : `Are you sure you want to end stream titled ${this.props.stream.title}?`;
  }

  render() {
    return (
      <Modal
        title='End Stream'
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

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
