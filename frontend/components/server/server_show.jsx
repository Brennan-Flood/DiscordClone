import React from 'react';
import { ProtectedRoute } from '../../util/route_util';
import ChannelIndexContainer from '../channel/channel_index_container';
import EditServerForm from './server_form/server_edit_form_container'
import ChannelShowContainer from "../channel/channel_show_container";
import ChannelCreateFormContainer from '../channel/channel_create_container';

class ServerShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hide: true, edit: false, create: false}
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.serverId !== this.props.match.params.serverId) {
    this.props.fetchServer(this.props.match.params.serverId);
    this.setState({hide: true})
    }
  }

  handleDelete() {
    this.props.deleteServer(this.props.server.id)
      .then(() => this.props.history.push('/home'));
  }

  toggleHide() {
    this.setState({hide: !this.state.hide});
  }

  toggleCreate() {
    this.setState({ create: !this.state.create });
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit})
    if (this.state.hide !== true) {
      this.toggleHide()
    }
  }

  render() {
    if (!this.props.server) {
      return null;
    };
    console.log(this.props)
    const serverOptions = (
      <div className="server-options-modal">
        <div className="server-options">
          <h1 className="server-options-header">{this.props.server.name}</h1>
          <button onClick={this.toggleHide} className="server-options-dropdown-cancel">x</button>

          <button className="delete-server-button" onClick={this.handleDelete}>
            Delete Server
          </button>

          <button className="edit-server-button" onClick={this.toggleEdit}>
            Edit Server
          </button>

        </div>
      </div>
    )


    return (
      <div className="server">
        <div className="server-show-container">
          <div className="server-header">
            <h1 className="server-main-name">{this.props.server.name} </h1>
            {!this.state.hide || <button onClick={this.toggleHide} className="server-options-dropdown-button">v</button> }
          </div>
          <footer className="channel-header">
            <h1 className="channel-title">Text Channels</h1>
            <button className="channel-create-button" onClick={this.toggleCreate}>+</button>
          </footer>

          <ChannelIndexContainer serverId={this.props.server.id} updatePending={true} />
          
        </div>
        <ProtectedRoute path={`/home/server/:serverId/channel/:channelId`} component={ChannelShowContainer} />
        
        {this.state.hide || serverOptions}
        {this.state.edit && <EditServerForm toggleEdit={this.toggleEdit} server={this.props.server} />}
        {!this.state.create || 
        <ChannelCreateFormContainer
          serverId={this.props.server.id}
          toggleHide={this.toggleCreate}
        />}
      </div>
    )
  }
}



export default ServerShow;