import React from 'react'

const ContactForm: React.FC = () => {
    return (
        <form className="w-full max-w-xl bg-gray-900 p-10 shadow-2xl border-pink-500 border-2">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-300 text-base font-bold mb-2"
                        htmlFor="grid-first-name"
                    >
                        First Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-300 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        placeholder="Jane"
                    />
                    {/* <p className="text-red-500 text-base italic">Please fill out this field.</p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-300 text-base font-bold mb-2"
                        htmlFor="grid-last-name"
                    >
                        Last Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-300 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="text"
                        placeholder="Doe"
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-300 text-base font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        E-mail
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-300 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email"
                        type="email"
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-300 text-base font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Message
                    </label>
                    <textarea
                        className=" no-resize appearance-none block w-full bg-gray-200 text-gray-300 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                        id="message"
                    ></textarea>
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                    <button
                        className="shadow bg-pink-500 hover:bg-pink-600 hover:bg-teal-400 focus:outline-none text-gray-50 font-bold py-2 px-4 rounded text-xl"
                        type="button"
                    >
                        Send
                    </button>
                </div>
                <div className="md:w-2/3"></div>
            </div>
        </form>
    )
}

export default ContactForm
