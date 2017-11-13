const React = require("react");
const { describe, it } = require("mocha");
const assert = require("assert");

const SlackRenderer = require("../SlackRenderer");
const { SlackMessage, SlackText } = require("../../components");

describe("SlackRenderer", () => {
  it("renders an empty message", () => {
    const message = SlackRenderer.render(<SlackMessage />);

    assert.ok(typeof message === "object");
    assert.deepEqual(message, {});
  });

  it("renders a text", () => {
    const message = SlackRenderer.render(
      <SlackMessage>
        <SlackText>Hello, world</SlackText>
      </SlackMessage>
    );

    assert.deepEqual(message, {
      text: "Hello, world"
    });
  });
});
