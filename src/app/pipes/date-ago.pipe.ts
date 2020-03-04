import {Pipe, PipeTransform} from '@angular/core';
// Pulled from https://gist.github.com/shifatul-i/cfacd00f6d36a7d6d03aa52f33ca23fd/
@Pipe({
    name: 'dateAgo',
    pure: true
})
export class DateAgoPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) { // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            }

            const intervalArray: ReadonlyArray<[string, number]> = [
                ['year', 31536000],
                ['month', 2592000],
                ['week', 604800],
                ['day', 86400],
                ['hour', 3600],
                ['minute', 60],
                ['second', 1]
            ];
            const intervalMap = new Map(intervalArray);
            let counter;
            for (const [intervalName, intervalValue] of intervalMap) {
                counter = Math.floor(seconds / intervalValue);
                if (counter > 0) {
                    if (counter === 1) {
                        return counter + ' ' + intervalName + ' ago'; // singular (1 day ago)
                    } else {
                        return counter + ' ' + intervalName + 's ago'; // plural (2 days ago)
                    }
                }
            }
        }
        return value;
    }

}
