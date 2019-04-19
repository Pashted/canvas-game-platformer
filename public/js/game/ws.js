define(['log'], log => {
    return {
        socket: {},
        connect() {
            return new Promise(resolve => {

                this.socket = new WebSocket(`ws://${window.location.hostname}:8081/`);

                this.socket.onopen = resolve;

                this.socket.onclose = event => {
                    if (event.wasClean)
                        console.log('Connection closed clean');
                    else
                        console.log('Connection lost'); // eg, server's process kill

                    console.log('Code: ' + event.code + ' reason: ' + event.reason);
                };

                this.socket.onerror = error => console.log("Error " + error.message);

            });
        },

        check() {
            console.log('Соединение установлено');

            return new Promise((resolve, reject) => {

                this.socket.send(JSON.stringify({ method: 'check' }));

                this.socket.onmessage = event => {
                    console.log("RES: check", event.data);

                    let res = JSON.parse(event.data);

                    if (res.method === 'check') {
                        if (res.status === 'OK')
                            resolve();
                        else
                            reject(res.status);
                    }
                };

            });
        },

        login(char) {

            return new Promise((resolve, reject) => {

                this.socket.send(JSON.stringify({ method: 'login', char }));

                this.socket.onmessage = event => {
                    console.log("RES: check", event.data);

                    let res = JSON.parse(event.data);

                    if (res.method === 'login') {
                        if (res.status === 'OK')
                            resolve();
                        else
                            reject(res.status);
                    }
                };

            });

        }

    }
});