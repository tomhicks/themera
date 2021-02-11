import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  Code,
  Container,
  DefaultChakraTheme,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Spinner,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  useClipboard,
  useColorMode,
  useTheme,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import Color from "color"
import {atom, useAtom} from "jotai"
import {useAtomValue} from "jotai/utils"
import Head from "next/head"
import React from "react"
import {SketchPicker} from "react-color"
import {chakraColorAtom, ColorConfig, overrideConfigAtom} from "../atom"

export default function Home() {
  const [config, setConfig] = useAtom(overrideConfigAtom)

  const loadedRef = React.useRef(false)
  React.useEffect(() => {
    setConfig(JSON.parse(localStorage.getItem("theme") ?? "{}"))
    loadedRef.current = true
  }, [setConfig])

  React.useEffect(() => {
    if (loadedRef.current) {
      localStorage.setItem("theme", JSON.stringify(config))
    }
  }, [config, setConfig])

  return (
    <Container maxW={"6xl"} mb={40}>
      <Stack spacing={4} isInline alignItems="flex-end" mb={20} mt={6}>
        <Box
          bg="white"
          border="1px solid #f0f0f0"
          pos="relative"
          w={20}
          h={20}
          shadow={"md"}
          overflow="hidden"
          rounded="25%"
        >
          <Box
            pos="absolute"
            left={"12%"}
            top={"12%"}
            right={"12%"}
            bottom="12%"
            display={"flex"}
            rounded="10%"
          >
            {[0, 1, 2, 3, 4].map((v) => {
              return (
                <Box
                  pos="relative"
                  h={`${Math.max(
                    20,
                    Math.min(Math.pow(5 - v, 1.5) * 9, 100)
                  )}%`}
                  borderColor="white"
                  borderWidth={1}
                  rounded="md"
                  flex={1}
                  background={Color("red")
                    .rotate(-110)
                    .saturate(-0.1)
                    .lighten(-0.1)
                    .rotate(v * 23)
                    .hex()}
                />
              )
            })}
          </Box>
        </Box>
        <Box flex={1}>
          <Heading size="2xl">Themera</Heading>
          <Text fontFamily="heading" color="gray.500">
            Create Chakra UI color schemes in seconds ⚡️
          </Text>
        </Box>
        <Stack isInline spacing={6} alignSelf="flex-start" fontWeight="500">
          <DarkSwitch />
          <Text color={"gray.500"}>
            <Link isExternal href={"https://github.com/tomhicks/themera"}>
              Github
            </Link>
          </Text>
          <Text color={"gray.500"}>
            <Link
              isExternal
              href={"https://twitter.com/Hicksyfern"}
              whiteSpace="pre"
            >
              👋 {"  "}I made this
            </Link>
          </Text>
        </Stack>
      </Stack>
      <Stack isInline spacing={12}>
        <Stack flexGrow={1} spacing={8}>
          <Heading size="lg">Components</Heading>

          <Tabs>
            <TabList>
              <Tab>Buttons</Tab>
              <Tab>Alerts</Tab>
              <Tab>Progress</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack spacing={8} my={4}>
                  <Wrap>
                    {colors.map((color) => {
                      return (
                        <WrapItem key={color}>
                          <Button colorScheme={color}>
                            {color.toUpperCase()}
                          </Button>
                        </WrapItem>
                      )
                    })}
                  </Wrap>
                  <Wrap>
                    {colors.map((color) => {
                      return (
                        <WrapItem key={color}>
                          <Button variant="outline" colorScheme={color}>
                            {color.toUpperCase()}
                          </Button>
                        </WrapItem>
                      )
                    })}
                  </Wrap>

                  <Wrap>
                    {colors.map((color) => {
                      return (
                        <WrapItem key={color}>
                          <Button variant="ghost" colorScheme={color}>
                            {color.toUpperCase()}
                          </Button>
                        </WrapItem>
                      )
                    })}
                  </Wrap>
                </Stack>
              </TabPanel>

              <TabPanel>
                <Stack spacing={3}>
                  {["subtle", "solid", "left-accent", "top-accent"].map(
                    (variant) => {
                      return ([
                        "success",
                        "error",
                        "warning",
                        "info",
                      ] as const).map((status) => {
                        return (
                          <Alert status={status} variant={variant}>
                            <AlertIcon />
                            Data uploaded to the server. Fire on!
                          </Alert>
                        )
                      })
                    }
                  )}
                </Stack>
              </TabPanel>

              <TabPanel>
                <Wrap my={8}>
                  {colors.map((color) => {
                    return (
                      <WrapItem>
                        <Spinner size="xl" color={`${color}.500`} />
                      </WrapItem>
                    )
                  })}
                </Wrap>
                <Wrap my={8}>
                  {colors.map((color) => {
                    return (
                      <WrapItem>
                        <CircularProgress
                          size="100px"
                          value={Math.random() * 80 + 20}
                          color={`${color}.500`}
                        />
                      </WrapItem>
                    )
                  })}
                </Wrap>
                <Stack spacing={3}>
                  {colors.map((color) => {
                    return (
                      <Stack isInline>
                        <Progress
                          flex={1}
                          value={Math.random() * 80 + 20}
                          colorScheme={color}
                        />
                        <Progress
                          flex={1}
                          hasStripe
                          value={Math.random() * 80 + 20}
                          colorScheme={color}
                        />
                      </Stack>
                    )
                  })}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
        <Stack w={"xs"} flexShrink={0} spacing={8}>
          <Stack alignItems="flex-end" isInline>
            <Heading flex={1} size="lg">
              Colors
            </Heading>
            {Object.keys(config).length === 0 ? null : (
              <Button onClick={() => setConfig({})} variant={"ghost"} size="sm">
                Reset all
              </Button>
            )}
            <ExportButton />
          </Stack>

          <ColorPicker />
        </Stack>
      </Stack>
    </Container>
  )
}

