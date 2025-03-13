import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule], // 👈 Import CommonModule for *ngFor and *ngIf
  template: `
    <div class="quiz-container">
      <h2>Quiz</h2>
      <div *ngFor="let question of questions(); let i = index">
        <p>{{ i + 1 }}. {{ question.text }}</p>
        <div *ngFor="let option of question.options">
          <label>
            <input type="radio" [name]="'q' + i" [value]="option" (change)="selectAnswer(i, option)" />
            {{ option }}
          </label>
        </div>
      </div>
      <button (click)="submitQuiz()">Submit</button>
      <p *ngIf="score() !== null">Your Score: {{ score() }}/{{ questions().length }}</p>
    </div>
  `,
  styles: [
    `
    .quiz-container {
      max-width: 600px;
      margin: auto;
      font-family: Arial, sans-serif;
    }
    p { font-weight: bold; }
    `
  ]
})
export class QuizComponent {
  questions = signal([
    {
      text: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      answer: 'Paris'
    },
    {
      text: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      answer: '4'
    }
  ]);

  selectedAnswers = signal<{ [key: number]: string }>({});
  score = signal<number | null>(null);

  selectAnswer(questionIndex: number, selectedOption: string) {
    this.selectedAnswers.update((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  }

  submitQuiz() {
    let correctCount = 0;
    this.questions().forEach((q, i) => {
      if (this.selectedAnswers()[i] === q.answer) {
        correctCount++;
      }
    });
    this.score.set(correctCount);
  }
}
