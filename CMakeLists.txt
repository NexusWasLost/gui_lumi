cmake_minimum_required(VERSION 3.16)
project(Lumi_GUI LANGUAGES CXX)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")

include(FetchContent)

FetchContent_Declare(
    webview
    GIT_REPOSITORY https://github.com/webview/webview
    GIT_TAG 0.12.0)
FetchContent_MakeAvailable(webview)

add_executable(Lumi WIN32)
target_sources(Lumi PRIVATE main.cpp app.rc)
target_include_directories(Lumi PRIVATE ./Lumi_v5.0.0/include)
target_link_directories(Lumi PRIVATE ./Lumi_v5.0.0/lib)
target_link_libraries(Lumi PRIVATE webview::core)
target_link_libraries(Lumi PRIVATE lumi)
target_link_libraries(Lumi PRIVATE dxgi dxguid ole32 iphlpapi)
