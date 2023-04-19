import type { Config } from "@macro-plugin/core"

export type LoaderOptions = Config & {
 sourceMap?: string | boolean
 customize?: boolean
 cacheDirectory?: boolean
 cacheIdentifier?: boolean
 cacheCompression?: boolean
 metadataSubscribers?: boolean
}
