// MainNav.tsx
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const mainNavItems = [
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

export default function MainNav() {
    return (
        <div className="hidden md:flex w-full justify-center">
            <NavigationMenu>
                <NavigationMenuList>
                    {mainNavItems.map((item: string, index: number) => (
                        <NavigationMenuItem key={index}>
                            <NavigationMenuTrigger>
                                {item}
                            </NavigationMenuTrigger>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
