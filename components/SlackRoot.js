const SlackComponent = require("../reconciler/SlackComponent");
const { Map } = require("immutable");

class SlackRoot extends SlackComponent {
  constructor() {
    super();
    this.message = new Map();
  }

  render() {
    this.children.forEach(child => {
      child.render();
    });

    return this.message.toJS();
  }
}

module.exports = SlackRoot;
