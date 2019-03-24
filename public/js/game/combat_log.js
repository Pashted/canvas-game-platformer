define(() => {
    return {
        list: $('#combat-log'),
        write(text) {
            this.list.append(text + "<br>");
        }
    }
});