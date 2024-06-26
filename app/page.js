import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Leave Management{" "}
        </h1>
        <div className="flex justify-center space-x-4">
          <Link href="/Auth/login">Login</Link>
          <Link href="/Auth/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
