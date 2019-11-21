import React from 'react';
import { Link } from 'react-router-dom';

class FriendsAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {freinds: false};
    this.removeFriend = this.removeFriend.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    if (this.state.friends === null) {
      this.props.fetchFriendships();
      this.props.fetchUsers();
      if (this.props.friendships) {
        this.setState({ friends: true });
      }
    }
  }

  removeFriend(id) {
    this.props.deleteFriendship(id);
    this.setState({friends: false});
  }

  render() {
    let friendsList;
    let friend;
    if (this.props.friendships) {
      friendsList = Object.values(this.props.friendships).map((friendship) => {
        if (friendship.accepted === true) {
          if (friendship.initiator === this.props.currentUser.id) {
            friend = Object.assign({}, friendship, { otherUser: this.props.users[friendship.recipient] });
          } else {
            friend = Object.assign({}, friendship, { otherUser: this.props.users[friendship.initiator] });
          };
          return (
          <div key={friend.id} className="friends-list-item">
              <h1 className="friends-list-name">{friend.otherUser.username}</h1>
              <button className="remove-friend-button" onClick={() => this.removeFriend(friend.id)}>Remove Friend</button>
          </div>)
        } else {
          return;
        }
      });

    };
    
    return (
      <div className="friends-all-container">
        <header className="friends-all-header">
          <img className="friends-all-image" src="images/all-friends.png"/>
          <h1  className="friends-all-title">Friends</h1>
        </header>

        <ul className="friends-list">
          { friendsList }
        </ul>
      </div>
    )
  }
}

export default FriendsAll