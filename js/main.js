$(function () {

    "use strict";

    var input = JSON.parse(json) || {},
        spdIndex = null,
        form_id = null,
        answers = [],
        titleScript = '',
        toggleID = 0,
        currentScript = {},
        finalScript = {},
        commentBlock = '',
        root = [],
        scriptTag = null,
        dictionary = [],
        output = [];

    /**
     * Get parameters from URL
     * @param sParam
     * @returns {boolean}
     */
    var getUrlParameter = function (sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    // for example, URL:
    // http://dummy.com/?filial=some_filial_id&card=user_card_id

    var userInfo = {
        filial: getUrlParameter('filial') || false,
        card: getUrlParameter('card') || false
    };

    ////////////////////////////
    //         Parser         //
    ////////////////////////////

    function initInquirer(data) {
        // input = JSON.parse(data);

        for (var key in input) {
            if (key === "form") {
                root = input[key];
            }
            if (key === "dictionary") {
                dictionary = input[key];
            }
        }
        for (var el in root) {
            if (el === "id") {
                form_id = root[el];
            }
            if (el === "questions") {
                var i = 0, values = root[el][0]['answer']['values'];
                $("body").append(
                    $("<div id='script'></div>")
                );

                scriptTag = $("#script");

                scriptTag.append(
                    $("<div class='index question'></div>").text(root[el][0].question),
                    $("<div class='index-container'></div>")
                );

                while (i < values.length) {
                    $('.index-container').append(
                        $("<input class='btn' id='range-btn-" + i + "' type='button' value='" + values[i] + "'/>")
                    );

                    $('#range-btn-' + i).on('click', function () {
                        spdIndex = this.value;
                        pushToAnswers(root[el][0].id, spdIndex);
                        setIndexSpd(root[el][0].submit);
                    });

                    i++;
                }
            }
        }
    }

    function setIndexSpd(root) {
        scriptTag.empty();

        root.forEach(function (item) {
            if (item.if) {
                if (parseOperation(item.if[0])) {
                    titleScript = item.questions[0].group;
                    currentScript = item.questions[0].questions;
                }
            }
        });

        root.forEach(function (item) {
            if (item.group)
                finalScript = item;
        });

        scriptTag.append(
            $("<div class='submit question'>" + titleScript + "</div>"),
            $("<div class='submit-sheet'></div>")
        );

        scriptTag = $(".submit-sheet");

        renderNode(currentScript);

        renderFinalScript(finalScript);

        scriptTag.append(
            $("<button id='submit-btn' class='btn'>Готово</button>")
        );
        $('#submit-btn').on('click', sendAnswers);
    }

    // delete after creating api for ajax-requests
    initInquirer(json);
    //////////////////////////////////////////////

    function renderNode(node) {
        node.forEach(function (item) {
            if (item.questions) {
                switch (item.type) {
                    case "h2":
                        scriptTag = $(".submit-sheet");
                        scriptTag.append(
                            $("<div class='node-title'></div>").text(item.group)
                        );
                        break;
                    case "toggle":
                        toggleID++;
                        scriptTag = $(".submit-sheet");
                        scriptTag.append(
                            $("<div class='toggle-container'>" +
                                "<div id='toggle-" + toggleID + "' class='toggle-title'>" + item.group + "</div>" +
                                "<div class='toggle-body toggle-" + toggleID + "'></div>" +
                                "</div>")
                        );
                        scriptTag = $(".toggle-" + toggleID);
                        toggleBodyById(toggleID);
                        break;
                    case "dictionary":
                        scriptTag.append(
                            $("<div class='dictionary-title'></div>").text(item.group)
                        );
                        break;
                }
                renderNode(item.questions);
            }
            else {
                renderElement(item);
            }
        });
    }

    function renderElement(element) {
        var tag, elementData;

        if (element.answer.type === "dictionary") {
            dictionary.forEach(function (item) {
                if (item.id === element.answer.id) {
                    item.type = "dictionary";
                    item.group = element.question;
                    renderNode([item]);
                }
            });
        }
        else {
            switch (element.answer.type) {
                case "checkbox":
                    scriptTag.append(
                        $("<div class='checkbox-container'>"
                            + "<input type='checkbox' id='" + element.id + "'/>"
                            + "<label for='" + element.id + "'>" + "</label>"
                            + "<span>" + element.question + "</span>"
                            + "</div>"
                        )
                    );
                    break;
                case "input":
                    scriptTag.append(
                        $("<div class='input-container'>" +
                            // "<label>" + element.question + "</label>" +
                            "<textarea class='t-area' placeholder='" +
                            element.question + "'" +
                            "id='" + element.id + "'></textarea>"
                        )
                    );
                    break;
                case "textarea":
                    scriptTag.append(
                        $("<div class='textarea-container'>" +
                            "<textarea class='t-area' placeholder='" + element.answer.title + "'" +
                            "id='" + element.id + "'></textarea>"
                        )
                    );
                    break;
            }

            tag = $('#' + element.id);

            tag.on('change', function () {
                switch (element.answer.type) {
                    case "checkbox":
                        elementData = tag.is(":checked");
                        break;
                    default:
                        elementData = tag.val();
                }
                pushToAnswers(element.id, elementData);
            });
        }
    }

    function renderFinalScript(node) {
        if (node.questions) {
            if (node.group) {
                scriptTag = $(".submit-sheet");
                scriptTag.append(
                    $("<div class='node-title'></div>").text(node.group)
                );
            }
            renderElement(node.questions[0]);
        }
    }

    function parseOperation(operators) {
        for (var key in operators) {
            switch (key) {
                case 'lt':
                    return spdIndex < operators[key];
                    break;
                case 'lte':
                    return spdIndex <= operators[key];
                    break;
                case 'e':
                    return spdIndex = operators[key];
                    break;
                case 'gte':
                    return spdIndex >= operators[key];
                    break;
                case 'gt':
                    return spdIndex > operators[key];
                    break;
            }
        }
    }

    function toggleBodyById(i) {
        $('#toggle-' + i).on('click', function () {
            $(".toggle-" + i).toggle(200);
        });
    }

    ////////////////////////////////////
    ////////////////////////////////////

    function pushToAnswers(id, data) {
        for (var i = 0; i < answers.length; i += 1) {
            if (answers[i].question_id === id) {
                !data ? answers.splice(i, 1) : answers[i].answer = data;
                return;
            }
        }
        answers.push({
            "question_id": id,
            "answer": data
        });
    }

    function sendAnswers() {

        commentBlock = $('#comment-block').val() || false;

        output = {
            "form_id": form_id,
            "spdIndex": spdIndex,
            "answers": answers,
            "userInfo": userInfo,
            "commentBlock": commentBlock
        };

        console.log(output);

        $.ajax({
            type: "POST",
            url: "http://some/url",
            data: JSON.stringify(output),
            dataType: "json",
            success: function (res) {
                console.log(res);
            }
        });
    }

    (function () {
        // $.ajax({
        //     method: "GET",
        //     url: "http://some/url",
        //     dataType: "json",
        //     success: function (data) {
        //         initInquirer(data);
        //     }
        // });
    })();
});