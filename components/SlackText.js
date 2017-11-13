const SlackComponent = require("../reconciler/SlackComponent");

module.exports = class SlackText extends SlackComponent {
  constructor(root) {
    super();
    this.root = root;
  }

  render() {
    this.children.forEach(child => {
      if (typeof child === "string") {
        this.root.message = this.root.message.set("text", child);
      } else if (child instanceof SlackComponent) {
        child.render();
      }
    });
  }
};
