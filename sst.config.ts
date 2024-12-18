/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: 'eat-fit',
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            home: 'aws',
        };
    },
    async run() {
        new sst.aws.Nextjs('eat-fit', {
            domain: {
                name: 'eat-fit.net',
            },
        });
    },
});
