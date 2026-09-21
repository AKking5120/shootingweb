import { getMessages } from "@/lib/store";
import { MessagesList } from "@/components/admin/MessagesList";

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <h1 className="text-3xl font-bold">Messages</h1>
      <p className="mt-2 text-muted">Client enquiries from the contact form</p>
      <MessagesList messages={messages} />
    </div>
  );
}
