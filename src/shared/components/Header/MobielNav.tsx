// MobileNav.tsx
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";

const mobileNavItems = [
    "Menu 1",
    "Menu 2",
    "Menu 3",
    "Menu 4",
    "Menu 5",
    "Menu 6",
    "Menu 7",
    "Menu 8",
    "Menu 9",
    "Menu 10",
];

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden ml-auto"
                >
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent side="right">
                <div className="flex flex-col items-start">
                    {mobileNavItems.map((item, index) => (
                        <Button
                            key={index}
                            variant="link"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
