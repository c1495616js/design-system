import StyleDictionary from "style-dictionary";

const sd = new StyleDictionary("config.json");

const sdExtended = await sd.extend(/** extend in the future */);

await sdExtended.buildAllPlatforms();
