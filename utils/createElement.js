const SlackRoot = require("../components/SlackRoot");
const SlackMessage = require("../components/SlackMessage");
const SlackText = require("../components/SlackText");
const SlackAnnouncement = require("../components/SlackAnnouncement");
const SlackAttachments = require("../components/SlackAttachments");
const SlackAttachment = require("../components/SlackAttachment");
const SlackAttachmentField = require("../components/SlackAttachmentField");
const SlackAuthor = require("../components/SlackAuthor");
const SlackMention = require("../components/SlackMention");
const SlackTitle = require("../components/SlackTitle");

let ROOT = null;

exports.getHostContextNode = function getHostContextNode(rootNode) {
  if (typeof rootNode !== undefined) {
    ROOT = rootNode;
  } else {
    ROOT = new SlackRoot();
  }

  return ROOT;
};

/**
 * @param   {String}  type
 * @param   {Object}  props
 * @returns {?Object}
 */
exports.createElement = function createElement(type, props) {
  switch (type) {
    case "ROOT":
      return new SlackRoot();
    case "SlackMessage":
      return new SlackMessage(ROOT, props);
    case "SlackText":
      return new SlackText(ROOT, props);
    case "SlackEveryone":
      return factorySlackAnnouncement("@everyone", props);
    case "SlackHere":
      return factorySlackAnnouncement("@here", props);
    case "SlackMentionChannel":
    case "SlackAtChannel":
      return factorySlackAnnouncement("@channel", props);
    case "SlackAttachments":
      return new SlackAttachments(ROOT, props);
    case "SlackAttachment":
      return new SlackAttachment(ROOT, props);
    case "SlackAttachmentField":
      return new SlackAttachmentField(ROOT, props);
    case "SlackAuthor":
      return new SlackAuthor(ROOT, props);
    case "SlackMention":
      return new SlackMention(ROOT, props);
    case "SlackTitle":
      return new SlackTitle(ROOT, props);
    default:
      throw new Error(`Unknown Slack element: ${type}`);
  }
};

/**
 * @param  {String} mention
 * @param  {Object} props
 * @return {SlackAnnouncement}
 */
function factorySlackAnnouncement(mention, props) {
  return new SlackAnnouncement(ROOT, {
    ...props,
    mention
  });
}
