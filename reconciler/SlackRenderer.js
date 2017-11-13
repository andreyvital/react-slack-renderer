const Reconciler = require("react-reconciler");
const { createElement, getHostContextNode } = require("../utils/createElement");

const noop = () => {};

const SlackRenderer = Reconciler({
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
    child.parent = parentInstance;
  },

  createInstance: function createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props);
  },

  createTextInstance: function createTextInstance(
    text,
    rootContainerInstance,
    internalInstanceHandle
  ) {
    return text;
  },

  finalizeInitialChildren: function finalizeInitialChildren(element, type, props) {
    return false;
  },

  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit: noop,

  prepareUpdate: function prepareUpdate(element, type, oldProps, newProps) {
    return true;
  },

  resetAfterCommit: noop,
  resetTextContent: noop,

  getRootHostContext: function getRootHostContext(rootInstance) {
    return getHostContextNode(rootInstance);
  },

  getChildHostContext: function getChildHostContext() {
    return {};
  },

  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return false;
  },

  now: noop,

  useSyncScheduling: true,

  mutation: {
    appendChild: function appendChild(parentInstance, child) {
      parentInstance.appendChild(child);
      child.parent = parentInstance;
    },

    appendChildToContainer: function appendChildToContainer(parentInstance, child) {
      parentInstance.appendChild(child);
      child.parent = parentInstance;
    },

    removeChild: noop,
    removeChildFromContainer: noop,
    insertBefore: noop,
    commitUpdate: noop,
    commitMount: noop,
    commitTextUpdate: noop
  }
});

module.exports = {
  /**
   * @param  {ReactElement} element
   * @return {Object}
   */
  render: function render(element) {
    const container = createElement("ROOT");

    const node = SlackRenderer.createContainer(container);
    SlackRenderer.updateContainer(element, node, null);

    return container.render();
  }
};
