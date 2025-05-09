import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-4">Welcome to MyApp 👋</h1>
      <p className="text-gray-600">Please login to access the dashboard.</p>
      <Button variant={'primary'} size={'lg'}>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
