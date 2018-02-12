import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import MyMenu from '../Partial/MyMenu'
import Loading from '../Partial/Loading'
import Loadmore from '../Partial/Loadmore'
import Nomore from '../Partial/Nomore'

class PostItem extends Component {
  render () {
    const data = this.props.data && this.props.data.node ? this.props.data.node : {}
    return (
      <li>
        <h4>{data.postTitle}</h4>
      </li>
    )
  }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps (nextProps) {
    console.log('nextProps:', nextProps)
  }
  componentDidMount () {
    console.log('props:', this.props)
  }
  render() {
    const query = this.props.postsQuery
    const posts = query && query.posts && query.posts.edges ? query.posts.edges : []
    return (
      <div className="main Home">
        <MyMenu />
        <div className="content">
          {posts && posts.length ? 
            <ul>
              {posts.map((item, index) => {
                return (
                  <PostItem key={index} data={item} />
                )
              })}
            </ul>
          : ''}
          {query.loading && <Loading />}
        </div>
      </div>
    );
  }
}

const pagesize = 2
const POSTS_QUERY = gql`
  query {
    posts(first: ${pagesize}) {
      edges {
        node {
          id,postTitle,postDescription,createTime
          cate{
            id,cateName,cateTitle
          }
        },
        cursor
      },
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`
export default graphql(POSTS_QUERY, {
  name: 'postsQuery',
  options: {
    fetchPolicy: 'network-only',
  }
})(Home)
