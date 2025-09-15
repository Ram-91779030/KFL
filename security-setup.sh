#!/bin/bash

# Security setup script for production deployment
# Run this script after initial server setup

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run this script as root or with sudo"
    exit 1
fi

print_header "SECURITY SETUP FOR PRODUCTION"

# Install fail2ban
print_status "Installing and configuring fail2ban..."
apt install -y fail2ban

# Configure fail2ban for SSH
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
EOF

systemctl enable fail2ban
systemctl start fail2ban

# Configure SSH security
print_status "Configuring SSH security..."
SSH_CONFIG="/etc/ssh/sshd_config"

# Backup original SSH config
cp "$SSH_CONFIG" "$SSH_CONFIG.backup"

# Apply security settings
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' "$SSH_CONFIG"
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' "$SSH_CONFIG"
sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' "$SSH_CONFIG"
sed -i 's/#MaxAuthTries 6/MaxAuthTries 3/' "$SSH_CONFIG"
sed -i 's/#ClientAliveInterval 0/ClientAliveInterval 300/' "$SSH_CONFIG"
sed -i 's/#ClientAliveCountMax 3/ClientAliveCountMax 2/' "$SSH_CONFIG"

# Add additional security settings
echo "" >> "$SSH_CONFIG"
echo "# Additional security settings" >> "$SSH_CONFIG"
echo "Protocol 2" >> "$SSH_CONFIG"
echo "AllowUsers your-app" >> "$SSH_CONFIG"
echo "DenyUsers root" >> "$SSH_CONFIG"

systemctl restart sshd

# Setup automatic security updates
print_status "Configuring automatic security updates..."
apt install -y unattended-upgrades

cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'EOF'
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESMApps:${distro_codename}-apps-security";
    "${distro_id}ESM:${distro_codename}-infra-security";
};

Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

cat > /etc/apt/apt.conf.d/20auto-upgrades << 'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
EOF

# Configure firewall rules
print_status "Configuring advanced firewall rules..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (change port if needed)
ufw allow ssh

# Allow HTTP and HTTPS
ufw allow 'Nginx Full'

# Allow backend port (only from localhost)
ufw allow from 127.0.0.1 to any port 8000

# Enable firewall
ufw --force enable

# Setup log monitoring
print_status "Setting up log monitoring..."
apt install -y logwatch

# Configure logwatch
cat > /etc/logwatch/conf/logwatch.conf << 'EOF'
LogDir = /var/log
TmpDir = /var/cache/logwatch
MailTo = admin@your-domain.com
MailFrom = logwatch@your-domain.com
Print = No
Save = /var/log/logwatch
Range = yesterday
Detail = Med
Service = All
Format = text
Encode = none
EOF

# Create security monitoring script
cat > /opt/your-app/security-monitor.sh << 'EOF'
#!/bin/bash

# Security monitoring script
LOG_FILE="/opt/your-app/logs/security-monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] Security check started" >> "$LOG_FILE"

# Check for failed login attempts
FAILED_LOGINS=$(grep "Failed password" /var/log/auth.log | wc -l)
echo "[$DATE] Failed login attempts: $FAILED_LOGINS" >> "$LOG_FILE"

# Check for suspicious activity
SUSPICIOUS_IPS=$(grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr | head -5)
echo "[$DATE] Top suspicious IPs:" >> "$LOG_FILE"
echo "$SUSPICIOUS_IPS" >> "$LOG_FILE"

# Check disk usage
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    echo "[$DATE] WARNING: Disk usage is ${DISK_USAGE}%" >> "$LOG_FILE"
fi

# Check memory usage
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.2f", $3*100/$2}')
if (( $(echo "$MEMORY_USAGE > 80" | bc -l) )); then
    echo "[$DATE] WARNING: Memory usage is ${MEMORY_USAGE}%" >> "$LOG_FILE"
fi

echo "[$DATE] Security check completed" >> "$LOG_FILE"
EOF

chmod +x /opt/your-app/security-monitor.sh
chown your-app:your-app /opt/your-app/security-monitor.sh

# Add security monitoring to cron
(crontab -u your-app -l 2>/dev/null; echo "0 */6 * * * /opt/your-app/security-monitor.sh") | crontab -u your-app -

