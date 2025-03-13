import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { within, fireEvent } from '@storybook/test';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';

export default {
  title: 'Components/Quiz',
  component: QuizComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
} as Meta<QuizComponent>;

const Template: StoryFn<QuizComponent> = (args: QuizComponent) => ({
  component: QuizComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};

// 📌 Updated "AllCorrect" story with proper play function
export const AllCorrect = Template.bind({});
AllCorrect.args = {};
AllCorrect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Select correct answers
  const firstQuestionCorrect = await canvas.getByLabelText('Paris');
  const secondQuestionCorrect = await canvas.getByLabelText('4');

  await fireEvent.click(firstQuestionCorrect);
  await fireEvent.click(secondQuestionCorrect);

  // Click Submit button
  const submitButton = await canvas.getByRole('button', { name: /submit/i });
  await fireEvent.click(submitButton);

  // Verify the result shows "2/2"
  await canvas.findByText(/2\/2/i);
};



// 📌 Updated "SOME are Correct" story with proper play function
export const SomeInCorrect = Template.bind({});
SomeInCorrect.args = {};
SomeInCorrect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Select correct answers
  const firstQuestionCorrect = await canvas.getByLabelText('Paris');
  const secondQuestionCorrect = await canvas.getByLabelText('3');

  await fireEvent.click(firstQuestionCorrect);
  await fireEvent.click(secondQuestionCorrect);

  // Click Submit button
  const submitButton = await canvas.getByRole('button', { name: /submit/i });
  await fireEvent.click(submitButton);

  // Verify the result shows "2/2"
  await canvas.findByText(/1\/2/i);
};
