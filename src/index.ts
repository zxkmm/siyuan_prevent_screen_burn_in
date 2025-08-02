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

    async onload() {
        this.data[STORAGE_NAME] = { readonlyText: "Readonly" };


        const frontEnd = getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";


        this.settingUtils = new SettingUtils({
            plugin: this, name: STORAGE_NAME
        });
        // this.settingUtils.addItem({
        //     key: "Input",
        //     value: "",
        //     type: "textinput",
        //     title: "Readonly text",
        //     description: "Input description",
        //     action: {
        //         // Called when focus is lost and content changes
        //         callback: () => {
        //             // Return data and save it in real time
        //             let value = this.settingUtils.takeAndSave("Input");
        //             console.log(value);
        //         }
        //     }
        // });
        // this.settingUtils.addItem({
        //     key: "InputArea",
        //     value: "",
        //     type: "textarea",
        //     title: "Readonly text",
        //     description: "Input description",
        //     // Called when focus is lost and content changes
        //     action: {
        //         callback: () => {
        //             // Read data in real time
        //             let value = this.settingUtils.take("InputArea");
        //             console.log(value);
        //         }
        //     }
        // });
        // this.settingUtils.addItem({
        //     key: "Check",
        //     value: true,
        //     type: "checkbox",
        //     title: "Checkbox text",
        //     description: "Check description",
        //     action: {
        //         callback: () => {
        //             let value = !this.settingUtils.get("Check");
        //             this.settingUtils.set("Check", value);
        //             console.log(value);
        //         }
        //     }
        // });
        // this.settingUtils.addItem({
        //     key: "Select",
        //     value: 1,
        //     type: "select",
        //     title: "Select",
        //     description: "Select description",
        //     options: {
        //         1: "Option 1",
        //         2: "Option 2"
        //     },
        //     action: {
        //         callback: () => {
        //             // Read data in real time
        //             let value = this.settingUtils.take("Select");
        //             console.log(value);
        //         }
        //     }
        // });
        // this.settingUtils.addItem({
        //     key: "Slider",
        //     value: 50,
        //     type: "slider",
        //     title: "Slider text",
        //     description: "Slider description",
        //     direction: "column",
        //     slider: {
        //         min: 0,
        //         max: 100,
        //         step: 1,
        //     },
        //     action:{
        //         callback: () => {
        //             // Read data in real time
        //             let value = this.settingUtils.take("Slider");
        //             console.log(value);
        //         }
        //     }
        // });
        // this.settingUtils.addItem({
        //     key: "Btn",
        //     value: "",
        //     type: "button",
        //     title: "Button",
        //     description: "Button description",
        //     button: {
        //         label: "Button",
        //         callback: () => {
        //             showMessage("Button clicked");
        //         }
        //     }
        // });
        // this.settingUtils.addItem({
        //     key: "Custom Element",
        //     value: "",
        //     type: "custom",
        //     direction: "row",
        //     title: "Custom Element",
        //     description: "Custom Element description",
        //     //Any custom element must offer the following methods
        //     createElement: (currentVal: any) => {
        //         let div = document.createElement('div');
        //         div.style.border = "1px solid var(--b3-theme-primary)";
        //         div.contentEditable = "true";
        //         div.textContent = currentVal;
        //         return div;
        //     },
        //     getEleVal: (ele: HTMLElement) => {
        //         return ele.textContent;
        //     },
        //     setEleVal: (ele: HTMLElement, val: any) => {
        //         ele.textContent = val;
        //     }
        // });
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
        // this.loadData(STORAGE_NAME);
        this.settingUtils.load();
        setInterval(this.randomizeSvgPositions, 100000); //100s
    }

    async onunload() {
        console.log(this.i18n.byePlugin);
        showMessage("Goodbye SiYuan Plugin");
        console.log("onunload");
    }

    uninstall() {
        console.log("uninstall");
    }

    randomizeSvgPositions() {
    if (!this.isMobile) return;
    const svgElements = document.querySelectorAll('svg');
    
    svgElements.forEach(svg => {
      svg.style.transform = ''; // TODO: this might impact smething
      
      const xShift = Math.floor((Math.random() * 11 - 5) * 0.1);
      const yShift = Math.floor((Math.random() * 11 - 5) * 0.1);
      
      svg.style.transform = `translate(${xShift}px, ${yShift}px)`;
    });
  }
  

}
