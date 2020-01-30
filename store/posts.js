import _ from 'lodash'
import {
  GET_PUBLIC_POSTS_LIST_PENDING,
  GET_PUBLIC_POSTS_LIST_FULFILLED,
  GET_PUBLIC_POSTS_LIST_REJECTED,
  GET_PUBLIC_REACTIONS_POSTS_LIST_PENDING,
  GET_PUBLIC_REACTIONS_POSTS_LIST_FULFILLED,
  GET_PUBLIC_REACTIONS_POSTS_LIST_REJECTED,
  GET_PRIVATE_POSTS_LIST_PENDING,
  GET_PRIVATE_POSTS_LIST_FULFILLED,
  GET_PRIVATE_POSTS_LIST_REJECTED,
  GET_PRIVATE_REACTIONS_POSTS_LIST_PENDING,
  GET_PRIVATE_REACTIONS_POSTS_LIST_FULFILLED,
  GET_PRIVATE_REACTIONS_POSTS_LIST_REJECTED,
  POST_ADD_REACTION_PENDING,
  POST_ADD_REACTION_FULFILLED,
  POST_ADD_REACTION_REJECTED,
  DELETE_REMOVE_REACTION_PENDING,
  DELETE_REMOVE_REACTION_FULFILLED,
  DELETE_REMOVE_REACTION_REJECTED,
  POST_ADD_POST_PENDING,
  POST_ADD_POST_FULFILLED,
  POST_ADD_POST_REJECTED,
  PATCH_UPDATE_POST_PENDING,
  PATCH_UPDATE_POST_FULFILLED,
  PATCH_UPDATE_POST_REJECTED
} from '../data/mutation-types'
import reactionTypes from '../data/reaction-types'

// https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f
// 4. Resseting module state
const initialState = () => ({
  publicList: [],
  privateList: [],
  status: {
    get: {
      isPublicPending: false,
      isPublicFulfilled: false,
      isPublicRejected: false,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: false
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
  [GET_PUBLIC_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: true,
      isPublicFulfilled: false
    }
  },
  [GET_PUBLIC_POSTS_LIST_FULFILLED](state, payload) {
    state.publicList = payload
    state.status = {
      get: {
        ...state.status.get,
        isPublicPending: false,
        isPublicFulfilled: true,
        isPublicRejected: false
      }
    }
  },
  [GET_PUBLIC_POSTS_LIST_REJECTED](state) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: false,
      isPublicFulfilled: false,
      isPublicRejected: true
    }
  },
  [GET_PUBLIC_REACTIONS_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: true,
      isPublicFulfilled: false
    }
  },
  [GET_PUBLIC_REACTIONS_POSTS_LIST_FULFILLED](state, payload) {
    state.publicList = payload
    state.status = {
      get: {
        ...state.status.get,
        isPublicPending: false,
        isPublicFulfilled: true,
        isPublicRejected: false
      }
    }
  },
  [GET_PUBLIC_REACTIONS_POSTS_LIST_REJECTED](state) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: false,
      isPublicFulfilled: false,
      isPublicRejected: true
    }
  },
  [GET_PRIVATE_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: true,
      isPrivateFulfilled: false
    }
  },
  [GET_PRIVATE_POSTS_LIST_FULFILLED](state, payload) {
    state.privateList = payload
    state.status = {
      get: {
        ...state.status.get,
        isPrivatePending: false,
        isPrivateFulfilled: true,
        isPrivateRejected: false
      }
    }
  },
  [GET_PRIVATE_POSTS_LIST_REJECTED](state) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: true
    }
  },
  [GET_PRIVATE_REACTIONS_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: true,
      isPrivateFulfilled: false
    }
  },
  [GET_PRIVATE_REACTIONS_POSTS_LIST_FULFILLED](state, payload) {
    state.privateList = payload
    state.status = {
      get: {
        ...state.status.get,
        isPrivatePending: false,
        isPrivateFulfilled: true,
        isPrivateRejected: false
      }
    }
  },
  [GET_PRIVATE_REACTIONS_POSTS_LIST_REJECTED](state) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: true
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
    const statePost = _.find(state.publicList, {
      number: postNumber
    })
    const indexPost = _.findIndex(state.publicList, { number: postNumber })
    const stateReactionPost = statePost.reactions[indexReaction]

    // eslint-disable-next-line
    state.publicList[indexPost].reactions[
      indexReaction
    ].userLoggedHasReaction = true

    state.publicList[indexPost].reactions[indexReaction].count += 1

    state.publicList[indexPost].reactions[indexReaction].users = [
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
    const indexPost = _.findIndex(state.publicList, { number: postNumber })
    _.remove(
      state.publicList[indexPost].reactions[indexReaction].users,
      u => u.id === idReaction
    )

    state.publicList[indexPost].reactions[indexReaction].count -= 1
    // eslint-disable-next-line
    state.publicList[indexPost].reactions[
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
  },
  [POST_ADD_POST_PENDING](state) {
    state.status.post = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [POST_ADD_POST_FULFILLED](state) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: false
    }
    state.status.post = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [POST_ADD_POST_REJECTED](state) {
    state.status.post = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  },
  [PATCH_UPDATE_POST_PENDING](state) {
    state.status.post = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [PATCH_UPDATE_POST_FULFILLED](state) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: false
    }
    state.status.post = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [PATCH_UPDATE_POST_REJECTED](state) {
    state.status.post = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  }
}

