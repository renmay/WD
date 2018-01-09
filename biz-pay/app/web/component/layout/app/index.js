
const content = '<div id="app"><slot></slot></div>';
const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>{{title}}</title>
  <meta name="keywords" :content="keywords">
  <meta name="description" :content="description">
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" href="https://unpkg.com/mint-ui@2.2.13/lib/style.css">
  <link href="https://cdn.bootcss.com/normalize/7.0.0/normalize.min.css" rel="stylesheet">
</head>
<body :class="baseClass">
  ${content}
</body>
</html>`;

export default {
  name: 'empty-layout',
  props: ['title', 'description', 'keywords'],
  components: {

  },
  computed: {
    vTitle() {
      return this.$root.title || this.title || '';
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || '';
    },
    vDescription() {
      return this.$root.description || this.description || '';
    },
    baseClass() {
      return this.$root.baseClass;
    }
  },
  template: typeof window === 'object' ? content : template
};
