interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="bg-muted flex flex-col justify-center items-center p-6 min-h-svh md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                {children}
            </div>
        </div>
    )
}

export default Layout