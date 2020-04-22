const ALL = 2

export default {
  data() {
    return {
      onlyContent: true,
      selectType: ALL
    }
  },
  computed: {
    computedRatings() {
      const ret = []
      this.ratings.forEach((rating) => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (this.selectType === ALL || rating.rateType === this.selectType) {
          ret.push(rating)
        }
      })
      return ret
    }
  },
  methods: {
    onSelect (type) {
      this.selectType = type
    },
    onToggle () {
      this.onlyContent = !this.onlyContent
    }
  }
}
