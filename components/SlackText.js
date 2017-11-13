const SlackComponent = require("../reconciler/SlackComponent");
const SlackAttachment = require("./SlackAttachment");
const SlackMessage = require("./SlackMessage");

module.exports = class SlackText extends SlackComponent {
  /**
   * @param {SlackRoot} root
   */
  constructor(root) {
    super();
    this.root = root;
  }

  render() {
    const parent = this.parent;

    this.children.forEach(child => {
      if (typeof child === "string") {
        if (parent instanceof SlackMessage) {
          this.root.message = this.root.message.set("text", child);
        } else if (parent instanceof SlackAttachment) {
          parent.attachment = parent.attachment.set("text", child);
        }
      }

      if (child instanceof SlackComponent) {
        child.render();
      }
    });
  }
};
