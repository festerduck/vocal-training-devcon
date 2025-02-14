'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid credentials');
      } else {
        router.push('/courses');
        router.refresh();
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen">
        <div className="flex h-screen">
          <div className="left-cont w-1/2 bg-primary/5 flex items-center justify-center">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-primary">Vocal Training Managemnet</h1>
              <p className="mt-4 text-lg text-gray-600">Welcome back! Please login to your account.</p>
            </div>
          </div>
          <div className="right-cont w-1/2 flex items-center justify-center bg-white">
            <form
              onSubmit={handleSubmit}
              className="w-[400px] space-y-6 p-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600 mt-2">Please enter your details</p>
              </div>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    type="password" 
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full"
                    required
                  />
                </div>
              </div>

              <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="text-primary hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
