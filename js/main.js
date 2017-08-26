$(function () {

    "use strict";

    var input = JSON.parse(json) || {},
        spdIndex = null,
        form_id = null,
        answers = [],
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
                $("body").append(
                    $("<label></label><br>").text(root[el][0].question),
                    $("<input type='range' id='range-input'/><br>"),
                    $("<button type='button' id='range-btn'>Submit</button><br>"),
                    $("<div id='script'></div>")
                );

                $('#range-btn').on('click', function () {
                    submitIndex(root[el][0].id, root[el][0].submit);
                });

                scriptTag = $("#script");
            }
        }
    }

    function submitIndex(range_id, root) {
        scriptTag.empty();

        spdIndex = Math.round($('#range-input').val() / 10);
        setAnswer(range_id, spdIndex);

        $('#prev-btn').on('click', prevBlock);
        $('#next-btn').on('click', nextBlock);

        root.forEach(function (item) {
            if (item.if) {
                if (parseOperation(item.if[0])) {
                    currentScript = item.questions;
                }
            }
        });

        root.forEach(function (item) {
            if (item.group)
                finalScript = [item];
        });

        renderNode(currentScript);

        renderNode(finalScript);

        scriptTag.append(
            $("<button type='button' id='submit-btn'>SEND</button>")
        );
        $('#submit-btn').on('click', sendAnswers);
    }

    // delete after creating api for ajax-requests
    initInquirer(json);

    function renderNode(node) {
        node.forEach(function (item) {
            if (item.group) {
                scriptTag.append(
                    $("<h3></h3>").text(item.group)
                );
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
                    renderNode([item]);
                }
            });
        }
        else {
            if (element.answer.title)
                scriptTag.append($("<div></div>").text(element.answer.title));

            scriptTag.append(
                $("<label>" +
                    "<input type='" + element.answer.type + "' id='" + element.id + "'/>" +
                    element.question +
                    "</label>" + "<br>"
                )
            );

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

    function setAnswer(id, data) {
        answers = [{
            "question_id": id,
            "answer": data
        }];
    }

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

    function prevBlock() {

    }

    function nextBlock() {

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