import { ErrorHandler, Injectable } from '@angular/core';
// import * as StackTrace from 'stacktrace-js';
// npm i stacktrace-js --save to use "stacktrace-js": "^2.0.0",

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    // https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c

    constructor() { }

    handleError(error: any): void {

        //  const logStash = this.injector.get(LogStashLoggingService);
        const message = error.message ? error.message : error.toString();

        // get the stack trace, lets grab the last 10 stacks only
        // StackTrace.fromError(error).then(stackframes => {
        //     const stackString = stackframes
        //         .splice(0, 20)
        //         .map(function (sf) {
        //             return sf.toString();
        //         }).join('\n');


        //     // curl -XPUT 'http://192.168.1.22:5001/zem-webapi' -d 'hello' // this works, but request has to be cancelled manually in curl.
        //     // stays pending in the browser.

        //     // const logstashUrl = 'http://192.168.1.22:5001/zem-webapi'; // logstash on sandbox
        //     // StackTrace.report(stackframes, logstashUrl, 'Hello Logstash').then(x => {
        //     //    console.log('sent', x); // todo: this hangs in the browser, just log to console for now
        //     //});

        //     // for now, log to console
        //     console.error(message);
        //     console.error(stackString);
        // });

        console.error(message);
        console.error(error);
        throw error;
    }

}

