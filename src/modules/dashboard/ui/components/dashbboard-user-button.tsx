import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { useIsMobile } from "@/hooks/use-mobile"
import { authClient } from "@/lib/auth-client"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon, CreditCard, CreditCardIcon, LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const DashboardUserButton = () => {

    const { data, isPending } = authClient.useSession()
    const router = useRouter()
    const isMobile = useIsMobile()

    const onLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/sign-in")
                }
            }
        })
    }

    if (isPending || !data?.user) {
        return null
    }

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className="rounded-lg border border-border/10 p-3 flex gap-x-3 items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden ">
                    {data.user.image ? (
                        <Avatar>
                            <AvatarImage src={data.user.image} />
                        </Avatar>
                    ) : (<GeneratedAvatar seed={data.user.name} variant="initials" />)}

                    <div className="flex flex-col text-left flex-1 gap-0.5 min-w-0">
                        <p className="text-sm truncate w-full">
                            <span>{data.user.name.toLocaleUpperCase()}</span>
                        </p>
                        <p className="text-xs truncate w-full">
                            <span>{data.user.email}</span>
                        </p>

                    </div>

                    <ChevronDownIcon className="size-4" />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter>
                        <Button variant="outline">
                            <CreditCardIcon size={4} />
                            Billing
                        </Button>
                        <Button variant="outline" onClick={onLogout}>
                            <LogOutIcon size={4} />
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }



    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 flex gap-x-3 items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden ">
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                ) : (<GeneratedAvatar seed={data.user.name} variant="initials" />)}

                <div className="flex flex-col text-left flex-1 gap-0.5 min-w-0">
                    <p className="text-sm truncate w-full">
                        <span>{data.user.name.toLocaleUpperCase()}</span>
                    </p>
                    <p className="text-xs truncate w-full">
                        <span>{data.user.email}</span>
                    </p>

                </div>

                <ChevronDownIcon className="size-4" />

            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="end" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col">
                        <span className="font-medium truncate">{data.user.name}</span>
                        <span className="text-sm font-normal truncate text-muted-foreground">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center justify-between px-2 cursor-pointer">
                    Billing
                    <CreditCard className="size-4" />
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center justify-between px-2 cursor-pointer" onClick={onLogout}>
                    Logout
                    <LogOutIcon className="size-4" />
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}