export declare type Vocabulary = {
    [lang: string]: Words;
};
export declare type Words = {
    [phrase: string]: string;
};
export declare class Translator {
    vocabulary: Vocabulary;
    parent: Translator;
    static language: string;
    unknown: Words;
    _t: (text: string) => string;
    constructor(vocabulary: Vocabulary, parent?: Translator);
    extend(vocabulary: Vocabulary): Translator;
    toJSON(): {
        [phrase: string]: string;
    };
    toString(): string;
    private translate(text);
}
