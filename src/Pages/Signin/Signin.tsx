
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signin } from '../../API Service/Auth/sign';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        try {
            const data = {
                email,
                password,
            };

            const response = await signin(data);

            if (response?.status === 200) {
                const token = response?.headers?.authorization

                sessionStorage.setItem("token", token);
                localStorage.setItem("token", token);
                alert("sucessfully logined")
                navigate('/dashboard')

            }

        } catch (error) {
            console.log(error);

        }
    };




    return (
        <div className='flex h-screen '>{/*left box*/}
            <div className=' w-[60%]  bg-amber-300    h-full rounded-4xl ' >
                <img src='/loginMain.jpg' className='  object-cover w-full  h-full' alt="none" />
            </div>


            <div className='   rounded-4xl h-full  pt-15 w-[40%] ' >  {/*right box*/}

                <div className='  flex  justify-center w-full  ' >
                    <div className='flex flex-col  items-center w-auto    font-semibold mt-10 p-14  ' >
                        <img src='/Logo.png' className='h-25 w-30  text-4xl p-2  ' alt="" />

                        <h3 className=' font-light p-2 text-center ' > Enter your registered Email to Login to your
                            account.  </h3>
                        <div>
                            <form action="" onSubmit={handleLogin} className='p-4'  >
                                <div className='flex flex-col w-lg  gap-2 p-2 ' >
                                    <label htmlFor="Email">Email</label>
                                    <input value={email} onChange={(e) => setemail(e.target.value)} type="email" className='border-gray-200 bg-blue-100 border-4  p-2 rounded-2xl ' name="" placeholder='Enter your email ' id="" />
                                </div>
                                <div className='flex flex-col gap-2 p-2 ' >
                                    <label htmlFor="Password"       >Password</label>
                                    <input value={password} onChange={(e) => setpassword(e.target.value)} type="Password" className='border-gray-200  bg-blue-100  text-2xl border-4  p-2 rounded-2xl ' name="" placeholder='Enter your password ' id="" />
                                </div>
                                <div className=' rounded-xl   w-full m-6 text-center p-2' >
                                    <button className='text-white  w-70 rounded-lg p-2 text-xl shadow-2xl bg-red-700  hover:opacity-85 '  >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin