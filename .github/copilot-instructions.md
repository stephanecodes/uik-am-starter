# UIK Angular Material Starter - Development Rules

## Core Principles

- **TypeScript First**: Use strict typing, interfaces in `src/app/shared/types/`
- **Material Design**: Angular Material components over custom UI
- **Responsive**: Bootstrap grid + UIK utilities
- **Accessibility**: Semantic HTML5, ARIA attributes
- **Component Isolation**: `:host` selectors, SCSS from `src/theme/`

## Architecture Standards

### Components

```typescript
@Component({
  selector: 'app-[feature-name]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // imports, template, styles...
})
```

- Standalone components with OnPush detection
- Angular signals for state management
- Feature-based organization in modules

### State Management Pattern

```typescript
interface ComponentState<T> {
  loading: boolean;
  error: string | null;
  data: T[] | null;
}
```

- Always handle loading/error/empty states
- Use Angular Material snackbar for notifications
- Mock services for development/testing

### Styling Rules

- BEM methodology for custom classes
- Theme variables from `src/theme/`
- Bootstrap utilities for layout
- UIK design tokens consistency

## Code Quality Requirements

- **No `any` types** - Explicit TypeScript interfaces
- **Shared Components** - Reusable in `src/app/shared/components/`
- **Barrel Exports** - Use `index.ts` for clean imports
- **Testing** - Unit tests with 80%+ coverage
- **Performance** - Lazy loading, tree-shaking, virtual scrolling

## Template Guidelines

- Use `@if` and `@for` control flow
- TrackBy functions for loops
- Proper loading/error/empty state templates
- ARIA labels and accessibility attributes

## Quick Reference

- **Data Models**: `src/app/shared/types/`
- **Shared Components**: `src/app/shared/components/`
- **Theme System**: `src/theme/`
- **Testing**: Jasmine/Karma with Angular Testing Utilities
- **Linting**: Prettier/ESLint compliance required

**Priority Order**: User experience → Design system consistency → Performance → Code maintainability
