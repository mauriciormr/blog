import _ from 'lodash'
import {
  GET_POSTS_LIST_PENDING,
  GET_POSTS_LIST_FULFILLED,
  GET_POSTS_LIST_REJECTED,
  GET_REACTIONS_POSTS_LIST_PENDING,
  GET_REACTIONS_POSTS_LIST_FULFILLED,
  GET_REACTIONS_POSTS_LIST_REJECTED
} from '../data/mutation-types'
import reactionTypes from '../data/reaction-types'

// https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f
// 4. Resseting module state
const initialState = () => ({
  list: [],
  status: {
    get: {
      isPending: false,
      isFulfilled: false,
      isRejected: false
    }
  }
})

export const state = () => initialState()

export const mutations = {
  [GET_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPending: true,
      isFulfilled: false
    }
  },
  [GET_POSTS_LIST_FULFILLED](state, payload) {
    state.list = payload
    state.status = {
      get: {
        isPending: false,
        isFulfilled: true,
        isRejected: false
      }
    }
  },
  [GET_POSTS_LIST_REJECTED](state) {
    state.status.get = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  },
  [GET_REACTIONS_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPending: true,
      isFulfilled: false
    }
  },
  [GET_REACTIONS_POSTS_LIST_FULFILLED](state, payload) {
    state.list = payload
    state.status = {
      get: {
        isPending: false,
        isFulfilled: true,
        isRejected: false
      }
    }
  },
  [GET_REACTIONS_POSTS_LIST_REJECTED](state) {
    state.status.get = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  }
}

export const actions = {
  getPostsListPending({ commit }) {
    commit(GET_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getPostsListFulfilled({ commit }, posts) {
    commit(GET_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getPostsListRejected({ commit }) {
    commit(GET_POSTS_LIST_REJECTED)
    return Promise.resolve()
  },
  getReactionsPostsListPending({ commit }) {
    commit(GET_REACTIONS_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getReactionsPostsListFulfilled({ commit }, posts) {
    commit(GET_REACTIONS_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getReactionsPostsListRejected({ commit }) {
    commit(GET_REACTIONS_POSTS_LIST_REJECTED)
    return Promise.resolve()
  },
  async getPostsList({ dispatch, state, $axios }) {
    const { isPending, isFulfilled } = state.status.get
    if (!isPending && !isFulfilled) {
      try {
        await dispatch('getPostsListPending')
        const posts = _.values(await this.$axios.$get('issues'))
        const formattedPosts = posts.map(p => ({
          ...p,
          post: {
            ...JSON.parse(p.title),
            content: p.body
          }
        }))
        await dispatch('getPostsListFulfilled', formattedPosts)
        await dispatch('getReactionsPostsList')
        return Promise.resolve()
      } catch (error) {
        dispatch('getPostsListRejected')
      }
    }
  },
  async getReactionsPostsList({ dispatch, state, $axios, rootState }) {
    const { list: postsList } = state
    const usernameLogged = _.get(rootState.users.user, 'login', '')

    try {
      await dispatch('getReactionsPostsListPending')
      const postsWithReactionsPromises = _.map(postsList, async post => {
        const reactions = _.values(
          await this.$axios.$get(`issues/${post.number}/reactions`, {
            headers: { Accept: 'application/vnd.github.squirrel-girl-preview' }
          })
        )

        const reactionsGrouped = _.groupBy(reactions, 'content')
        const reactionsOrdered = _.map(reactionTypes, rt => {
          const reaction = _.isUndefined(reactionsGrouped[rt])
            ? null
            : reactionsGrouped[rt]
          return {
            content: rt,
            count: !reaction ? 0 : reaction.length,
            users: !reaction ? [] : reaction,
            userLoggedHasReaction: !reaction
              ? false
              : _.find(reaction, r => r.user.login === usernameLogged)
          }
        })
        return {
          ...post,
          reactions: reactionsOrdered
        }
      })
      await Promise.all(postsWithReactionsPromises).then(
        async postsWithReactions => {
          await dispatch('getReactionsPostsListFulfilled', postsWithReactions)
          return Promise.resolve()
        }
      )
    } catch (error) {
      dispatch('getReactionsPostsListRejected')
    }
  }
}
