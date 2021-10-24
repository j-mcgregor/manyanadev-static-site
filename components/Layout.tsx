import React from 'react'

export const Layout: React.FC = ({ children }) => {
    return (
        <div className="w-full min-h-screen grid grid-cols-layout font-doodle">
            <nav className="fixed col-span-1 flex flex-col h-full bg-gray-900 text-white ">
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
            <div className="col-span-7 col-start-2">{children}</div>
        </div>
    )
}
