import "@logseq/libs";
import CSSmain from './main.css?inline';
import CSStodayJournal from './todayJournal.css?inline';
import CSSrainbowJournal from './rainbowJournal.css?inline';
import CSSadmonitions from './admonition.css?inline';
import { BlockEntity, LSPluginBaseInfo, SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";
import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
import ja from "./translations/ja.json";

const keyTagColoring = "tagColoring";
const keyPageColoring = "pageColoring";


//main
const main = () => {

  (async () => {
    try {
      await l10nSetup({ builtinTranslations: { ja } });
    } finally {
      /* user settings */
      logseq.useSettingsSchema(generateSettings());
      if (!logseq.settings) {
        setTimeout(() => {
          logseq.showSettingsUI();
        }, 300);
      }
    }
  })();

  //Logseq bugs fix
  /* Fix "Extra space when journal queries are not active #6773" */
  /* background conflict journal queries */
  /* journal queries No shadow */

  //CSS minify https://csscompressor.com/
  logseq.provideStyle({ key: "main", style: CSSmain });

  provideColoring(logseq.settings);

  //set today journal coloring
  const keyTodayJournal = "todayJournal";
  if (logseq.settings?.todayJournal) {
    logseq.provideStyle({ key: keyTodayJournal, style: CSStodayJournal });
  }

  //set rainbow-journal
  const keyRainbowJournal = "rainbowJournal";
  if (logseq.settings?.rainbowJournal) {
    logseq.provideStyle({ key: keyRainbowJournal, style: CSSrainbowJournal });
  }

  //set admonitions
  const keyAdmonitions = "admonitions";
  if (logseq.settings?.admonitions) {
    logseq.provideStyle({ key: keyAdmonitions, style: CSSadmonitions });
  }

  const keyBulletClosed = "bulletClosed";
  logseq.provideStyle({ key: keyBulletClosed, style: CSSbulletClosed(logseq.settings?.bulletClosedColor) });


  /* toolbarItem */
  logseq.App.registerUIItem("toolbar", {
    key: logseq.baseInfo.id,
    template: `
  <div data-on-click="open_color_settings" style="font-size:20px">
  <svg width="20.2" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M35.0182 46.589C33.7497 46.2081 32.5148 45.6785 31.3397 45C26.9837 42.4851 23.9873 38.2365 23.0182 33.4109C21.7497 33.7919 20.5148 34.3215 19.3397 35C13.9807 38.094 10.6794 43.812 10.6794 50C10.6794 56.188 13.9807 61.906 19.3397 65C24.6987 68.094 31.3012 68.094 36.6602 65C37.8861 64.2922 39.0043 63.4472 40 62.4906C36.6431 59.2654 34.6794 54.7725 34.6794 50C34.6794 48.8418 34.7951 47.7001 35.0182 46.589Z" fill="#27AE60" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.3397 15C36.6987 11.906 43.3012 11.906 48.6602 15C54.0192 18.094 57.3205 23.812 57.3205 30C57.3205 31.1582 57.2048 32.2999 56.9817 33.411C52.4654 32.0548 47.5236 32.5845 43.3397 35C42.1138 35.7078 40.9956 36.5529 40 37.5095C39.0043 36.5529 37.8861 35.7078 36.6602 35C32.4763 32.5845 27.5345 32.0548 23.0182 33.411C22.7951 32.2999 22.6794 31.1582 22.6794 30C22.6794 23.812 25.9807 18.094 31.3397 15Z" fill="#EB5757" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M44.9817 46.5891C45.2049 47.7002 45.3205 48.8418 45.3205 50C45.3205 54.7725 43.3568 59.2654 40 62.4906C40.9957 63.4472 42.1139 64.2922 43.3397 65C48.6987 68.094 55.3013 68.094 60.6603 65C66.0192 61.906 69.3205 56.188 69.3205 50C69.3205 43.812 66.0192 38.094 60.6603 35C59.4851 34.3215 58.2502 33.7919 56.9817 33.411C56.0127 38.2365 53.0162 42.4851 48.6603 45C47.4851 45.6785 46.2502 46.2081 44.9817 46.5891Z" fill="#2D9CDB" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M44.9817 46.5891C40.4655 47.9452 35.5236 47.4156 31.3397 45C26.9838 42.4851 23.9873 38.2365 23.0183 33.411C27.5345 32.0548 32.4764 32.5844 36.6603 35C41.0162 37.5149 44.0127 41.7635 44.9817 46.5891Z" fill="#F2994A" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M56.9817 33.411C56.0127 38.2365 53.0162 42.4851 48.6603 45C44.4764 47.4156 39.5345 47.9452 35.0183 46.5891C35.9873 41.7635 38.9838 37.5149 43.3397 35C47.5236 32.5844 52.4655 32.0548 56.9817 33.411Z" fill="#BB6BD9" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M40 37.5094C43.3568 40.7346 45.3205 45.2275 45.3205 50C45.3205 54.7725 43.3568 59.2654 40 62.4906C36.6432 59.2654 34.6795 54.7725 34.6795 50C34.6795 45.2275 36.6432 40.7346 40 37.5094Z" fill="#56CCF2" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M35.0183 46.5891C35.7146 43.1216 37.4578 39.952 40 37.5095C42.5423 39.952 44.2855 43.1216 44.9818 46.5891C41.734 47.5643 38.2661 47.5643 35.0183 46.5891Z" fill="#F2F2F2" />
  </svg>
  </div>
  `,
  });

  /* Block slash command */
  logseq.Editor.registerSlashCommand('🌈Admonition Selector', async ({ uuid }) => {
    selectAdmonition(uuid);
  });

  /* Block ContextMenuItem  */
  logseq.Editor.registerBlockContextMenuItem('🌈Admonition Selector', async ({ uuid }) => {
    selectAdmonition(uuid);
  });

  // Setting changed
  logseq.onSettingsChanged(async (newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    if (newSet === oldSet) return;
    removeProvideStyle(keyTagColoring);
    removeProvideStyle(keyPageColoring);
    setTimeout(() => {
      provideColoring(newSet);
    }, 100);
    if (oldSet.admonitions !== false && newSet.admonitions === false) {
      removeProvideStyle(keyAdmonitions);
    } else if (oldSet.admonitions !== true && newSet.admonitions === true) {
      logseq.provideStyle({ key: keyAdmonitions, style: CSSadmonitions });
    }
    if (oldSet.rainbowJournal !== false && newSet.rainbowJournal === false) {
      removeProvideStyle(keyRainbowJournal);
    } else if (oldSet.rainbowJournal !== true && newSet.rainbowJournal === true) {
      logseq.provideStyle({ key: keyRainbowJournal, style: CSSrainbowJournal });
    }
    if (oldSet.todayJournal !== false && newSet.todayJournal === false) {
      removeProvideStyle(keyTodayJournal);
    } else if (oldSet.todayJournal !== true && newSet.todayJournal === true) {
      logseq.provideStyle({ key: keyTodayJournal, style: CSStodayJournal });
    }
    removeProvideStyle(keyBulletClosed);
    logseq.provideStyle({ key: keyBulletClosed, style: CSSbulletClosed(newSet.bulletClosedColor) });
  });


  logseq.provideModel({
    //toolbar onclick
    open_color_settings() {
      logseq.showSettingsUI();
    }
  });

};
//main end


//set BulletClosed
const CSSbulletClosed = (color): string => {
  return `div#app-container span.bullet{height:9px;width:9px;border-radius:40%;opacity:.6;transition:unset!important}
div#app-container span.bullet-container.bullet-closed{height:11px;width:11px;outline:5px solid ${hex2rgba(color, 0.6)}
`};


//for tag
interface ITag {
  name: string;
  color: string;
}
const generateTagStyle = (tag: ITag) => {
  if(logseq.settings!.wordsMatchingParentPage === false){
    return `div#app-container a.tag[data-ref='${CSS.escape(tag.name)}']{color:inherit;padding:2px;border-radius:3px;background:${hex2rgba(tag.color, 0.3)}}
    div#app-container div[haschild="true"][data-refs-self*='"${CSS.escape(tag.name)}"']:not[data-refs-self*='"${CSS.escape(tag.name)}/"']{padding:1.4em;border-radius:16px;background:${hex2rgba(tag.color, 0.15)}}`;
  }else{
    return `div#app-container a.tag[data-ref='${CSS.escape(tag.name)}']{color:inherit;padding:2px;border-radius:3px;background:${hex2rgba(tag.color, 0.3)}}
    div#app-container div[haschild="true"][data-refs-self*='"${CSS.escape(tag.name)}"']{padding:1.4em;border-radius:16px;background:${hex2rgba(tag.color, 0.15)}}`;    
  }
};

//for page
interface IPage {
  name: string;
  color: string;
}
const generatePageStyle = (page: IPage) => `
body[data-page="page"] div#main-content-container div.page-blocks-inner div#${CSS.escape(page.name)}{border-radius:0.4em;background-color:${hex2rgba(page.color, 0.2)};outline:2px double ${hex2rgba(page.color, 0.2)};outline-offset:3px}
body[data-page="page"] div.dark-theme div#main-content-container div.page-blocks-inner div#${CSS.escape(page.name)}{background-color:${hex2rgba(page.color, 0.3)};outline-color:${hex2rgba(page.color, 0.3)}}
body[data-page="page"] div#main-content-container h1.page-title span[data-ref="${CSS.escape(page.name)}"]{color:${hex2rgba(page.color, 0.8)}}
body[data-page="page"] div#main-content-container div.page-blocks-inner div#${CSS.escape(page.name)} div.page-properties{background:${hex2rgba(page.color, 0.2)}}
div#left-sidebar div.favorites li.favorite-item[data-ref*="${CSS.escape(page.name)}"i] span.page-title{border-bottom:2px solid ${hex2rgba(page.color, 1)}}`;

//favorites:has(title) + recent display none (overflow CSS)
const FavoriteOverflowCSS = (page: IPage) => {
  const favorites = parent.document.querySelector('div.favorites') as HTMLDivElement | null;
  if (favorites !== null) {
    const favoriteItems = favorites.querySelectorAll(`li.favorite-item[data-ref="${CSS.escape(page.name)}"]`) as NodeListOf<HTMLLIElement>;
    if (favoriteItems.length > 0) {
      const nextSibling = favorites.nextElementSibling;
      if (nextSibling && nextSibling.classList.contains('recent')) {
        const recentItems = nextSibling.querySelectorAll(`li[data-ref="${CSS.escape(page.name)}"].recent-item.select-none`) as NodeListOf<HTMLLIElement>;
        if (recentItems.length > 0) {
          recentItems.forEach(item => item.classList.add('hidden'));
        }
      }
    }
  }
};


const removeProvideStyle = (className: string) => {
  const doc = parent.document.head.querySelector(`style[data-injected-style^="${className}"]`) as HTMLStyleElement | null;
  if (doc !== null) {
    doc.remove();
  }
};


//Tag Coloring & Page Coloring
const provideColoring = (settings) => {
  if (!settings) return;
  const settingKeys = Object.keys(settings || {});
  //tag
  const tcArray = settingKeys
    .filter((key) => key.includes("tc"))
    .sort()
    .map((key) => settings[key]);
  const tnArray = settingKeys
    .filter((key) => key.includes("tn"))
    .sort()
    .map((key) => settings[key]);
  const settingArray: ITag[] = [];
  tcArray.forEach((tc, idx) => {
    if (tc && tnArray[idx]) {
      settingArray.push({ name: tnArray[idx].toLowerCase(), color: tc });
    }
  });
  const thisStyle = settingArray.map(generateTagStyle).join("\n");
  logseq.provideStyle({ key: keyTagColoring, style: thisStyle });
  //tag end

  //page
  const pcArray = settingKeys
    .filter((key) => key.includes("pc"))
    .sort()
    .map((key) => settings[key]);
  const pnArray = settingKeys
    .filter((key) => key.includes("pn"))
    .sort()
    .map((key) => settings[key]);
  const settingArrayPage: IPage[] = [];
  pcArray.forEach((pc, idx) => {
    if (pc && pnArray[idx]) {
      settingArrayPage.push({ name: pnArray[idx].toLowerCase(), color: pc });
    }
  });
  const thisStylePage = settingArrayPage.map(generatePageStyle).join("\n");//Page Coloring && favorites coloring
  settingArrayPage.map(FavoriteOverflowCSS);//favorite recent remove
  logseq.provideStyle({ key: keyPageColoring, style: thisStylePage });
  //page end
};


//admonition selector
async function selectAdmonition(uuid) {
  const blockElement = parent.document.getElementsByClassName(uuid) as HTMLCollectionOf<HTMLElement>;
  if (!blockElement) return;
  //エレメントから位置を取得する
  const rect = blockElement[0].getBoundingClientRect();
  if (!rect) return;
  const top: string = Number(rect.top + window.pageYOffset - 140) + "px";
  const left: string = Number(rect.left + window.pageXOffset + 100) + "px";
  logseq.provideUI({
    key: "admonition-selector",
    reset: true,
    close: "outside",
    template: `
          <h3>Admonition Selector</h3>
          <select id="admonition-select">
          <option value="">🌈Select a tag</option>
          <option value="FAILED">🔴Failed</option>
          <option value="REMEDY">🔴Remedy</option>
          <option value="WARNING">🟠Warning</option>
          <option value="LEARNED">🟠Learned</option>
          <option value="CAUTION">🟡Caution</option>
          <option value="DECLARATION">🟡Declaration</option>
          <option value="SUCCESS">🟢Success</option>
          <option value="FACTS">🟢Facts</option>
          <option value="NOTICE">🔵Notice</option>
          <option value="INFO">🔵Info</option>
          <option value="REVIEW">🔵Review</option>
          <option value="QUESTION">🟣Question</option>
          <option value="DISCOVERY">🟣Discovery</option>
          <option value="REPORT">🟤Report</option>
          <option value="NOTE">🟤Note</option>
          </select>
        `,
    style: {
      width: "240px",
      height: "110px",
      position: "fixed",
      left,
      top,
      backgroundColor: 'var(--ls-primary-background-color)',
      color: 'var(--ls-primary-text-color)',
      boxShadow: '1px 2px 5px var(--ls-secondary-background-color)',
    },
  });
  //selectで選択
  setTimeout(() => {
    const select = parent.document.getElementById("admonition-select") as HTMLSelectElement;
    let processing: Boolean = false;
    if (select) {
      select.addEventListener("change", async () => {
        if (processing) return;
        if (select.value === "") return;
        processing = true;
        const block = await logseq.Editor.getBlock(uuid) as BlockEntity;
        if (block) logseq.Editor.updateBlock(uuid, `${block.content} #${select.value} `).then(() => {
          logseq.Editor.insertBlock(uuid, "");
          const element = parent.document.getElementById(logseq.baseInfo.id + "--admonition-selector") as HTMLDivElement | null;
          if (element) element.remove();
        });
        processing = false;
      });
    }
  }, 100);
}


function hex2rgba(hex: string, alpha: number): string {
  if (!hex) {
    throw new Error('Invalid hex color value');
  }
  const hexValue = hex.replace('#', '');
  if (hexValue.length !== 3 && hexValue.length !== 6) {
    throw new Error('Invalid hex color value');
  }
  const hexArray = hexValue.length === 3 ? hexValue.split('').map(char => char + char) : hexValue.match(/.{2}/g) || [];
  const rgbaArray = hexArray.map(hexChar => parseInt(hexChar, 16));
  rgbaArray.push(alpha);
  return `rgba(${rgbaArray.join(',')})`;
}


/* https://logseq.github.io/plugins/types/SettingSchemaDesc.html */
const generateSettings = (): SettingSchemaDesc[] => {
  const rainbowColor = [
    "#37306B", "#66347F", "#9E4784", "#D27685", "#9DC08B", "#609966", "#40513B", "#060047", "#B3005E", "#E90064", "#FF5F9E", "#E21818"
  ];
  const settingArray = [] as SettingSchemaDesc[];

  //option
  settingArray.push(
    {
      key: '',
      title: t("Option"),
      type: "heading",
      default: "",
      description: "",
      inputAs: "color",
    },
    {
      key: "admonitions",
      title: "Admonition by tags (batch block)",
      type: "boolean",
      default: true,
      description: `
        Nest with the tag as the parent.
              🔴#FAILED / #REMEDY, 
              🟠#WARNING / #LEARNED, 
              🟡#CAUTION / #DECLARATION, 
              🟢#SUCCESS / #FACTS, 
              🔵#NOTICE / #INFO / #REVIEW, 
              🟣#QUESTION / #DISCOVERY, 
              🟤#REPORT / #NOTE
              `,
    },
    {
      key: "rainbowJournal",
      title: t("Outline right border"),
      type: "boolean",
      default: true,
      description: t("Color according to nesting depth. As the outline gets deeper, a rainbow appears on the right side."),
    },
    {
      key: "todayJournal",
      title: t("today & yesterday journals coloring"),
      type: "boolean",
      default: false,
      description: t("background-color: yellow & green (**light theme only)"),
    },
    {
      key: "bulletClosedColor",
      title: t("Choice closed-bullets color"),
      type: "string",
      default: "f8b400",
      description: "",
      inputAs: "color",
    },
    {
      key: '',
      title: t("Page Coloring (title and contents)"),
      type: "heading",
      default: "",
      description: t("Accentuate the specified page. Color underline on favorite list on left sidebar."),
      inputAs: "color",
    },
  );


  //page
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((idx) => {
    settingArray.push(
      {
        key: `heading10${idx}`,
        title: t("Page") + ` [ ${idx} ]`,
        type: "heading",
        default: "",
        description: "",
      },
      {
        key: `pn${idx}`,
        title: t("Set the word of the page title"),
        type: "string",
        default: ``,
        description: "",
      },
      {
        key: `pc${idx}`,
        title: t("Choice the background color"),
        type: "string",
        default: rainbowColor[idx - 1],
        description: t("color fades"),
        inputAs: "color",
      },
    );
  });

  settingArray.push(
    {
      key: '',
      title: t("Tag Coloring (batch block)"),
      type: "heading",
      default: "",
      description: t("Accentuate tagged blocks like a panel"),
      inputAs: "color",
    },
    {//⚠️Words matching the parent page of namespaces can cause duplication, just like with tags.
      key: 'wordsMatchingParentPage',
      title: t("Apply if it matches a child page of a namespace"),
      type: "boolean",
      default: false,
      description: "default: false",
    },
  );

  //tag
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((idx) => {
    settingArray.push(
      {
        key: `heading00${idx}`,
        title: t("#tag") + ` [ ${idx} ]`,
        type: "heading",
        default: "",
        description: "",
      },
      {
        key: `tn${idx}`,
        title: t("Set the word of the tag"),
        type: "string",
        default: ``,
        description: "without #",
      },
      {
        key: `tc${idx}`,
        title: t("Choice the background color"),
        type: "string",
        default: rainbowColor[idx - 1],
        description: t("color fades"),
        inputAs: "color",
      },
    );
  });
  return settingArray;
};


// bootstrap
logseq.ready(main).catch(console.error);