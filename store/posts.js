import _ from 'lodash'
import {
  GET_POSTS_LIST_PENDING,
  GET_POSTS_LIST_FULFILLED,
  GET_POSTS_LIST_REJECTED,
  GET_REACTIONS_POSTS_LIST_PENDING,
  GET_REACTIONS_POSTS_LIST_FULFILLED,
  GET_REACTIONS_POSTS_LIST_REJECTED,
  POST_ADD_REACTION_PENDING,
  POST_ADD_REACTION_FULFILLED,
  POST_ADD_REACTION_REJECTED,
  DELETE_REMOVE_REACTION_PENDING,
  DELETE_REMOVE_REACTION_FULFILLED,
  DELETE_REMOVE_REACTION_REJECTED
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
    },
    post: {
      isPending: false,
      isFulfilled: false,
      isRejected: false
    },
    delete: {
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
  },
  [POST_ADD_REACTION_PENDING](state) {
    state.status.post = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [POST_ADD_REACTION_FULFILLED](state, payload) {
    const { postNumber, indexReaction } = payload
    const statePost = state.list[postNumber]
    const stateReactionPost = statePost.reactions[indexReaction]

    state.list[postNumber].reactions[indexReaction].userLoggedHasReaction = true

    state.list[postNumber].reactions[indexReaction].count += 1

    state.list[postNumber].reactions[indexReaction].users = [
      ...stateReactionPost.users,
      payload.reaction
    ]

    state.status.post = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [POST_ADD_REACTION_REJECTED](state) {
    state.status.post = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  },
  [DELETE_REMOVE_REACTION_PENDING](state) {
    state.status.delete = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [DELETE_REMOVE_REACTION_FULFILLED](state, payload) {
    const { postNumber, indexReaction, idReaction } = payload

    _.remove(
      state.list[postNumber].reactions[indexReaction].users,
      u => u.id === idReaction
    )

    state.list[postNumber].reactions[indexReaction].count -= 1
    // eslint-disable-next-line
    state.list[postNumber].reactions[
      indexReaction
    ].userLoggedHasReaction = false

    state.status.delete = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [DELETE_REMOVE_REACTION_REJECTED](state) {
    state.status.delete = {
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
  postAddReactionPending({ commit }) {
    commit(POST_ADD_REACTION_PENDING)
    return Promise.resolve()
  },
  postAddReactionFulfilled({ commit }, reaction) {
    commit(POST_ADD_REACTION_FULFILLED, reaction)
    return Promise.resolve()
  },
  postAddReactionRejected({ commit }) {
    commit(POST_ADD_REACTION_REJECTED)
    return Promise.resolve()
  },
  deleteRemoveReactionPending({ commit }) {
    commit(DELETE_REMOVE_REACTION_PENDING)
    return Promise.resolve()
  },
  deleteRemoveReactionFulfilled({ commit }, reaction) {
    commit(DELETE_REMOVE_REACTION_FULFILLED, reaction)
    return Promise.resolve()
  },
  deleteRemoveReactionRejected({ commit }) {
    commit(DELETE_REMOVE_REACTION_REJECTED)
    return Promise.resolve()
  },
  async getPostsList({ dispatch, state, $axios }) {
    const { isPending, isFulfilled } = state.status.get
    if (!isPending && !isFulfilled) {
      try {
        await dispatch('getPostsListPending')
        const posts = _.values(await this.$axios.$get('issues'))
        const formattedPosts = posts.map(p => {
          const postJSON = JSON.parse(p.title)
          return {
            ...p,
            post: {
              ...postJSON,
              titleHTML: this.$markdownit.renderInline(postJSON.title),
              descriptionHTML: this.$markdownit.renderInline(
                postJSON.description
              ),
              content: p.body,
              contentHTML: this.$markdownit.render(p.body)
            }
          }
        })
        await dispatch(
          'getPostsListFulfilled',
          _.keyBy(formattedPosts, 'number')
        )
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
          await dispatch(
            'getReactionsPostsListFulfilled',
            _.keyBy(postsWithReactions, 'number')
          )
          return Promise.resolve()
        }
      )
    } catch (error) {
      dispatch('getReactionsPostsListRejected')
    }
  },
  async handleReaction({ dispatch, rootState }, data) {
    try {
      const usernameLogged = _.get(rootState.users.user, 'login', '')
      if (usernameLogged) {
        const { number, reaction } = data
        if (reaction.userLoggedHasReaction) {
          const userLoggedReaction = _.find(
            reaction.users,
            u => u.user.login === usernameLogged
          )

          const userLoggedReactionIndex = _.findIndex(
            reaction.users,
            u => u.user.login === usernameLogged
          )

          await dispatch('deleteRemoveReaction', {
            postNumber: number,
            indexUserReaction: userLoggedReactionIndex,
            idReaction: userLoggedReaction.id,
            reaction: reaction.content
          })
          return Promise.resolve()
        } else {
          await dispatch('postAddReaction', {
            number,
            reaction: reaction.content
          })
          return Promise.resolve()
        }
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async postAddReaction({ dispatch, state }, { number, reaction }) {
    try {
      await dispatch('postAddReactionPending')
      const reactionPost = await this.$axios.$post(
        `issues/${number}/reactions`,
        {
          content: reaction
        },
        {
          headers: {
            Accept: 'application/vnd.github.squirrel-girl-preview'
          }
        }
      )
      const indexReaction = _.findIndex(reactionTypes, rt => rt === reaction)
      const reactionFulfilled = {
        postNumber: number,
        indexReaction,
        reaction: reactionPost
      }
      await dispatch('postAddReactionFulfilled', reactionFulfilled)
      return Promise.resolve()
    } catch (error) {
      dispatch('postAddReactionRejected')
    }
  },
  async deleteRemoveReaction(
    { dispatch },
    { postNumber, indexUserReaction, indexReaction, idReaction, reaction }
  ) {
    try {
      await dispatch('deleteRemoveReactionPending')
      await this.$axios.$delete(
        `https://api.github.com/reactions/${idReaction}`,
        {
          headers: {
            Accept: 'application/vnd.github.squirrel-girl-preview'
          }
        }
      )
      const indexReaction = _.findIndex(reactionTypes, rt => rt === reaction)
      await dispatch('deleteRemoveReactionFulfilled', {
        postNumber,
        idReaction,
        indexReaction
      })
      return Promise.resolve()
    } catch (error) {
      dispatch('deleteRemoveReactionRejected')
    }
  }
}
