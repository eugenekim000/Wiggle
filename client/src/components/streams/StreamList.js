import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';
import '../../styles.css';
import ReactPlayer from 'react-player';
import { withStyles } from '@material-ui/core/styles';

const StyledPaper = withStyles({
  root: {
    background: '#18181b',
    margin: 'auto'
  }
})(Paper);

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
        <div>
          <div className='eight wide column' key={stream.id}>
            <i className='large middle aligned icon camera'></i>
            <div className='content'>
              <Link className='header' to={`/streams/${stream.id}`}>
                {stream.title}
              </Link>
              <div className='description'>{stream.description}</div>
            </div>
          </div>
          {this.renderAdmin(stream)}
        </div>
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

  renderFrontPage(prop) {
    return (
      <StyledPaper className='video-player'>
        <ReactPlayer
          url={prop.url}
          key={prop.idx}
          controls
          className='video-player'
        ></ReactPlayer>
      </StyledPaper>
    );
  }

  render() {
    return (
      <div>
        <h1 className='banner-text'>Discover Popular Streams</h1>

        <Carousel className='carousel' autoPlay={true} indicators={true}>
          {this.urls.map((url, idx) => {
            return this.renderFrontPage(url, idx);
          })}
        </Carousel>

        <h1 style={{ padding: '20px' }}>Other's Streaming Right Now:</h1>
        <div style={{ padding: '20px' }} className='ui grid'>
          {this.renderList()}
        </div>
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
