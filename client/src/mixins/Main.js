export default {
  methods: {
    /**
     * Date: Set DE date format
     */
    StripAndReverse(val) {
      val = val.replace(/T/, ' ').replace(/\..+/, '').split(' ')[0]
      return val.split('-').reverse().join('-')
    },
    /**
     * Set first letter to capital
     */
    firstLetterUC(val) {
      var length = val.length
      return val.substring(0,1).toUpperCase() + val.substring(1, length)
    },
    /**
     * Delete spaces from string
     */
    replaceSpace(val) {
      return val.replace('%20', ' ')
    }
  },
}