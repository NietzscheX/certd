import { defineStore } from "pinia";
// @ts-ignore
import { LocalStorage } from "/src/utils/util.storage";
import { SysPublicSetting } from "/@/api/modules/api.basic";
import * as basicApi from '/@/api/modules/api.basic'
import _ from "lodash-es";
// import { replaceStyleVariables } from "vite-plugin-theme/es/client";

// import { getThemeColors, generateColors } from "/src/../build/theme-colors";
//
// import { mixLighten, mixDarken, tinycolor } from "vite-plugin-theme/es/colorUtils";

// export async function changeTheme(color?: string) {
//   if (color == null) {
//     return;
//   }
//   const colors = generateColors({
//     mixDarken,
//     mixLighten,
//     tinycolor,
//     color
//   });
//
//   return await replaceStyleVariables({
//     colorVariables: [...getThemeColors(color), ...colors]
//   });
// }


interface SettingState {
  theme: any;
  sysPublic?: SysPublicSetting
}

const SETTING_THEME_KEY = "SETTING_THEME";
export const useSettingStore = defineStore({
  id: "app.setting",
  state: (): SettingState => ({
    // user info
    theme: null,
    sysPublic: {
      registerEnabled: false
    }
  }),
  getters: {
    getTheme(): any {
      return this.theme || LocalStorage.get(SETTING_THEME_KEY) || {};
    },
    getSysPublic():SysPublicSetting{
      return this.sysPublic
    }
  },
  actions: {
    async loadSysSettings(){
      const settings = await basicApi.getSysPublicSettings()
      _.merge(this.sysPublic,settings)
    },
    persistTheme() {
      LocalStorage.set(SETTING_THEME_KEY, this.getTheme);
    },
    async setTheme(theme?: Object) {
      if (theme == null) {
        theme = this.getTheme;
      }
      this.theme = theme;
      this.persistTheme();
      // await changeTheme(this.theme.primaryColor);
    },
    async setPrimaryColor(color: any) {
      const theme = this.theme;
      theme.primaryColor = color;
      await this.setTheme();
    },
    async init() {
      await this.setTheme(this.getTheme);
      await this.loadSysSettings()
    }
  }
});
