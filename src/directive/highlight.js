import Hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
const Highlight = {
  acceptStatement: true,
  bind: function (el, binding) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      Hljs.highlightBlock(block)
    })
  }
}
export default Highlight
