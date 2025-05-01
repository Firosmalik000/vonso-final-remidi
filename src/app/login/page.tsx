import { login } from '../../controller/auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form className=" p-8 rounded-2xl shadow-md w-full max-w-sm space-y-6 bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-200">Login to Your Account</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input id="email" name="email" type="email" required className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input id="password" name="password" type="password" required className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex justify-between space-x-4">
          <button formAction={login} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
