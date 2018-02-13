import React, { Component } from 'react';
import MyMenu from '../Partial/MyMenu'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    const user = this.props.user || {}
    return (
      <div className="Profile">
        <MyMenu />
        <div className="content">
          <section className="flex-r flex-s-b Profile_card">
            <aside className="flexItem">
              <h4>{user.username}</h4>
              <p>Email: {user.email}</p>
            </aside>
          </section>
        </div>
      </div>
    );
  }
}

const USER_QUERY = gql`
  query {
    user (id: "VXNlck5vZGU6MQ==") {
      id,username,email
    }
  }
`
export default graphql(USER_QUERY, {
  name: 'userQuery',
  options: {
    fetchPolicy: 'network-only'
  },
  props({ userQuery: { loading, user }}) {
    return {
      loading,
      user
    }
  }
})(Profile)
