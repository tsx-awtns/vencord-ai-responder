# 🤖 AIResponder Plugin Installation Guide

--------------------------------------
# NOTICE: OpenRouter.ai enforces a daily limit (~1,000 requests/day) for free accounts.
⚠️ The previous information in the README and related .md files incorrectly stated that usage was "unlimited" — this is not true.
We apologize for the confusion. Please check the updated documentation for accurate details.
--------------------------------------

## 📋 Table of Contents
- [English](#english)
- [Deutsch](#deutsch)
- [Русский](#русский)
- [العربية](#العربية)

---

## English

### 🎯 What is AIResponder?

AIResponder is an intelligent Vencord plugin that automatically responds to Discord direct messages using AI when you're away, sleeping, at work, or simply unavailable. The plugin uses a default OpenRouter.ai API key provided by the developer, but you can also create and use your own API key for unlimited usage.

### 🆕 **NEW: Global DM Mode (v2.2.1)**

**Enable for All DMs** - A powerful new feature that allows the AI to respond to ALL your direct messages automatically:
- **Requires your own custom API key** (for unlimited usage)
- **One-click activation** - Enable once, works for all DMs
- **Visual indicator** - Green dot and border when global mode is active
- **Smart management** - Automatically handles all incoming DMs

### ⚠️ Important: Daily Limits

**OpenRouter.ai has daily limits of approximately 1,000 requests per day for free accounts.** When this limit is reached:
- The plugin will show you a helpful notification
- You can create a new free OpenRouter.ai account with a different email
- Get a new API key from the new account
- Update your API key in the plugin settings

### 📋 Prerequisites

Before starting, make sure you have:
- Windows, macOS, or Linux computer
- Internet connection
- Administrator/sudo privileges (for some installations)

### 🛠️ Step 1: Install Required Software

#### Install Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (recommended)
3. Run the installer and follow the setup wizard
4. Restart your computer after installation

#### Install Git
1. Go to [git-scm.com](https://git-scm.com/)
2. Download Git for your operating system
3. Run the installer with default settings
4. Restart your computer after installation

### 🚀 Step 2: Install Vencord

#### Install pnpm globally
1. Open **Terminal** (macOS/Linux) or **Command Prompt** (Windows)
2. Run this command:
   `
   npm i -g pnpm
   `
3. Wait for the installation to complete

#### Clone Vencord Repository
1. Navigate to your Desktop or create a new folder where you want to install Vencord
2. Open Terminal/Command Prompt in that location
3. Run this command (this may take a few minutes):
   `
   git clone https://github.com/Vendicated/Vencord
   `
4. A folder named "vencord" should appear

#### Install Vencord Dependencies
1. Navigate into the vencord folder:
   `
   cd vencord
   `
2. Install dependencies:
   `
   npm install pnpm
   `
3. If prompted, select **"Y"** to confirm installation

### 📦 Step 3: Install AIResponder Plugin

#### Download the Plugin
1. Go to the AIResponder repository: [https://github.com/tsx-awtns/vencord-ai-responder](https://github.com/tsx-awtns/vencord-ai-responder)
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to get the plugin files

#### Install the Plugin
1. Navigate to your vencord folder
2. Go to the **"src"** folder
3. Create a new folder called **"userplugins"** (if it doesn't exist)
4. Copy the **"AIResponder"** folder from the extracted ZIP into the **"userplugins"** folder

Your folder structure should look like:
`
vencord/
├── src/
│   ├── userplugins/
│   │   └── AIResponder/
│   │       ├── index.tsx
│   │       └── (other plugin files)
`

### 🔨 Step 4: Build and Inject Vencord

#### Build Vencord
1. Go back to the main vencord folder
2. Open Terminal/Command Prompt in the vencord folder
3. Run the build command:
   `
   pnpm build
   `
4. Wait for the build to complete successfully

#### Inject Vencord into Discord
1. Run the injection command:
   `
   pnpm inject
   `
2. **Option 1**: Press **Enter** to use the default Discord installation path
3. **Option 2**: Enter the correct path to your Discord installation if the default is incorrect

Common Discord paths:
- **Windows**: `C:\Users\[Username]\AppData\Local\Discord`
- **macOS**: `/Applications/Discord.app`
- **Linux**: `/opt/discord` or `~/.local/share/discord`

### ✅ Step 5: Activate the Plugin

1. **Restart Discord** completely
2. Open Discord Settings (gear icon)
3. Scroll down to find **"Vencord"** section
4. Click on **"Plugins"**
5. Find **"AIResponder"** in the plugin list
6. **Enable** the AIResponder plugin
7. Configure settings if needed (optional)

### 🎮 Step 6: Using the Plugin

#### Standard Mode (Per-Channel)
1. Open any **Direct Message** conversation
2. Look for the **AI bot icon** next to the message input field
3. **Click the icon** to activate/deactivate the AI responder
4. When active, the icon will glow **green**
5. When inactive, the icon will be **gray**

#### 🌐 **NEW: Global DM Mode**
1. **First**: Set up your own API key (see Step 7)
2. **Enable** "Enable for ALL DMs automatically" in plugin settings
3. **Click the AI icon** in any DM to activate Global DM Mode
4. **Visual indicators**: Green dot + green border around the icon
5. **AI now responds to ALL DMs automatically!**

#### Alternative: Use Slash Command
Type `/airesponder` in any chat to toggle the AI responder on/off.

### ⚙️ Step 7: Set Up Your Own API Key (Recommended)

#### Why use your own API key?
- **Unlimited usage** (no daily limits)
- **Faster responses** (priority processing)
- **Better reliability** (dedicated quota)
- **No interruptions** when default key reaches daily limit
- **🆕 Enables Global DM Mode** for all DMs

#### How to get your own API key:
1. Go to [openrouter.ai](https://openrouter.ai)
2. **Sign up** for a free account
3. Go to **"API Keys"** section
4. **Create a new API key**
5. **Copy** the API key (starts with `sk-or-v1-...`)

#### Configure your API key:
1. In Discord, go to **Settings > Vencord > Plugins > AIResponder**
2. Enable **"Use your own OpenRouter.ai API key"**
3. **Paste your API key** in the text field
4. **🆕 Enable "Enable for ALL DMs automatically"** (new feature!)
5. **Save** the settings

### 🌐 Step 8: Using Global DM Mode (NEW!)

#### What is Global DM Mode?
- **One activation = All DMs covered**
- AI responds to **every DM** automatically
- **Requires custom API key** for unlimited usage
- **Visual indicators** show when active

#### How to activate:
1. **Ensure you have a custom API key set up**
2. **Enable "Enable for ALL DMs automatically"** in settings
3. **Click the AI icon** in any DM conversation
4. **Look for**: Green dot + green border = Global Mode active
5. **Done!** AI now responds to all DMs automatically

#### How to deactivate:
- **Click the AI icon again** to turn off Global DM Mode
- **Or disable** "Enable for ALL DMs automatically" in settings

### 🚨 Daily Limit Reached?

If you see a notification that the daily limit has been reached:

#### For Default API Key Users:
1. **Create your own free account** at [openrouter.ai](https://openrouter.ai)
2. **Get your own API key** (unlimited daily usage)
3. **Enable "Use your own API key"** in plugin settings
4. **Paste your new API key** and save
5. **🆕 Enable Global DM Mode** for automatic responses to all DMs

#### For Custom API Key Users:
1. **Create a new OpenRouter.ai account** with a different email
2. **Get a new API key** from the new account
3. **Update your API key** in plugin settings
4. **Alternative**: Wait 24 hours for your current key's limit to reset

### 🔧 Troubleshooting

#### Plugin not showing up?
- Make sure you placed the AIResponder folder in `src/userplugins/`
- Run `pnpm build` again
- Restart Discord completely

#### AI not responding?
- Check if the AI icon is **green** (active)
- Make sure you're in a **Direct Message** (not a server)
- Check your internet connection
- **Check for daily limit notifications**

#### Global DM Mode not working?
- **Ensure you have a custom API key** set up
- **Check that "Enable for ALL DMs automatically" is enabled**
- **Look for green dot + border** on the AI icon
- **Try clicking the icon again** to toggle

#### Daily limit reached?
- **Follow the steps above** to create a new account or use your own API key
- The plugin will show helpful notifications with instructions

#### Build errors?
- Make sure Node.js and Git are properly installed
- Try deleting `node_modules` folder and run `npm install pnpm` again
- Make sure you're in the correct vencord directory

### 📞 Support

If you need help:
- **Discord Server**: [Join for support](https://discord.gg/aBvYsY2GnQ)
- **Website**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)

---

## Deutsch

### 🎯 Was ist AIResponder?

AIResponder ist ein intelligentes Vencord-Plugin, das automatisch auf Discord-Direktnachrichten mit KI antwortet, wenn du weg bist, schläfst, arbeitest oder einfach nicht verfügbar bist. Das Plugin verwendet einen Standard-OpenRouter.ai-API-Schlüssel vom Entwickler, aber du kannst auch deinen eigenen API-Schlüssel erstellen und für unbegrenzte Nutzung verwenden.

### 🆕 **NEU: Globaler DM-Modus (v2.2.1)**

**Für alle DMs aktivieren** - Eine mächtige neue Funktion, die der KI erlaubt, automatisch auf ALLE deine Direktnachrichten zu antworten:
- **Benötigt deinen eigenen API-Schlüssel** (für unbegrenzte Nutzung)
- **Ein-Klick-Aktivierung** - Einmal aktivieren, funktioniert für alle DMs
- **Visueller Indikator** - Grüner Punkt und Rahmen wenn globaler Modus aktiv
- **Intelligente Verwaltung** - Behandelt automatisch alle eingehenden DMs

### ⚠️ Wichtig: Tägliche Limits

**OpenRouter.ai hat tägliche Limits von etwa 1.000 Anfragen pro Tag für kostenlose Konten.** Wenn dieses Limit erreicht wird:
- Das Plugin zeigt dir eine hilfreiche Benachrichtigung
- Du kannst ein neues kostenloses OpenRouter.ai-Konto mit einer anderen E-Mail erstellen
- Hole dir einen neuen API-Schlüssel vom neuen Konto
- Aktualisiere deinen API-Schlüssel in den Plugin-Einstellungen

### 📋 Voraussetzungen

Bevor du beginnst, stelle sicher, dass du hast:
- Windows, macOS oder Linux Computer
- Internetverbindung
- Administrator/sudo-Berechtigung (für einige Installationen)

### 🛠️ Schritt 1: Erforderliche Software installieren

#### Node.js installieren
1. Gehe zu [nodejs.org](https://nodejs.org/)
2. Lade die **LTS-Version** herunter (empfohlen)
3. Führe den Installer aus und folge dem Setup-Assistenten
4. Starte deinen Computer nach der Installation neu

#### Git installieren
1. Gehe zu [git-scm.com](https://git-scm.com/)
2. Lade Git für dein Betriebssystem herunter
3. Führe den Installer mit Standardeinstellungen aus
4. Starte deinen Computer nach der Installation neu

### 🚀 Schritt 2: Vencord installieren

#### pnpm global installieren
1. Öffne **Terminal** (macOS/Linux) oder **Eingabeaufforderung** (Windows)
2. Führe diesen Befehl aus:
   `
   npm i -g pnpm
   `
3. Warte, bis die Installation abgeschlossen ist

#### Vencord Repository klonen
1. Navigiere zu deinem Desktop oder erstelle einen neuen Ordner, wo du Vencord installieren möchtest
2. Öffne Terminal/Eingabeaufforderung an diesem Ort
3. Führe diesen Befehl aus (kann einige Minuten dauern):
   `
   git clone https://github.com/Vendicated/Vencord
   `
4. Ein Ordner namens "vencord" sollte erscheinen

#### Vencord-Abhängigkeiten installieren
1. Navigiere in den vencord-Ordner:
   `
   cd vencord
   `
2. Installiere Abhängigkeiten:
   `
   npm install pnpm
   `
3. Wenn gefragt, wähle **"Y"** zur Bestätigung der Installation

### 📦 Schritt 3: AIResponder Plugin installieren

#### Plugin herunterladen
1. Gehe zum AIResponder Repository: [https://github.com/tsx-awtns/vencord-ai-responder](https://github.com/tsx-awtns/vencord-ai-responder)
2. Klicke auf den grünen **"Code"** Button
3. Wähle **"Download ZIP"**
4. Entpacke die ZIP-Datei, um die Plugin-Dateien zu erhalten

#### Plugin installieren
1. Navigiere zu deinem vencord-Ordner
2. Gehe zum **"src"** Ordner
3. Erstelle einen neuen Ordner namens **"userplugins"** (falls er nicht existiert)
4. Kopiere den **"AIResponder"** Ordner aus der entpackten ZIP in den **"userplugins"** Ordner

Deine Ordnerstruktur sollte so aussehen:
`
vencord/
├── src/
│   ├── userplugins/
│   │   └── AIResponder/
│   │       ├── index.tsx
│   │       └── (andere Plugin-Dateien)
`

### 🔨 Schritt 4: Vencord bauen und injizieren

#### Vencord bauen
1. Gehe zurück zum Haupt-vencord-Ordner
2. Öffne Terminal/Eingabeaufforderung im vencord-Ordner
3. Führe den Build-Befehl aus:
   `
   pnpm build
   `
4. Warte, bis der Build erfolgreich abgeschlossen ist

#### Vencord in Discord injizieren
1. Führe den Injektions-Befehl aus:
   `
   pnpm inject
   `
2. **Option 1**: Drücke **Enter** für den Standard-Discord-Installationspfad
3. **Option 2**: Gib den korrekten Pfad zu deiner Discord-Installation ein, falls der Standard falsch ist

Häufige Discord-Pfade:
- **Windows**: `C:\Users\[Benutzername]\AppData\Local\Discord`
- **macOS**: `/Applications/Discord.app`
- **Linux**: `/opt/discord` oder `~/.local/share/discord`

### ✅ Schritt 5: Plugin aktivieren

1. **Starte Discord** vollständig neu
2. Öffne Discord-Einstellungen (Zahnrad-Symbol)
3. Scrolle nach unten zum **"Vencord"** Bereich
4. Klicke auf **"Plugins"**
5. Finde **"AIResponder"** in der Plugin-Liste
6. **Aktiviere** das AIResponder Plugin
7. Konfiguriere Einstellungen bei Bedarf (optional)

### 🎮 Schritt 6: Plugin verwenden

#### Standard-Modus (Pro-Channel)
1. Öffne eine **Direktnachrichten**-Unterhaltung
2. Suche nach dem **AI-Bot-Symbol** neben dem Nachrichteneingabefeld
3. **Klicke auf das Symbol**, um den AI-Responder zu aktivieren/deaktivieren
4. Wenn aktiv, leuchtet das Symbol **grün**
5. Wenn inaktiv, ist das Symbol **grau**

#### 🌐 **NEU: Globaler DM-Modus**
1. **Zuerst**: Richte deinen eigenen API-Schlüssel ein (siehe Schritt 7)
2. **Aktiviere** "Für alle DMs automatisch aktivieren" in den Plugin-Einstellungen
3. **Klicke auf das AI-Symbol** in einer beliebigen DM, um den globalen DM-Modus zu aktivieren
4. **Visuelle Indikatoren**: Grüner Punkt + grüner Rahmen um das Symbol
5. **KI antwortet jetzt automatisch auf ALLE DMs!**

#### Alternative: Slash-Befehl verwenden
Tippe `/airesponder` in einen beliebigen Chat, um den AI-Responder ein-/auszuschalten.

### ⚙️ Schritt 7: Eigenen API-Schlüssel einrichten (Empfohlen)

#### Warum eigenen API-Schlüssel verwenden?
- **Unbegrenzte Nutzung** (keine täglichen Limits)
- **Schnellere Antworten** (Prioritätsverarbeitung)
- **Bessere Zuverlässigkeit** (dedizierte Quote)
- **Keine Unterbrechungen** wenn der Standard-Schlüssel das tägliche Limit erreicht
- **🆕 Ermöglicht globalen DM-Modus** für alle DMs

#### Wie bekommt man einen eigenen API-Schlüssel:
1. Gehe zu [openrouter.ai](https://openrouter.ai)
2. **Registriere** dich für ein kostenloses Konto
3. Gehe zum **"API Keys"** Bereich
4. **Erstelle einen neuen API-Schlüssel**
5. **Kopiere** den API-Schlüssel (beginnt mit `sk-or-v1-...`)

#### API-Schlüssel konfigurieren:
1. In Discord, gehe zu **Einstellungen > Vencord > Plugins > AIResponder**
2. Aktiviere **"Use your own OpenRouter.ai API key"**
3. **Füge deinen API-Schlüssel** in das Textfeld ein
4. **🆕 Aktiviere "Für alle DMs automatisch aktivieren"** (neue Funktion!)
5. **Speichere** die Einstellungen

### 🌐 Schritt 8: Globalen DM-Modus verwenden (NEU!)

#### Was ist der globale DM-Modus?
- **Eine Aktivierung = Alle DMs abgedeckt**
- KI antwortet automatisch auf **jede DM**
- **Benötigt benutzerdefinierten API-Schlüssel** für unbegrenzte Nutzung
- **Visuelle Indikatoren** zeigen, wann aktiv

#### Wie aktivieren:
1. **Stelle sicher, dass du einen benutzerdefinierten API-Schlüssel eingerichtet hast**
2. **Aktiviere "Für alle DMs automatisch aktivieren"** in den Einstellungen
3. **Klicke auf das AI-Symbol** in einer beliebigen DM-Unterhaltung
4. **Achte auf**: Grüner Punkt + grüner Rahmen = Globaler Modus aktiv
5. **Fertig!** KI antwortet jetzt automatisch auf alle DMs

#### Wie deaktivieren:
- **Klicke erneut auf das AI-Symbol**, um den globalen DM-Modus auszuschalten
- **Oder deaktiviere** "Für alle DMs automatisch aktivieren" in den Einstellungen

### 🚨 Tägliches Limit erreicht?

Wenn du eine Benachrichtigung siehst, dass das tägliche Limit erreicht wurde:

#### Für Standard-API-Schlüssel-Nutzer:
1. **Erstelle dein eigenes kostenloses Konto** bei [openrouter.ai](https://openrouter.ai)
2. **Hole dir deinen eigenen API-Schlüssel** (unbegrenzte tägliche Nutzung)
3. **Aktiviere "Use your own API key"** in den Plugin-Einstellungen
4. **Füge deinen neuen API-Schlüssel ein** und speichere
5. **🆕 Aktiviere globalen DM-Modus** für automatische Antworten auf alle DMs

#### Für Custom-API-Schlüssel-Nutzer:
1. **Erstelle ein neues OpenRouter.ai-Konto** mit einer anderen E-Mail
2. **Hole dir einen neuen API-Schlüssel** vom neuen Konto
3. **Aktualisiere deinen API-Schlüssel** in den Plugin-Einstellungen
4. **Alternative**: Warte 24 Stunden, bis das Limit deines aktuellen Schlüssels zurückgesetzt wird

### 🔧 Fehlerbehebung

#### Plugin wird nicht angezeigt?
- Stelle sicher, dass du den AIResponder-Ordner in `src/userplugins/` platziert hast
- Führe `pnpm build` erneut aus
- Starte Discord vollständig neu

#### AI antwortet nicht?
- Überprüfe, ob das AI-Symbol **grün** (aktiv) ist
- Stelle sicher, dass du in einer **Direktnachricht** bist (nicht in einem Server)
- Überprüfe deine Internetverbindung
- **Prüfe auf Benachrichtigungen über tägliche Limits**

#### Globaler DM-Modus funktioniert nicht?
- **Stelle sicher, dass du einen benutzerdefinierten API-Schlüssel** eingerichtet hast
- **Überprüfe, dass "Für alle DMs automatisch aktivieren" aktiviert ist**
- **Achte auf grünen Punkt + Rahmen** am AI-Symbol
- **Versuche, erneut auf das Symbol zu klicken**, um zu togglen

#### Tägliches Limit erreicht?
- **Folge den obigen Schritten** um ein neues Konto zu erstellen oder deinen eigenen API-Schlüssel zu verwenden
- Das Plugin zeigt hilfreiche Benachrichtigungen mit Anweisungen

#### Build-Fehler?
- Stelle sicher, dass Node.js und Git ordnungsgemäß installiert sind
- Versuche, den `node_modules`-Ordner zu löschen und führe `npm install pnpm` erneut aus
- Stelle sicher, dass du im korrekten vencord-Verzeichnis bist

### 📞 Support

Wenn du Hilfe benötigst:
- **Discord Server**: [Für Support beitreten](https://discord.gg/aBvYsY2GnQ)
- **Website**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)

---

## Русский

### 🎯 Что такое AIResponder?

AIResponder - это интеллектуальный плагин для Vencord, который автоматически отвечает на личные сообщения Discord с помощью ИИ, когда вы отсутствуете, спите, работаете или просто недоступны. Плагин использует стандартный API-ключ OpenRouter.ai от разработчика, но вы также можете создать и использовать свой собственный API-ключ для неограниченного использования.

### 🆕 **НОВОЕ: Глобальный режим ЛС (v2.2.1)**

**Включить для всех ЛС** - Мощная новая функция, которая позволяет ИИ автоматически отвечать на ВСЕ ваши личные сообщения:
- **Требует ваш собственный API-ключ** (для неограниченного использования)
- **Активация одним кликом** - Включите один раз, работает для всех ЛС
- **Визуальный индикатор** - Зеленая точка и рамка когда глобальный режим активен
- **Умное управление** - Автоматически обрабатывает все входящие ЛС

### ⚠️ Важно: Дневные лимиты

**OpenRouter.ai имеет дневные лимиты примерно 1,000 запросов в день для бесплатных аккаунтов.** Когда этот лимит достигнут:
- Плагин покажет вам полезное уведомление
- Вы можете создать новый бесплатный аккаунт OpenRouter.ai с другим email
- Получить новый API-ключ от нового аккаунта
- Обновить ваш API-ключ в настройках плагина

### 📋 Требования

Перед началом убедитесь, что у вас есть:
- Компьютер с Windows, macOS или Linux
- Подключение к интернету
- Права администратора/sudo (для некоторых установок)

### 🛠️ Шаг 1: Установка необходимого ПО

#### Установка Node.js
1. Перейдите на [nodejs.org](https://nodejs.org/)
2. Скачайте **LTS версию** (рекомендуется)
3. Запустите установщик и следуйте мастеру установки
4. Перезагрузите компьютер после установки

#### Установка Git
1. Перейдите на [git-scm.com](https://git-scm.com/)
2. Скачайте Git для вашей операционной системы
3. Запустите установщик с настройками по умолчанию
4. Перезагрузите компьютер после установки

### 🚀 Шаг 2: Установка Vencord

#### Глобальная установка pnpm
1. Откройте **Терминал** (macOS/Linux) или **Командную строку** (Windows)
2. Выполните эту команду:
   `
   npm i -g pnpm
   `
3. Дождитесь завершения установки

#### Клонирование репозитория Vencord
1. Перейдите на рабочий стол или создайте новую папку, где хотите установить Vencord
2. Откройте Терминал/Командную строку в этом месте
3. Выполните эту команду (может занять несколько минут):
   `
   git clone https://github.com/Vendicated/Vencord
   `
4. Должна появиться папка с именем "vencord"

#### Установка зависимостей Vencord
1. Перейдите в папку vencord:
   `
   cd vencord
   `
2. Установите зависимости:
   `
   npm install pnpm
   `
3. При запросе выберите **"Y"** для подтверждения установки

### 📦 Шаг 3: Установка плагина AIResponder

#### Скачивание плагина
1. Перейдите в репозиторий AIResponder: [https://github.com/tsx-awtns/vencord-ai-responder](https://github.com/tsx-awtns/vencord-ai-responder)
2. Нажмите зеленую кнопку **"Code"**
3. Выберите **"Download ZIP"**
4. Распакуйте ZIP-файл, чтобы получить файлы плагина

#### Установка плагина
1. Перейдите в папку vencord
2. Зайдите в папку **"src"**
3. Создайте новую папку с именем **"userplugins"** (если её нет)
4. Скопируйте папку **"AIResponder"** из распакованного ZIP в папку **"userplugins"**

Структура папок должна выглядеть так:
`
vencord/
├── src/
│   ├── userplugins/
│   │   └── AIResponder/
│   │       ├── index.tsx
│   │       └── (другие файлы плагина)
`

### 🔨 Шаг 4: Сборка и внедрение Vencord

#### Сборка Vencord
1. Вернитесь в главную папку vencord
2. Откройте Терминал/Командную строку в папке vencord
3. Выполните команду сборки:
   `
   pnpm build
   `
4. Дождитесь успешного завершения сборки

#### Внедрение Vencord в Discord
1. Выполните команду внедрения:
   `
   pnpm inject
   `
2. **Вариант 1**: Нажмите **Enter** для использования стандартного пути установки Discord
3. **Вариант 2**: Введите правильный путь к установке Discord, если стандартный неверен

Обычные пути Discord:
- **Windows**: `C:\Users\[Имя пользователя]\AppData\Local\Discord`
- **macOS**: `/Applications/Discord.app`
- **Linux**: `/opt/discord` или `~/.local/share/discord`

### ✅ Шаг 5: Активация плагина

1. **Полностью перезапустите Discord**
2. Откройте настройки Discord (значок шестеренки)
3. Прокрутите вниз до раздела **"Vencord"**
4. Нажмите на **"Plugins"**
5. Найдите **"AIResponder"** в списке плагинов
6. **Включите** плагин AIResponder
7. При необходимости настройте параметры (опционально)

### 🎮 Шаг 6: Использование плагина

#### Стандартный режим (По каналам)
1. Откройте любой разговор в **личных сообщениях**
2. Найдите **значок AI-бота** рядом с полем ввода сообщения
3. **Нажмите на значок**, чтобы активировать/деактивировать AI-респондер
4. Когда активен, значок светится **зеленым**
5. Когда неактивен, значок **серый**

#### 🌐 **НОВОЕ: Глобальный режим ЛС**
1. **Сначала**: Настройте свой собственный API-ключ (см. Шаг 7)
2. **Включите** "Включить для ВСЕХ ЛС автоматически" в настройках плагина
3. **Нажмите на значок AI** в любом ЛС для активации глобального режима ЛС
4. **Визуальные индикаторы**: Зеленая точка + зеленая рамка вокруг значка
5. **ИИ теперь отвечает на ВСЕ ЛС автоматически!**

#### Альтернатива: Использование слэш-команды
Введите `/airesponder` в любом чате, чтобы включить/выключить AI-респондер.

### ⚙️ Шаг 7: Настройка собственного API-ключа (Рекомендуется)

#### Зачем использовать собственный API-ключ?
- **Неограниченное использование** (без дневных лимитов)
- **Более быстрые ответы** (приоритетная обработка)
- **Лучшая надежность** (выделенная квота)
- **Никаких прерываний** когда стандартный ключ достигает дневного лимита
- **🆕 Включает глобальный режим ЛС** для всех ЛС

#### Как получить собственный API-ключ:
1. Перейдите на [openrouter.ai](https://openrouter.ai)
2. **Зарегистрируйтесь** для бесплатного аккаунта
3. Перейдите в раздел **"API Keys"**
4. **Создайте новый API-ключ**
5. **Скопируйте** API-ключ (начинается с `sk-or-v1-...`)

#### Настройка API-ключа:
1. В Discord перейдите в **Настройки > Vencord > Plugins > AIResponder**
2. Включите **"Use your own OpenRouter.ai API key"**
3. **Вставьте ваш API-ключ** в текстовое поле
4. **🆕 Включите "Включить для ВСЕХ ЛС автоматически"** (новая функция!)
5. **Сохраните** настройки

### 🌐 Шаг 8: Использование глобального режима ЛС (НОВОЕ!)

#### Что такое глобальный режим ЛС?
- **Одна активация = Все ЛС покрыты**
- ИИ отвечает н�� **каждое ЛС** автоматически
- **Требует пользовательский API-ключ** для неограниченного использования
- **Визуальные индикаторы** показывают когда активен

#### Как активировать:
1. **Убедитесь, что у вас настроен пользовательский API-ключ**
2. **Включите "Включить для ВСЕХ ЛС автоматически"** в настройках
3. **Нажмите на значок AI** в любом разговоре ЛС
4. **Ищите**: Зеленая точка + зеленая рамка = Глобальный режим активен
5. **Готово!** ИИ теперь отвечает на все ЛС автоматически

#### Как деактивировать:
- **Нажмите на значок AI снова**, чтобы выключить глобальный режим ЛС
- **Или отключите** "Включить для ВСЕХ ЛС автоматически" в настройках

### 🚨 Дневной лимит достигнут?

Если вы видите уведомление о том, что дневной лимит достигнут:

#### Для пользователей стандартного API-ключа:
1. **Создайте свой собственный бесплатный аккаунт** на [openrouter.ai](https://openrouter.ai)
2. **Получите свой собственный API-ключ** (неограниченное дневное использование)
3. **Включите "Use your own API key"** в настройках плагина
4. **Вставьте ваш новый API-ключ** и сохраните
5. **🆕 Включите глобальный режим ЛС** для автоматических ответов на все ЛС

#### Для пользователей пользовательского API-ключа:
1. **Создайте новый аккаунт OpenRouter.ai** с другим email
2. **Получите новый API-ключ** от нового аккаунта
3. **Обновите ваш API-ключ** в настройках плагина
4. **Альтернатива**: Подождите 24 часа для сброса лимита вашего текущего ключа

### 🔧 Устранение неполадок

#### Плагин не отображается?
- Убедитесь, что папка AIResponder размещена в `src/userplugins/`
- Выполните `pnpm build` снова
- Полностью перезапустите Discord

#### ИИ не отвечает?
- Проверьте, что значок ИИ **зеленый** (активный)
- Убедитесь, что вы в **личных сообщениях** (не на сервере)
- Проверьте подключение к интернету
- **Проверьте уведомления о дневных лимитах**

#### Глобальный режим ЛС не работает?
- **Убедитесь, что у вас настроен пользовательский API-ключ**
- **Проверьте, что "Включить для ВСЕХ ЛС автоматически" включено**
- **Ищите зеленую точку + рамку** на значке AI
- **Попробуйте нажать на значок снова** для переключения

#### Дневной лимит достигнут?
- **Следуйте шагам выше** для создания нового аккаунта или использования собственного API-ключа
- Плагин покажет полезные уведомления с инструкциями

#### Ошибки сборки?
- Убедитесь, что Node.js и Git правильно установлены
- Попробуйте удалить папку `node_modules` и выполните `npm install pnpm` снова
- Убедитесь, что вы в правильной директории vencord

### 📞 Поддержка

Если нужна помощь:
- **Discord Server**: [Присоединиться для поддержки](https://discord.gg/aBvYsY2GnQ)
- **Веб-сайт**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)

---

## العربية

### 🎯 ما هو AIResponder؟

AIResponder هو إضافة ذكية لـ Vencord تجيب تلقائياً على الرسائل المباشرة في Discord باستخدام الذكاء الاصطناعي عندما تكون غائباً أو نائماً أو في العمل أو غير متاح. تستخدم الإضافة مفتاح API افتراضي من OpenRouter.ai مقدم من المطور، لكن يمكنك أيضاً إنشاء واستخدام مفتاح API خاص بك للاستخدام غير المحدود.

### 🆕 **جديد: الوضع العالمي للرسائل المباشرة (v2.2.1)**

**تفعيل لجميع الرسائل المباشرة** - ميزة جديدة قوية تسمح للذكاء الاصطناعي بالرد تلقائياً على جميع رسائلك المباشرة:
- **يتطلب مفتاح API خاص بك** (للاستخدام غير المحدود)
- **تفعيل بنقرة واحدة** - فعل مرة واحدة، يعمل لجميع الرسائل المباشرة
- **مؤشر بصري** - نقطة خضراء وإطار عندما يكون الوضع العالمي نشطاً
- **إدارة ذكية** - يتعامل تلقائياً مع جميع الرسائل المباشرة الواردة

### ⚠️ مهم: الحدود اليومية

**OpenRouter.ai لديه حدود يومية تبلغ حوالي 1,000 طلب يومياً للحسابات المجانية.** عند الوصول لهذا الحد:
- ستعرض الإضافة إشعاراً مفيداً
- يمكنك إنشاء حساب OpenRouter.ai مجاني جديد بإيميل مختلف
- احصل على مفتاح API جديد من الحساب الجديد
- حدث مفتاح API في إعدادات الإضافة

### 📋 المتطلبات

قبل البدء، تأكد من أن لديك:
- جهاز كمبيوتر يعمل بنظام Windows أو macOS أو Linux
- اتصال بالإنترنت
- صلاحيات المدير/sudo (لبعض التثبيتات)

### 🛠️ الخطوة 1: تثبيت البرامج المطلوبة

#### تثبيت Node.js
1. اذهب إلى [nodejs.org](https://nodejs.org/)
2. حمل **إصدار LTS** (موصى به)
3. شغل المثبت واتبع معالج الإعداد
4. أعد تشغيل الكمبيوتر بعد التثبيت

#### تثبيت Git
1. اذهب إلى [git-scm.com](https://git-scm.com/)
2. حمل Git لنظام التشغيل الخاص بك
3. شغل المثبت بالإعدادات الافتراضية
4. أعد تشغيل الكمبيوتر بعد التثبيت

### 🚀 الخطوة 2: تثبيت Vencord

#### تثبيت pnpm عالمياً
1. افتح **Terminal** (macOS/Linux) أو **Command Prompt** (Windows)
2. شغل هذا الأمر:
   `
   npm i -g pnpm
   `
3. انتظر حتى يكتمل التثبيت

#### استنساخ مستودع Vencord
1. انتقل إلى سطح المكتب أو أنشئ مجلد جديد حيث تريد تثبيت Vencord
2. افتح Terminal/Command Prompt في ذلك الموقع
3. شغل هذا الأمر (قد يستغرق بضع دقائق):
   `
   git clone https://github.com/Vendicated/Vencord
   `
4. يجب أن يظهر مجلد باسم "vencord"

#### تثبيت تبعيات Vencord
1. انتقل إلى مجلد vencord:
   `
   cd vencord
   `
2. ثبت التبعيات:
   `
   npm install pnpm
   `
3. إذا طُلب منك، اختر **"Y"** لتأكيد التثبيت

### 📦 الخطوة 3: تثبيت إضافة AIResponder

#### تحميل الإضافة
1. اذهب إلى مستودع AIResponder: [https://github.com/tsx-awtns/vencord-ai-responder](https://github.com/tsx-awtns/vencord-ai-responder)
2. اضغط على الزر الأخضر **"Code"**
3. اختر **"Download ZIP"**
4. استخرج ملف ZIP للحصول على ملفات الإضافة

#### تثبيت الإضافة
1. انتقل إلى مجلد vencord الخاص بك
2. اذهب إلى مجلد **"src"**
3. أنشئ مجلد جديد باسم **"userplugins"** (إذا لم يكن موجوداً)
4. انسخ مجلد **"AIResponder"** من ZIP المستخرج إلى مجلد **"userplugins"**

يجب أن تبدو بنية المجلدات هكذا:
`
vencord/
├── src/
│   ├── userplugins/
│   │   └── AIResponder/
│   │       ├── index.tsx
│   │       └── (ملفات الإضافة الأخرى)
`

### 🔨 الخطوة 4: بناء وحقن Vencord

#### بناء Vencord
1. ارجع إلى المجلد الرئيسي لـ vencord
2. افتح Terminal/Command Prompt في مجلد vencord
3. شغل أمر البناء:
   `
   pnpm build
   `
4. انتظر حتى يكتمل البناء بنجاح

#### حقن Vencord في Discord
1. شغل أمر الحقن:
   `
   pnpm inject
   `
2. **الخيار 1**: اضغط **Enter** لاستخدام مسار تثبيت Discord الافتراضي
3. **الخيار 2**: أدخل المسار الصحيح لتثبيت Discord إذا كان الافتراضي خاطئاً

مسارات Discord الشائعة:
- **Windows**: `C:\Users\[اسم المستخدم]\AppData\Local\Discord`
- **macOS**: `/Applications/Discord.app`
- **Linux**: `/opt/discord` أو `~/.local/share/discord`

### ✅ الخطوة 5: تفعيل الإضافة

1. **أعد تشغيل Discord** بالكامل
2. افتح إعدادات Discord (أيقونة الترس)
3. مرر لأسفل للعثور على قسم **"Vencord"**
4. اضغط على **"Plugins"**
5. ابحث عن **"AIResponder"** في قائمة الإضافات
6. **فعل** إضافة AIResponder
7. اضبط الإعدادات إذا لزم الأمر (اختياري)

### 🎮 الخطوة 6: استخدام الإضافة

#### الوضع القياسي (لكل قناة)
1. افتح أي محادثة **رسائل مباشرة**
2. ابحث عن **أيقونة روبوت الذكاء الاصطناعي** بجانب حقل إدخال الرسالة
3. **اضغط على الأيقونة** لتفعيل/إلغاء تفعيل مجيب الذكاء الاصطناعي
4. عندما يكون نشطاً، ستضيء الأيقونة باللون **الأخضر**
5. عندما يكون غير نشط، ستكون الأيقونة **رمادية**

#### 🌐 **جديد: الوضع العالمي للرسائل المباشرة**
1. **أولاً**: اضبط مفتاح API الخاص بك (انظر الخطوة 7)
2. **فعل** "تفعيل لجميع الرسائل المباشرة تلقائياً" في إعدادات الإضافة
3. **اضغط على أيقونة الذكاء الاصطناعي** في أي رسالة مباشرة لتفعيل الوضع العالمي
4. **المؤشرات البصرية**: نقطة خضراء + إطار أخضر حول الأيقونة
5. **الذكاء الاصطناعي يرد الآن تلقائياً على جميع الرسائل المباشرة!**

#### البديل: استخدام أمر Slash
اكتب `/airesponder` في أي دردشة لتشغيل/إيقاف مجيب الذكاء الاصطناعي.

### ⚙️ الخطوة 7: إعداد مفتاح API خاص بك (موصى به)

#### لماذا استخدام مفتاح API خاص بك؟
- **استخدام غير محدود** (بدون حدود يومية)
- **استجابات أسرع** (معالجة ذات أولوية)
- **موثوقية أفضل** (حصة مخصصة)
- **لا انقطاعات** عندما يصل المفتاح الافتراضي للحد اليومي
- **🆕 يمكن الوضع العالمي للرسائل المباشرة** لجميع الرسائل المباشرة

#### كيفية الحصول على مفتاح API خاص بك:
1. اذهب إلى [openrouter.ai](https://openrouter.ai)
2. **سجل** للحصول على حساب مجاني
3. اذهب إلى قسم **"API Keys"**
4. **أنشئ مفتاح API جديد**
5. **انسخ** مفتاح API (يبدأ بـ `sk-or-v1-...`)

#### تكوين مفتاح API:
1. في Discord، اذهب إلى **الإعدادات > Vencord > Plugins > AIResponder**
2. فعل **"Use your own OpenRouter.ai API key"**
3. **الصق مفتاح API** في حقل النص
4. **🆕 فعل "تفعيل لجميع الرسائل المباشرة تلقائياً"** (ميزة جديدة!)
5. **احفظ** الإعدادات

### 🌐 الخطوة 8: استخدام الوضع العالمي للرسائل المباشرة (جديد!)

#### ما هو الوضع العالمي للرسائل المباشرة؟
- **تفعيل واحد = جميع الرسائل المباشرة مغطاة**
- الذكاء الاصطناعي يرد على **كل رسالة مباشرة** تلقائياً
- **يتطلب مفتاح API مخصص** للاستخدام غير المحدود
- **المؤشرات البصرية** تظهر متى يكون نشطاً

#### كيفية التفعيل:
1. **تأكد من أن لديك مفتاح API مخصص مُعد**
2. **فعل "تفعيل لجميع الرسائل المباشرة تلقائياً"** في الإعدادات
3. **اضغط على أيقونة الذكاء الاصطناعي** في أي محادثة رسائل مباشرة
4. **ابحث عن**: نقطة خضراء + إطار أخضر = الوضع العالمي نشط
5. **تم!** الذكاء الاصطناعي يرد الآن تلقائياً على جميع الرسائل المباشرة

#### كيفية الإلغاء:
- **اضغط على أيقونة الذكاء الاصطناعي مرة أخرى** لإيقاف الوضع العالمي
- **أو ألغ** "تفعيل لجميع الرسائل المباشرة تلقائياً" في الإعدادات

### 🚨 تم الوصول للحد اليومي؟

إذا رأيت إشعاراً بأن الحد اليومي تم الوصول إليه:

#### لمستخدمي مفتاح API الافتراضي:
1. **أنشئ حسابك المجاني الخاص** في [openrouter.ai](https://openrouter.ai)
2. **احصل على مفتاح API خاص بك** (استخدام يومي غير محدود)
3. **فعل "Use your own API key"** في إعدادات الإضافة
4. **الصق مفتاح API الجديد** واحفظ
5. **🆕 فعل الوضع العالمي للرسائل المباشرة** للردود التلقائية على جميع الرسائل المباشرة

#### لمستخدمي مفتاح API المخصص:
1. **أنشئ حساب OpenRouter.ai جديد** بإيميل مختلف
2. **احصل على مفتاح API جديد** من الحساب الجديد
3. **حدث مفتاح API** في إعدادات الإضافة
4. **البديل**: انتظر 24 ساعة لإعادة تعيين حد مفتاحك الحالي

### 🔧 استكشاف الأخطاء وإصلاحها

#### الإضافة لا تظهر؟
- تأكد من وضع مجلد AIResponder في `src/userplugins/`
- شغل `pnpm build` مرة أخرى
- أعد تشغيل Discord بالكامل

#### الذكاء الاصطناعي لا يجيب؟
- تحقق من أن أيقونة الذكاء الاصطناعي **خضراء** (نشطة)
- تأكد من أنك في **رسالة مباشرة** (وليس في خادم)
- تحقق من اتصالك بالإنترنت
- **تحقق من إشعارات الحدود اليومية**

#### الوضع العالمي للرسائل المباشرة لا يعمل؟
- **تأكد من أن لديك مفتاح API مخصص** مُعد
- **تحقق من أن "تفعيل لجميع الرسائل المباشرة تلقائياً" مفعل**
- **ابحث عن نقطة خضراء + إطار** على أيقونة الذكاء الاصطناعي
- **جرب الضغط على الأيقونة مرة أخرى** للتبديل

#### تم الوصول للحد اليومي؟
- **اتبع الخطوات أعلاه** لإنشاء حساب جديد أو استخدام مفتاح API خاص بك
- ستعرض الإضافة إشعارات مفيدة مع التعليمات

#### أخطاء البناء؟
- تأكد من تثبيت Node.js و Git بشكل صحيح
- جرب حذف مجلد `node_modules` وشغل `npm install pnpm` مرة أخرى
- تأكد من أنك في دليل vencord الصحيح

### 📞 الدعم

إذا كنت تحتاج مساعدة:
- **Discord Server**: [انضم للحصول على الدعم](https://discord.gg/aBvYsY2GnQ)
- **الموقع الإلكتروني**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)

---

## 🎉 Congratulations! / Herzlichen Glückwunsch! / Поздравляем! / تهانينا!

You have successfully installed the AIResponder plugin! The AI will now automatically respond to your Discord DMs when you're away.

Du hast das AIResponder Plugin erfolgreich installiert! Die KI wird jetzt automatisch auf deine Discord-DMs antworten, wenn du weg bist.

Вы успешно установили плагин AIResponder! ИИ теперь будет автоматически отвечать на ваши личные сообщения Discord, когда вас нет.

لقد قمت بتثبيت إضافة AIResponder بنجاح! سيقوم الذكاء الاصطناعي الآن بالرد تلقائياً على رسائلك المباشرة في Discord عندما تكون غائباً.

---

**Created with ❤️ by mays_024**  
**Website**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)  
**Repository**: [github.com/tsx-awtns/vencord-ai-responder](https://github.com/tsx-awtns/vencord-ai-responder)
