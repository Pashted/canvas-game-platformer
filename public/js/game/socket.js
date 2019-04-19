define(['io', 'log'], (io, log) => {
    return {
        socket: {},
        connect() {
            return new Promise(resolve => {
                this.socket = io();

                resolve();
            });
        },

        check() {
            return new Promise(resolve => {
                this.socket.emit('check');

                this.socket.on('check', status => {

                    console.log('check status', status);

                    if (status === 'OK')
                        resolve();
                    else
                        log.write('system', "Статус сервера: " + status);

                });
            });
        },

        login(char) {

            return new Promise(resolve => {

                this.socket.emit('login', char);

                this.socket.on('login', res => {

                    console.log('login response', res);

                    if (res.status === 'OK')
                        log.write('system', `<span style="color:${res.color}">${res.name}</span> в игре`);

                    else if (res.status === 'FULL')
                        log.write('system', "Статус сервера: " + res.status);

                });

                this.socket.on('game_start', () => resolve());

            });

        },
    }
});