const modalOpenAtom = atom(false)
const useModalOpen = () => useAtom(modalOpenAtom)

function ExportButton() {
  const [isOpen, setIsOpen] = useModalOpen()
  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="sm" variant="outline">
        Export
      </Button>
      <ExportModal />
    </>
  )
}

function ExportModal() {
  const [isOpen, setIsOpen] = useModalOpen()
  const override = useAtomValue(chakraColorAtom)

  const {value, onCopy} = useClipboard(
    JSON.stringify({colors: override}, null, 2).trim()
  )
  const toast = useToast()

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalCloseButton />
        <ModalHeader>Export your theme</ModalHeader>
        <ModalBody>
          <Stack spacing={6} isInline>
            <Box flex={1}>
              <Button
                mb={2}
                onClick={() => {
                  onCopy()
                  toast({
                    position: "top",
                    title: "Copied",
                    description:
                      "Your theme has been copied to your clipboard successfully.\n\nPlease share Themera on Twitter!",
                    isClosable: true,
                    status: "success",
                  })
                }}
              >
                Copy to clipboard
              </Button>
              <Textarea
                fontSize="sm"
                minH={500}
                p={2}
                borderRadius={"md"}
                shadow={"xs"}
                fontFamily="mono"
              >
                {value}
              </Textarea>
            </Box>
            <Box flex={1}>
              <Heading mb={2} mt={4} size="md">
                How to use this
              </Heading>
              <Text lineHeight="taller">
                Follow the guide{" "}
                <Link
                  isExternal
                  textDecor="underline"
                  color={"teal.500"}
                  href={
                    "https://chakra-ui.com/docs/theming/customize-theme#customizing-theme-tokens"
                  }
                >
                  here
                </Link>
                , placing the contents of the text area 👈 inside the{" "}
                <Code>extendTheme</Code> block.
              </Text>

              <Box
                bg={"gray.500"}
                color="white"
                mt={8}
                p={4}
                shadow="xl"
                rounded={"lg"}
              >
                If you found{" "}
                <Heading m={0} as="span" fontSize="md">
                  Themera
                </Heading>{" "}
                useful, please give it a{" "}
                <Link
                  textDecor="underline"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    "I made my @Chakra_UI color scheme using Themera"
                  )}&url=${encodeURI("https://themera.vercel.app")}`}
                >
                  shout out on Twitter
                </Link>{" "}
                :)
              </Box>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

function DarkSwitch() {
  const m = useColorMode()
  return (
    <Stack isInline alignItems="center">
      <Switch
        size="md"
        isChecked={m.colorMode === "dark"}
        onChange={m.toggleColorMode}
      />
      <Text color="gray.500" textAlign={"right"}>
        Dark mode
      </Text>
    </Stack>
  )
}

function ColorPicker() {
  const [config, setConfig] = useAtom(overrideConfigAtom)
  const theme = useTheme()

  return (
    <Stack spacing={6}>
      <Head>
        <title>Themera | Create Chakra UI Color Schemes in seconds</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {colors.map((color) => (
        <Box w="full">
          <Stack isInline alignItems="flex-end" my={1}>
            <Heading
              fontWeight="600"
              opacity={0.75}
              textTransform="uppercase"
              flex={1}
              size="xs"
            >
              {color}
            </Heading>
            <ConfigSetter
              onReset={() => {
                setConfig((old) => {
                  const clone = {...old}

                  delete clone[color]

                  return clone
                })
              }}
              defaultColor={theme.colors[color]["500"]}
              config={config[color]}
              colorKey={color}
              onChange={(v) => {
                setConfig((old) => ({
                  ...old,
                  [color]: {
                    centerColor: v,
                    darkest: {
                      lightness: 10,
                      rotate: 0,
                      saturate: 0,
                    },
                    lightest: {
                      lightness: 95,
                      rotate: 0,
                      saturate: 0,
                    },
                  },
                }))
              }}
            />
          </Stack>
          <Stack
            rounded="sm"
            shadow="md"
            overflow="hidden"
            h={3}
            spacing={0}
            key={color}
            isInline
          >
            {scale.map((num) => {
              return (
                <Tooltip label={theme.colors[color][num]}>
                  <Box key={num} bg={`${color}.${num}`} flex={1} />
                </Tooltip>
              )
            })}
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

function ConfigSetter(props: {
  colorKey: string
  config?: ColorConfig
  onChange: (color: string) => void
  onReset: () => void
  defaultColor: string
}) {
  return (
    <>
      {props.config ? (
        <Button variant="ghost" size="xs" onClick={props.onReset}>
          Reset
        </Button>
      ) : null}
      <Popover isLazy autoFocus={false}>
        <PopoverTrigger>
          <Button variant="outline" size="xs">
            Edit
          </Button>
        </PopoverTrigger>
        <PopoverContent p={0} width={"262px"}>
          <SketchPicker
            onChange={(r) => {
              props.onChange(r.hex)
            }}
            width={"240px"}
            color={props.config?.centerColor ?? props.defaultColor}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

const scale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].reverse()
const colors: Array<keyof DefaultChakraTheme["colors"]> = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "blue",
  "purple",
  "pink",
]
