# Angular Material Component Overrides

This folder is reserved for overriding Angular Material components. Each Material component can be customized by creating a corresponding SCSS file with custom styles.

## How to Override a Component

### Step 1: Create Component Override File

For example, to override `mat-badge`, create a `_badge.scss` file and add custom styles:

```scss
.mat-badge {
  --mat-badge-legacy-font-size: 0.75rem;
  --mat-badge-font-size: 0.75rem;
  --mat-badge-legacy-height: 1.5rem;
  --mat-badge-height: 1.5rem;
}
```

### Step 2: Include in `_all.scss`

Add the component file to the `_all.scss` file in the same directory:

```scss
@forward 'badge';
```

## File Structure Example

```
material/
├── README.md
├── _badge.scss       # Badge component overrides
├── _button.scss      # Button component overrides
├── _card.scss        # Card component overrides
└── _toolbar.scss     # Toolbar component overrides
```

## Naming Convention

- Use underscore prefix: `_component-name.scss`
- Match Angular Material component names (without `mat-` prefix)
- Use kebab-case for multi-word components

## Best Practices

- Target specific CSS custom properties when available
- Use Material's theming system when possible
- Keep overrides minimal and purposeful
