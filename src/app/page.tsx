import { auth } from "@/lib/auth"
import { HomeView } from "./home/ui/views/homeView"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


const Page = async() => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    redirect("/auth/sign-in")
  }

  return (
    <HomeView/>
  )
}

export default Page