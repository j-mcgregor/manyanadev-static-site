import { Elements } from 'prismic-reactjs'

export const htmlSerializer = (type, element, content, children, key) => {
    switch (type) {
        case Elements.heading1:
            return <>{children}</>
        case Elements.paragraph:
            return <p className="w-full">{children}</p>
        default:
            return null
    }
}
