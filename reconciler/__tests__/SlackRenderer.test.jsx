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
  SlackAttachment,
  SlackAttachmentField,
  SlackAuthor
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

  describe("attachments", () => {
    it("filters empty attachments", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackAttachments>
            <SlackAttachment />
            <SlackAttachment />
            <SlackAttachment />
            <SlackAttachment>
              <SlackText>Lorem ipsum dolor sit amet.</SlackText>
            </SlackAttachment>
            <SlackAttachment />
            <SlackAttachment />
          </SlackAttachments>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        attachments: [
          {
            text: "Lorem ipsum dolor sit amet."
          }
        ]
      });
    });

    it("can render 'em", () => {
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
            <SlackAttachment>
              <SlackText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, nostrum.
              </SlackText>
            </SlackAttachment>
            <SlackAttachment color="#36a64f">
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
            text: "Lorem ipsum dolor sit amet.",
            color: "#36a64f"
          }
        ]
      });
    });

    it("renders attachment fields", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackAttachments>
            <SlackAttachment>
              <SlackAttachmentField title="Priority" short={false}>
                High
              </SlackAttachmentField>
              <SlackAttachmentField title="Priority" short={false} value="High" />
              <SlackAttachmentField title="Priority" short value="Low" />
            </SlackAttachment>
          </SlackAttachments>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        attachments: [
          {
            fields: [
              {
                title: "Priority",
                value: "High",
                short: false
              },
              {
                title: "Priority",
                value: "High",
                short: false
              },
              {
                title: "Priority",
                value: "Low",
                short: true
              }
            ]
          }
        ]
      });
    });

    it("doesn't render empty fields", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackAttachments>
            <SlackAttachment>
              <SlackAttachmentField />
            </SlackAttachment>
          </SlackAttachments>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        attachments: []
      });
    });

    it("renders attachment author", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackAttachments>
            <SlackAttachment>
              <SlackAuthor>CentaurWarchief</SlackAuthor>
            </SlackAttachment>
          </SlackAttachments>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        attachments: [
          {
            author_name: "CentaurWarchief"
          }
        ]
      });
    });
  });
});
