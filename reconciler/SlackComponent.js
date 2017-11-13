module.exports = class SlackComponent {
  constructor() {
    this.children = [];
  }

  /**
   * @param {Object} child
   */
  appendChild(child) {
    this.children.push(child);
  }

  /**
   * @param {Object} child
   */
  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.slice(index, 1);
  }
};
