module.exports = class SlackComponent {
  constructor() {
    this.children = [];
  }

  /**
   * @param {*} child
   */
  appendChild(child) {
    this.children.push(child);
  }

  /**
   * @param {*} child
   */
  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.slice(index, 1);
  }
};
