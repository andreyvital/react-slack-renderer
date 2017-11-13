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
  SlackAuthor,
  SlackMention
} = require("../../components");

describe("SlackRenderer", () => {
  it("renders an empty message", () => {
    assert.deepEqual(SlackRenderer.render(<SlackMessage />), {});
  });

  describe("text", () => {
    it("renders Hello, world", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackText>Hello, world</SlackText>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        text: "Hello, world"
      });
    });

    it("renders multiple <SlackText> as paragraphs", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          {[1, 2, 3, 4].map(number => {
            return <SlackText key={number}>Paragraph {number}</SlackText>;
          })}
        </SlackMessage>
      );

      assert.deepEqual(message, {
        text: "Paragraph 1\nParagraph 2\nParagraph 3\nParagraph 4"
      });
    });

    it("renders a forced spacing", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackText>
            Lorem ipsum
            {"  -  "}
            dolor sit.
          </SlackText>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        text: "Lorem ipsum  -  dolor sit."
      });
    });
  });

  describe("mentions within text", () => {
    it("renders a simple global mention", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackText>
            Hey y'all <SlackEveryone />
          </SlackText>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        text: "Hey y'all @everyone"
      });
    });

    it("renders a channel mention", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackText>
            Lorem ipsum dolor. <SlackMention>#channel</SlackMention>
          </SlackText>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        text: "Lorem ipsum dolor. #channel"
      });
    });

    it("renders an user mention", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackText>
            Lorem ipsum dolor. <SlackMention>@lorem</SlackMention> Lorem ipsum dolor sit amet.
          </SlackText>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        text: "Lorem ipsum dolor. @lorem Lorem ipsum dolor sit amet."
      });
    });

    it("renders global announcements mentions", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackText>
            Lorem ipsum. <SlackEveryone /> <SlackHere /> <SlackAtChannel />
          </SlackText>
        </SlackMessage>
      );

      assert.deepEqual(message, {
        text: "Lorem ipsum. @everyone @here @channel"
      });
    });
  });

  describe("attachments", () => {
    it("throws if rendering outside <SlackMessage />", () => {
      assert.throws(
        () =>
          SlackRenderer.render(
            <SlackMessage>
              <SlackText>
                <SlackAttachments>
                  <SlackAttachments />
                </SlackAttachments>
              </SlackText>
            </SlackMessage>
          ),
        /can only appear as a child of/
      );
    });

    it("combines multiple attachments", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackAttachments>
            <SlackAttachment>
              <SlackText>Lorem ipsum dolor sit amet.</SlackText>
            </SlackAttachment>
          </SlackAttachments>
          <SlackAttachments>
            <SlackAttachment>
              <SlackText>Lorem ipsum dolor sit amet.</SlackText>
            </SlackAttachment>
          </SlackAttachments>
        </SlackMessage>
      );
      assert.deepEqual(message, {
        attachments: [
          {
            text: "Lorem ipsum dolor sit amet."
          },
          {
            text: "Lorem ipsum dolor sit amet."
          }
        ]
      });
    });

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

    it("renders multiple attachments", () => {
      const message = SlackRenderer.render(
        <SlackMessage>
          <SlackText>
            Heyo <SlackEveryone />
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