# Setup file integrity monitoring
print_status "Setting up file integrity monitoring..."
apt install -y aide

# Initialize AIDE database
aideinit
mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db

# Create AIDE check script
cat > /opt/your-app/aide-check.sh << 'EOF'
#!/bin/bash

# AIDE file integrity check
LOG_FILE="/opt/your-app/logs/aide-check.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] Starting AIDE integrity check" >> "$LOG_FILE"

aide --check >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
    echo "[$DATE] AIDE check passed - no changes detected" >> "$LOG_FILE"
else
    echo "[$DATE] WARNING: AIDE check found changes!" >> "$LOG_FILE"
    # Send alert (you can customize this)
    echo "File integrity check failed on $(hostname)" | mail -s "Security Alert" admin@your-domain.com
fi

echo "[$DATE] AIDE check completed" >> "$LOG_FILE"
EOF

chmod +x /opt/your-app/aide-check.sh
chown your-app:your-app /opt/your-app/aide-check.sh

# Add AIDE check to cron (weekly)
(crontab -u your-app -l 2>/dev/null; echo "0 2 * * 0 /opt/your-app/aide-check.sh") | crontab -u your-app -

# Configure system limits
print_status "Configuring system limits..."
cat >> /etc/security/limits.conf << 'EOF'

# Application limits
your-app soft nofile 65536
your-app hard nofile 65536
your-app soft nproc 32768
your-app hard nproc 32768
EOF

# Setup intrusion detection
print_status "Installing and configuring OSSEC..."
wget -q -O - https://updates.atomicorp.com/installers/atomic | bash
apt install -y ossec-hids-server

# Configure OSSEC
/var/ossec/bin/ossec-control start

# Create security report script
cat > /opt/your-app/security-report.sh << 'EOF'
#!/bin/bash

# Generate security report
REPORT_FILE="/opt/your-app/logs/security-report-$(date +%Y%m%d).txt"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "Security Report - $DATE" > "$REPORT_FILE"
echo "=========================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "System Information:" >> "$REPORT_FILE"
uname -a >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "Failed Login Attempts (Last 24h):" >> "$REPORT_FILE"
grep "Failed password" /var/log/auth.log | grep "$(date -d '1 day ago' '+%b %d')" | wc -l >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "Active Connections:" >> "$REPORT_FILE"
netstat -tuln | grep LISTEN >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "Disk Usage:" >> "$REPORT_FILE"
df -h >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "Memory Usage:" >> "$REPORT_FILE"
free -h >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "Running Services:" >> "$REPORT_FILE"
systemctl list-units --type=service --state=running | grep -E "(nginx|postgresql|your-app)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "Firewall Status:" >> "$REPORT_FILE"
ufw status >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "Fail2ban Status:" >> "$REPORT_FILE"
fail2ban-client status >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Send report via email (optional)
# mail -s "Daily Security Report - $(hostname)" admin@your-domain.com < "$REPORT_FILE"

echo "Security report generated: $REPORT_FILE"
EOF

chmod +x /opt/your-app/security-report.sh
chown your-app:your-app /opt/your-app/security-report.sh

# Add security report to cron (daily)
(crontab -u your-app -l 2>/dev/null; echo "0 6 * * * /opt/your-app/security-report.sh") | crontab -u your-app -

print_header "SECURITY SETUP COMPLETED!"

print_status "Security features enabled:"
echo "✓ Fail2ban for brute force protection"
echo "✓ SSH hardening"
echo "✓ Automatic security updates"
echo "✓ Advanced firewall rules"
echo "✓ Log monitoring"
echo "✓ File integrity monitoring (AIDE)"
echo "✓ Intrusion detection (OSSEC)"
echo "✓ Security reporting"

print_warning "Important security reminders:"
echo "1. Change all default passwords"
echo "2. Use SSH keys instead of passwords"
echo "3. Regularly review security logs"
echo "4. Keep system updated"
echo "5. Monitor failed login attempts"
echo "6. Review firewall rules regularly"
echo "7. Test your security setup"

print_status "Security setup completed! 🔒"
