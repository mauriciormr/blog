<template>
  <div class="searchbar">
    <input
      :placeholder="LABELS_PAGES.searchBarInputPlaceholder"
      class="input-text searchbar__input"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      LABELS: state => state.lang.labels
    }),
    LABELS_PAGES() {
      return _.get(this.LABELS, 'components.searchBar', {})
    }
  }
}
</script>

<style></style>
