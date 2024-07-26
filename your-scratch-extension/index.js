const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

let blocks = [];
class Scratch3YourExtension {

    constructor (runtime) {
        // put any setup for your extension here
    }

    /**
     * Returns the metadata about your extension.
     */
    getInfo () {
        return {
            // unique ID for your extension
            id: 'yourScratchExtension',

            // name that will be displayed in the Scratch UI
            name: 'ATR',

            // colours to use for your extension blocks
            color1: '#000099',
            color2: '#660066',

            // icons to display
            blockIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',
            menuIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',

            // your Scratch blocks
            blocks: [
                {
                    // name of the function where your block code lives
                    id: 'block1',
                    opcode: 'myFirstBlock',

                    // type of block - choose from:
                    //   BlockType.REPORTER - returns a value, like "direction"
                    //   BlockType.BOOLEAN - same as REPORTER but returns a true/false value
                    //   BlockType.COMMAND - a normal command block, like "move {} steps"
                    //   BlockType.HAT - starts a stack if its value changes from false to true ("edge triggered")
                    blockType: BlockType.REPORTER,

                    // label to display on the block
                    text: 'My first block [MY_NUMBER] and [MY_STRING]',

                    // true if this block should end a stack
                    terminal: false,

                    // where this block should be available for code - choose from:
                    //   TargetType.SPRITE - for code in sprites
                    //   TargetType.STAGE  - for code on the stage / backdrop
                    // remove one of these if this block doesn't apply to both
                    filter: [ TargetType.SPRITE, TargetType.STAGE ],

                    // arguments used in the block
                    arguments: {
                        MY_NUMBER: {
                            // default value before the user sets something
                            defaultValue: 123,

                            // type/shape of the parameter - choose from:
                            //     ArgumentType.ANGLE - numeric value with an angle picker
                            //     ArgumentType.BOOLEAN - true/false value
                            //     ArgumentType.COLOR - numeric value with a colour picker
                            //     ArgumentType.NUMBER - numeric value
                            //     ArgumentType.STRING - text value
                            //     ArgumentType.NOTE - midi music value with a piano picker
                            type: ArgumentType.NUMBER
                        },
                        MY_STRING: {
                            // default value before the user sets something
                            defaultValue: 'hello',

                            // type/shape of the parameter - choose from:
                            //     ArgumentType.ANGLE - numeric value with an angle picker
                            //     ArgumentType.BOOLEAN - true/false value
                            //     ArgumentType.COLOR - numeric value with a colour picker
                            //     ArgumentType.NUMBER - numeric value
                            //     ArgumentType.STRING - text value
                            //     ArgumentType.NOTE - midi music value with a piano picker
                            type: ArgumentType.STRING
                        }
                    }
                },
                {
                    id: 'block2',
                    opcode: 'saySomething',
                    blockType: BlockType.COMMAND,
                    text: 'Say [TEXT]',
                    terminal: false,
                    filter: [TargetType.SPRITE, TargetType.STAGE],
                    arguments: {
                        TEXT: {
                            defaultValue: 'Hello',
                            type: ArgumentType.STRING
                        }
                    }

                },
                {
                    opcode: 'displayStudentInfo',
                    blockType: BlockType.COMMAND,
                    text: 'Enter Name[NAME], Roll No.[Num], Class[Grade]',
                    terminal: false,
                    filter: [TargetType.SPRITE, TargetType.STAGE],
                    arguments: {
                        NAME: {
                            defaultValue: 'ABC',
                            type: ArgumentType.STRING
                        },
                        Num: {
                            defaultValue: '123',
                            type: ArgumentType.STRING
                        },
                        Grade: {
                            defaultValue: '4',
                            type: ArgumentType.STRING
                        }
                    }
                },
                {
                    opcode: 'printBlocks',
                    blockType: BlockType.COMMAND,
                    text: 'Print Blocks',
                    terminal: false,
                    filter: [TargetType.SPRITE, TargetType.STAGE],

                }
            ]
        };
    }


    /**
     * implementation of the block with the opcode that matches this name
     *  this will be called when the block is used
     */
    myFirstBlock ({ MY_NUMBER, MY_STRING }) {
        this.addBlockToList('block1');
        // example implementation to return a string
        return MY_STRING + ' : doubled would be ' + (MY_NUMBER * 2);
    }

    saySomething ({TEXT}){
        this.addBlockToList('block2');
        console.log( 'User Entered: '+ TEXT);
    }

    displayStudentInfo ({NAME, Num, Grade}) {
        const currentTime = new Date().toLocaleString();
        console.log('Name:'+ NAME +', Roll_No:'+ Num +', Grade:'+ Grade + ', Time:' + currentTime);
    }

    addBlockToList(blockID){
        blocks.push(blockID);
    }
    printBlocks(){
        console.log('Block List: ', blocks);
    }
  
}

module.exports = Scratch3YourExtension;
