How to compile :
1. Install nodejs - https://nodejs.org/en/download/ (4.4.6 or above)
2. Clone the project from https://github.com/theerapatcha/browser-sync-record-replay or use the source-code zip provided in submission
3. cd to the project directory
4. Execute the following command :
"npm install"
5. Our project is a plugin to a web developer/designer/tester tool.
6. We have included a sample in testapp/todo.js within the source-code which demonstrates how to enable the plugin to be used within browser-sync

How to execute the example :
1. Execute the following command - "cd testapp/"
2. Execute the following command - "node todo.js"
3. Notice the messages on console which prints the url which can be opened in the browser.


How to record and replay actions :
1. Go to the UI interface of running browser sync (usually will be port 3001)
2. Navigate to side menu "Plugins"
3. Under "Record & Replay", Click "Start" button to start recording user actions from any connected user agent(s).
4. Click "Stop" button to stop recording.
5. The new recording will be shown in the list of recordings below start/stop button. You can click on "Play" button to replay the recording on all connected user-agents/browsers.