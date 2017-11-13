const SlackComponent = require("../reconciler/SlackComponent");

module.exports = class SlackMessage extends SlackComponent {
  constructor(root, props) {
    super();

    this.root = root;
    this.props = props;
  }

  renderChildNode() {
    this.children.forEach(child => {
      if (typeof child === "object") {
        child.render();
      }
    });
  }

  render() {
    this.renderChildNode();
  }
};
