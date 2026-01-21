import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { form, Field, required, validate } from '@angular/forms/signals';

interface Person {
  name: string;
  age: number;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Field],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('Person Forms Demo');

  // Step 1: Create a form model with signal()
  personModel = signal<Person>({
    name: '',
    age: 0,
  });

  // Step 2: Pass the form model to form() to create a FieldTree
  personForm = form(this.personModel, (schemaPath) => {
    // Add validation rules
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.age, { message: 'Age is required' });
    validate(schemaPath.age, ({ value }) => {
      if (value() < 0) {
        return {
          kind: 'age-error',
          message: 'Age must be non-negative',
        };
      }

      if (value() < 18 || value() > 65) {
        return null;
      }

      return {
        kind: 'age-error',
        message: 'Age must be between lower than 18 or higher than 65',
      };
    });
  });

  // Read the current model and perform submit logic
  onSubmit(event: Event) {
    event.preventDefault();
    const person = this.personModel();
    console.log('Submitted person:', person);
    // e.g., send person to an API or service
  }
}
