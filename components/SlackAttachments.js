const { List } = require("immutable");
const invariant = require("invariant");

const SlackComponent = require("../reconciler/SlackComponent");
const SlackAttachment = require("./SlackAttachment");
const SlackMessage = require("./SlackMessage");

module.exports = class SlackAttachments extends SlackComponent {
  /**
   * @param {SlackRoot} root
   */
  constructor(root, props) {
    super();

    this.root = root;
    this.props = props;
  }

  render() {
    invariant(
      this.parent instanceof SlackMessage,
      "<SlackAttachments /> can only appear as a child of <SlackMessage />"
    );

    this.root.message = this.root.message.update(
      "attachments",
      previousAttachments => previousAttachments || new List()
    );

    this.children.forEach(child => {
      if (child instanceof SlackAttachment) {
        child.render();
      }
    });

    this.root.message = this.root.message.update("attachments", attachments => {
      return attachments.filter(attachment => attachment.size !== 0);
    });
  }
};
