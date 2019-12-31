import markdownIt from 'markdown-it';
import hljs from 'highlight.js';

export const markdown = markdownIt({
  html: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return (
        '<pre class="hljs"><code>' +
        '<span class="markdown-lang">' +
        lang +
        '</span>' +
        hljs.highlight(lang, str, true).value +
        '</code></pre>'
      );
    }
    return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
  },
});

export function render(markdownText) {
  return markdown.render(String(markdownText));
}

export default render;
