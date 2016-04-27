![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)

Simple UI translator. Really simple. Will help you if you need quickly translate UI of your application to other languages.  

#Installation

     `npm install translate-ui`
      
Packaged as TypeScript and ES5 CommonJS module.
 
#Usage

1. You need to create empty root translator for your application:

    rootTranslator.js
    
```javascript
import { Translator } from 'translate-ui'

const translator = new Translator({
    // here are language dictionaries goes
    korean : {
        'My english phrase' : 'Korean translation',
        ...
    }
});

window._translator = translator; // it will help us later, be patient

translator.language = "korean"; //can be dynamically switched

export default translator;
```

2. In your JS, wrap your existing string resources to _t function call:

```javascript
import { _t } from 'rootTranslator'

something.innerHTML = _t( 'Hello World!' );

```

At this stage, nothing will change. _t will pass through phrases it doesn't know.
But you'll see following warnings in the console: 

    [Localization] No translation for "Hello World!"

3. Build vocabulary for translation:

In the browser's console, type:

    > JSON.stringify( _translator );
    "{"Hello World!":""}"
    
Here will be are all unknown phrases. Copy it, and send it for translation to Korean guy. 

4. When you received translated phrases, insert them into translator vocabulary.

```javascript
const translator = new Translator({
    // here are language dictionaries goes
    korean : {
        "Hello World!" : "?№*(?*(:№;?*%"
    }
});
```

Bingo. You're done.

# Advanced usage

There could be many translators in the system, assembled in hierarchies.

Lets create special local translator for some specific page, extending the vocabulary of the root translator:

```javascript
import translator from 'rootTranslator'

export default translator.extend({
    // here are language dictionaries goes
    korean : {
        "By-by, world." : "#$%#%$!!!"
    }
});
```

Then, use it as translator in your local page.

As you can expect, it will use local phrases vocabulary first, and when it fail, it will ask the parent.

You can have as many translators as you want. Wanna have one per View, or one per JS module? You're welcome, feel yourself at home.

#License

WTFPL (http://www.wtfpl.net/)