import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ChatClientDto } from './chat-client.dto';
import { ChatMessageDto } from './chat-message.dto';
import { WelcomeDto } from './welcome.dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatClient: ChatClientDto | undefined;

  constructor(private socket: Socket) { }

  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }

  sendTyping(typing: boolean): void {
    this.socket.emit('typing', typing);
  }

  listenForMessages(): Observable<ChatMessageDto> {
    return this.socket
      .fromEvent<ChatMessageDto>('newMessage');
  }

  listenForClients(): Observable<ChatClientDto[]> {
    return this.socket
      .fromEvent<ChatClientDto[]>('clients');
  }

  listenForWelcome(): Observable<WelcomeDto> {
    return this.socket
      .fromEvent<WelcomeDto>('welcome');
  }

  listenForClientTyping(): Observable<ChatClientDto> {
    return this.socket
      .fromEvent<ChatClientDto>('clientTyping');
  }

  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('chat-error');
  }

  listenForConnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('connect')
        .pipe(
          map(() => {
            return this.socket.ioSocket.id;
        })
      );
  }

  listenForDisconnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('disconnect')
        .pipe(
          map(() => {
            return this.socket.ioSocket.id;
        })
      );
  }

  sendNickname(nickname: string): void {
    this.socket.emit('nickname', nickname);
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  connect(): void {
    this.socket.connect();
  }

}
