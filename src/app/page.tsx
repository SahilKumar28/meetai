'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {

  const { data: session } = authClient.useSession()

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onError: () => {
        window.alert("Something went wrong")
      },
      onSuccess: () => {
        window.alert("Success")
      }
    })
  }

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password
    }, {
      onError: () => {
        window.alert("Something went wrong")
      },
      onSuccess: () => {
        window.alert("Success")
      }
    })
  }

  if (session) {
    return (
      <div>
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <div className="p-2 flex flex-col gap-10">
      <div className="p-2 flex flex-col gap-4">
        <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSubmit}>
          Create user
        </Button>
      </div>

      <div className="p-2 flex flex-col gap-4">
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onLogin}>
         Login user
        </Button>
      </div>
    </div>
  );
}
