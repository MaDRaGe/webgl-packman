function wsConnect() {
  const connection: WebSocket = new WebSocket('ws://localhost:8080/');
  connection.onopen = (): void => {
    connection.send('hey');
  }
  connection.onmessage = (event: MessageEvent): void => {
    console.log(event.data);
  }
}
export {wsConnect};