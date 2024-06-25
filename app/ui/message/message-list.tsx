type MessageListProps = {
  data: string[];
};
export default function MessageList(props: MessageListProps) {
  return (
    <ul>
      {props.data.map((msg, i) => (
        <li key={i}>{msg}</li>
      ))}
    </ul>
  );
}
