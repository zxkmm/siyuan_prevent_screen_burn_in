import {
    Plugin,
    showMessage,
    getFrontend,
    getBackend,
    IModel,
} from "siyuan";
import "@/index.scss";

import { SettingUtils } from "./libs/setting-utils";

const STORAGE_NAME = "menu-config";

export default class SiyuanPreventScreenBurnIn extends Plugin {

    customTab: () => IModel;
    private isMobile: boolean;
    private settingUtils: SettingUtils;
    private ramdomPosTime: number;
    private randomPosFactor: number;

    async onload() {
        this.data[STORAGE_NAME] = { readonlyText: "Readonly" };


        const frontEnd = getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";


        this.settingUtils = new SettingUtils({
            plugin: this, name: STORAGE_NAME
        });

        this.settingUtils.addItem({
            key: "ramdomPosTime",
            value: 100,
            type: "slider",
            title: this.i18n.changePosInterval,
            description: this.i18n.changePosIntervalDesc,
            direction: "column",
            slider: {
                min: 1,
                max: 1000,
                step: 1,
            }
        });
        this.settingUtils.addItem({
            key: "ramdomPosFactor",
            value: 0.2,
            type: "slider",
            title: this.i18n.ramdomPosFactor,
            description: this.i18n.ramdomPosFactorDesc,
            direction: "column",
            slider: {
                min: 0,
                max: 1,
                step: 0.01,
            }
        });

        this.settingUtils.addItem({
            key: "Hint",
            value: "",
            type: "hint",
            title: this.i18n.hintTitle,
            description: this.i18n.hintDesc,
        });

        try {
            this.settingUtils.load();
        } catch (error) {
            console.error("Error loading settings storage, probably empty config json:", error);
        }

    }

    onLayoutReady() {
        this.loadData(STORAGE_NAME);
        this.settingUtils.load();
        this.randomPosFactor = this.settingUtils.get("ramdomPosFactor");
        this.ramdomPosTime = this.settingUtils.get("ramdomPosTime");
        if (!this.isMobile) return;
        this.randomizeSvgPositions();
        setInterval(() => this.randomizeSvgPositions(), this.ramdomPosTime * 1000);
    }

    async onunload() {

    }

    uninstall() {
    }

    randomizeSvgPositions = () => {
        if (!this.isMobile) return;
        const svgElements = document.querySelectorAll('svg');
        const breadcrumbButtons = document.querySelectorAll('button.protyle-breadcrumb__icon[data-type="mobile-menu"]');
        const toolbars = document.querySelectorAll('.toolbar--border');

        svgElements.forEach((svg: SVGElement) => {
            if (svg.classList.contains('b3-list-item__arrow')) {
                return;
            }

            svg.style.transform = ''; // TODO: this might impact something

            const xShift = Math.floor((Math.random() * 11 - 5) * this.randomPosFactor);
            const yShift = Math.floor((Math.random() * 11 - 5) * this.randomPosFactor);

            svg.style.transform = `translate(${xShift}px, ${yShift}px)`;
        });

        toolbars.forEach((toolbar: HTMLElement) => {
            const yShift = Math.floor((Math.random() * 11 - 5) * this.randomPosFactor);
            toolbar.style.setProperty('--border-shift-x', '0px');
            toolbar.style.setProperty('--border-shift-y', `${yShift}px`);
        });


        breadcrumbButtons.forEach((button: HTMLElement) => {
            button.style.transform = '';

            const xShift = Math.floor((Math.random() * 11 - 5) * this.randomPosFactor);
            const yShift = Math.floor((Math.random() * 11 - 5) * this.randomPosFactor);

            button.style.transform = `translate(${xShift}px, ${yShift}px)`;
        });

        


    }


}
