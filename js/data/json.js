var json = {
    "form": {
        "id": "wecrm0wiecom",
        "questions": [
            {
                "id": "awp93c30p",
                "question": "Наскільки ймовірно, що Ви порадите робити покупки в мережі магазинів Фора своїм друзям та колегам?",
                "answer": {
                    "type": "range",
                    "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                },
                "submit": [
                    {
                        "if": [
                            {
                                "lte": 8
                            }
                        ],
                        "questions": [
                            {
                                "group": "Будь ласка, підкажіть, що саме засмутило Вас найбільше?",
                                "type": "h1",
                                "questions": [
                                    {
                                        "group": "Товар, асортимент",
                                        "type": "h2",
                                        "questions": [
                                            {
                                                "group": "Товару, що мене цікавив, не було у наявності",
                                                "type": "toggle",
                                                "questions": [
                                                    {
                                                        "id": "204c24203",
                                                        "question": "Уточніть, будь ласка, товару з якої категорії не було у наявності:",
                                                        "answer": {
                                                            "type": "dictionary",
                                                            "id": "nvfj4343jvf"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "group": "Не було у наявності сезонних фруктів та/або овочів",
                                                "type": "toggle",
                                                "questions": [
                                                    {
                                                        "id": "erhf345hjb44",
                                                        "question": "Уточніть, будь ласка, чого саме",
                                                        "answer": {
                                                            "type": "input"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "group": "Мене не влаштувала свіжість та якість деяких товарів",
                                                "type": "toggle",
                                                "questions": [
                                                    {
                                                        "id": "erhf3fergb44",
                                                        "question": "Уточніть, будь ласка, яких саме",
                                                        "answer": {
                                                            "type": "input"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "group": "Ціни",
                                        "type": "h2",
                                        "questions": [
                                            {
                                                "group": "Ціни на потрібні мені товари були вищими ніж в інших торгових точках",
                                                "type": "toggle",
                                                "questions": [
                                                    {
                                                        "id": "erhf454rgb44",
                                                        "question": "Уточніть, будь ласка, яких саме товарів",
                                                        "answer": {
                                                            "type": "input"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "group": "Ціни на сезонні фрукти та/або овочі зависокі",
                                                "type": "toggle",
                                                "questions": [
                                                    {
                                                        "id": "erh43fdgegb44",
                                                        "question": "Уточніть, будь ласка, на які саме",
                                                        "answer": {
                                                            "type": "input"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "if": [
                            {
                                "gt": 8
                            }
                        ],
                        "questions": [
                            {
                                "group": "Підкажіть, будь ласка, що Вам сподобалось найбільше?",
                                "questions": [{}]
                            }
                        ]
                    },
                    {
                        "group": "Можливо Ви маєте ще коментар, яким бажаєте поділитися? Залиште його тут, він обов'язково буде прочитаний",
                        "type": "h2",
                        "questions": [
                            {
                                "id": "qc3023c2pd",
                                "answer": {
                                    "type": "textarea",
                                    "title": "Напишіть ваш коментар"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "dictionary": [
        {
            "id": "nvfj4343jvf",
            "questions": [
                {
                    "id": "qwerty1",
                    "question": "АЛКОГОЛЬНІ НАПОЇ",
                    "answer": {
                        "type": "checkbox"
                    }
                },
                {
                    "id": "qwerty2",
                    "question": "БАКАЛІЯ(крупи, макаронні вироби)",
                    "answer": {
                        "type": "checkbox"
                    }
                },
                {
                    "id": "qwerty3",
                    "question": "ДИТЯЧЕ ХАРЧУВАННЯ",
                    "answer": {
                        "type": "checkbox"
                    }
                },
                {
                    "id": "qwerty4",
                    "question": "КОВБАСНІ ВИРОБИ",
                    "answer": {
                        "type": "checkbox"
                    }
                }
            ]
        }
    ]
};

json = JSON.stringify(json);