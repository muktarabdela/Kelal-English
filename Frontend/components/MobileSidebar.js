import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";


function MobileSidebar() {
    return (
        <nav className="fixed top-5 right-[2px] z-50 flex h-[50px] w-full items-center px-4 ">

            <Sheet>
                <SheetTrigger>
                    <Menu className="text-gray-400" />
                </SheetTrigger>

                <SheetContent className="z-[100] p-0" side="left">
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default MobileSidebar