# Caesar cipher CLI tool

In this CLI app you can decode/encode some text which is written in English letters. You can use lowercase and uppercase letters. Encoding / decoding using Caesar's encryption algorithm.

### Installation

To installation app you have to install the following dependencies:

```sh
$ npm install commander through2
```
or you can use
```sh
$ npm install
```
and all of the necessary dependencies will be installed

### Using

For decoding/encoding you can use input and output files. If you don't use input/outpit files, then reading and writing will come from process.stdin/process.stdout.

With each new decoding operation, the output file won't overwriteng. It will be added to the existing text.

### Comands

```sh
$ node index --action encode --shift 10 --input input.txt --output output.txt 
```

| Commands | Short form | Description |
|:------:|:------:| ------ |
| node |  | to start cli application. *index* is the file name of the application's main file.|
| action | -a | It's the required parameter. Here you indicate which of the actions you want to use. *encode* is for encoding text, *decode* is for decoding text.|
| shift | -s | It's the required parameter. *10* is the number that determines the amount of offset letter.|
| input | -i | It's the optional parameter. Here you have to indicate path to the file with which you want to perform the action.|
| output | -o  | It's the optional parameter. Here you have to indicate path to the file in which you want to save the result.|
