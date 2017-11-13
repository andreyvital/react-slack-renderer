const invariant = require("invariant");
const SlackComponent = require("../reconciler/SlackComponent");
const SlackAttachment = require("./SlackAttachment");

class SlackAuthor extends SlackComponent {
  /**
   * @param {SlackRoot} root
   * @param {Object}    props
   */
  constructor(root, props) {
    super();

    this.root = root;
    this.props = props;
  }

  /**
   * @param {String} fieldKey
   * @param {String} fieldValue
   */
  setParentAttachmentField(fieldKey, fieldValue) {
    this.parent.attachment = this.parent.attachment.set(fieldKey, fieldValue);
  }

  render() {
    invariant(
      this.parent instanceof SlackAttachment,
      "<SlackAuthor /> can be only rendered within <SlackAttachment />"
    );

    const { name, link, icon, children } = this.props;

    if (name) {
      this.setParentAttachmentField("author_name", name);
    } else if (children) {
      this.setParentAttachmentField("author_name", children);
    }

    if (link) {
      this.setParentAttachmentField("author_link", link);
    }

    if (icon) {
      this.setParentAttachmentField("author_icon", icon);
    }
  }
}

module.exports = SlackAuthor;
