import { signup } from '../../controller/auth';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form className=" bg-gray-700 p-8 rounded-2xl shadow-md w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input id="text" name="username" type="username" required className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="hidden" name="role" value="user" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input id="email" name="email" type="email" required className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input id="password" name="password" type="password" required className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex justify-between space-x-4">
          <button formAction={signup} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md transition">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
