import { createLabeledBlock } from "@macro-plugin/core";

export const task = createLabeledBlock('useTask$', '@builder.io/qwik');
export const vtask = createLabeledBlock('useVisibleTask$', '@builder.io/qwik', true);
