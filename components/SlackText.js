const { List } = require("immutable");

const SlackComponent = require("../reconciler/SlackComponent");
const SlackAttachment = require("./SlackAttachment");
const SlackMessage = require("./SlackMessage");

module.exports = class SlackText extends SlackComponent {
  /**
   * @param {SlackRoot} root
   */
  constructor(root) {
    super();

    this.root = root;
    this.buffer = new List();
  }

  renderChildrenIntoBuffer() {
    this.children.forEach(child => {
      if (typeof child === "string") {
        this._appendText(child);
      }

      if (child instanceof SlackComponent) {
        this._appendText(child.render());
      }
    });
  }

  /**
   * @param {String} textString
   */
  _appendText(textString) {
    this.buffer = this.buffer.push(textString);
  }

  render() {
    this.renderChildrenIntoBuffer();

    /**
     * @param  {String} previousText
     * @return {String}
     */
    let textUpdater = previousText => {
      const joinedBuffer = this.buffer.join("");

      if (previousText) {
        return `${previousText}\n${joinedBuffer}`;
      }

      return joinedBuffer;
    };

    if (this.parent instanceof SlackAttachment) {
      this.parent.attachment = this.parent.attachment.update("text", textUpdater);
    }

    if (this.parent instanceof SlackMessage) {
      this.root.message = this.root.message.update("text", textUpdater);
    }
  }
};
