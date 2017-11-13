const SlackRoot = require("../components/SlackRoot");
const SlackMessage = require("../components/SlackMessage");
const SlackText = require("../components/SlackText");
const SlackChannel = require("../components/SlackChannel");
const SlackUser = require("../components/SlackUser");
const SlackAnnouncement = require("../components/SlackAnnouncement");
const SlackAttachments = require("../components/SlackAttachments");
const SlackAttachment = require("../components/SlackAttachment");

// that's for the root container instance
let rootNodeInstance = null;

exports.getHostContextNode = function getHostContextNode(rootNode) {
  if (typeof rootNode !== undefined) {
    rootNodeInstance = rootNode;
  } else {
    rootNodeInstance = new SlackRoot();
  }

  return rootNodeInstance;
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
      return new SlackMessage(rootNodeInstance, props);
    case "SlackText":
      return new SlackText(rootNodeInstance, props);
    case "SlackChannel":
      return new SlackChannel(rootNodeInstance, props);
    case "SlackUser":
      return new SlackUser(rootNodeInstance, props);
    case "SlackEveryone":
      return factoryAnnouncement("@everyone", props);
    case "SlackHere":
      return factoryAnnouncement("@here", props);
    case "SlackHere":
      return factoryAnnouncement("@here", props);
    case "SlackMentionChannel":
    case "SlackAtChannel":
      return factoryAnnouncement("@channel", props);
    case "SlackAttachments":
      return new SlackAttachments(rootNodeInstance, props);
    case "SlackAttachment":
      return new SlackAttachment(rootNodeInstance, props);
    default:
      // can probably throw here if attempted to use an unknown/invalid element
      return undefined;
  }
};

function factoryAnnouncement(mention, props) {
  return new SlackAnnouncement(rootNodeInstance, {
    ...props,
    mention
  });
}
