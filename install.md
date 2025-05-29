# 🤖 AIResponder Plugin Installation Guide

## 📋 Table of Contents
- [English](#english)
- [Deutsch](#deutsch)
- [Русский](#русский)
- [العربية](#العربية)

---

## English

### 🎯 What is AIResponder?

AIResponder is an intelligent Vencord plugin that automatically responds to Discord direct messages using AI when you're away, sleeping, at work, or simply unavailable. The plugin uses a default OpenRouter.ai API key provided by the developer, but you can also create and use your own API key for unlimited usage.

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
   \`\`\`bash
   npm i -g pnpm
   \`\`\`
3. Wait for the installation to complete

#### Clone Vencord Repository
1. Navigate to your Desktop or create a new folder where you want to install Vencord
2. Open Terminal/Command Prompt in that location
3. Run this command (this may take a few minutes):
   \`\`\`bash
   git clone https://github.com/Vendicated/Vencord
   \`\`\`
4. A folder named "vencord" should appear

#### Install Vencord Dependencies
1. Navigate into the vencord folder:
   \`\`\`bash
   cd vencord
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install pnpm
   \`\`\`
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
\`\`\`
vencord/
├── src/
│   ├── userplugins/
│   │   └── AIResponder/
│   │       ├── index.tsx
│   │       └── (other plugin files)
\`\`\`

### 🔨 Step 4: Build and Inject Vencord

#### Build Vencord
1. Go back to the main vencord folder
2. Open Terminal/Command Prompt in the vencord folder
3. Run the build command:
   \`\`\`bash
   pnpm build
   \`\`\`
4. Wait for the build to complete successfully

#### Inject Vencord into Discord
1. Run the injection command:
   \`\`\`bash
   pnpm inject
   \`\`\`
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

#### Activate AI Responder
1. Open any **Direct Message** conversation
2. Look for the **AI bot icon** next to the message input field
3. **Click the icon** to activate/deactivate the AI responder
4. When active, the icon will glow **green**
5. When inactive, the icon will be **gray**

#### Alternative: Use Slash Command
Type `/airesponder` in any chat to toggle the AI responder on/off.

### ⚙️ Step 7: Optional - Use Your Own API Key

#### Why use your own API key?
- **Unlimited usage** (no rate limits)
- **Faster responses** (priority processing)
- **Better reliability** (dedicated quota)

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
4. **Save** the settings

### 🔧 Troubleshooting

#### Plugin not showing up?
- Make sure you placed the AIResponder folder in `src/userplugins/`
- Run `pnpm build` again
- Restart Discord completely

#### AI not responding?
- Check if the AI icon is **green** (active)
- Make sure you're in a **Direct Message** (not a server)
- Check your internet connection

#### Build errors?
- Make sure Node.js and Git are properly installed
- Try deleting `node_modules` folder and run `npm install pnpm` again
- Make sure you're in the correct vencord directory

### 📞 Support

If you need help:
- **GitHub Issues**: [Report a bug](https://github.com/tsx-awtns/vencord-ai-responder/issues)
- **Website**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)

---

## Deutsch

### 🎯 Was ist AIResponder?

AIResponder ist ein intelligentes Vencord-Plugin, das automatisch auf Discord-Direktnachrichten mit KI antwortet, wenn du weg bist, schläfst, arbeitest oder einfach nicht verfügbar bist. Das Plugin verwendet einen Standard-OpenRouter.ai-API-Schlüssel vom Entwickler, aber du kannst auch deinen eigenen API-Schlüssel erstellen und für unbegrenzte Nutzung verwenden.

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
   \`\`\`bash
   npm i -g pnpm
   \`\`\`
3. Warte, bis die Installation abgeschlossen ist

#### Vencord Repository klonen
1. Navigiere zu deinem Desktop oder erstelle einen neuen Ordner, wo du Vencord installieren möchtest
2. Öffne Terminal/Eingabeaufforderung an diesem Ort
3. Führe diesen Befehl aus (kann einige Minuten dauern):
   \`\`\`bash
   git clone https://github.com/Vendicated/Vencord
   \`\`\`
4. Ein Ordner namens "vencord" sollte erscheinen

#### Vencord-Abhängigkeiten installieren
1. Navigiere in den vencord-Ordner:
   \`\`\`bash
   cd vencord
   \`\`\`
2. Installiere Abhängigkeiten:
   \`\`\`bash
   npm install pnpm
   \`\`\`
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
\`\`\`
vencord/
├── src/
│   ├── userplugins/
│   │   └── AIResponder/
│   │       ├── index.tsx
│   │       └── (andere Plugin-Dateien)
\`\`\`

### 🔨 Schritt 4: Vencord bauen und injizieren

#### Vencord bauen
1. Gehe zurück zum Haupt-vencord-Ordner
2. Öffne Terminal/Eingabeaufforderung im vencord-Ordner
3. Führe den Build-Befehl aus:
   \`\`\`bash
   pnpm build
   \`\`\`
4. Warte, bis der Build erfolgreich abgeschlossen ist

#### Vencord in Discord injizieren
1. Führe den Injektions-Befehl aus:
   \`\`\`bash
   pnpm inject
   \`\`\`
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

#### AI Responder aktivieren
1. Öffne eine **Direktnachrichten**-Unterhaltung
2. Suche nach dem **AI-Bot-Symbol** neben dem Nachrichteneingabefeld
3. **Klicke auf das Symbol**, um den AI-Responder zu aktivieren/deaktivieren
4. Wenn aktiv, leuchtet das Symbol **grün**
5. Wenn inaktiv, ist das Symbol **grau**

#### Alternative: Slash-Befehl verwenden
Tippe `/airesponder` in einen beliebigen Chat, um den AI-Responder ein-/auszuschalten.

### ⚙️ Schritt 7: Optional - Eigenen API-Schlüssel verwenden

#### Warum eigenen API-Schlüssel verwenden?
- **Unbegrenzte Nutzung** (keine Rate-Limits)
- **Schnellere Antworten** (Prioritätsverarbeitung)
- **Bessere Zuverlässigkeit** (dedizierte Quote)

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
4. **Speichere** die Einstellungen

### 🔧 Fehlerbehebung

#### Plugin wird nicht angezeigt?
- Stelle sicher, dass du den AIResponder-Ordner in `src/userplugins/` platziert hast
- Führe `pnpm build` erneut aus
- Starte Discord vollständig neu

#### AI antwortet nicht?
- Überprüfe, ob das AI-Symbol **grün** (aktiv) ist
- Stelle sicher, dass du in einer **Direktnachricht** bist (nicht in einem Server)
- Überprüfe deine Internetverbindung

#### Build-Fehler?
- Stelle sicher, dass Node.js und Git ordnungsgemäß installiert sind
- Versuche, den `node_modules`-Ordner zu löschen und führe `npm install pnpm` erneut aus
- Stelle sicher, dass du im korrekten vencord-Verzeichnis bist

### 📞 Support

Wenn du Hilfe benötigst:
- **GitHub Issues**: [Fehler melden](https://github.com/tsx-awtns/vencord-ai-responder/issues)
- **Website**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)

---

## Русский

### 🎯 Что такое AIResponder?

AIResponder - это интеллектуальный плагин для Vencord, который автоматически отвечает на личные сообщения Discord с помощью ИИ, когда вы отсутствуете, спите, работаете или просто недоступны. Плагин использует стандартный API-ключ OpenRouter.ai от разработчика, но вы также можете создать и использовать свой собственный API-ключ для неограниченного использования.

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
   \`\`\`bash
   npm i -g pnpm
   \`\`\`
3. Дождитесь завершения установки

#### Клонирование репозитория Vencord
1. Перейдите на рабочий стол или создайте новую папку, где хотите установить Vencord
2. Откройте Терминал/Командную строку в этом месте
3. Выполните эту команду (может занять несколько минут):
   \`\`\`bash
   git clone https://github.com/Vendicated/Vencord
   \`\`\`
4. Должна появиться папка с именем "vencord"

#### Установка зависимостей Vencord
1. Перейдите в папку vencord:
   \`\`\`bash
   cd vencord
   \`\`\`
2. Установите зависимости:
   \`\`\`bash
   npm install pnpm
   \`\`\`
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
\`\`\`
vencord/
├── src/
│   ├── userplugins/
│   │   └── AIResponder/
│   │       ├── index.tsx
│   │       └── (другие файлы плагина)
\`\`\`

### 🔨 Шаг 4: Сборка и внедрение Vencord

#### Сборка Vencord
1. Вернитесь в главную папку vencord
2. Откройте Терминал/Командную строку в папке vencord
3. Выполните команду сборки:
   \`\`\`bash
   pnpm build
   \`\`\`
4. Дождитесь успешного завершения сборки

#### Внедрение Vencord в Discord
1. Выполните команду внедрения:
   \`\`\`bash
   pnpm inject
   \`\`\`
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

#### Активация AI Responder
1. Откройте любой разговор в **личных сообщениях**
2. Найдите **значок AI-бота** рядом с полем ввода сообщения
3. **Нажмите на значок**, чтобы активировать/деактивировать AI-респондер
4. Когда активен, значок светится **зеленым**
5. Когда неактивен, значок **серый**

#### Альтернатива: Использование слэш-команды
Введите `/airesponder` в любом чате, чтобы включить/выключить AI-респондер.

### ⚙️ Шаг 7: Опционально - Использование собственного API-ключа

#### Зачем использовать собственный API-ключ?
- **Неограниченное использование** (без лимитов)
- **Более быстрые ответы** (приоритетная обработка)
- **Лучшая надежность** (выделенная квота)

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
4. **Сохраните** настройки

### 🔧 Устранение неполадок

#### Плагин не отображается?
- Убедитесь, что папка AIResponder размещена в `src/userplugins/`
- Выполните `pnpm build` снова
- Полностью перезапустите Discord

#### ИИ не отвечает?
- Проверьте, что значок ИИ **зеленый** (активный)
- Убедитесь, что вы в **личных сообщениях** (не на сервере)
- Проверьте подключение к интернету

#### Ошибки сборки?
- Убедитесь, что Node.js и Git правильно установлены
- Попробуйте удалить папку `node_modules` и выполните `npm install pnpm` снова
- Убедитесь, что вы в правильной директории vencord

### 📞 Поддержка

Если нужна помощь:
- **GitHub Issues**: [Сообщить об ошибке](https://github.com/tsx-awtns/vencord-ai-responder/issues)
- **Веб-сайт**: [www.syva.uk/syva-dev/](https://www.syva.uk/syva-dev/)

---

## العربية

### 🎯 ما هو AIResponder؟

AIResponder هو إضافة ذكية لـ Vencord تجيب تلقائياً على الرسائل المباشرة في Discord باستخدام الذكاء الاصطناعي عندما تكون غائباً أو نائماً أو في العمل أو غير متاح. تستخدم الإضافة مفتاح API افتراضي من OpenRouter.ai مقدم من المطور، لكن يمكنك أيضاً إنشاء واستخدام مفتاح API خاص بك للاستخدام غير المحدود.

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
   \`\`\`bash
   npm i -g pnpm
   \`\`\`
3. انتظر حتى يكتمل التثبيت

#### استنساخ مستودع Vencord
1. انتقل إلى سطح المكتب أو أنشئ مجلد جديد حيث تريد تثبيت Vencord
2. افتح Terminal/Command Prompt في ذلك الموقع
3. شغل هذا الأمر (قد يستغرق بضع دقائق):
   \`\`\`bash
   git clone https://github.com/Vendicated/Vencord
   \`\`\`
4. يجب أن يظهر مجلد باسم "vencord"

#### تثبيت تبعيات Vencord
1. انتقل إلى مجلد vencord:
   \`\`\`bash
   cd vencord
   \`\`\`
2. ثبت التبعيات:
   \`\`\`bash
   npm install pnpm
   \`\`\`
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
\`\`\`
vencord/
├── src/
│   ├── userplugins/
│   │   └── AIResponder/
│   │       ├── index.tsx
│   │       └── (ملفات الإضافة الأخرى)
\`\`\`

### 🔨 الخطوة 4: بناء وحقن Vencord

#### بناء Vencord
1. ارجع إلى المجلد الرئيسي لـ vencord
2. افتح Terminal/Command Prompt في مجلد vencord
3. شغل أمر البناء:
   \`\`\`bash
   pnpm build
   \`\`\`
4. انتظر حتى يكتمل البناء بنجاح

#### حقن Vencord في Discord
1. شغل أمر الحقن:
   \`\`\`bash
   pnpm inject
   \`\`\`
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

#### تفعيل AI Responder
1. افتح أي محادثة **رسائل مباشرة**
2. ابحث عن **أيقونة روبوت الذكاء الاصطناعي** بجانب حقل إدخال الرسالة
3. **اضغط على الأيقونة** لتفعيل/إلغاء تفعيل مجيب الذكاء الاصطناعي
4. عندما يكون نشطاً، ستضيء الأيقونة باللون **الأخضر**
5. عندما يكون غير نشط، ستكون الأيقونة **رمادية**

#### البديل: استخدام أمر Slash
اكتب `/airesponder` في أي دردشة لتشغيل/إيقاف مجيب الذكاء الاصطناعي.

### ⚙️ الخطوة 7: اختياري - استخدام مفتاح API خاص بك

#### لماذا استخدام مفتاح API خاص بك؟
- **استخدام غير محدود** (بدون حدود معدل)
- **استجابات أسرع** (معالجة ذات أولوية)
- **موثوقية أفضل** (حصة مخصصة)

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
4. **احفظ** الإعدادات

### 🔧 استكشاف الأخطاء وإصلاحها

#### الإضافة لا تظهر؟
- تأكد من وضع مجلد AIResponder في `src/userplugins/`
- شغل `pnpm build` مرة أخرى
- أعد تشغيل Discord بالكامل

#### الذكاء الاصطناعي لا يجيب؟
- تحقق من أن أيقونة الذكاء الاصطناعي **خضراء** (نشطة)
- تأكد من أنك في **رسالة مباشرة** (وليس في خادم)
- تحقق من اتصالك بالإنترنت

#### أخطاء البناء؟
- تأكد من تثبيت Node.js و Git بشكل صحيح
- جرب حذف مجلد `node_modules` وشغل `npm install pnpm` مرة أخرى
- تأكد من أنك في دليل vencord الصحيح

### 📞 الدعم

إذا كنت تحتاج مساعدة:
- **GitHub Issues**: [الإبلاغ عن خطأ](https://github.com/tsx-awtns/vencord-ai-responder/issues)
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
