"use client"
import AuthForm from "@/firebase/AuthForm";
import { useRouter } from 'next/navigation';

const Signin = () => {
  const router = useRouter();
  
  return (
    <div className=''>
      <button onClick={() => router.push('/')} className="pt-5 pl-10">
        ← Back to Home
      </button>
      <div className='flex items-center justify-center h-screen'>
        <div className="shadow"><AuthForm /></div>
      </div>
        
    </div>
  )
}

export default Signin