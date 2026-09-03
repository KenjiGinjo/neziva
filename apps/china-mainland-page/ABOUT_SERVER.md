# 大陆落地页服务器

本机只托管 `eain.cn` 落地页。同机还有 `/var/www/html`、`/var/www/loom-pulse`，别动。

账号密码在 `.env`，不要写进这个文件。

## 机器

| | |
|---|---|
| 云厂商 | 阿里云 ECS |
| 主机名 | `iZ2ze4ztcyu1442ko9ocwmZ` |
| 系统 | Ubuntu 26.04.1 LTS |
| 公网 IP | `112.126.76.58` |
| 内网 IP | `172.25.165.134` |
| SSH | `ssh root@112.126.76.58`（端口 22） |

DNS：`eain.cn`、`www.eain.cn` 的 A 记录都指向 `112.126.76.58`。安全组需放行 22 / 80 / 443。

## 站点

| | |
|---|---|
| 域名 | https://eain.cn 、 https://www.eain.cn |
| 根目录 | `/var/www/neziva` |
| 页面 | `/var/www/neziva/index.html`（由本地 `landing.html` 上传） |
| Nginx 配置 | `/etc/nginx/conf.d/eain.cn.conf` |

```bash
nginx -t && systemctl reload nginx
```

## HTTPS

Let's Encrypt，certbot 已装好，证书会自动续期。

| | |
|---|---|
| 证书 | `/etc/letsencrypt/live/eain.cn/fullchain.pem` |
| 私钥 | `/etc/letsencrypt/live/eain.cn/privkey.pem` |
| 到期 | 2026-12-02（之后靠 `certbot.timer` 自动续） |
| 账号邮箱 | `2522221469@qq.com` |

手工续期：

```bash
certbot renew
nginx -t && systemctl reload nginx
```

重签（一般不用）：

```bash
certbot --nginx -d eain.cn -d www.eain.cn
```

## 本地部署

在 `apps/china-mainland-page`：

```bash
pnpm deploy
```

会把 `landing.html` scp 成远程的 `/var/www/neziva/index.html`。
