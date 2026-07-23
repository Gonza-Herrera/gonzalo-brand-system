import type { PortfolioContactFormValue } from '../models/contact-form.model';
import { normalizeContactFormValue } from './contact-form.utils';

describe('normalizeContactFormValue', () => {
  it('trims boundary whitespace, omits an empty company and preserves email case', () => {
    const value: PortfolioContactFormValue = {
      name: '  Gonzalo Herrera  ',
      email: '  Gonzalo.Herrera@domain.test  ',
      company: '   ',
      subject: '  Angular architecture  ',
      message: '  A message with enough useful context.  ',
    };
    const snapshot = { ...value };

    expect(normalizeContactFormValue(value)).toEqual({
      name: 'Gonzalo Herrera',
      email: 'Gonzalo.Herrera@domain.test',
      company: undefined,
      subject: 'Angular architecture',
      message: 'A message with enough useful context.',
    });
    expect(value).toEqual(snapshot);
  });

  it('preserves Unicode and internal message line breaks', () => {
    expect(
      normalizeContactFormValue({
        name: '  María  ',
        email: ' maria@domain.test ',
        company: ' Organización Ñ ',
        subject: ' Diseño de sistemas ',
        message: '  Primera línea.\n\nSegunda línea con información útil.  ',
      }),
    ).toEqual({
      name: 'María',
      email: 'maria@domain.test',
      company: 'Organización Ñ',
      subject: 'Diseño de sistemas',
      message: 'Primera línea.\n\nSegunda línea con información útil.',
    });
  });
});
