export declare type Vocabulary = {
    [lang: string]: Words;
};
export declare type Words = {
    [phrase: string]: string;
};
export declare class Translator {
    parent: Translator;
    vocabulary: Vocabulary;
    static language: string;
    unknown: Words;
    _t: (text: string) => string;
    constructor(parent: Translator, vocabulary: Vocabulary);
    extend(vocabulary: Vocabulary): Translator;
    toJSON(): {
        [phrase: string]: string;
    };
    toString(): string;
    private translate(text);
}
