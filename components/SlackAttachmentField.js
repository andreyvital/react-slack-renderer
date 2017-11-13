const invariant = require("invariant");
const { List, Map } = require("immutable");

const SlackComponent = require("../reconciler/SlackComponent");
const SlackAttachment = require("./SlackAttachment");

class SlackAttachmentField extends SlackComponent {
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
      "<SlackAttachmentField /> can be only rendered within <SlackAttachment />. Got: %s",
      typeof this.parent
    );

    const { title, short, value, children } = this.props;

    if (children) {
      invariant(
        typeof children === "string",
        "<SlackAttachmentField /> is only accepting string children for now. Got: %s",
        typeof children
      );
    }

    if (value) {
      invariant(
        typeof value === "string",
        "<SlackAttachmentField /> is only accepting string value for now. Got: %s",
        typeof value
      );
    }

    if (!title && !value) {
      return;
    }

    this.parent.attachment = this.parent.attachment.update("fields", (fields = List()) =>
      fields.push(
        Map({
          title: this.props.title,
          short: this.props.short ? true : false,
          value: value || children
        })
      )
    );
  }
}

module.exports = SlackAttachmentField;
