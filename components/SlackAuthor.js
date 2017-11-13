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

  render() {
    invariant(
      this.parent instanceof SlackAttachment,
      "<SlackAuthor /> can be only rendered within <SlackAttachment />"
    );

    const { name, link, icon, children } = this.props;

    if (name) {
      this.parent.attachment = this.parent.attachment.set("author_name", name);
    } else if (children) {
      this.parent.attachment = this.parent.attachment.set("author_name", children);
    }

    if (link) {
      this.parent.attachment = this.parent.attachment.set("author_link", link);
    }

    if (icon) {
      this.parent.attachment = this.parent.attachment.set("author_icon", icon);
    }
  }
}

module.exports = SlackAuthor;
