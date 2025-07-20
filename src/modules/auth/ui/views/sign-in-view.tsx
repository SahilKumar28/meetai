'use client';
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" })
})

export const SignInView = () => {

    const router = useRouter()

    const searchParams = useSearchParams()
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null)
        setPending(true);

        const { error } = await authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
                callbackURL: searchParams.get("callbackUrl") || "/"
            },
            {
                onSuccess: () => {
                    router.push("/")
                    setPending(false)
                },
                onError: ({ error }) => {
                    setError(error.message)
                    setPending(false)
                }
            }
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="p-0 overflow-hidden">
                <CardContent className="p-0 grid md:grid-cols-2">

                    <Form {...form}>
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome back
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="m@emaple.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {error && (
                                    <Alert className="border-none bg-destructive/10">
                                        <OctagonAlertIcon className="w-4 h-4 !text-destructive" />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}

                                <Button type="submit" className="w-full" disabled={pending}>
                                    {pending ? (
                                        <span>Signing in</span>
                                    ) :
                                        (
                                            <span>Sign In</span>
                                        )}
                                </Button>

                                <div className="text-sm text-center relative after:border-t after:absolute after:inset-0 after:top-[50%] z-0 
                                after:flex after:items-center after:border-border">
                                    <span className="bg-card text-muted-foreground z-10 px-2 relative">Or continue with</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button type="button"
                                        variant={"outline"}
                                        className="w-full cursor-pointer"
                                        >
                                        <FaGoogle />
                                    </Button>

                                    <Button type="button"
                                        variant={"outline"}
                                        className="w-full cursor-pointer"
                                        onClick={() => { authClient.signIn.social({ provider: "github" }) }}>
                                        <FaGithub />
                                    </Button>
                                </div>

                                <div className="text-sm text-center">
                                    Don't have an account?{" "} <Link href={'sign-up'} className="underline font-bold">Sign up</Link>
                                </div>

                            </div>
                        </form>
                    </Form>

                    <div className="bg-radial from-green-700 to-green-900 md:flex flex-col 
                    justify-center items-center gap-y-4 relative">
                        <img src="/logo.svg" alt="image" className="w-[92px] h-[92px]" />
                        <p className="text-2xl font-semibold text-white">Meet.AI</p>
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground text-center text-xs text-balance *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>
        </div>
    )
}

