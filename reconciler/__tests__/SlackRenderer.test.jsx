const React = require("react");
const { describe, it } = require("mocha");
const assert = require("assert");

const SlackRenderer = require("../SlackRenderer");
const {
  SlackMessage,
  SlackText,
  SlackEveryone,
  SlackHere,
  SlackAtChannel,
  SlackMentionChannel,
  SlackAttachments,
  SlackAttachment
} = require("../../components");

describe("SlackRenderer", () => {
  it("renders an empty message", () => {
    const message = SlackRenderer.render(<SlackMessage />);

    assert.deepEqual(message, {}, "should've rendered an empty message");
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

  it("renders a text with @everyone mention", () => {
    const message = SlackRenderer.render(
      <SlackMessage>
        <SlackText>
          Hey y'all
          <SlackEveryone />
        </SlackText>
      </SlackMessage>
    );

    assert.deepEqual(message, {
      text: "Hey y'all @everyone"
    });
  });

  it("rings on everyoene", () => {
    const message = SlackRenderer.render(
      <SlackMessage>
        <SlackText>
          <SlackEveryone />
          <SlackHere />
          <SlackAtChannel />
          <SlackMentionChannel />
        </SlackText>
      </SlackMessage>
    );

    assert.deepEqual(message, {
      text: "@everyone @here @channel @channel"
    });
  });

  it("can render attachments", () => {
    const message = SlackRenderer.render(
      <SlackMessage>
        <SlackText>
          Heyo
          <SlackEveryone />
        </SlackText>
        <SlackAttachments>
          <SlackAttachment>
            <SlackText>Hello, world!</SlackText>
          </SlackAttachment>
          <SlackAttachment />
          <SlackAttachment>
            <SlackText>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, nostrum.
            </SlackText>
          </SlackAttachment>
          <SlackAttachment>
            <SlackText>Lorem ipsum dolor sit amet.</SlackText>
          </SlackAttachment>
        </SlackAttachments>
      </SlackMessage>
    );

    assert.deepEqual(message, {
      text: "Heyo @everyone",
      attachments: [
        {
          text: "Hello, world!"
        },
        {
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, nostrum."
        },
        {
          text: "Lorem ipsum dolor sit amet."
        }
      ]
    });
  });
});
