import { Component, input } from '@angular/core';

@Component({
  selector: 'showcase-documentation-section',
  standalone: true,
  templateUrl: './documentation-section.html',
  styleUrl: './documentation-section.scss',
})
export class DocumentationSection {
  readonly sectionId = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>();
}
