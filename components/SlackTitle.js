const invariant = require("invariant");
const { List, Map } = require("immutable");

const SlackComponent = require("../reconciler/SlackComponent");
const SlackAttachment = require("./SlackAttachment");

class SlackTitle extends SlackComponent {
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
      "<SlackTitle /> can be only rendered within <SlackAttachment />"
    );

    this.parent.attachment = this.parent.attachment.set("title", this.props.children);

    if (this.props.link) {
      this.parent.attachment = this.parent.attachment.set("title_link", this.props.link);
    }
  }
}

module.exports = SlackTitle;
