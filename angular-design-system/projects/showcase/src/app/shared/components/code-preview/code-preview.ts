import { Component, input } from '@angular/core';

@Component({
  selector: 'showcase-code-preview',
  standalone: true,
  templateUrl: './code-preview.html',
  styleUrl: './code-preview.scss',
})
export class CodePreview {
  readonly code = input.required<string>();
  readonly label = input('Code example');
}
