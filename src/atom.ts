import Color from "color"
import {DefaultChakraTheme, ThemeOverride} from "@chakra-ui/react"
import {atom} from "jotai"

export const chakraColorAtom = atom<ThemeOverride["colors"]>((get) => {
  const overrideConfig = get(overrideConfigAtom)

  const result: ThemeOverride["colors"] = {}

  Object.entries(overrideConfig).forEach(([colorKey, config]) => {
    if (!config) return
    const color = config.centerColor
    const darkSteps = 4
    const lightSteps = 5

    const lightnessStep = (config.lightest.lightness - 50) / lightSteps
    const darknessStep = (50 - config.darkest.lightness) / darkSteps

    const lightRotateStep = config.lightest.rotate / lightSteps
    const darkRotateStep = config.darkest.rotate / darkSteps

    const lightSaturateStep = config.lightest.saturate / lightSteps
    const darkSaturateStep = config.darkest.saturate / darkSteps

    const scale = {
      50: Color(config.centerColor)
        .lightness(50 + lightnessStep * 5)
        .rotate(lightRotateStep * 5)
        .saturate(lightSaturateStep * 5)
        .hex(),
      100: Color(config.centerColor)
        .lightness(50 + lightnessStep * 4)
        .rotate(lightRotateStep * 4)
        .saturate(lightSaturateStep * 4)
        .hex(),
      200: Color(config.centerColor)
        .lightness(50 + lightnessStep * 3)
        .rotate(lightRotateStep * 3)
        .saturate(lightSaturateStep * 3)
        .hex(),
      300: Color(config.centerColor)
        .lightness(50 + lightnessStep * 2)
        .rotate(lightRotateStep * 2)
        .saturate(lightSaturateStep * 2)
        .hex(),
      400: Color(config.centerColor)
        .lightness(50 + lightnessStep * 1)
        .rotate(lightRotateStep * 1)
        .saturate(lightSaturateStep * 1)
        .hex(),
      500: Color(config.centerColor).lightness(50).hex(),
      600: Color(config.centerColor)
        .lightness(50 - darknessStep * 1)
        .rotate(darkRotateStep * 1)
        .saturate(darkSaturateStep * 1)
        .hex(),
      700: Color(config.centerColor)
        .lightness(50 - darknessStep * 2)
        .rotate(darkRotateStep * 2)
        .saturate(darkSaturateStep * 2)
        .hex(),
      800: Color(config.centerColor)
        .lightness(50 - darknessStep * 3)
        .rotate(darkRotateStep * 3)
        .saturate(darkSaturateStep * 3)
        .hex(),
      900: Color(config.centerColor)
        .lightness(50 - darknessStep * 4)
        .rotate(darkRotateStep * 4)
        .saturate(darkSaturateStep * 4)
        .hex(),
    }

    result[colorKey] = scale
  })

  return result
})
export const overrideConfigAtom = atom<
  Partial<Record<keyof DefaultChakraTheme["colors"], ColorConfig>>
>({})

export type ColorConfig = {
  centerColor: string
  darkest: {
    lightness: number
    rotate: number
    saturate: number
  }
  lightest: {
    lightness: number
    rotate: number
    saturate: number
  }
}
