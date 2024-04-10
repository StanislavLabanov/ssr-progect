import { useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";


export const Header = () => {
   const session = useSession();
   const router = useRouter()

   return (
      <header className="h-30 flex justify-between items-center mb-5">
         <div className="flex items-center relative w-20 h-20 cursor-pointer" onClick={() => router.push('/')}>
            <Image src="/next.svg" alt="" className="absolute h-8 w-8 object-cover rounded-full" fill />
         </div>
         {
            session.data
               ?
               <div className="flex">
                  <p className="text-gray-700 pt-2">{session.data.user.name}</p>
                  <Link href={`/events/create`} className="h-10 px-6 ml-5 font-semibold rounded-md border border-slate-200 text-slate-900 align-middle leading-10">Создать событие</Link>
               </div>
               : <Link href={`/api/auth/signin`} className="h-10 px-6 ml-5 font-semibold rounded-md border border-slate-200 text-slate-900 align-middle leading-10">Войти</Link>
         }

      </header>
   )
}