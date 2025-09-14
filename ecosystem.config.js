module.exports = {
  apps: [{
    name: 'kfl-backend',
    script: 'server/manage.py',
    args: 'runserver 127.0.0.1:8000',
    cwd: '/var/www/kfl',
    interpreter: '/var/www/kfl/venv/bin/python',
    env: {
      DJANGO_SETTINGS_MODULE: 'server.settings',
      PYTHONPATH: '/var/www/kfl/server',
      DEBUG: 'False',
      ALLOWED_HOSTS: 'karshakfoodlife.in,karshakfoodlife.com,ogbar.in,www.karshakfoodlife.in,www.karshakfoodlife.com,www.ogbar.in'
    },
    env_production: {
      NODE_ENV: 'production',
      DJANGO_SETTINGS_MODULE: 'server.settings',
      DEBUG: 'False'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/kfl/error.log',
    out_file: '/var/log/kfl/out.log',
    log_file: '/var/log/kfl/combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 4000,
    kill_timeout: 5000,
    listen_timeout: 3000,
    shutdown_with_message: true
  }]
};