export const actions = {
  getPublicPostsListPending({ commit }) {
    commit(GET_PUBLIC_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getPublicPostsListFulfilled({ commit }, posts) {
    commit(GET_PUBLIC_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getPublicPostsListRejected({ commit }) {
    commit(GET_PUBLIC_POSTS_LIST_REJECTED)
    return Promise.resolve()
  },
  getPublicReactionsPostsListPending({ commit }) {
    commit(GET_PUBLIC_REACTIONS_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getPublicReactionsPostsListFulfilled({ commit }, posts) {
    commit(GET_PUBLIC_REACTIONS_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getPublicReactionsPostsListRejected({ commit }) {
    commit(GET_PUBLIC_REACTIONS_POSTS_LIST_REJECTED)
    return Promise.resolve()
  },
  getPrivatePostsListPending({ commit }) {
    commit(GET_PRIVATE_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getPrivatePostsListFulfilled({ commit }, posts) {
    commit(GET_PRIVATE_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getPrivatePostsListRejected({ commit }) {
    commit(GET_PRIVATE_POSTS_LIST_REJECTED)
    return Promise.resolve()
  },
  getPrivateReactionsPostsListPending({ commit }) {
    commit(GET_PRIVATE_REACTIONS_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getPrivateReactionsPostsListFulfilled({ commit }, posts) {
    commit(GET_PRIVATE_REACTIONS_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getPrivateReactionsPostsListRejected({ commit }) {
    commit(GET_PRIVATE_REACTIONS_POSTS_LIST_REJECTED)
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
  postAddPostPending({ commit }) {
    commit(POST_ADD_POST_PENDING)
    return Promise.resolve()
  },
  postAddPostFulfilled({ commit }) {
    commit(POST_ADD_POST_FULFILLED)
    return Promise.resolve()
  },
  postAddPostRejected({ commit }) {
    commit(POST_ADD_POST_REJECTED)
    return Promise.resolve()
  },
  patchUpdatePostPending({ commit }) {
    commit(PATCH_UPDATE_POST_PENDING)
    return Promise.resolve()
  },
  patchUpdatePostFulfilled({ commit }) {
    commit(PATCH_UPDATE_POST_FULFILLED)
    return Promise.resolve()
  },
  patchUpdatePostRejected({ commit }) {
    commit(PATCH_UPDATE_POST_REJECTED)
    return Promise.resolve()
  },
  // Default values in object parameters
  // https://javascript.info/destructuring-assignment
  async getPostsList({ dispatch, state, $axios }, { type = '' } = {}) {
    let flagType = 'Public'
    let {
      isPublicPending: isPending,
      isPublicFulfilled: isFulfilled
    } = state.status.get

    if (type === 'private') {
      const { isPrivatePending, isPrivateFulfilled } = state.status.get
      isPending = isPrivatePending
      isFulfilled = isPrivateFulfilled
      flagType = 'Private'
    }

    if (!isPending && !isFulfilled) {
      try {
        await dispatch(`get${flagType}PostsListPending`)
        let posts = null

        posts = _.values(
          await this.$axios.$get(
            'issues?filter=all&labels=post,public&sort=created&direction=desc'
          )
        )

        if (type === 'private') {
          posts = _.values(await this.$axios.$get('issues?labels=post'))
        }
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
          `get${flagType}PostsListFulfilled`,
          _.orderBy(formattedPosts, ['number'], ['desc'])
        )
        await dispatch('getReactionsPostsList', type)
        return Promise.resolve()
      } catch (error) {
        dispatch(`get${flagType}PostsListRejected`)
        this.$errorGlobalHandler(error)
      }
    }
  },
  async getReactionsPostsList(
    { dispatch, state, $axios, rootState },
    type = 'public'
  ) {
    let { publicList: postsList } = state
    let flagType = 'Public'

    if (type === 'private') {
      const { privateList } = state
      postsList = privateList
      flagType = 'Private'
    }

    const usernameLogged = _.get(rootState.users.user, 'login', '')

    try {
      await dispatch(`get${flagType}ReactionsPostsListPending`)
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
            `get${flagType}ReactionsPostsListFulfilled`,
            _.orderBy(postsWithReactions, ['number'], ['desc'])
          )
          return Promise.resolve()
        }
      )
    } catch (error) {
      dispatch(`get${flagType}ReactionsPostsListRejected`)
      this.$errorGlobalHandler(error)
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
      return Promise.reject(error)
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
      return Promise.reject(error)
    }
  },
  // Default values in object parameters
  // https://javascript.info/destructuring-assignment
  async postAddPost(
    { dispatch, rootState },
    { type = 'public', data = {} } = {}
  ) {
    try {
      await dispatch('postAddPostPending')

      const usernameLogged = _.get(rootState.users.user, 'login', '')
      if (!usernameLogged) {
        throw new Error('401')
      }

      const emptyKey = _.filter(data, k => k === '' || k === null)
      if (emptyKey.length > 0) {
        throw new Error('Empty parameters')
      }

      const titleGitHubIssueFormat = {
        title: data.title,
        description: data.description
      }

      const dataPost = {
        title: JSON.stringify(titleGitHubIssueFormat),
        body: data.body,
        labels: ['post', type]
      }

      await this.$axios.$post('issues', dataPost)

      await dispatch('postAddPostFulfilled')
      return Promise.resolve()
    } catch (error) {
      await dispatch('postAddPostRejected')
      return Promise.reject(error)
    }
  },
  // Default values in object parameters
  // https://javascript.info/destructuring-assignment
  async patchUpdatePost(
    { dispatch, rootState },
    { type = 'public', data = {} } = {}
  ) {
    try {
      await dispatch('patchUpdatePostPending')

      const usernameLogged = _.get(rootState.users.user, 'login', '')
      if (!usernameLogged) {
        throw new Error('401')
      }

      const emptyKey = _.filter(data, k => k === '' || k === null)
      if (emptyKey.length > 0) {
        throw new Error('Empty parameters')
      }

      const titleGitHubIssueFormat = {
        title: data.title,
        description: data.description
      }

      const dataPost = {
        title: JSON.stringify(titleGitHubIssueFormat),
        body: data.body,
        labels: ['post', type]
      }

      const { postNumber } = data
      await this.$axios.$patch(`issues/${postNumber}`, dataPost)

      await dispatch('patchUpdatePostFulfilled')
      return Promise.resolve()
    } catch (error) {
      await dispatch('patchUpdatePostRejected')
      return Promise.reject(error)
    }
  }
}
