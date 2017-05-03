// angular controller goes here
(function (angular) {

    const SECTION_NAME = "record";

    var config = {
        databaseURL: "https://team-project-e0fc1.firebaseio.com",
    };
    firebase.initializeApp(config);
    var db = firebase.database();
    angular
        .module("BrowserSync")
        .directive("record", function () {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    "options": "=",
                    "pluginOpts": "=",
                    "uiOptions": "="
                },
                templateUrl: "record/record.directive.html",
                controller: ["$scope", "Socket", "pagesConfig", "$timeout", "$rootScope", RecordDirective],
                controllerAs: "ctrl"
            };
        });
       /**
     * @param options
     * @param Socket
     * @param pagesConfig
     */
    function RecordDirective($scope, Socket, pagesConfig, $timeout, $rootScope) {
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
            
                db.ref("record").on('value',function(s){
                    $scope.$apply(function(){
                        ctrl.records = [];
                        var val = s.val();
                        var keys = Object.keys(val);

                        angular.forEach(keys, (value) =>{
                            ctrl.records.push({
                                key: value,
                                recordedEvents: val[value]
                            })
                        })
                        console.log(ctrl.records);
                    });
                
                });
            
        }, 10);
    }
})(angular);