import { connect } from 'react-redux';
import ChannelIndex from './channel_index';
import { fetchChannels } from '../../actions/channel_actions';

const msp = (state, ownProps) => ({
  curentUser: state.entities.users[state.session.id],
  channels: Object.values(state.entities.channels),  
});

const mdp = (dispatch) => ({
  fetchChannels: (serverId) => dispatch(fetchChannels(serverId)),
  deleteChannel: (serverId, channelId) => dispatch(deleteChannel(serverId, channelId)), 
});

export default connect(msp, mdp)(ChannelIndex);