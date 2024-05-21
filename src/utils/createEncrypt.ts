/**
 * ID编码生成类
 */

export class CreateEncrypt {
    guid(): string {
        // eg: "a1ca0f7b-51bd-4bf3-a5d5-6a74f6adc1c7"
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            },
        );
    }
    uuid(): string {
        // eg: "ffb7cefd-02cb-4853-8238-c0292cf988d5"
        var s = [];
        var hexDigits = '0123456789abcdef';
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-';

        var uuid = s.join('');
        return uuid;
    }
    nanoid(size: number = 21): string {
        // eg: "AfRTJv9hRo42vKKUDBQLX"
        let urlAlphabet =
            'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
        let id = '';
        // A compact alternative for `for (var i = 0; i < step; i++)`.
        let i = size;
        while (i--) {
            // `| 0` is more compact and faster than `Math.floor()`.
            id += urlAlphabet[(Math.random() * 64) | 0];
        }
        return id;
    }
}
