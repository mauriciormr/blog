const POSTS_DATA = {
  coverList: '/img/meta/post_banner_default.jpg',
  coverCEO: '/img/meta/post_banner_default.jpg',
  coverBlog: ''
}

/* Labels to identify a post
 *
 * Labels to:
 * - post: Label name to identify a post issue
 * - hidden: Label name to hide a publication
 * - public: Label name to show a publication
 */
const POSTS_LABELS_CONFIG = {
  post: 'post',
  hidden: 'hidden',
  public: 'public'
}

const OMITTED_LABELS = {
  public: [
    POSTS_LABELS_CONFIG.hidden,
    POSTS_LABELS_CONFIG.public,
    POSTS_LABELS_CONFIG.post
  ],
  admin: []
}

const PAGINATION = {
  optionsElementsPerPage: [
    {
      number: 10,
      selected: true
    },
    {
      number: 20,
      selected: false
    },
    {
      number: 30,
      selected: false
    },
    {
      number: 40,
      selected: false
    },
    {
      number: 50,
      selected: false
    }
  ],
  maxItemsPaginationBar: 3
}

export { POSTS_DATA, OMITTED_LABELS, POSTS_LABELS_CONFIG, PAGINATION }
