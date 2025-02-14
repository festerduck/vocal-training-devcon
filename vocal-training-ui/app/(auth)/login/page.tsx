import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
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
              action=""
              method="post"
              className="w-[400px] space-y-6 p-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600 mt-2">Please enter your details</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    type="text" 
                    id="username" 
                    placeholder="Enter your username"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password"
                    className="w-full"
                  />
                </div>
              </div>

              <Button className="w-full" size="lg">
                Sign In
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
