const SlackComponent = require("../reconciler/SlackComponent");

module.exports = class SlackMessage extends SlackComponent {
  constructor(root, props) {
    super();

    this.root = root;
    this.props = props;
  }

  render() {
    this.children.forEach(child => {
      if (child instanceof SlackComponent) {
        child.render();
      }
    });
  }
};
