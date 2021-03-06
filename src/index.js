import chalk from 'chalk';

export default (name) => {
    return {
        name: 'Log',
        setup(build) {
            let time;

            build.onStart(() => {
                time = new Date();
                if (name) {
                    console.log(`Build started for ${chalk.green(name)}`);
                }
                else {
                    console.log(`Build started`);
                }
            });

            build.onEnd(() => {
                if (name) {
                    console.log(`Build ended ${chalk.green(name)}: ${chalk.yellow(`${new Date() - time}ms`)}`);
                }
                else {
                    console.log(`Build ended: ${chalk.yellow(`${new Date() - time}ms`)}`);
                }
            });
        },
    }
}
