import React, { useEffect } from "react";
import Head from "next/head"
import AppBar from "./AppBar";
import StatusBar from "./StatusBar";
import SideBar from "./SideBar";
import styles from "./Main/Main.module.scss";
import { Store } from "pullstate";
import { useStyles } from "@/util/styles";
import { useImportMedia } from "@/util/styles";
import { getPagesFromHash } from "@/util/pages";
import Breadcrumbs from "./Breadcrumbs";

export const MainStore = new Store({
    isDarkMode: true,
    direction: "ltr",
    menuViewList: "List",
    showSideBar: true
});

export default function Main() {
    const isMobile = useImportMedia(im => im.lessThan('tablet'));
    const { showSideBar, menuViewList, hash } = MainStore.useState();
    const pages = getPagesFromHash(hash);

    useEffect(() => {
        MainStore.update(s => {
            s.hash = window.location.hash;
        });
        window.onhashchange = function () {
            MainStore.update(s => {
                s.hash = window.location.hash;
            });
        };
    }, []);

    const className = useStyles(styles, {
        root: true,
        sidebar: showSideBar && !isMobile,
        list: menuViewList === "List",
        iconList: menuViewList === "IconList"
    });

    return <>
        <Head>
            <title>System Concepts</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={className}>
            <AppBar />
            <SideBar />
            <main className={styles.main}>
                <Breadcrumbs items={pages} />
            </main>
            <StatusBar />
        </div>
    </>;
}
