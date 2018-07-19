var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.you = { chat: ''};
    $scope.his = { chat: '' };
    $scope.yourChatWindow = [];
    $scope.hisChatWindow = [];

    $scope.anyFieldMissingForYou = () => {
        return $scope.you.chat.trim() == '' || $scope.fromLang == null
            || $scope.toLang == null || $scope.fromLang == '' || $scope.toLang == '';
    }
    $scope.anyFieldMissingForHim = () => {
        return $scope.his.chat.trim() == '' || $scope.fromLang == null
            || $scope.toLang == null || $scope.fromLang == '' || $scope.toLang == '';
    }

    $scope.enterYourChat = function () {
        var chat = createChat($scope.you.chat);
        $scope.yourtranslatedChat = clone(chat);
        chat.owner = "you";
        updateYourChatWindow(chat);
        translateYour($scope.fromLang, $scope.toLang, encodeURI($scope.you.chat));
        $scope.you.chat = "";
    }

    $scope.enterHisChat = () => {
        var chat = createChat($scope.his.chat);
        chat.owner = "him";
        $scope.histranslatedChat = clone(chat);
        updateHisChatWindow(chat);
        translateHis($scope.toLang, $scope.fromLang, encodeURI($scope.his.chat));
        $scope.his.chat = "";
    }

    var createChat = (chatContent) => {
        return {
            owner: "you",
            error: false,
            content: chatContent,
            id: Date.now()
        }
    }

    var clone = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    }

    var updateYourChatWindow = (chat) => {
        $scope.yourChatWindow.push(chat);
        var objDiv = document.getElementById("chatWindow1");
        objDiv.scrollTop = objDiv.scrollHeight-100;
    }

    var updateHisChatWindow = (chat) => {
        $scope.hisChatWindow.push(chat);
        var objDiv = document.getElementById("chatWindow2");
        objDiv.scrollTop = objDiv.scrollHeight-100;
    }


    let handleYour = function (response) {
        console.log(response.data);
        $scope.yourtranslatedChat.content = response.data.data;
        updateHisChatWindow($scope.yourtranslatedChat);
        //$scope.hisChatWindow.push($scope.yourtranslatedChat)

    };

    let handleHis = function (response) {
        console.log(response.data);
        $scope.histranslatedChat.content = response.data.data;
        updateYourChatWindow($scope.histranslatedChat);
       // $scope.yourChatWindow.push($scope.histranslatedChat)

    };

    var translateYour = function (fromLang, toLang, content) {
        $http.post("http://localhost:8080/translate", {
            "fromLang": fromLang,
            "toLang": toLang,
            "content": content
        }).then(handleYour);
    }

    var translateHis = function (fromLang, toLang, content) {
        $http.post("http://localhost:8080/translate", {
            "fromLang": fromLang,
            "toLang": toLang,
            "content": content
        }).then(handleHis);
    }

    $scope.markError = (id) => {
        markErrorInChat($scope.yourChatWindow, id);
        markErrorInChat($scope.hisChatWindow, id);
    }

    let markErrorInChat = (chats, id) => {
        for (i = 0; i < chats.length; i++) {
            if (chats[i].id == id) {
                chats[i].error = true;
            }
        }
    }



    $scope.languages = [{ lang: "Afrikaans", code: "af" },
    { lang: "Arabic", code: "ar" },
    { lang: "Bangla", code: "bn" },
    { lang: "Bosnian (Latin)", code: "bs" },
    { lang: "Bulgarian", code: "bg" },
    { lang: "Cantonese", code: "yue" },
    { lang: "Catalan", code: "ca" },
    { lang: "Chinese Simplified", code: "zh-Hans" },
    { lang: "Chinese Traditional", code: "zh-Hant" },
    { lang: "Croatian", code: "hr" },
    { lang: "Czech", code: "cs" },
    { lang: "Danish", code: "da" },
    { lang: "Dutch", code: "nl" },
    { lang: "English", code: "en" },
    { lang: "Estonian", code: "et" },
    { lang: "Fijian", code: "fj" },
    { lang: "Filipino", code: "fil" },
    { lang: "Finnish", code: "fi" },
    { lang: "French", code: "fr" },
    { lang: "German", code: "de" },
    { lang: "Greek", code: "el" },
    { lang: "Haitian Creole", code: "ht" },
    { lang: "Hebrew", code: "he" },
    { lang: "Hindi", code: "hi" },
    { lang: "Hmong Daw", code: "mww" },
    { lang: "Hungarian", code: "hu" },
    { lang: "Indonesian", code: "id" },
    { lang: "Italian", code: "it" },
    { lang: "Japanese", code: "ja" },
    { lang: "Kiswahili", code: "sw" },
    { lang: "Klingon", code: "tlh" },
    { lang: "Klingon (plqaD)", code: "tlh-Qaak" },
    { lang: "Korean", code: "ko" },
    { lang: "Latvian", code: "lv" },
    { lang: "Lithuanian", code: "lt" },
    { lang: "Malagasy", code: "mg" },
    { lang: "Malay", code: "ms" },
    { lang: "Maltese", code: "mt" },
    { lang: "Norwegian", code: "nb" },
    { lang: "Persian", code: "fa" },
    { lang: "Polish", code: "pl" },
    { lang: "Portuguese", code: "pt" },
    { lang: "Queretaro Otomi", code: "otq" },
    { lang: "Romanian", code: "ro" },
    { lang: "Russian", code: "ru" },
    { lang: "Samoan", code: "sm" },
    { lang: "Serbian (Cyrillic)", code: "sr-Cyrl" },
    { lang: "Serbian (Latin)", code: "sr-Latn" },
    { lang: "Slovak", code: "sk" },
    { lang: "Slovenian", code: "sl" },
    { lang: "Spanish", code: "es" },
    { lang: "Swedish", code: "sv" },
    { lang: "Tahitian", code: "ty" },
    { lang: "Tamil", code: "ta" },
    { lang: "Thai", code: "th" },
    { lang: "Tongan", code: "to" },
    { lang: "Turkish", code: "tr" },
    { lang: "Ukrainian", code: "uk" },
    { lang: "Urdu", code: "ur" },
    { lang: "Vietnamese", code: "vi" },
    { lang: "Welsh", code: "cy" },
    { lang: "Yucatec Maya", code: "yua" }
    ]
}]);


