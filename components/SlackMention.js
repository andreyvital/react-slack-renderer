const invariant = require("invariant");
const SlackComponent = require("../reconciler/SlackComponent");
const SlackText = require("./SlackText");

module.exports = class SlackMention extends SlackComponent {
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
      this.parent instanceof SlackText,
      "<SlackMention /> can be only used within <SlackText>"
    );

    const { children } = this.props;

    invariant(
      children.startsWith("@") || children.startsWith("#"),
      "A mention should start with @ (for users) or # (for channels). Got: %s",
      children
    );

    return children;
  }
};
