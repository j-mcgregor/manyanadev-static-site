module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            gridTemplateColumns: {
                work: '400px minmax(900px, 1fr)',
                layout: '130px 1fr',
            },
            width: {
                '1/8': '12.5%',
                '[130]px': '130px',
                '50vw': '50vw',
                '75vw': '75vw',
            },
            height: {
                '50vh': '50vh',
                '75vh': '75vh',
                '90pc': '90%',
            },
            minHeight: {
                '50vh': '50vh',
            },
            backgroundImage: {
                'hero-image':
                    'url(https://images.unsplash.com/photo-1633461090546-1d3b231eb731?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2456&q=80)',
                'chimp-image': "url('/images/chimp.jpeg')",
                'scream-image': 'url(https://www.svgrepo.com/show/321327/screaming.svg)',
                lust: 'linear-gradient(to right, rgb(153, 246, 228), rgb(217, 249, 157))',
            },
        },
        fontFamily: {
            doodle: ['doodle'],
            zcool: ['zcool'],
            fjalla: ['FjallaOne'],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('daisyui')],
}
