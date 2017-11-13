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

module.exports = class SlackAnnouncement extends SlackComponent {
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
      this.parent instanceof SlackText,
      "SlackAnnouncement (such as <SlackEveryone />, <SlackHere /> or <SlackChannel />) can be " +
        "only used within a <SlackText />"
    );

    const { mention } = this.props;

    invariant(
      ANNOUNCEMENTS.includes(mention),
      "Unexpected mention/announcement: %s. Valid ones are: %s",
      mention,
      ANNOUNCEMENTS.join(", ")
    );

    return mention.trim();
  }
};
