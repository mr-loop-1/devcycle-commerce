export default function ContactPage() {
  const chatbot = useVariableValue('chatbot-status', false);
  if (chatbot) {
    redirect('/');
  }
  return <div></div>;
}
