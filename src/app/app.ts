import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { form, Field, required, validate, validateHttp, debounce } from '@angular/forms/signals';

interface Person {
  name: string;
  age: number;
}

interface ValidationResponse {
  valid: boolean;
  error: string | null;
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
  private readonly http = inject(HttpClient);

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

    // Debounce the name field to delay validation until user stops typing
    debounce(schemaPath.name, 500); // Wait 500ms after user stops typing

    // Use Angular's built-in validateHttp for HTTP validation with pending() state
    validateHttp(schemaPath.name, {
      // Function that returns the URL string for the HTTP request
      request: ({ value }) => {
        const nameValue = value();
        // Skip HTTP validation if name is empty (required validator handles this)
        if (!nameValue || nameValue.trim() === '') {
          return undefined;
        }

        // Return the URL string - validateHttp will make the GET request
        const url = `http://localhost:3001/verify?name=${encodeURIComponent(nameValue)}`;
        console.log('Validating via HTTP:', url);
        return url;
      },
      // Map the server response to validation errors
      onSuccess: (response: ValidationResponse) => {
        if (response.valid) {
          return []; // Valid - no errors
        } else {
          return [
            {
              kind: 'name-error',
              message: response.error || 'Invalid name',
            },
          ];
        }
      },
      // Handle HTTP errors
      onError: (error: unknown) => {
        console.error('Validation error:', error);
        return [
          {
            kind: 'name-error',
            message: 'Validation failed. Please try again.',
          },
        ];
      },
    });

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
