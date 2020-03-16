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
          @click="addLabelToTheFilter(label.name)"
          :style="
            existLabel(localTagsToFilter, label.name)
              ? `backgroundColor: #${label.color}`
              : ''
          "
          class="general__tags-list__tag"
        >
          #{{ label.name }}
        </span>
      </div>
      <div class="general__tags-list__filter">
        <button
          v-if="localTagsToFilter.length > 0"
          @click="updateQuery"
          class="button-primary general__tags-list__filter__button"
        >
          Filter
        </button>
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
  data() {
    return {
      localTagsToFilter: this.tagsToFilter
    }
  },
  computed: {
    ...mapState({
      adminLabels: state => state.posts.adminLabels,
      isDataPending: state => state.posts.status.get.isLabelPending
    })
  },
  methods: {
    addLabelToTheFilter(labelName) {
      const tagsCopy = [...this.localTagsToFilter]
      const isLabelAdded = this.existLabel(tagsCopy, labelName)
      if (isLabelAdded) {
        _.remove(tagsCopy, t => t === labelName)
        this.localTagsToFilter = [...tagsCopy]
      } else {
        this.localTagsToFilter = [...tagsCopy, labelName]
      }
      if (this.localTagsToFilter.length === 0) {
        this.$router.push(`?tags=`)
      }
    },
    existLabel(tagsNames = [], tagNameToSearch = '') {
      return _.includes(tagsNames, tagNameToSearch)
    },
    updateQuery() {
      this.$router.push(`?tags=${this.localTagsToFilter.join()}`)
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

    &__filter {
      @apply flex justify-end;

      &__button {
        @apply text-secondary;

        &:hover {
          @apply bg-primarySelected;
        }
      }
    }
  }
}
</style>
