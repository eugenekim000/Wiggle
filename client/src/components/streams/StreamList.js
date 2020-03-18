import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderList() {
    return this.props.streams.map(stream => {
      return (
        <Paper>
          <div className='item' key={stream.id}>
            {this.renderAdmin(stream)}
            <i className='large middle aligned icon camera'></i>
            <div className='content'>
              <Link className='header' to={`/streams/${stream.id}`}>
                {stream.title}
              </Link>
              <div className='description'>{stream.description}</div>
            </div>
          </div>
        </Paper>
      );
    });
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className='ui button negative'
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderCreate() {
    if (this.props.isSignedIn)
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui button primary'>
            Create Stream
          </Link>
        </div>
      );
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>{this.renderList()}</div>
        {this.renderCreate()}
        <Carousel>
          {this.props.streams.map(stream => {
            return (
              <Paper>
                <div className='item ui center aligned grid' key={stream.id}>
                  {this.renderAdmin(stream)}
                  <i className='large middle aligned icon camera'></i>
                  <div className='content'>
                    <Link className='header' to={`/streams/${stream.id}`}>
                      {stream.title}
                    </Link>
                    <div className='description'>{stream.description}</div>
                  </div>
                </div>
              </Paper>
            );
          })}
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
