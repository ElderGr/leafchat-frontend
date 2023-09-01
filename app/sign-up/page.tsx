"use client"
import Image from 'next/image'
import { Input } from '../components/Input'
import { useAuth } from '../domain/authenticate/auth.hook'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const auth = useAuth()
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      router.push('home')
      // auth
      // .mutateAsync({
      //   email: values.email,
      //   password: values.password
      // })
      // .then(() => {
      //   router.push('home')
      //   console.log('e')
      // })
    }
  })

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='mb-8'>
        <Image  
          width={100} 
          height={100} 
          src="/logo.svg" 
          className="ml-2" 
          alt='Logo' 
        />
        <h1 className='text-white text-center text-3xl'>Leafchat</h1>
      </div>
      
      <div className="w-full max-w-xs">
        <form 
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <Input 
              id="email" 
              type="text" 
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <Input 
              id="password" 
              type="password" 
              placeholder="******************" 
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <button  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Entrar
          </button>
          <div className="flex items-center justify-between">
            <a className="mt-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Esqueceu a senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
