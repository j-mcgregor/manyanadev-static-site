/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Elements } from 'prismic-reactjs'

export const htmlSerializer = (type, _element, _content, children, _key) => {
    switch (type) {
        case Elements.heading1:
            return <>{children}</>
        case Elements.paragraph:
            return <p className="w-full text-white">{children}</p>
        default:
            return null
    }
}
