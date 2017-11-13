const { Map } = require("immutable");
const SlackComponent = require("../reconciler/SlackComponent");

module.exports = class SlackAttachment extends SlackComponent {
  constructor(root, props) {
    super();

    this.root = root;
    this.props = props;
    this.attachment = new Map();
  }

  render() {
    const { color } = this.props;

    if (color) {
      this.attachment = this.attachment.set("color", color);
    }

    this.children.forEach(child => {
      if (typeof child === "object") {
        child.render();
      }
    });

    const attachment = this.attachment;

    this.parent.root.message = this.parent.root.message.update(
      "attachments",
      previousAttachments => {
        return previousAttachments.push(attachment);
      }
    );
  }
};
