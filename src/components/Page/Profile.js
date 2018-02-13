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
    const profile = this.props.profile || {}
    return (
      <div className="Profile">
        <MyMenu />
        <div className="content">
          <section className="flex-r flex-s-b Profile_card">
            <aside className="flexItem">
              <h4>{profile.nickname}</h4>
              <p>QQ: {profile.qq}</p>
              <p>Birthday: {profile.birthday}</p>
            </aside>
            {profile.avatar && <img src={'http://127.0.0.1:8888/media/' + profile.avatar} alt="" />}
          </section>
        </div>
      </div>
    );
  }
}

const PROFILE_QUERY = gql`
  query {
    profile {
      id,
      nickname,avatar,id,qq,sex,birthday,
      user{
        id,username,email
      }
    }
  }
`
export default graphql(PROFILE_QUERY, {
  name: 'profileQuery',
  options: {
    fetchPolicy: 'network-only'
  },
  props({ profileQuery: { loading, profile }}) {
    return {
      loading,
      profile
    }
  }
})(Profile)
