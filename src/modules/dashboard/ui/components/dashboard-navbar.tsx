'use client';

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {

    const { state, toggleSidebar, isMobile } = useSidebar()
    const [commandOpen, setCommandOpen] = useState(false)

    useEffect(() => {
        const down = (e:KeyboardEvent) => {
            if(e.key==="k" && e.ctrlKey){
                e.preventDefault()//“Don’t let the browser do what it normally does with Ctrl+K (maybe focus the search bar or something). I'm handling this!”
                setCommandOpen((prev) => !prev)
            }
        }

        document.addEventListener("keydown", down);

        //that is very straight. React says you added a EL with document. I don't care if you switch the compo. 
        // If you want to just limit this EL to this compo, remove this from document before you move. And that is exactly what we are doing at line 27

        return () => document.removeEventListener("keydown",down);
    }, [])//[] represents mount not render. Mounting happens only once, but rendering happpen multiple times

    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

            <nav className="px-3 py-2 flex gap-x-2 items-center border-b bg-background">
                <button onClick={toggleSidebar} className="size-9 cursor-pointer">
                    {state === "collapsed" || isMobile ?
                        <PanelLeftIcon className="size-4" /> :
                        <PanelLeftClose className="size-4" />}
                </button>

                <Button className="h-9 w-[240px] justify-start font-normal text-muted-foreground" variant={"outline"} size={"sm"} 
                onClick={() => setCommandOpen((prev) => !prev)}
                >
                    <SearchIcon />
                    Search
                    <kbd className="ml-auto h-5 inline-flex items-center select-none pointer-events-none gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        <span className="text-xs">&#8984;</span>
                        <span className="text-xs">k</span>
                    </kbd>
                </Button>
            </nav>
        </>
    )
}