import React from 'react'

export const Layout: React.FC = ({ children }) => {
    return (
        <div className="w-full md:min-h-screen grid grid-cols-1 md:grid-cols-layout font-doodle">
            <nav className="hidden fixed col-span-2 md:col-span-1 md:flex flex-col h-full bg-gray-900 text-gray-50">
                <div className="h-full">
                    <div className="text-xl flex items-center justify-center w-full p-3 text-pink-500">
                        ManyanaDev
                    </div>
                    <div className="text-lg flex flex-col justify-center items-center h-full w-full">
                        <div className="w-full text-center py-3 hover:bg-pink-600 duration-100">Home</div>
                        <div className="w-full text-center py-3 hover:bg-pink-600 duration-100">About</div>
                        <div className="w-full text-center py-3 hover:bg-pink-600 duration-100">Work</div>
                        <div className="w-full text-center py-3 hover:bg-pink-600 duration-100">Contact</div>
                    </div>
                </div>
            </nav>
            <nav className="hidden sm:flex md:hidden flex-row h-full bg-gray-900 text-gray-50">
                <div className="h-full flex flex-row items-center justify-between w-full">
                    <div className="text-xl flex items-center justify-center w-full p-3 text-pink-500">
                        ManyanaDev
                    </div>
                    <div className="text-lg flex flex-row justify-center items-center h-full w-full">
                        <div className="w-full text-center py-3 hover:bg-pink-600 duration-100">Home</div>
                        <div className="w-full text-center py-3 hover:bg-pink-600 duration-100">About</div>
                        <div className="w-full text-center py-3 hover:bg-pink-600 duration-100">Work</div>
                        <div className="w-full text-center py-3 hover:bg-pink-600 duration-100">Contact</div>
                    </div>
                </div>
            </nav>
            <div className="col-span-2 md:col-span-1 md:col-start-2">{children}</div>
        </div>
    )
}
