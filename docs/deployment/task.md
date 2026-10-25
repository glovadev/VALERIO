# VALERIO VPS Deployment Task Checklist & Commands

Run these commands in order on your VPS (logged in as `devuser` with `sudo` privileges).

> **Architecture Overview:**  
> This project is a modern **React + Vite** Single Page Application (SPA). Like Darikana Kitchen, **VALERIO** is a client-side SPA that compiles into static HTML, CSS, and JS bundles (`dist/`) while connecting directly to **Firebase** (Firestore & Auth) and **ImgBB** (catalog asset uploads).  
>
> **Serving Approach:**
> - **Primary & Recommended (Nginx Static SPA):** Nginx serves `/var/www/valerioo.in/dist` directly with `try_files $uri $uri/ /index.html;`. This requires **0 background RAM**, **0 ports** (preventing any port collision with other services on your VPS), and delivers the fastest possible static asset load times with browser caching and Gzip compression.

---

## 1. DNS Configuration
Before configuring the server, add the following **A Records** in your domain DNS manager (Hostinger, GoDaddy, Namecheap, Cloudflare, etc.) for `valerioo.in`:

- [ ] **A Record:** `@` &rarr; `<YOUR_VPS_IP>` (Apex domain: `valerioo.in`)
- [ ] **A Record:** `www` &rarr; `<YOUR_VPS_IP>` (Subdomain: `www.valerioo.in`)

*Verify DNS propagation from your local terminal before generating SSL certificates:*
```bash
dig +short valerioo.in
dig +short www.valerioo.in
```
*(Both should return your VPS public IP address before running Certbot in Section 6).*

---

## 2. Server Dependencies Check
Verify that the VPS has Node.js (v18+ or v20+), npm, and Nginx ready:

- [ ] **Verify Core Packages & Runtimes**
  ```bash
  # Check Node and npm
  node -v
  npm -v

  # Check Nginx and Certbot
  nginx -v
  certbot --version
  ```

  *(If Node.js is not installed or version < 18, install Node 20 LTS:)*
  ```bash
  # curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  # sudo apt-get install -y nodejs
  ```

---

## 3. Directory Structure Setup

- [ ] **Create Web Directory Hierarchy**
  ```bash
  # Create application directory
  sudo mkdir -p /var/www/valerioo.in
  sudo chown -R devuser:devuser /var/www/valerioo.in
  ```

---

## 4. Application Deployment (Vite + React)

- [ ] **Clone Repository**
  ```bash
  cd /var/www/valerioo.in

  # Clone repo using SSH (Recommended)
  git clone git@github.com:glovadev/VALERIO.git .

  # (Alternative: using HTTPS)
  # git clone https://github.com/glovadev/VALERIO.git .
  ```

- [ ] **Create Production Environment File (`.env`)**  
  *Vite embeds `VITE_*` environment variables during the build process. Create `.env` inside `/var/www/valerioo.in`:*
  ```bash
  nano /var/www/valerioo.in/.env
  ```
  *Paste the production configuration:*
  ```env
  # Firebase Configuration
  VITE_FIREBASE_API_KEY=AIzaSyBBaPOFSBK8WQx8iFzZpDjpBX8XktDgzt4
  VITE_FIREBASE_AUTH_DOMAIN=valerioo-perfume.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=valerioo-perfume
  VITE_FIREBASE_STORAGE_BUCKET=valerioo-perfume.firebasestorage.app
  VITE_FIREBASE_MESSAGING_SENDER_ID=714400540597
  VITE_FIREBASE_APP_ID=1:714400540597:web:2eb4834ae825ac42079bfc

  # ImgBB API Configuration
  VITE_IMGBB_API_KEY=b9ab2a771f7fcb58b4c568a93094470d
  ```
  *(Press `Ctrl+O`, `Enter` to save, and `Ctrl+X` to exit).*

- [ ] **Install Dependencies & Build Production Bundle**
  ```bash
  cd /var/www/valerioo.in

  # Install project dependencies
  npm install

  # Build the production static bundle (creates the 'dist' directory)
  npm run build
  ```

- [ ] **Verify Build Output**
  ```bash
  # Check that index.html and assets exist in dist/
  ls -la /var/www/valerioo.in/dist
  ```

---

## 5. Nginx Configuration (Direct Static SPA)

Because VALERIO compiles to optimized static assets, serving it directly via Nginx is the standard approach. It uses zero background RAM and ensures zero port conflicts with existing apps on the VPS.

