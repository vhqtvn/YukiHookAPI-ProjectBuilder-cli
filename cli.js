
const inquirer = require('inquirer');
const axios = require('axios');
const xml2js = require('xml2js');
const path = require('path');
const fs = require('fs');

// Mock Electron components
const app = {
    isPackaged: false,
    getAppPath: () => process.cwd(),
    getPath: (name) => {
        if (name === 'appData') return path.join(process.cwd(), 'data');
        return process.cwd();
    }
};

// Mock locale
const locale = {
    i18n: {
        selectProjectPath: 'Select Project Path',
        selectProjectPathTip: 'Select where to create the project',
        selectThisDirectory: 'Select this directory',
        buildDependProblemTip: 'Build dependency problem',
        fileAlreadyExistsTip: 'File already exists',
        readOnlyFileSystemTip: 'Read-only file system',
        packagingAndBuildingTip: 'Packaging and building... {0}/{1}',
        buildingFailureTip: 'Building failure',
        unpackingTemplateTip: 'Unpacking template... {0}/{1}',
        buildCompleteTip: 'Build complete',
        projectName: 'Project Name',
        moduleName: 'Module Name',
        moduleDescription: 'Module Description',
        gradlePaper: 'Gradle Paper',
        agpVersion: 'AGP Version',
        kotlinVersion: 'Kotlin Version',
        yukiHookApiVersion: 'YukiHookAPI Version',
        buildPathNoticeTip: 'Project created at:',
        somethingWentWrongTip: 'Something went wrong'
    },
    format: (str, ...args) => {
        let result = str;
        args.forEach((arg, index) => {
            result = result.replace(`{${index}}`, arg);
        });
        return result;
    }
};

// Mock appWindow
const appWindow = {
    showOpenDirectory: (option, callback, onError) => {
        // In CLI, we ask for path via inquirer or argument, so this might not be used directly
        // But transaction.js calls it. We need to intercept it.
        // We will override transaction.start instead of mocking this fully.
    },
    webContents: {
        methods: {
            build: {
                changeStatus: (msg) => console.log(msg),
                failure: (msg) => {
                    console.error('Error:', msg);
                    process.exit(1);
                },
                cancel: () => {
                    console.log('Cancelled');
                    process.exit(0);
                },
                complete: (msg) => {
                    console.log(msg.replace(/<br\/>/g, '\n').replace(/&nbsp/g, ' '));
                    process.exit(0);
                }
            }
        }
    }
};

// Mock appConfig
const { fileSystem } = require('./src/libs/file-system');
const appConfig = {
    sourcePath: __dirname,
    dataPath: path.join(process.cwd(), 'data', 'YukiHookAPI'),
    createDataDir: () => {
        const dataPath = appConfig.dataPath;
        if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath, { recursive: true });
    }
};

// Mock modules required by transaction.js
const mockModules = {
    './libs/locale': { locale },
    './app-space': { appWindow, appConfig }
};

// Override require to serve mocks
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(request) {
    if (mockModules[request]) {
        return mockModules[request];
    }
    // Handle relative paths from src/transaction.js
    if (request.startsWith('./') && this.filename.endsWith('transaction.js')) {
         const resolved = path.resolve(path.dirname(this.filename), request);
         const relativeToRoot = path.relative(__dirname, resolved);
         if (relativeToRoot === 'src/libs/locale') return { locale };
         if (relativeToRoot === 'src/app-space') return { appWindow, appConfig };
    }
    return originalRequire.apply(this, arguments);
};

// Import transaction after mocking
const { transaction } = require('./src/transaction');

// Restore require? No, we need it for transaction.js dependencies

async function fetchDependencies() {
    console.log('Fetching dependencies versions...');
    const deps = {
        gradlePapers: [],
        androidGradlePluginVersions: [],
        kotlinVersions: [],
        gropifyVersions: [],
        yukiHookApiVersions: []
    };

    try {
        // Gradle
        const gradleRes = await axios.get('https://services.gradle.org/distributions/');
        const gradleMatches = gradleRes.data.match(/gradle-([0-9.]+)-(bin|all)\.zip/g);
        if (gradleMatches) {
            const versions = [...new Set(gradleMatches.map(f => f.replace('gradle-', '').replace('-bin.zip', '').replace('-all.zip', '')))];
             // Filter and sort, keep recent ones. Simplified logic.
            deps.gradlePapers = versions.filter(v => !v.includes('rc') && !v.includes('milestone')).sort().reverse().slice(0, 20).map(v => `gradle-${v}-bin.zip`);
        }

        // AGP
        const agpRes = await axios.get('https://maven.google.com/com/android/tools/build/gradle/maven-metadata.xml');
        const agpParser = new xml2js.Parser();
        const agpResult = await agpParser.parseStringPromise(agpRes.data);
        deps.androidGradlePluginVersions = agpResult.metadata.versioning[0].versions[0].version.filter(v => !v.includes('alpha') && !v.includes('beta') && !v.includes('rc')).reverse();

        // Kotlin
        const kotlinRes = await axios.get('https://api.github.com/repos/JetBrains/kotlin/releases');
        deps.kotlinVersions = kotlinRes.data.map(r => ({ main: r.tag_name.replace('v', ''), ksp: '' })).filter(v => !v.main.includes('-'));

        // Kotlin KSP (Simplified: just matching main version)
        const kspRes = await axios.get('https://api.github.com/repos/google/ksp/releases');
        kspRes.data.forEach(r => {
            const tagName = r.tag_name;
             if (!tagName.toLowerCase().includes('rc') && !tagName.toLowerCase().includes('beta')) {
                 deps.kotlinVersions.forEach(kv => {
                     if (tagName.startsWith(kv.main)) kv.ksp = tagName;
                 });
             }
        });
        deps.kotlinVersions = deps.kotlinVersions.filter(v => v.ksp);

        // Gropify
        const gropifyRes = await axios.get('https://repo1.maven.org/maven2/com/highcapable/gropify/gropify/maven-metadata.xml');
        const gropifyParser = new xml2js.Parser();
        const gropifyResult = await gropifyParser.parseStringPromise(gropifyRes.data);
        deps.gropifyVersions = [gropifyResult.metadata.versioning[0].latest[0]];

        // YukiHookAPI
        const yukiRes = await axios.get('https://api.github.com/repos/HighCapable/YuKiHookAPI/releases');
        deps.yukiHookApiVersions = yukiRes.data.map(r => r.tag_name);

    } catch (e) {
        console.error('Failed to fetch dependencies:', e.message);
        process.exit(1);
    }
    return deps;
}

