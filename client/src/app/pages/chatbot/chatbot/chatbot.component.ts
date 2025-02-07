import { Component, inject } from '@angular/core';
import { HiveGptModule } from '@hivegpt/angular'
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-chatbot',
  imports: [HiveGptModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent {
  messages: any = [];
  userInput: string = '';

  // hiveGPTService = inject(HiveGPTService)

  ngOnInit(): void {}

  // sendMessage() {
  //   if (this.userInput.trim()) {
  //     this.messages.push({ content: this.userInput, sentBy: 'user' });
  //     this.getBotResponse(this.userInput);
  //     this.userInput = '';
  //   }
  // }

  // async getBotResponse(userMessage: string) {
  //   try {
  //     const response = await this.hiveGPTService.sendMessage(userMessage);
  //     this.messages.push({ content: response.message, sentBy: 'bot' });
  //   } catch (error) {
  //     this.messages.push({
  //       content: 'Error: Unable to get response from bot.',
  //       sentBy: 'bot',
  //     });
  //   }
  // }
}
