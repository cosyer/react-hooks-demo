/*
 * @Author: cosyer
 * @Date: 2020-04-12 20:13:22
 * @Description: class context
 * @LastEditors: cosyer
 * @LastEditTime: 2020-04-12 20:27:58
 */

import React from "react";

export const theme = "theme-red";
export const local = "🇺🇸";

export const ThemeContext = React.createContext(theme);
export const LocalContext = React.createContext(local);
