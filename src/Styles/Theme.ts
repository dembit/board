let ThemeLight = {
  color: {
    type1: "#D0D1D2" as "#D0D1D2",
    type2: "#11263C" as "#11263C",
    type3: "#F2F2F7" as "#F2F2F7"
  },
  size: {
    type1: "12px" as "12px",
    type2: "14px" as "14px",
    type3: "16px" as "16px",
    type4: "18px" as "18px",
  }
};

declare module "styled-components" {
  export interface DefaultTheme extends ThemeLightType {}
}

export type ThemeLightType = typeof ThemeLight

export default ThemeLight;
