const { List } = require("immutable");
const SlackComponent = require("../reconciler/SlackComponent");
const SlackAttachment = require("./SlackAttachment");

module.exports = class SlackAttachments extends SlackComponent {
  /**
   * @param {SlackRoot} root
   */
  constructor(root) {
    super();
    this.root = root;
  }

  render() {
    this.root.message = this.root.message.set("attachments", new List());

    this.children.forEach(child => {
      if (child instanceof SlackAttachment) {
        child.render();
      }
    });

    // let's filter empty attachments
    this.root.message = this.root.message.update("attachments", attachments => {
      return attachments.filter(attachment => attachment.size !== 0);
    });
  }
};
