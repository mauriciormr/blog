<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="general">
      <h2 class="general__title">
        Categories
      </h2>
      <div class="general__tags-list">
        <span
          v-for="label in adminLabels"
          @click="updateQuery(label.name)"
          :style="
            existLabel(tagsToFilter, label.name)
              ? `backgroundColor: #${label.color}`
              : ''
          "
          class="general__tags-list__tag"
        >
          #{{ label.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

import Loading from '~/components/Loading.vue'

export default {
  components: { Loading },
  props: {
    tagsToFilter: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      adminLabels: state => state.posts.adminLabels,
      isDataPending: state => state.posts.status.get.isLabelPending
    })
  },
  methods: {
    updateQuery(labelName) {
      let tagsCopy = [...this.tagsToFilter]
      const isLabelAdded = this.existLabel(tagsCopy, labelName)
      if (isLabelAdded) {
        _.remove(tagsCopy, t => t === labelName)
        tagsCopy = [...tagsCopy]
      } else {
        tagsCopy = [...tagsCopy, labelName]
      }
      this.$router.push(`?tags=${tagsCopy.join()}`)
    },
    existLabel(tagsNames = [], tagNameToSearch = '') {
      return _.includes(tagsNames, tagNameToSearch)
    }
  }
}
</script>

<style lang="scss" scoped>
.blog__sidebar {
  @apply bg-secondary;
}

.general {
  &__title {
    @apply font-raleway text-baseSize font-semibold;
    @apply border-b border-divContainer mb-4;
  }

  &__tags-list {
    @apply mt-0 mb-4;
    @apply font-poppins text-secondary;
    @apply flex flex-wrap;

    &__tag {
      @apply text-center text-xs;
      @apply mr-1 mt-1 p-1;
      @apply rounded bg-base;
      @apply cursor-pointer;
      @apply flex justify-center items-center;

      &:hover {
        @apply bg-primarySelected;
      }
    }
  }
}
</style>
