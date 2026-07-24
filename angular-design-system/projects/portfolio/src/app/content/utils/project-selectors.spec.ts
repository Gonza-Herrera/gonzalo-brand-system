import { EN_PROJECTS_CONTENT } from '../en/projects.content';
import {
  createLocalizedProjectPath,
  findProjectBySlug,
  selectFeaturedProjects,
  selectProjectsInEditorialOrder,
  selectRelatedProjects,
} from './project-selectors';

describe('project selectors', () => {
  const projects = EN_PROJECTS_CONTENT.items;

  it('creates stable localized project paths', () => {
    expect(createLocalizedProjectPath('en', 'angular-design-system')).toBe(
      '/en/projects/angular-design-system',
    );
    expect(createLocalizedProjectPath('es', 'ai-code-review-assistant')).toBe(
      '/es/projects/ai-code-review-assistant',
    );
  });

  it('orders projects editorially without mutating the input', () => {
    const input = [projects[2], projects[0], projects[3], projects[1]];
    const inputOrder = input.map((project) => project.id);

    expect(selectProjectsInEditorialOrder(input).map((project) => project.id)).toEqual([
      'angular-design-system',
      'ai-code-review-assistant',
      'angular-accelerator-kit',
      'ai-toolkit-for-developers',
    ]);
    expect(input.map((project) => project.id)).toEqual(inputOrder);
  });

  it('selects featured projects in editorial order without mutation', () => {
    const input = [...projects].reverse();
    const snapshot = input.map((project) => project.id);

    expect(selectFeaturedProjects(input).map((project) => project.id)).toEqual([
      'angular-design-system',
    ]);
    expect(input.map((project) => project.id)).toEqual(snapshot);
  });

  it('finds projects by stable slug and returns undefined for unknown values', () => {
    expect(findProjectBySlug(projects, 'angular-design-system')?.id).toBe('angular-design-system');
    expect(findProjectBySlug(projects, 'unknown-project')).toBeUndefined();
  });

  it('selects deterministic related projects without the current project', () => {
    const current = projects[0];
    const snapshot = projects.map((project) => project.id);
    const related = selectRelatedProjects(current, projects, 3);

    expect(related).toHaveLength(3);
    expect(related.map((project) => project.id)).not.toContain(current.id);
    expect(related[0]?.id).toBe('angular-accelerator-kit');
    expect(projects.map((project) => project.id)).toEqual(snapshot);
    expect(selectRelatedProjects(current, [], 3)).toEqual([]);
    expect(selectRelatedProjects(current, projects, 0)).toEqual([]);
  });
});
