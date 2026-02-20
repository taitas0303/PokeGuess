// 全ポケモンの日本語名・英語名マッピングとID
// 実装上は、初回にAPIから取得してlocalStorageに保存するか、ビルド時に含めるのが理想的です。
// ここでは軽量化のため、主要なポケモンの簡易リストを用意します。
export const POKEMON_LIST = [
    { id: 1, name: "bulbasaur", ja: "フシギダネ" },
    { id: 4, name: "charmander", ja: "ヒトカゲ" },
    { id: 7, name: "squirtle", ja: "ゼニガメ" },
    { id: 25, name: "pikachu", ja: "ピカチュウ" },
    // ... 本来は全リストが必要
];

export const typeTranslations = {
    normal: "ノーマル",
    fire: "ほのお",
    water: "みず",
    grass: "くさ",
    electric: "でんき",
    ice: "こおり",
    fighting: "かくとう",
    poison: "どく",
    ground: "じめん",
    flying: "ひこう",
    psychic: "エスパー",
    bug: "むし",
    rock: "いわ",
    ghost: "ゴースト",
    dragon: "ドラゴン",
    dark: "あく",
    steel: "はがね",
    fairy: "フェアリー"
};
