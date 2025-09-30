# UIK AM Starter

A comprehensive Angular starter project preconfigured with **UIK AM** (Visiativ's UI Kit for Angular Material) and a mock API server for rapid development.

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ and npm
- Angular 20+

Checkout the [Angular version compatibility](https://angular.dev/reference/versions) for actively supported versions.

### Getting started

1. This starter was built by following the [UIK Getting Started Guide](https://visiativ-design-system.azurewebsites.net/uik-am/20.x/guides/getting-started), ensuring a streamlined setup and best practices for new projects.

2. **Ask for access to the private npm registry** if you haven't already


## 📚 Documentation

- **UIK AM Documentation**: [https://visiativ-design-system.azurewebsites.net/uik-am/20.x](https://visiativ-design-system.azurewebsites.net/uik-am/20.x)

## 🛠 Development

### Available Scripts

| Command             | Description                                   | URL                   |
|---------------------|-----------------------------------------------|-----------------------|
| `npm run start:api` | Start mock API server                         | http://localhost:3000 |
| `npm run start`     | Start Angular development server              | http://localhost:4200 |
| `npm run build`     | Build for production                          | -                     |
| `npm run test`      | Run unit tests with Karma and Headless Chrome | -                     |

### Development Workflow

1. **Start the mock API server:**
   ```sh
   npm run start:api
   ```

2. **Start the Angular application:**
   ```sh
   npm run start
   ```

3. **Access the application:**
   - **Frontend**: http://localhost:4200
   - **Mock API**: http://localhost:3000
   - **API through proxy**: http://localhost:4200/api/products

### API Proxy Configuration

The development server automatically proxies `/api/*` requests to `http://localhost:3000`.

**Examples:**
- `http://localhost:4200/api/products` → `http://localhost:3000/products`
- `http://localhost:4200/api/products/1` → `http://localhost:3000/products/1`

## 🏗 Project Structure

```
src/
├── app/
│   ├── features/           # Feature modules
│   │   └── catalog/        # Product catalog feature
│   ├── layout/             # Layout components
│   │   ├── main-layout/    # Main application layout
│   │   └── page-layout/    # Page-specific layouts
│   └── shared/             # Shared components
│       └── components/     # Reusable UI components
├── theme/
│   ├── components/         # Component-specific themes
│   │   ├── app/           # Application component themes
│   │   └── material/      # Angular Material overrides
│   └── _index.scss        # Main theme entry point
api/
├── db.json                # Mock database
└── images/                # Product images
```

## 🎨 Theming

This project uses a centralized theming approach:

- **Component themes** are located in `src/theme/components/`
- **Material overrides** are in `src/theme/components/material/`
- **Application themes** are in `src/theme/components/app/`

See the README files in each theme directory for detailed instructions.

## 📊 Mock Data

The project includes a comprehensive mock database with:
- **35 construction equipment products**
- **Product images** in `api/images/`
- **Realistic data** with brands, specifications, and warranties

### Sample API Endpoints

- `GET /products` - List all products
- `GET /products/1` - Get product by ID
- `GET /products?category=Excavator` - Filter by category
- `GET /products?brand=Volvo` - Filter by brand
- `GET /products_start=10&_end=20` - Pagination

JSON Server supports full CRUD operations. For more details, visit the [JSON Server documentation](https://github.com/typicode/json-server)

### API images

The `image` property of each product contains the relative path to its image. Images are served from the `/api` base URL.  

For example, `image: "/images/excavator1.jpg"` will be accessible at `http://localhost:4200/api/images/excavator1.jpg`.


## 🚨 Troubleshooting

### Common Issues

**HttpClient not found error:**
```
NG0201: No provider found for HttpClient
```
**Solution:** Ensure `provideHttpClient(withInterceptorsFromDi())` is added to your app config.

**Proxy not working:**
- Verify `proxy.conf.json` configuration
- Ensure mock API server is running on port 3000
- Check Angular serve logs for proxy errors

**Theme not loading:**
- Verify `@forward` statements in `styles.scss`
- Check theme file paths in `src/theme/components/`
- Ensure `stylePreprocessorOptions` in `angular.json`

### Getting Help

- Check the [UIK AM Documentation](https://visiativ-design-system.azurewebsites.net/uik-am/20.x)
- Review `THEMING.md` for theming guidelines
- Inspect component README files in `src/theme/components/`

---

**Happy coding! 🎉**
