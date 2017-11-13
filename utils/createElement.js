const SlackRoot = require("../components/SlackRoot");
const SlackMessage = require("../components/SlackMessage");
const SlackText = require("../components/SlackText");
const SlackChannel = require("../components/SlackChannel");
const SlackUser = require("../components/SlackUser");
const SlackAnnouncement = require("../components/SlackAnnouncement");

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
 * @param  {String}  type
 * @param  {Object}  props
 * @return {?Object}
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
      return new SlackAnnouncement(rootNodeInstance, {
        ...props,
        mention: "@here"
      });
    default:
      // can probably throw here if attempted to use an unknown/invalid element
      return undefined;
  }
};
