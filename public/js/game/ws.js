define(() => {
   return {
       socket: {},
       connect() {
           return new Promise(resolve => {
               this.socket = new WebSocket(`ws://${window.location.hostname}:8081/`);

               this.socket.onopen = function() {
                   console.log("Соединение установлено.");
                   resolve();
               };

               this.socket.onclose = function(event) {
                   if (event.wasClean) {
                       console.log('Соединение закрыто чисто');
                   } else {
                       console.log('Обрыв соединения'); // например, "убит" процесс сервера
                   }
                   console.log('Код: ' + event.code + ' причина: ' + event.reason);
               };

               this.socket.onmessage = function(event) {
                   console.log("Получены данные " + event.data);
               };

               this.socket.onerror = function(error) {
                   console.log("Ошибка " + error.message);
               };
           });
       }
   }
});