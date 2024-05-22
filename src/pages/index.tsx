import { GetServerSideProps, NextPage } from "next";
import { Fragment } from "react";
import { getLocaleLang } from "../utils/cookies";

const RootPage: NextPage = props => <Fragment />

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const localeLang = getLocaleLang(ctx);
    return {
        redirect: {
            permanent: true,
            destination:  `${localeLang}/`
        },
        props: {}
    }
}

export default RootPage;