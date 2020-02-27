<template>
  <div>
    <Loading v-if="isDataPending && typeAction === 'edit'" class="loading" />
    <ResourceNotFound
      v-else-if="!post && typeAction === 'edit'"
      :error="{ statusCode }"
    />
    <div v-else class="post-editor">
      <div>
        <h2 class="post-editor__title">
          Add publication
        </h2>
      </div>
      <div class="post-editor__actions">
        <button @click="openCloseCovers()" class="button-secondary">
          Covers
        </button>
        <button @click="publish('hidden')" class="button-secondary">
          Draft
        </button>
        <button @click="publish('public')" class="button-primary">
          Publish
        </button>
      </div>
      <div v-if="isOpenCovers" class="post-editor__media-covers">
        <button @click="openCloseModalPreview" class="button-secondary --small">
          Covers preview
        </button>
        <div class="post-editor__media-covers__field">
          <label>Blog</label>
          <input
            v-model="coverBlog"
            type="text"
            placeholder="URL cover principal"
            class="input-text --small"
          />
        </div>
        <div class="post-editor__media-covers__field">
          <label>Redes sociales</label>
          <input
            v-model="coverCEO"
            type="text"
            placeholder="URL cover CEO"
            class="input-text --small"
          />
        </div>
      </div>
      <Toolbar
        :dom="getRefTextArea"
        @updateContentFromToolbar="updateContentFromToolbar"
      />
      <div class="post-editor__container">
        <div class="post-editor__container__editor">
          <div class="post-editor__container__editor__field">
            <label>Title</label>
            <input
              :value="titleText"
              @input="updateTitle"
              class="input-text --small"
              type="text"
            />
          </div>
          <div class="post-editor__container__editor__field">
            <label>Description</label>
            <input
              :value="descriptionText"
              @input="updateDescription"
              class="input-text --small"
              type="text"
            />
          </div>
          <textarea
            ref="textarea"
            :value="blogText"
            @input="updateContent"
            class="post-editor__container__editor__text"
          />
        </div>
        <PostPublicPreview
          :post="customObjectPost"
          class="post-editor__container__preview"
        />
      </div>
    </div>
    <ModalCoversPreview
      v-if="isOpenModalPreview"
      :coverCEO="coverCEO"
      :title="titleText"
      :description="descriptionText"
      @closeModal="openCloseModalPreview"
      class="modal"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

import { mapActions, mapState } from 'vuex'
import { errorHandler } from '~/utils/validate-errors'
import { fnFilterPostLabels } from '~/utils/utils'
import { OMITTED_LABELS } from '~/data/default-data'

import Toolbar from '~/components/toolbar/Toolbar.vue'
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
          formatLabels: fnFilterPostLabels(OMITTED_LABELS, this.post.labels)
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

.post-editor {
  @apply p-4;

  &__title {
    @apply mt-0;
  }

  .toolbar {
    @apply justify-center;
    @apply mt-6 mb-2;
  }

  &__actions {
    @apply flex justify-end;
    @apply my-6;

    button {
      @apply ml-2;
    }
  }

  &__media-covers {
    @apply my-6;
    @apply flex flex-col items-end;

    &__field {
      @apply w-full;
      @apply mb-2;

      label {
        @apply font-poppins text-secondary;
      }

      input.input-text {
        @apply text-primary;
      }
    }
  }

  &__container {
    @apply flex flex-col;

    &__editor {
      label {
        @apply font-poppins text-secondary;
      }

      input.input-text {
        @apply text-primary;
      }

      &__field {
        @apply mb-4;
      }

      &__text {
        @apply border bg-base border-divContainer w-full;
        @apply p-2;
        @apply font-poppins text-sm;
        height: 90vh;
      }
    }

    &__preview {
      @apply rounded border border-divContainer;
    }
  }
}

@screen tablet {
  .post-editor {
    .toolbar {
      @apply justify-end;
    }
  }
}

@screen laptop {
  .post-editor {
    .toolbar {
      @apply w-1/2;
    }

    &__actions {
      @apply w-1/2;
    }

    &__media-covers {
      @apply w-1/2;
    }

    &__container {
      @apply flex-row;

      &__editor {
        @apply w-1/2;
        @apply mr-2;
      }

      &__preview {
        @apply w-1/2;
      }
    }
  }
}

@screen desktop {
  .post-editor {
    .toolbar {
      @apply flex-no-wrap;
    }
  }
}

.modal {
  @apply absolute;
  left: 50%;
  top: 15%;
  transform: translate(-50%, 0%);
}
</style>
