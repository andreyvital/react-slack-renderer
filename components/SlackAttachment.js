const { Map } = require("immutable");
const SlackComponent = require("../reconciler/SlackComponent");

module.exports = class SlackAttachment extends SlackComponent {
  /**
   * @param  {SlackRoot} root
   * @param  {Object}    props
   */
  constructor(root, props) {
    super();

    this.root = root;
    this.props = props;
    this.attachment = new Map();
  }

  renderProps() {
    const { color, timestamp } = this.props;

    if (color) {
      this.attachment = this.attachment.set("color", color);
    }

    if (timestamp) {
      this.attachment = this.attachment.set("ts", timestamp);
    }
  }

  renderChildren() {
    this.children.forEach(child => {
      if (child instanceof SlackComponent) {
        child.render();
      }
    });
  }

  render() {
    this.renderProps();
    this.renderChildren();

    const attachment = this.attachment;

    this.root.message = this.root.message.update("attachments", attachments =>
      attachments.push(attachment)
    );
  }
};
