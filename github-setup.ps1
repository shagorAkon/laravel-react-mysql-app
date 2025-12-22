# GitHub Repository Creation Script
# Run this script to create the repository and push your code

Write-Host "🚀 Laravel + React.js GitHub Setup" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if git is configured
$gitUser = git config user.name
$gitEmail = git config user.email

if (-not $gitUser -or -not $gitEmail) {
    Write-Host "⚠️  Git not configured. Please run:" -ForegroundColor Yellow
    Write-Host "git config --global user.name 'Your Name'" -ForegroundColor Cyan
    Write-Host "git config --global user.email 'your.email@example.com'" -ForegroundColor Cyan
    exit
}

Write-Host "✅ Git configured for: $gitUser ($gitEmail)" -ForegroundColor Green

# Repository options
$repoNames = @(
    "laravel-react-mysql-app",
    "fullstack-laravel-react", 
    "laravel-react-webapp",
    "my-laravel-react-project"
)

Write-Host "`n📋 Suggested repository names:" -ForegroundColor Blue
for ($i = 0; $i -lt $repoNames.Length; $i++) {
    Write-Host "  $($i + 1). $($repoNames[$i])" -ForegroundColor Cyan
}

Write-Host "`n🔧 Next Steps:" -ForegroundColor Blue
Write-Host "1. Go to: https://github.com/shagorAkon" -ForegroundColor White
Write-Host "2. Click 'New' to create a repository" -ForegroundColor White
Write-Host "3. Use one of the names above" -ForegroundColor White
Write-Host "4. Make it Public" -ForegroundColor White
Write-Host "5. Don't add README/gitignore (we have them)" -ForegroundColor White
Write-Host "6. After creating, run the push commands below" -ForegroundColor White

Write-Host "`n📤 Commands to push after creating repository:" -ForegroundColor Blue
Write-Host "git remote add origin https://github.com/shagorAkon/[REPO-NAME].git" -ForegroundColor Cyan
Write-Host "git push -u origin main" -ForegroundColor Cyan

Write-Host "`n✨ Your project is ready to go live!" -ForegroundColor Green