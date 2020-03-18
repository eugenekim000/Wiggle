import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';
import '../../styles.css';
import ReactPlayer from 'react-player';

class StreamList extends React.Component {
  constructor() {
    super();
    this.urls = [
      { url: 'https://www.twitch.tv/voyboy' },
      { url: 'https://www.twitch.tv/tfue' },
      { url: 'https://www.twitch.tv/mang0' },
      { url: 'https://www.twitch.tv/nl_kripp' },
      { url: 'https://www.twitch.tv/rocketleague' }
    ];
  }
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

  renderFrontPage(prop) {
    return (
      <Paper>
        <ReactPlayer url={prop.url} controls></ReactPlayer>
      </Paper>
    );
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <Carousel className='carousel' autoPlay={false}>
          {/*           {this.props.streams.map(stream => {
            return (
              <Paper className='scrolling-page'>
                <div key={stream.id}>{this.renderAdmin(stream)}</div>
                <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
              </Paper>
            );
          })} */}
          {this.urls.map((url, idx) => {
            return this.renderFrontPage(url, idx);
          })}
        </Carousel>
        {this.renderCreate()}
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
