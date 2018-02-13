import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import MyMenu from '../Partial/MyMenu'
import Loading from '../Partial/Loading'
import Nomore from '../Partial/Nomore'

// 窗口高度
const WIN_HEIGHT = window.innerHeight
// 距离底端距离多大时触发
const RANGE = 60

function formatDate (date) {
  var now = new Date(date)
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var day = now.getDate()
  return year + '-' + month + '-' + day
}

class PostItem extends Component {
  render () {
    const data = this.props.data && this.props.data.node ? this.props.data.node : {}
    return (
      <li className="flex-r flex-s-b PostItem">
        <aside className="flexItem flex-c flex-s-b">
          <h4>{data.postTitle}</h4>
          <footer className="flex-r flex-c-b">
            <span className="cate">{data.cate.cateTitle}</span>
            <span className="date">{formatDate(data.createTime)}</span>
          </footer>
        </aside>
        <img src={'http://127.0.0.1:8888/media/' + data.featuredimg} alt={data.postTitle} />
      </li>
    )
  }
}

class Article extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log('nextProps:', nextProps)
    this.setState({
      isLoading: false
    })
  }
  componentDidMount () {
    console.log('props:', this.props)
    const listEl = document.querySelector('#list')
    listEl.addEventListener('scroll', () => {
      if (listEl && (WIN_HEIGHT + listEl.scrollTop > listEl.scrollHeight - RANGE) && !this.state.isLoading && this.props.posts.pageInfo.hasNextPage) {
        console.log('load')
        this.setState({
          isLoading: true
        }, () => {
          this.props.loadMorePosts()
        })
      }
    })
  }
  render() {
    const posts = this.props.posts && this.props.posts.edges ? this.props.posts.edges : []
    return (
      <div className="main Home">
        <MyMenu />
        <div className="content" id="list">
          {posts && posts.length ? 
            <ul>
              {posts.map((item, index) => {
                return (
                  <PostItem key={index} data={item} />
                )
              })}
            </ul>
          : ''}
          {this.state.isLoading && <Loading />}
          {this.props.posts && !this.props.posts.pageInfo.hasNextPage && <Nomore />}
        </div>
      </div>
    );
  }
}

const PAGESIZE = 10
const POSTS_QUERY = gql`
  query ($pagesize: Int, $cursor: String) {
    posts(first: $pagesize, after: $cursor) {
      edges {
        node {
          id,postTitle,postDescription,createTime,featuredimg
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
    variables: {
      pagesize: PAGESIZE
    }
  },
  props({ postsQuery: { loading, posts, fetchMore }}) {
    return {
      loading,
      posts,
      loadMorePosts: () => {
        return fetchMore({
          query: POSTS_QUERY,
          variables: {
            pagesize: PAGESIZE,
            cursor: posts.pageInfo.endCursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.posts.edges
            const pageInfo = fetchMoreResult.posts.pageInfo

            return newEdges.length ? {
              posts: {
                __typename: previousResult.posts.__typename,
                edges: [...previousResult.posts.edges, ...newEdges],
                pageInfo,
              }
            } : previousResult
          }
        })
      }
    }
  }
})(Article)
