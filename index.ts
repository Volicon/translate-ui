export type Vocabulary = {
    [ lang : string ] : Words
}

export type Words = {
    [ phrase : string ] : string
}

export class Translator {
    // Current language  
    static language = 'en'
    
    // Unknown words
    unknown : Words
    
    // Auto-bound translation function
    _t : ( text : string ) => string    
    
    // Create root translator
    constructor( public vocabulary : Vocabulary, public parent? : Translator ){
        vocabulary[ 'en' ] || ( vocabulary[ 'en' ] = {} );
        
        this.unknown = {};
        this._t      = text => this.translate( text );
    }

    // Create child translator. If it fails, it forward request to parent.
    extend( vocabulary : Vocabulary ){
        return new Translator( vocabulary, this );
    }

    // JSON.stringify( rootTranslator ) in the console will help you to create empty vocabulary
    toJSON(){
        return this.unknown;
    }

    toString(){
        return Object.keys( this.unknown ).join( '; ' );
    }

    private translate( text : string ){
        const lang       = Translator.language,
              translated = this.vocabulary[ lang ][ text ];

        if( translated !== void 0 ) return translated;

        if( this.parent ) return this.parent.translate( text );

        // No translation found. Process.
        if( this.unknown[ text ] === void 0 && lang !== 'en' ){
            this.unknown[ text ] = '';
            console.warn( `[Localization] No translation for "${ text }"` );
        }

        return text;
    }
}