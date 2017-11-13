const invariant = require("invariant");
const SlackComponent = require("../reconciler/SlackComponent");
const SlackText = require("./SlackText");

/**
 * https://get.slack.help/hc/en-us/articles/202009646-Make-an-announcement
 * Those are the valid Slack mention types as per in the link above.
 *
 * @type {[]String}
 */
const ANNOUNCEMENTS = ["@here", "@channel", "@everyone"];

module.exports = class SlackChannel extends SlackComponent {
  /**
   * @param {SlackRoot} root
   * @param {Object}    props
   */
  constructor(root) {
    super();

    this.root = root;
    this.props = props;
  }

  render() {
    invariant(
      this.parent instanceof SlackText,
      "<SlackChannel /> can be only rendered within a <SlackText />"
    );

    this.root.message = this.root.message.update(
      "text",
      text => (text ? `${text} ${this.props.mention}` : this.props.mention)
    );
  }
};