async function main() {
    appConfig.createDataDir();

    const deps = await fetchDependencies();

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Project Name:',
            validate: input => /^[a-zA-Z_]\w*$/.test(input) ? true : 'Invalid project name (letters, numbers, underscores only, start with letter)'
        },
        {
            type: 'input',
            name: 'packageName',
            message: 'Package Name:',
            validate: input => /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/.test(input) ? true : 'Invalid package name'
        },
        {
            type: 'input',
            name: 'appName',
            message: 'App Name:'
        },
        {
            type: 'input',
            name: 'moduleDescription',
            message: 'Module Description:'
        },
        {
            type: 'number',
            name: 'appMinApi',
            message: 'App Min API:',
            default: 27
        },
        {
            type: 'number',
            name: 'appTargetApi',
            message: 'App Target API:',
            default: 35
        },
        {
            type: 'number',
            name: 'xposedMinApi',
            message: 'Xposed Min API:',
            default: 93
        },
        {
            type: 'rawlist',
            name: 'moduleCompoment',
            message: 'Module Component:',
            choices: [
                { name: 'Fully (Activity + Hook)', value: 0 },
                { name: 'Blank (Hook Only)', value: 1 },
                { name: 'No GUI (No Activity)', value: 2 }
            ]
        },
        {
            type: 'rawlist',
            name: 'targetXposedPlatform',
            message: 'Target Xposed Platform:',
            choices: [
                { name: 'Xposed', value: 0 },
                { name: 'LSPosed', value: 1 },
                // { name: 'LSPatch', value: 2 }, // WIP in original code
                { name: 'TaiChi', value: 3 },
                { name: 'SandHook', value: 4 }
            ]
        },
        {
            type: 'rawlist',
            name: 'gradlePaper',
            message: 'Gradle Version:',
            choices: deps.gradlePapers
        },
        {
            type: 'rawlist',
            name: 'androidGradlePluginVersion',
            message: 'AGP Version:',
            choices: deps.androidGradlePluginVersions
        },
        {
            type: 'rawlist',
            name: 'kotlinVersionObj',
            message: 'Kotlin Version:',
            choices: deps.kotlinVersions.map(v => ({ name: v.main, value: v }))
        },
        {
            type: 'rawlist',
            name: 'yukiHookApiVersion',
            message: 'YukiHookAPI Version:',
            choices: deps.yukiHookApiVersions
        }
    ]);

    const projectConfigs = {
        basicConfig: {
            projectName: answers.projectName,
            packageName: answers.packageName,
            appName: answers.appName,
            moduleDescription: answers.moduleDescription,
            appMinApi: answers.appMinApi,
            appTargetApi: answers.appTargetApi,
            xposedMinApi: answers.xposedMinApi,
            moduleCompoment: answers.moduleCompoment,
            targetXposedPlatform: answers.targetXposedPlatform,
            newXSharePrefs: 0, // Default
            moduleScopes: [] // Default empty
        },
        yukiHookApiConfig: {
            entryClassName: 'HookEntry', // Default
            debugLogTagName: 'YukiHookAPI', // Default
            supportResourcesHook: 0,
            enableDebug: 0,
            enableDebugLog: 0,
            enableResourcesCache: 0,
            enableModuleStatus: 0,
            enableYChannel: 0,
        },
        projectDependencies: {
            gradlePaper: answers.gradlePaper,
            androidGradlePluginVersion: answers.androidGradlePluginVersion,
            kotlinVersion: answers.kotlinVersionObj.main,
            kotlinKspVersion: answers.kotlinVersionObj.ksp,
            gropifyVersion: deps.gropifyVersions[0],
            yukiHookApiVersion: answers.yukiHookApiVersion
        }
    };

    // Override transaction.start to skip dialog
    transaction.start = (configs) => {
        const projectPath = path.join(process.cwd(), configs.basicConfig.projectName);
        transaction.projectPath = projectPath;
        
        if (!fileSystem.exists(projectPath)) {
            const ossPath = fileSystem.path(appConfig.sourcePath, 'public', transaction.templateName.concat('.zip'));
            const outPath = fileSystem.path(appConfig.dataPath, transaction.templateName.concat('.zip'));
            const targetPath = fileSystem.path(appConfig.dataPath, transaction.templateName);
            
            if (fileSystem.exists(ossPath)) {
                if (fileSystem.exists(targetPath)) {
                    fileSystem.delete(targetPath, () => {
                        transaction.packaing(configs, ossPath, outPath, targetPath);
                    });
                } else {
                    transaction.packaing(configs, ossPath, outPath, targetPath);
                }
            } else {
                appWindow.webContents.methods.build.failure(locale.i18n.buildDependProblemTip);
            }
        } else {
            appWindow.webContents.methods.build.failure(locale.i18n.fileAlreadyExistsTip);
        }
    };

    transaction.start(projectConfigs);
}

main();
