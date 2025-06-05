# ChatFlow Deployment Guide

## 🚀 Deploying to Vercel (Frontend)

### Prerequisites
- Vercel account
- GitHub repository

### Steps

1. **Build the project locally first to check for errors:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set the **Root Directory** to `client`
   - Set **Build Command** to `npm run build`
   - Set **Output Directory** to `dist`

3. **Environment Variables:**
   Add these environment variables in Vercel dashboard:
   ```
   VITE_APP_URL=https://your-backend-url.com
   ```

### Fixing the Manifest.json 401 Error

The 401 error occurs because:
1. The manifest.json is being requested from the wrong domain
2. Authentication middleware might be interfering

**Solution implemented:**
- ✅ Added `vercel.json` configuration for proper routing
- ✅ Added `_headers` file for correct content types
- ✅ Updated manifest.json with proper configuration
- ✅ Removed problematic crossorigin attributes

## 🖥️ Deploying Backend

### Option 1: Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Set **Root Directory** to `server`
4. Add environment variables:
   ```
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=https://your-vercel-app.vercel.app
   NODE_ENV=production
   ```

### Option 2: Heroku
1. Install Heroku CLI
2. Create new app: `heroku create your-app-name`
3. Set buildpack: `heroku buildpacks:set heroku/nodejs`
4. Add environment variables via Heroku dashboard
5. Deploy: `git push heroku main`

### Option 3: DigitalOcean App Platform
1. Go to DigitalOcean App Platform
2. Connect your GitHub repository
3. Set **Source Directory** to `server`
4. Configure environment variables

## 🔧 Post-Deployment Checklist

### Frontend (Vercel)
- ✅ Check if manifest.json loads without 401 error
- ✅ Verify all static assets load correctly
- ✅ Test PWA installation
- ✅ Check responsive design on mobile

### Backend
- ✅ Test API endpoints
- ✅ Verify CORS configuration
- ✅ Check database connection
- ✅ Test Socket.IO connection

### Integration
- ✅ Test user registration/login
- ✅ Test real-time messaging
- ✅ Verify file uploads (if any)
- ✅ Test on different devices

## 🐛 Common Issues & Solutions

### 1. Manifest.json 401 Error
**Problem:** Browser can't fetch manifest.json
**Solution:** 
- Ensure `vercel.json` is in the client root
- Check that manifest.json is in `client/public/`
- Verify no authentication middleware affects static files

### 2. CORS Errors
**Problem:** Frontend can't connect to backend
**Solution:**
```javascript
// In server/src/app.js
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}));
```

### 3. Socket.IO Connection Issues
**Problem:** Real-time features don't work
**Solution:**
- Check if backend URL is correct in frontend
- Verify Socket.IO CORS configuration
- Ensure both HTTP and WebSocket protocols are allowed

### 4. Environment Variables
**Problem:** App doesn't work in production
**Solution:**
- Double-check all environment variables are set
- Ensure variable names match exactly (case-sensitive)
- Verify MongoDB connection string is correct

## 📱 PWA Features

After deployment, your app will have:
- ✅ Installable on mobile devices
- ✅ Offline capability (basic)
- ✅ App-like experience
- ✅ Custom splash screen

## 🔒 Security Considerations

- ✅ JWT tokens are HTTP-only cookies
- ✅ CORS properly configured
- ✅ Environment variables secured
- ✅ No sensitive data in client-side code

## 📊 Monitoring

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring
- Uptime monitoring

---

**Need Help?** Check the logs in your deployment platform's dashboard for specific error messages.
