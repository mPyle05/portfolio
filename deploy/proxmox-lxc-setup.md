# Running this on Proxmox (LXC container)

An LXC container is the right call here — a static site + nginx + cloudflared needs almost nothing, and a full VM would waste resources for no benefit. This gets you a container using ~512MB RAM and a fraction of a core.

## 1. Create the container

In the Proxmox web UI: **Create CT**

- **Template**: Debian 12 (or Ubuntu 22.04/24.04 — either works fine)
- **Resources**: 1 vCPU, 512MB–1GB RAM, 4–8GB disk is plenty
- **Network**: bridged to your LAN (e.g. `vmbr0`), DHCP or a static IP — your call
- **Unprivileged container**: yes (default, and the safer option — no reason this needs privileged)
- **Start at boot**: yes, so it comes back up after a Proxmox host reboot

Start the container, then open its console (or SSH in once networking is up).

## 2. Install dependencies inside the container

```bash
apt update && apt upgrade -y
apt install -y nginx git curl

# Node.js (for building the site) — NodeSource setup for Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# cloudflared
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg -o /usr/share/keyrings/cloudflare-main.gpg
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/cloudflared.list
apt update && apt install -y cloudflared
```

## 3. Clone and build the site

```bash
cd /opt
git clone https://github.com/<your-username>/<repo-name>.git portfolio-tailwind
cd portfolio-tailwind
npm ci
npm run build
```

This produces `/opt/portfolio-tailwind/dist` — the folder nginx will serve.

## 4. Configure nginx

Copy `deploy/nginx.conf` from this repo to `/etc/nginx/sites-available/portfolio`, but update the `root` line to match the path above:

```
root /opt/portfolio-tailwind/dist;
```

Then:
```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default   # avoid conflicts with the default site
nginx -t && systemctl reload nginx
```

Sanity-check locally inside the container: `curl http://127.0.0.1:8080` should return your HTML.

## 5. Authenticate and create the tunnel

```bash
cloudflared tunnel login          # opens a URL — authorize your domain in the browser
cloudflared tunnel create portfolio
cloudflared tunnel route dns portfolio yourdomain.com
```

Copy `deploy/cloudflared-config.yml` from this repo to `/root/.cloudflared/config.yml`, filling in the `tunnel:` ID and `credentials-file` path printed by the `create` command above (service is set to `http://127.0.0.1:8080` to match nginx).

Run it as a persistent service:
```bash
cloudflared service install
systemctl enable --now cloudflared
```

Your site should now be live at `yourdomain.com` — traffic flows through Cloudflare's edge to the tunnel, into the container, to nginx, with no ports forwarded on your router at all.

## 6. Updating the site later

Whenever you push changes to the repo, SSH into the container and run `deploy/deploy.sh` (also in this repo) to pull and rebuild. See that script for details — you can also wire it to a cron job if you want it to auto-update.

## Notes specific to Proxmox

- If you use ZFS or want extra safety, take a Proxmox snapshot of the container before major changes — trivial to roll back if something breaks.
- Firewall: you don't need to open any inbound ports on your router or Proxmox firewall for this — the tunnel is fully outbound-initiated. Worth double-checking your container's outbound access to the internet isn't blocked by a Proxmox firewall rule.
- If the container ever needs more headroom (e.g. you add server-side features later), you can bump vCPU/RAM live from the Proxmox UI without recreating it.
