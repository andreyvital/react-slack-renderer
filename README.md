## `react-slack-renderer`

Render Slack messages in a cool (React) way.

```JS
const message = SlackRenderer.render(
  <SlackMessage>
    <SlackText>
      Heyo
      <SlackEveryone />
    </SlackText>
  </SlackMessage>
);

slackClient.send(message);
```

```JSON
{
  "text": "Heyo @everyone"
}
```
