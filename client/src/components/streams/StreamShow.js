import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';
import Dashboard from '../chatbox/Chatbox';
import Store from '../../reducers/chatReducer';
import { Link } from 'react-router-dom';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  renderAdmin() {
    if (this.props.stream.userId === this.props.currentUserId) {
      console.log(this.props);
      return (
        <Link
          to={`/streams/delete/${this.props.stream.id}`}
          className='ui button negative'
        >
          End Stream
        </Link>
      );
    }
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else {
      const { title, description } = this.props.stream;
      return (
        <div>
          {this.renderAdmin()}
          <div className='streaming-container'>
            <video ref={this.videoRef} style={{ width: '60%' }} controls />
          </div>
          <h1>{title}</h1>
          <h5>{description}</h5>
          <Store>
            <Dashboard streamId={this.props.stream.userId}></Dashboard>
          </Store>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId
  };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
