<template>
  <div>
    <Loading v-if="isDataPending && typeAction === 'edit'" class="loading" />
    <ResourceNotFound
      v-else-if="!post && typeAction === 'edit'"
      :error="{ statusCode }"
    />
    <div v-else>
      <div class="actions">
        <button @click="openCloseCovers()">
          Covers
        </button>
        <button @click="publish('hidden')">
          Draft
        </button>
        <button @click="publish('public')">
          Publish
        </button>
      </div>
      <div v-if="isOpenCovers" class="media-covers">
        <button @click="openCloseModalPreview">
          Covers preview
        </button>
        <div>
          <label>Blog</label>
          <input
            v-model="coverBlog"
            type="text"
            placeholder="URL cover principal"
          />
        </div>
        <div>
          <label>Redes sociales</label>
          <input v-model="coverCEO" type="text" placeholder="URL cover CEO" />
        </div>
      </div>
      <Toolbar
        :dom="getRefTextArea"
        @updateContentFromToolbar="updateContentFromToolbar"
      />
      <div class="editor-preview">
        <div class="editor">
          <input
            :value="titleText"
            @input="updateTitle"
            class="editor__title"
            type="text"
          />
          <input
            :value="descriptionText"
            @input="updateDescription"
            class="editor__description"
            type="text"
          />
          <textarea
            ref="textarea"
            :value="blogText"
            @input="updateContent"
            class="editor__content"
          />
        </div>
        <PostPublicPreview :post="customObjectPost" class="preview" />
      </div>
    </div>
    <ModalCoversPreview
      v-if="isOpenModalPreview"
      :coverCEO="coverCEO"
      @closeModal="openCloseModalPreview"
      class="modal"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

import { mapActions, mapState } from 'vuex'
import Toolbar from '~/components/toolbar/Toolbar.vue'
import { errorHandler } from '~/utils/validate-errors'
import ResourceNotFound from '~/components/ResourceNotFound.vue'
import ModalCoversPreview from '~/components/post/ModalCoversPreview.vue'
import Loading from '~/components/Loading.vue'
import PostPublicPreview from '~/components/post/PostPublicPreview.vue'

export default {
  components: {
    Toolbar,
    ResourceNotFound,
    ModalCoversPreview,
    Loading,
    PostPublicPreview
  },
  props: {
    typeAction: {
      type: String,
      required: false,
      default: 'add'
    },
    postNumber: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      titlePage: '',
      statusCode: 404,
      titleText: 'Title post',
      descriptionText: 'Description post',
      blogText: '# Content post',
      isOpenCovers: false,
      coverBlog: '',
      coverCEO: '',
      isOpenModalPreview: false
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.privateList,
      isDataPending: state => state.posts.status.get.isPrivatePending
    }),
    post() {
      return _.find(this.posts, { number: +this.postNumber })
    },
    compiledTitleMarkdown() {
      return this.$markdownit.renderInline(this.titleText)
    },
    compiledDescriptionMarkdown() {
      return this.$markdownit.renderInline(this.descriptionText)
    },
    compiledContentMarkdown() {
      return this.$markdownit.render(this.blogText)
    },
    customObjectPost() {
      let post = {
        reactions: [],
        titleHTML: this.compiledTitleMarkdown,
        descriptionHTML: this.compiledDescriptionMarkdown,
        contentHTML: this.compiledContentMarkdown,
        cover: this.coverBlog,
        formatDate: moment().format('MMM DD'),
        formatYear: moment().format('YYYY'),
        formatLabels: []
      }

      if (this.typeAction === 'edit') {
        post = {
          ...post,
          formatDate: moment(this.post.created_at).format('MMM DD'),
          formatYear: moment(this.post.created_at).format('YYYY'),
          formatLabels: this.post.labels
        }
      }
      return post
    }
  },
  mounted() {
    if (this.typeAction === 'edit') {
      this.getPostsList({ type: 'private' }).then(() => {
        if (this.post) {
          this.coverBlog = _.get(
            this.post.post,
            'coverBlog',
            this.coverBlog
          ).trim()

          this.coverCEO = _.get(
            this.post.post,
            'coverCEO',
            this.coverCEO
          ).trim()

          this.titleText = _.get(this.post.post, 'title', this.titleText)

          this.descriptionText = _.get(
            this.post.post,
            'description',
            this.decriptionText
          )

          this.blogText = _.get(this.post.post, 'content', this.blogText)
        }

        this.titlePage = this.post
          ? this.post.post.title
          : errorHandler(new Error(this.statusCode)).message
      })
    } else {
      this.titlePage = 'Add publication'
    }
  },
  methods: {
    // Markdown Editor Example
    // https://vuejs.org/v2/examples/index.html
    updateContent: _.debounce(function(e) {
      this.blogText = e.target.value
    }, 300),
    updateTitle: _.debounce(function(e) {
      this.titleText = e.target.value
    }, 300),
    updateDescription: _.debounce(function(e) {
      this.descriptionText = e.target.value
    }, 300),
    openCloseCovers() {
      this.isOpenCovers = !this.isOpenCovers
    },
    openCloseModalPreview() {
      this.isOpenModalPreview = !this.isOpenModalPreview
    },
    ...mapActions({
      updatePost: 'posts/patchUpdatePost',
      addPost: 'posts/postAddPost',
      getPostsList: 'posts/getPostsList'
    }),
    getRefTextArea() {
      return this.$refs.textarea
    },
    updateContentFromToolbar(content) {
      this.blogText = content
    },
    publish(type = 'public') {
      let dataPost = {
        type,
        data: {
          title: this.titleText,
          description: this.descriptionText,
          body: this.blogText,
          coverBlog: !this.coverBlog ? ' ' : this.coverBlog,
          coverCEO: !this.coverCEO ? ' ' : this.coverCEO
        }
      }

      if (this.typeAction === 'edit') {
        dataPost = {
          ...dataPost,
          data: {
            ...dataPost.data,
            postNumber: this.postNumber
          }
        }
        this.updatePost(dataPost).then(() =>
          this.$router.push('/posts/dashboard')
        )
      } else {
        this.addPost(dataPost).then(() => this.$router.push('/posts/dashboard'))
      }
    }
  },
  head() {
    return {
      title: this.typeAction !== 'edit' ? 'Add publication' : this.titlePage
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  @apply pt-8;
}
.modal {
  @apply absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.actions {
  margin: 20px 10px;
}

.editor-preview {
  height: 100vh;
  display: flex;
  width: 100%;
}

.editor,
.preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 2;
  overflow: auto;
  width: 100%;
}

.editor__title,
.preview__title,
.editor__description,
.preview__description {
  margin-bottom: 20px;
}

.editor__content {
  flex: 1;
  border: none;
  border-right: 1px solid #ccc;
  background-color: #f6f6f6;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}
</style>
