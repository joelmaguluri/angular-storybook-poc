# Storybook Documentation for Angular Components

## Overview
This document demonstrates how to use **Storybook** with Angular components. Storybook provides an interactive UI for testing and validating component behavior under different scenarios.

## Setting Up Storybook for Angular
To integrate **Storybook** into your Angular project, follow these steps:

1. Install Storybook:
   ```sh
   npx storybook@latest init
   ```
2. Verify that Storybook has been added to your project by running:
   ```sh
   npm run storybook
   ```
3. Create a new Storybook file for your component inside `src/stories/component.stories.ts`.

## Storybook Configuration
The Storybook configuration for an Angular component follows this structure:

```typescript
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { within, fireEvent } from '@storybook/test';
import { CommonModule } from '@angular/common';
import { MyComponent } from './my-component.component';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
} as Meta<MyComponent>;

const Template: StoryFn<MyComponent> = (args: MyComponent) => ({
  component: MyComponent,
  props: args,
});
```

## Storybook Scenarios
### Default Scenario
This scenario renders the component without any modifications.
```typescript
export const Default = Template.bind({});
Default.args = {};
```

### Interactive Scenario
This scenario demonstrates user interactions and testing.
```typescript
export const Interactive = Template.bind({});
Interactive.args = {};
Interactive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Example interaction
  const button = await canvas.getByRole('button', { name: /click me/i });
  await fireEvent.click(button);
};
```

## Running Storybook
To launch Storybook and test the components in different scenarios, run:
```sh
npm run storybook
```
This will open an interactive UI where you can validate component functionality.

## Conclusion
Storybook provides a structured way to test UI components in isolation. The provided scenarios help ensure components behave correctly under different user interactions. 🚀

