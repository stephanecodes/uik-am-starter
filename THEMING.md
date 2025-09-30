# Application Component Themes

This folder contains the theme files for custom application components. Unlike the default Angular approach where styles are co-located with components, this project centralizes all theming in the `src/theme/` directory for better organization and maintainability.

## Theming Philosophy

### Centralized vs Co-located Styles

**Traditional Angular approach:**
```
src/app/layout/main-layout/
├── main-layout.component.ts
├── main-layout.component.html
└── main-layout.component.scss  ← Styles next to component
```

**This project's approach:**
```
src/app/layout/main-layout/
├── main-layout.component.ts
└── main-layout.component.html

src/theme/components/app/
└── _main-layout.scss  ← Centralized theming
```

## How to Create Component Themes

### Step 1: Create Theme File

For each application component, create a corresponding SCSS file with an underscore prefix:

```scss
// _main-layout.scss
.app-main-layout {
  display: flex;
  min-height: 100vh;
  
  .sidebar {
    background: var(--app-sidebar-bg);
    width: 250px;
  }
  
  .content {
    flex: 1;
    padding: 1rem;
  }
}
```

### Step 2: Reference in `_all.scss`

Add the component theme file to `_all.scss` in the same directory:

```scss
@forward './main-layout';
@forward './page-layout';
@forward './page-header';
```


## File Structure

```
theme/components/app/
├── README.md
├── _main-layout.scss     # MainLayoutComponent styles
├── _page-layout.scss     # PageLayoutComponent styles
└── _page-header.scss     # PageHeaderComponent styles
```

## Naming Convention

- **File naming**: `_{component-name}.scss`
- **Match component names**: Use kebab-case matching the component selector
- **Class naming**: Use BEM methodology or component-scoped classes

## Best Practices

### 1. **Component Scoping**
Always scope styles to the component's root class:

```scss
// ✅ Good - scoped to component
.app-main-layout {
  // styles here
}

// ❌ Bad - global styles
.sidebar {
  // affects all sidebars globally
}
```

### 2. **Use Theme Variables**
Leverage CSS custom properties for theming:

```scss
.app-main-layout {
  background: var(--app-background);
  color: var(--app-text-color);
}
```

### 3. **Component Communication**
Use CSS custom properties to pass values between parent and child components:

```scss
// Parent component
.app-main-layout {
  --sidebar-width: 250px;
}

// Child component can use this value
.app-sidebar {
  width: var(--sidebar-width, 200px);
}
```

## Integration with Component Files

Components reference their theme classes in templates:

```typescript
// main-layout.component.ts
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  // No styleUrls - styles are in centralized theme
})
export class MainLayoutComponent {
  // Use HostBinding to apply root class
  @HostBinding('class') class = 'app-main-layout';
}
```

This approach ensures clean separation of concerns while maintaining powerful theming capabilities.
