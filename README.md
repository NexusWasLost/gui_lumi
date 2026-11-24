# GUI for Lumi

This is an Graphical user interface application built using C++ and webview, integrating [Lumi](https://github.com/NexusWasLost/Lumi) to show system information.

## Download

Download from [releases]() or click to download the latest release [here]().

No installations required, it ships as a portable executable.

> [!NOTE]
> Windows may show a SmartScreen warning because the app is not code-signed. Choose More info, then Run anyway.

Supported on Windows 10 and Windows 11. Moreover it requires [WebView2](https://developer.microsoft.com/en-in/microsoft-edge/webview2/?ch=1&form=MA13LH&cs=2885428259) to render the UI, though it should be present on most systems and I too bundle a `libwebview.dll` with downloadable file.

## Why did I make this ?

I was trying to make applications using C++ and felt the process is extremely tidious with SDL3. Though libraries like Qt exsits, I didn't want to get used to a framework and also I recently learned about webview so wanted give that a try.

Best case was I integrated my own C library - Lumi and welp now we are here !

## AI usage

This section is I think important to clarify how I used AI for building this application.

**UI**: Since it uses webview its written in HTML, CSS and JavaScript and I used AI to mostly vibe code this part because I hate writing UI ! Though I still needed to make tweaks and additions in AI code to solve UI and logic bugs.

**Window**: The main executable (C++) owns the actual window and also the integration with Lumi. This one is hand coded, I wrote every line myself. I used AI to learn the concepts and why things behave the way they do.

**AI used**: Claude & ChatGPT

## Building from scratch

This project uses CMake with MinGW Makefiles (make32) as its build tool.

1. Clone the project and navigate into the cloned directory to get started

```shell
>>> git clone https://github.com/NexusWasLost/gui_lumi.git

>>> cd gui_lumi
```

2. Setup cmake

```shell
cmake -B build -G "MinGW Makefiles"
```

This will create a `build` directory.

3. Build an executable using:

```shell
cmake --build build
```

This will generate an executable in `<root>/build/bin`.

This build is a dev build, that means developer tools will be enabled by default !

### Buidling a release build

To build a release build the steps are slightly different !

```shell
cmake -B release_build -DCMAKE_BUILD_TYPE=Release -G "MinGW Makefiles"
```

This will create a `release_build` directory which is separate from `build` directory.

Now build using:

```shell
cmake --build release_build
```

This will create an executable in the `<root>/release_build/bin` directory,
alongside that it will also create a fully releasable directory with everything in it. That directory will be located in `<root>/release_build/release`.

## Other info

- This application only supports Windows 11 and 10.
- I built is purely out of trying webview with C++, so newer builds might be real slow.
- [Lumi](https://github.com/NexusWasLost/Lumi) will always be updated before, therefore it may be possible the latest build of this application is running an older version of Lumi.
