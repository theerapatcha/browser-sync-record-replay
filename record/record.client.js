// angular controller goes here
(function (angular) {

    const SECTION_NAME = "record";

    var config = {
        databaseURL: "https://browser-sync-record.firebaseio.com",
    };
    firebase.initializeApp(config);
    var db = firebase.database();

    angular
        .module("BrowserSync")
        .controller("RecordController", [
            "options",
            "Socket",
            "pagesConfig",
            "$timeout",
            "$scope",
            "$rootScope",
            RecordController
        ]);

    /**
     * @param options
     * @param Socket
     * @param pagesConfig
     */
    function RecordController(options, Socket, pagesConfig, $timeout, $scope, $rootScope) {
        var ctrl = this;
        // console.log("test");
        ctrl.clickStart = function(){
            console.log("start");
            Socket.uiEvent({
                namespace: SECTION_NAME,
                event: "start",
                data: {
                    
                }
            });
            $rootScope.$emit("notify:flash", {
                heading: "Record & Replay:",
                message: "Recording started"
            });
            ctrl.isStarted = true;
        };
        ctrl.clickStop = function(){
            console.log("stop");
            Socket.uiEvent({
                namespace: SECTION_NAME,
                event: "stop",
                data: {
                 
                }
            });
            $rootScope.$emit("notify:flash", {
                heading: "Record & Replay:",
                message: "Recording stopped"
            });
            ctrl.isStarted = false;
        };
        ctrl.clickPlay = function(key){
            console.log("play");
            Socket.uiEvent({
                namespace: SECTION_NAME,
                event: "play",
                data: {
                    recordId: key
                }
            });
            $rootScope.$emit("notify:flash", {
                heading: "Record & Replay:",
                message: "Recording is replaying"
            });
            ctrl.isStarted = false;
        };
        $timeout(function(){
            console.log(" on init");
            
                db.ref().on('value',function(s){
                    $scope.$apply(function(){
                        ctrl.records = s.val();
                        console.log(ctrl.records);
                    });
                
                });
            
        }, 10);
    }
})(angular);