import { connection } from "next/server";
import { MessagesList } from "@/components/admin/MessagesList";

export default async function AdminMessagesPage() {
  await connection();

  return (
    <div>
      <h1 className="text-3xl font-bold">Messages</h1>
      <p className="mt-2 text-muted">Client enquiries from the contact form</p>
      <MessagesList />
    </div>
  );
}
