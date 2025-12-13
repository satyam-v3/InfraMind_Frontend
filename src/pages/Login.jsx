import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { loginSchema } from "@/features/auth/auth.utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";


export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const { login, loading, error, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  async function submitForm(data) {
    try{
      await login(data)
    }catch(e){
      toast.error(error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-md space-y-6">

        {/* LOGO + TITLE */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>

          <h1 className="text-3xl font-bold">InfraMind</h1>
        </div>

        {/* LOGIN CARD */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@campus.edu"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

            </form>
          </CardContent>
        </Card>

        {/* DEMO CREDS NOTE */}
        <p className="text-center text-xs text-muted-foreground">
          Demo credentials: any valid email and password
        </p>

      </div>
    </div>
  );
}
