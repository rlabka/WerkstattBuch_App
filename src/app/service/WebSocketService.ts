import { Injectable } from '@angular/core';
import WebSocket from 'ws';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080/ws');
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }

  public receiveMessages(callback: (message: string) => void): void {
    this.socket.on('message', callback);
  }
}
