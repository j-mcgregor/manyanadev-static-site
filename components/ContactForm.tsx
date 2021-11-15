import React, { FormEvent, Fragment, useState } from 'react'
import Axios from 'axios'
import { Transition, Dialog } from '@headlessui/react'

const ContactForm: React.FC = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [formMessage, setFormMessage] = useState<string>('')
    const [messageSuccess, setMessageSuccess] = useState<boolean | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)

        if (messageSuccess) {
            // EMPTY FORM
            setFullName('')
            setEmail('')
            setMessage('')
        }
    }

    function encode(data: Record<string, string>) {
        return Object.keys(data)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&')
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()

        Axios.post('/', encode({ 'form-name': 'contact', fullName, email, message }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then(() => {
                setMessageSuccess(true)
                setFormMessage("Thanks! We'll be in touch soon!")
                setIsOpen(true)
            })
            .catch(() => {
                setMessageSuccess(false)
                setFormMessage('Something went wrong, please try emailing us instead')
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <form
                className="w-full max-w-xl bg-gray-900 p-10 shadow-2xl border-pink-500 border-2"
                name="contact"
                method="POST"
                action="/"
                onSubmit={handleSubmit}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
            >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                    <label>
                        Don’t fill this out if you’re human: <input name="bot-field" />
                    </label>
                </p>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-300 text-base font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            First Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-300 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Jane"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
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
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3">
                        <button
                            className={`text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ${
                                loading ? 'bg-pink-200' : 'bg-pink-500 hover:bg-pink-600'
                            }`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </div>
                    <div className="md:w-2/3"></div>
                </div>
            </form>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 bg-opacity-70"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className={`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${
                                    messageSuccess ? 'bg-pink-500' : 'bg-red-50'
                                }`}
                            >
                                <Dialog.Title
                                    as="h3"
                                    className={`text-lg font-medium leading-6 ${
                                        messageSuccess ? 'text-gray-50' : 'text-red-500'
                                    }`}
                                >
                                    {messageSuccess ? 'Success!' : messageSuccess === false ? 'Oops!' : ''}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-50">{formMessage}</p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Got it, thanks!
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ContactForm
