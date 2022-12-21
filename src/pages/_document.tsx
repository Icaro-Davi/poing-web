import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap" rel="stylesheet" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/image/ico/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/image/ico/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/image/ico/favicon-16x16.png" />
                    <link rel="manifest" href="/image/ico/webmanifest.json" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument