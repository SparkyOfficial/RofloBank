# ⚡ РОФЛОБАНК - GIT CONFIGURATION & BEST PRACTICES ⚡

## 🔧 Git Setup Commands

### Basic Configuration
```bash
# Configure user information (update with your details)
git config user.name "RofloBank Developer"
git config user.email "developer@roflobank.local"

# Enable better Unicode support for Cyrillic text
git config core.quotepath false
git config core.precomposeunicode true

# Optimize Git performance
git config core.preloadindex true
git config core.fscache true

# Configure line endings for cross-platform development
git config core.autocrlf input

# Set default push behavior
git config push.default simple
```

### Useful Git Aliases
```bash
git config alias.st status
git config alias.co checkout
git config alias.br branch
git config alias.cm commit
git config alias.lg "log --oneline --graph --decorate"
git config alias.unstage "reset HEAD --"
git config alias.last "log -1 HEAD"
```

## 📋 .gitignore Best Practices

Our `.gitignore` now includes:
- ✅ `node_modules/` - Never commit dependencies
- ✅ `build/` - Never commit build outputs
- ✅ `dist/` - Never commit distribution files
- ✅ `*.exe`, `*.msi`, `*.app` - Never commit executables
- ✅ IDE files (`.vscode/`, `.idea/`)
- ✅ OS files (`.DS_Store`, `Thumbs.db`)
- ✅ Environment files (`.env*`)
- ✅ Logs and temporary files

## 🚨 Large File Prevention

### Pre-commit Checks
Before committing, always run:
```bash
# Check file sizes in staging area
git ls-files -s | awk '$4 > 50000000 {print $4/1000000 "MB " $NF}' 

# Check what's being tracked
git status
git diff --cached --stat
```

### Emergency Large File Removal
If you accidentally commit large files:
```bash
# Remove specific file from history
git filter-branch --tree-filter "rm -f path/to/large/file" HEAD

# Remove entire directories from history
git filter-branch --tree-filter "rm -rf node_modules build dist" --prune-empty HEAD

# Force push cleaned history
git push origin main --force
```

## 📦 Recommended Workflow

### 1. Before Each Commit
```bash
# Check status
git status

# Review changes
git diff

# Add files selectively (never use git add .)
git add src/
git add package.json
git add README.md

# Commit with meaningful message
git commit -m "⚡ Add new TNO-style dashboard component

- Implement dark brutalist design
- Add Cyrillic localization
- Include terminal-style effects"
```

### 2. Before Each Push
```bash
# Check what will be pushed
git log origin/main..HEAD --oneline

# Ensure no large files
git rev-list --objects --all | git cat-file --batch-check | grep -E '^[a-f0-9]+ blob [0-9]+$' | awk '$3 > 1000000' | sort -k3nr

# Push safely
git push origin main
```

### 3. Building and Distribution
```bash
# Build the application
npm run build

# Test the executable (not committed)
./build/win-unpacked/RofloBank.exe

# The build/ directory is automatically ignored by .gitignore
```

## 🎯 TNO-Style Commit Messages

Follow the TNO aesthetic in commit messages:
```bash
git commit -m "⚡ ОПЕРАЦИЯ: Улучшение системы безопасности

- Добавлена двухфакторная аутентификация
- Обновлены протоколы шифрования
- Исправлены уязвимости в авторизации"

git commit -m "◈ МОДЕРНИЗАЦИЯ: Обновление интерфейса терминала

- Внедрены новые терминальные эффекты
- Улучшена читаемость кириллического текста
- Оптимизирована производительность рендеринга"
```

## ⚠️ Emergency Recovery

If something goes wrong:
```bash
# Create backup branch
git branch backup-$(date +%Y%m%d_%H%M%S)

# Reset to last known good state
git reset --hard origin/main

# If remote is corrupted, reset to specific commit
git reset --hard <commit-hash>

# Nuclear option - start fresh (save your changes first!)
rm -rf .git
git init
git remote add origin https://github.com/SparkyOfficial/RofloBank.git
```

## 📊 Repository Status

### Current Status: ✅ OPTIMIZED
- Large files removed from history
- Comprehensive .gitignore in place
- Repository size: ~100KB (down from 220MB!)
- Ready for collaborative development

### File Distribution:
- Source code: `src/`
- Configuration: `package.json`, `webpack.config.js`, `tsconfig.json`
- Documentation: `README.md`, `MOBILE-GUIDE.md`, `DESIGN-TRANSFORMATION.md`
- Build artifacts: **EXCLUDED** from Git

---

**ПОМНИТЕ**: Git хранит историю навсегда. Всегда проверяйте что коммитите! ⚡