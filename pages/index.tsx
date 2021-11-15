/* eslint-disable @typescript-eslint/no-empty-interface */
import { Dialog, Transition } from '@headlessui/react'
import { Scrollspy } from '@makotot/ghostui'
import { GetStaticProps } from 'next'
import Prismic from 'prismic-javascript'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import React, { Fragment, useRef, useState } from 'react'
import ImageGallery from 'react-image-gallery'

import ContactForm from '../components/ContactForm'
import { PrismicClient } from '../lib/api'
import { htmlSerializer } from '../lib/htmlSerializer'

export interface PrismicDocument<T> {
    id: string
    uid?: string
    url?: string
    type: string
    href: string
    tags: string[]
    slugs: string[]
    lang?: string
    alternate_languages: string[]
    first_publication_date: string | null
    last_publication_date: string | null
    data: T
}

interface BaseProps {
    title: RichTextBlock[]
    body: RichTextBlock[]
    image: RichTextBlock
}

interface WorkProps extends BaseProps {
    url: RichTextBlock
    main_image: RichTextBlock
    images: Array<{ image: RichTextBlock }>
}

interface AboutProps extends BaseProps {}

interface WorkIntroProps extends BaseProps {}

interface ContactProps extends BaseProps {}

interface TestimonialProps {
    slice_label: string
    slice_type: string
    primary: {
        title: RichTextBlock[]
        paragraph: RichTextBlock[]
    }
    items: {
        image: RichTextBlock
        title: string
        person: string
        testimonial: RichTextBlock[]
    }[]
}

const Divider: React.FC = () => <div className="shapedividers_com-6845 hidden sm:block" />

