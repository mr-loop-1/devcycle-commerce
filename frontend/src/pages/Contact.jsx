export default function ContactPage() {
  const chatbot = useVariableValue('chatbot', false);
  if (chatbot) {
    redirect('/');
  }
  return <div></div>;
}
