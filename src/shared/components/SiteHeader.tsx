// SiteHeader.tsx
import MainNav from "./MainNav";
import MobileNav from "./MobielNav";

export default function SiteHeader() {
    return (
        <header className="w-full border-b">
            <div className="flex w-full h-14 items-center justify-between px-4">
                <MainNav />
                <MobileNav />
            </div>
        </header>
    );
}
