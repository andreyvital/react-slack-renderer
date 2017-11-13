const SlackComponent = require("../reconciler/SlackComponent");
const { Map } = require("immutable");

module.exports = class SlackAttachment extends SlackComponent {
  constructor() {
    super();

    this.attachment = new Map();
  }

  render() {
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
