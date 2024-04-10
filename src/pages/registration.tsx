import { trpc } from '@/shared/api';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateUserSchema } from '@/shared/api'

const Register = () => {
   const router = useRouter()
   const { register, handleSubmit, formState: { errors } } = useForm<CreateUserSchema>();

   const { mutate, isError } = trpc.user.create.useMutation({ onSuccess: () => { router.push(`/api/auth/signin`) } });

   const onSubmit = (data: CreateUserSchema) => {
      mutate(data);
   };

   return (
      <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-md w-full">
            <div>
               <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>

               <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input id="name" type="text" autoComplete="name" required className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md ${errors.name ? 'border-red-500' : ''}`} {...register('name', { required: true, minLength: 1 })} />
                  {errors.name && errors.name.type === 'required' && <p className="text-red-500 mt-1 text-xs">Name is required.</p>}
               </div>

               <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input id="email" type="email" autoComplete="email" required className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                  {errors.email && <p className="text-red-500 mt-1 text-xs">Please enter a valid email address.</p>}
               </div>

               <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input id="password" type="password" autoComplete="current-password" required className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md ${errors.password ? 'border-red-500' : ''}`} {...register('password', { required: true, minLength: 6 })} />
                  {errors.password && errors.password.type === 'required' && <p className="text-red-500 mt-1 text-xs">Password is required.</p>}
                  {errors.password && errors.password.type === 'minLength' && <p className="text-red-500 mt-1 text-xs">Password must be at least 6 characters long.</p>}
               </div>

               <div>
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     Register
                  </button>
               </div>
            </form>
            {isError ? 'Такой пользователь уже существует' : null}
         </div>
      </div>
   );
}

export default Register;