- [ ] **Create Nginx Server Block**
  ```bash
  sudo nano /etc/nginx/sites-available/valerioo.in
  ```

  *Paste the following configuration:*
  ```nginx
  server {
      listen 80;
      listen [::]:80;
      server_name valerioo.in www.valerioo.in;

      root /var/www/valerioo.in/dist;
      index index.html;

      # Logging
      access_log /var/log/nginx/valerioo.access.log;
      error_log /var/log/nginx/valerioo.error.log;

      # Gzip Compression
      gzip on;
      gzip_vary on;
      gzip_proxied any;
      gzip_comp_level 6;
      gzip_types
          text/plain
          text/css
          text/xml
          application/json
          application/javascript
          application/xml+rss
          application/atom+xml
          image/svg+xml;

      # Security Headers
      add_header X-Frame-Options "SAMEORIGIN" always;
      add_header X-Content-Type-Options "nosniff" always;
      add_header X-XSS-Protection "1; mode=block" always;
      add_header Referrer-Policy "strict-origin-when-cross-origin" always;

      # Cache Static Assets (Vite hashes assets in dist/assets)
      location /assets/ {
          expires 1y;
          add_header Cache-Control "public, max-age=31536000, immutable";
          access_log off;
      }

      # Static Media / Public Assets (Favicons, robots.txt, sitemap.xml, images)
      location ~* \.(?:ico|png|jpg|jpeg|gif|webp|svg|xml|txt|woff2?|eot|ttf|otf)$ {
          expires 30d;
          add_header Cache-Control "public, max-age=2592000";
          access_log off;
      }

      # SPA Client-Side Routing Fallback (Never cache index.html so updates load immediately)
      location / {
          try_files $uri $uri/ /index.html;
          add_header Cache-Control "no-cache, no-store, must-revalidate";
      }

      # Deny access to hidden files (e.g. .env, .git)
      location ~ /\. {
          deny all;
          access_log off;
          log_not_found off;
      }
  }
  ```
  *(Press `Ctrl+O`, `Enter` to save, and `Ctrl+X` to exit).*

- [ ] **Enable Site & Verify Nginx Syntax**
  ```bash
  # Enable the site configuration by creating a symlink
  sudo ln -sf /etc/nginx/sites-available/valerioo.in /etc/nginx/sites-enabled/

  # Test Nginx syntax configuration
  sudo nginx -t

  # Reload Nginx to apply changes
  sudo systemctl reload nginx
  ```

---

## 6. SSL / TLS Certificate Setup (Let's Encrypt Certbot)

Generate free, auto-renewing SSL certificates for both apex and `www` domains:

- [ ] **Request SSL Certificate via Certbot**
  ```bash
  sudo certbot --nginx -d valerioo.in -d www.valerioo.in
  ```
  *(Select option to automatically redirect HTTP traffic to HTTPS if prompted).*

- [ ] **Test Automated Certificate Renewal**
  ```bash
  sudo certbot renew --dry-run
  ```

---

## 7. Verification & Health Check Checklist

- [ ] **HTTP to HTTPS Redirection**
  ```bash
  curl -I http://valerioo.in
  # Expected: HTTP/1.1 301 Moved Permanently -> Location: https://valerioo.in/
  ```

- [ ] **HTTPS Live Response**
  ```bash
  curl -I https://valerioo.in
  # Expected: HTTP/2 200 OK
  ```

- [ ] **Browser Functional Verification**
  1. Open `https://valerioo.in` in your browser.
  2. Verify all collections load (KING, QUEEN, **UNISEX & COMBO**, BESTSELLERS).
  3. Verify WhatsApp ordering buttons trigger correctly.
  4. Access admin portal at `https://valerioo.in/#/admin` or `https://valerioo.in/admin` and verify Firebase authentication works.
  5. Check `https://valerioo.in/sitemap.xml` and `https://valerioo.in/robots.txt`.

---

## 8. Zero-Downtime Updates (Future Deployments)

Whenever you push new updates to `https://github.com/glovadev/VALERIO.git`, update your live site by running:

```bash
cd /var/www/valerioo.in
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
```

*(You can also save this as an executable script `/var/www/valerioo.in/deploy.sh` for one-click updates:)*
```bash
cat << 'EOF' > /var/www/valerioo.in/deploy.sh
#!/bin/bash
set -e
echo "🚀 Updating VALERIO..."
cd /var/www/valerioo.in
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
echo "✅ VALERIO successfully deployed and live at https://valerioo.in"
EOF

chmod +x /var/www/valerioo.in/deploy.sh
```
Run `./deploy.sh` anytime you want to deploy the latest code.
