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

  addParentAttachment(keyName, value) {
    this.parent.attachment = this.parent.attachment.set(keyName, value);
  }

  render() {
    invariant(
      this.parent instanceof SlackAttachment,
      "<SlackAuthor /> can be only rendered within <SlackAttachment />"
    );

    const { name, link, icon, children } = this.props;

    if (name) {
      this.addParentAttachment("author_name", name);
    } else if (children) {
      this.addParentAttachment("author_name", children);
    }

    if (link) {
      this.addParentAttachment("author_link", link);
    }

    if (icon) {
      this.addParentAttachment("author_icon", icon);
    }
  }
}

module.exports = SlackAuthor;
