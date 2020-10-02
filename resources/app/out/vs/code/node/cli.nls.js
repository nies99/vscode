/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
/*---------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
define("vs/code/node/cli.nls", {
	"vs/platform/environment/node/argv": [
		"Options",
		"Extensions Management",
		"Troubleshooting",
		"Compare two files with each other.",
		"Add folder(s) to the last active window.",
		"Open a file at the path on the specified line and character position.",
		"Force to open a new window.",
		"Force to open a file or folder in an already opened window.",
		"Opens a window with given folder uri(s)",
		"Opens a window with given file uri(s)",
		"Wait for the files to be closed before returning.",
		"The locale to use (e.g. en-US or zh-TW).",
		"Specifies the directory that user data is kept in. Can be used to open multiple distinct instances of Code.",
		"Print usage.",
		"Set the root path for extensions.",
		"List the installed extensions.",
		"Show versions of installed extensions, when using --list-extension.",
		"Filters installed extensions by provided category, when using --list-extension.",
		"Installs or updates the extension. Use `--force` argument to avoid prompts. The identifier of an extension is always `${publisher}.${name}`. To install a specific version provide `@${version}`. For example: 'vscode.csharp@1.2.3'.",
		"Uninstalls an extension.",
		"Enables proposed API features for extensions. Can receive one or more extension IDs to enable individually.",
		"Print version.",
		"Print verbose output (implies --wait).",
		"Log level to use. Default is 'info'. Allowed values are 'critical', 'error', 'warn', 'info', 'debug', 'trace', 'off'.",
		"Print process usage and diagnostics information.",
		"Run CPU profiler during startup",
		"Disable all installed extensions.",
		"Disable an extension.",
		"Turn sync on or off",
		"Allow debugging and profiling of extensions. Check the developer tools for the connection URI.",
		"Allow debugging and profiling of extensions with the extension host being paused after start. Check the developer tools for the connection URI.",
		"Disable GPU hardware acceleration.",
		"Max memory size for a window (in Mbytes).",
		"Shows all telemetry events which VS code collects.",
		"Usage",
		"options",
		"paths",
		"To read output from another program, append '-' (e.g. 'echo Hello World | {0} -')",
		"To read from stdin, append '-' (e.g. 'ps aux | grep code | {0} -')",
		"Unknown version",
		"Unknown commit"
	],
	"vs/platform/environment/node/argvHelper": [
		"Warning: '{0}' is not in the list of known options, but still passed to Electron/Chromium.",
		"Option '{0}' is defined more than once. Using value '{1}.'",
		"Arguments in `--goto` mode should be in the format of `FILE(:LINE(:CHARACTER))`."
	],
	"vs/platform/files/common/files": [
		"Unknown Error",
		"{0}B",
		"{0}KB",
		"{0}MB",
		"{0}GB",
		"{0}TB"
	]
});