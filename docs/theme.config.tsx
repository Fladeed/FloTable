export default {
    logo: <span>FloTable with Views</span>,
    project: {
        link: 'https://github.com/Fladeed/flo-table-with-views'
    },
    docsRepositoryBase: 'https://github.com/Fladeed/flo-table-with-views/tree/main/docs',
    footer: {
        text: 'FloTable with Views Documentation'
    },
    useNextSeoProps() {
        return {
            titleTemplate: '%s – FloTable with Views'
        }
    },
    head: (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content="FloTable with Views" />
            <meta property="og:description" content="A powerful table component with views, filters, and mobile support" />
        </>
    )
}