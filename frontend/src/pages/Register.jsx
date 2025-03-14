import React, { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('');
    const[password, setPassword] = useState('');


    async function register (ev){
        ev.preventDefault();
         const response = await fetch('http://localhost:5000/register',{
                method: 'POST',
                body: JSON.stringify({username,password}),
                headers: {'Content-Type' :'application/json'},
            });
            if (response.status === 201) {  // Changed to 201 to match the server response
              alert('Registration successful');
          } else {
              alert('Registration failed');
          }
        
    }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Register
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={register}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
            <input type="text" name="username"  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
             placeholder="Enter User Name" required
            value={username} 
            onChange={ ev => setUsername(ev.target.value)}
            />

          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>

            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border
             border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
             w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              value={password} 
              onChange={ ev => setPassword(ev.target.value)}
               />
          </div>
          <div className="flex items-center justify-between">
           
           
          </div>
          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border border-white cursor-pointer">Register</button>
         
        </form>
      </div>
    </div>
  </section>
    </div>
  )
}

export default Register
