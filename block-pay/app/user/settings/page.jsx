import SideNav from "@/components/SideNav";

const SettingsPage = () => {
    return (
        <main className="flex">
            <SideNav/>
            <div className="flex justify-center items-center">
                <h1 className="text-3xl font-bold">
                    Welcome to Settings Page
                </h1>
            </div>
        </main>
    )
}

export default SettingsPage