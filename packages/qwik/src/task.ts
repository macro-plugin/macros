import { createLabeledBlock } from "@macro-plugin/core"

export const task = createLabeledBlock("task", "useTask$", "@builder.io/qwik")
export const vtask = createLabeledBlock("vtask", "useVisibleTask$", "@builder.io/qwik", true)
