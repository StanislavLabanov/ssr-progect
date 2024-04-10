import { EditEventForm } from "@/features/edit-event";
import { CreateEventSchema, trpc } from "@/shared/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function EditEvent() {
   const router = useRouter();
   const session = useSession();

   const { data, isLoading } = trpc.event.findUnique.useQuery({
      id: Number(router.query.id),
   });

   const { mutate } = trpc.event.update.useMutation({
      onSuccess: (data) => {
         router.push(`/events/${data.id}`);
      },
   });

   const handleSubmit = (data: CreateEventSchema) => {
      mutate({ id: +router.query.id!, ...data });
   };

   if (isLoading) {
      return "Loading...";
   }

   if (session.status === "unauthenticated") {
      return "Forbidden";
   }

   if (!data) {
      return "No data";
   }

   return <EditEventForm title={data.title} description={data.description} date={data.date} onSubmit={handleSubmit} />;
}