const me: React.FC<{
    work: PrismicDocument<WorkProps>[]
    contact: PrismicDocument<ContactProps>
    about: PrismicDocument<AboutProps>
    workIntro: PrismicDocument<WorkIntroProps>
    testimonials: TestimonialProps
}> = ({ work, workIntro, about, testimonials, contact }) => {
    const heroRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const workRef = useRef<HTMLDivElement>(null)
    const testimonialRef = useRef<HTMLDivElement>(null)
    const contactRef = useRef<HTMLDivElement>(null)

    const [selected, setSelected] = useState<PrismicDocument<WorkProps>>()
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const handleClickImg = (id: string) => {
        const currentWorkItem = work.find((i) => i.id === id)
        if (currentWorkItem) {
            setSelected(currentWorkItem)
            setTimeout(() => {
                setModalOpen(true)
            }, 100)
        }
    }

    const handleCloseModal = () => setModalOpen(false)

    const sections = [heroRef, aboutRef, workRef, testimonialRef, contactRef]

    const navs = [
        {
            label: 'Home',
            href: '#section-hero',
        },
        {
            label: 'About',
            href: '#section-about',
        },
        {
            label: 'Work',
            href: '#section-work',
        },
        {
            label: 'Testimonials',
            href: '#section-testimonials',
        },
        {
            label: 'Contact',
            href: '#section-contact',
        },
    ]

    return (
        <Scrollspy sectionRefs={sections}>
            {({ currentElementIndexInViewport: curr }) => (
                <div className="w-full md:min-h-screen grid grid-cols-1 md:grid-cols-layout font-doodle">
                    <nav className="hidden fixed col-span-2 md:col-span-1 md:flex flex-col h-full bg-gray-900 text-gray-50">
                        <div className="h-full">
                            <div className="text-xl flex items-center justify-center w-full p-3 text-pink-500">
                                Manyana<span className="text-white">Dev</span>
                            </div>
                            <div className="text-lg flex flex-col justify-center items-center h-full w-full">
                                {navs.map((nav, i) => (
                                    <a
                                        key={`nav-${i}`}
                                        href={nav.label}
                                        className={`${
                                            curr === i ? 'text-pink-500' : 'text-white hover:bg-pink-600'
                                        } w-full text-center py-3 duration-100`}
                                    >
                                        {nav.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </nav>
                    <div className="col-span-2 md:col-span-1 md:col-start-2">
                        <div className="grid grid-cols-2 w-full min-h-screen" id="section-hero" ref={heroRef}>
                            <div className="col-span-2 sm:col-span-1 flex flex-col items-center sm:items-start justify-center font-doodle p-10 space-y-5 bg-gray-900">
                                <div className="text-4xl md:text-7xl text-pink-500">
                                    Manyana<span className="text-gray-50">Dev</span>
                                </div>
                                <div className="text-xl md:text-3xl text-gray-50">
                                    Bring your ideas to life
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-1 bg-gray-100 bg-hero-image bg-no-repeat bg-left bg-fixed relative">
                                <Divider />
                            </div>
                        </div>
                        <div
                            className="grid grid-cols-1 md:grid-cols-3 min-h-50vh"
                            id="section-about"
                            ref={aboutRef}
                        >
                            <div className="col-span-1 sm:col-span-1 flex flex-col items-center justify-center bg-chimp-image bg-no-repeat bg-center bg-cover h-50vh sm:h-auto"></div>
                            <div className="col-span-1 sm:col-span-2 flex flex-col items-start justify-center p-4 sm:p-24 bg-pink-600 shadow-inner leading-10">
                                {about?.data && (
                                    <>
                                        <div className="text-gray-900 text-5xl py-5">
                                            <RichText render={about.data?.title} />
                                        </div>
                                        <div className="text-gray-50 text-xl leading-8">
                                            <RichText
                                                render={about.data?.body}
                                                htmlSerializer={htmlSerializer}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div
                            className="bg-gray-900 p-4 sm:p-24 pt-20 space-y-10 pattern-circuit bg-fixed"
                            id="section-work"
                            ref={workRef}
                        >
                            {workIntro?.data && (
                                <>
                                    <div className="text-2xl md:text-5xl uppercase font-doodle text-pink-500">
                                        <RichText render={workIntro.data?.title} />
                                    </div>
                                    <div className="text-lg uppercase tracking-widest">
                                        <RichText
                                            render={workIntro.data?.body}
                                            htmlSerializer={htmlSerializer}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="bg-gray-900 p-4 sm:p-24 space-y-10 pattern-circuit bg-fixed">
                            <div className="col-span-2">
                                <div className="grid grid-cols-1 sm:grid-cols-3">
                                    {work.map((w, i) => (
                                        <div
                                            key={i}
                                            className="hover:opacity-90 duration-200 cursor-pointer flex items-center justify-center h-80 bg-no-repeat bg-center bg-contain p-12 bg-transparent border-2 border-pink-500  hover:bg-opacity-90 relative work-image"
                                            onClick={() => handleClickImg(w.id)}
                                        >
                                            <img
                                                src={w.data?.main_image.url}
                                                alt=""
                                                className="w-44 object-contain hover:bg-opacity-10"
                                            />
                                            <div className="img-caption bg-gray-900 bg-opacity-70">
                                                <div className="text-3xl sm:text-xl md:text-3xl lg:text-5xl text-pink-500 text-center">
                                                    <RichText
                                                        render={w.data?.title}
                                                        htmlSerializer={htmlSerializer}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Transition appear show={modalOpen} as={Fragment}>
                                        <Dialog
                                            as="div"
                                            className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 bg-opacity-70"
                                            onClose={handleCloseModal}
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
                                                <span
                                                    className="inline-block h-screen align-middle"
                                                    aria-hidden="true"
                                                >
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
                                                    <div className="inline-block p-2 sm:p-12 my-2 sm:my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl sm:h-75vh h-screen sm:w-75vw border-pink-500 border-2 overflow-y-scroll">
                                                        <div className="flex flex-col justify-between items-start h-full">
                                                            <div>
                                                                <Dialog.Title
                                                                    as="h3"
                                                                    className="text-2xl sm:text-5xl font-doodle font-medium leading-6 text-pink-500 py-8"
                                                                >
                                                                    <RichText
                                                                        render={selected?.data?.title}
                                                                    />
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-lg sm:text-xl font-doodle text-gray-50 leading-8">
                                                                        <RichText
                                                                            render={selected?.data?.body}
                                                                        />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex mx-auto">
                                                                <ImageGallery
                                                                    additionalClass="h-62"
                                                                    items={selected?.data?.images.map(
                                                                        (t) => ({
                                                                            original: t.image.url,
                                                                        })
                                                                    )}
                                                                    renderItem={(item) => (
                                                                        <div className="w-1/2 flex flex-col items-center justify-center mx-auto">
                                                                            <img src={item.original} alt="" />
                                                                        </div>
                                                                    )}
                                                                    showThumbnails={false}
                                                                    showPlayButton={false}
                                                                    showFullscreenButton={false}
                                                                />
                                                            </div>

                                                            <div className="mt-4 ml-auto">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center px-4 py-2 my-2 text-base font-medium text-gray-50 bg-pink-500 border border-transparent rounded-md hover:bg-pink-600 focus:outline-none"
                                                                    onClick={handleCloseModal}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Transition.Child>
                                            </div>
                                        </Dialog>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                        <div
                            className="grid grid-cols-1 bg-gray-900 text-gray-50 border-b-2 border-pink-500"
                            id="section-testimonial"
                            ref={testimonialRef}
                        >
                            <div className="container mx-auto p-20 space-y-10 flex flex-col items-center sm:items-start">
                                <div className="text-2xl sm:text-5xl text-pink-500">
                                    <RichText render={testimonials.primary.title} />
                                </div>
                                <div className="text-lg sm:text-2xl text-gray-50">
                                    <RichText render={testimonials.primary.paragraph} />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 h-50vh bg-gray-900 text-gray-50 mx-0 lg:px-16 pattern-jigsaw bg-fixed border-b-8 border-double border-pink-500">
                            <div className="flex flex-col items-start justify-center px-0 lg:px-24 w-full">
                                <ImageGallery
                                    additionalClass="w-full"
                                    items={testimonials.items.map((t) => ({
                                        original: t.person,
                                        originalTitle: t.title,
                                        description: RichText.asText(t.testimonial),
                                    }))}
                                    renderItem={(item) => (
                                        <div className="sm:w-2/3 md:w-1/2 flex flex-col items-end justify-center mx-auto">
                                            <p
                                                className="text-base sm:text-xl leading-10 mb-5"
                                                style={{
                                                    whiteSpace: 'break-spaces',
                                                }}
                                            >
                                                {item.description}
                                            </p>
                                            <div className="text-lg sm:text-2xl uppercase font-doodle text-pink-500">
                                                {item.original}
                                            </div>
                                            <div className="text-base sm:text-xl uppercase font-doodle text-pink-500">
                                                {item.originalTitle}
                                            </div>
                                        </div>
                                    )}
                                    showBullets={false}
                                    showThumbnails={false}
                                    showPlayButton={false}
                                    showFullscreenButton={false}
                                />
                            </div>
                        </div>
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 w-full md:min-h-screen pattern-contours bg-fixed py-10 px-6"
                            id="section-contact"
                            ref={contactRef}
                        >
                            <div className="col-span-1 flex flex-col items-center md:items-start justify-center sm:px-12">
                                <div className="text-xl sm:text-2xl md:text-5xl uppercase font-doodle text-pink-500">
                                    <RichText render={contact.data?.title} />
                                </div>
                                <div className="leading-7 md:leading-10 w-full text-center md:text-left">
                                    <RichText render={contact.data?.body} htmlSerializer={htmlSerializer} />
                                </div>
                            </div>
                            <div className="my-5 md:my-0 col-span-1 flex flex-col items-center justify-center">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Scrollspy>
    )
}

export default me

export const getStaticProps: GetStaticProps = async () => {
    const { results: workResults } = await PrismicClient.query(Prismic.Predicates.at('document.type', 'w'))
    const { results: workIntroResults } = await PrismicClient.query(
        Prismic.Predicates.at('document.type', 'work-intro')
    )
    const { results: aboutResults } = await PrismicClient.query(
        Prismic.Predicates.at('document.type', 'about')
    )
    const { results: quoteResults } = await PrismicClient.query(
        Prismic.Predicates.at('document.type', 'quote')
    )
    const { results: contactResults } = await PrismicClient.query(
        Prismic.Predicates.at('document.type', 'contact')
    )

    return {
        props: {
            work: workResults,
            workIntro: workIntroResults[0],
            about: aboutResults[0],
            testimonials: quoteResults[0].data?.body1[0],
            contact: contactResults[0],
        },
    }
}
