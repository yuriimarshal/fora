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
                                "questions": [
                                    {
                                        "group": "Товар, асортимент",
                                        "questions": [
                                            {
                                                "id": "204c24203",
                                                "question": "Товару, що мене цікавив, не було у наявності",
                                                "answer": {
                                                    "type": "checkbox"
                                                }
                                            },
                                            {
                                                "id": "wewr2c423c42",
                                                "question": "Не було у наявності сезонних фруктів та/або овочів",
                                                "answer": {
                                                    "type": "input",
                                                    "title": "Уточніть, будь ласка, чого саме:"
                                                }
                                            },
                                            {
                                                "id": "erhf345hjb44",
                                                "question": "Мене не влаштувала свіжість та якість деяких товарів",
                                                "answer": {
                                                    "type": "dictionary",
                                                    "title": "Уточніть, будь ласка, свіжість та якість товарів з якої саме категорії не влаштувала:",
                                                    "id": "nvfj4343jvf"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "group": "Ціни",
                                        "questions": [
                                            {
                                                "id": "204c24re3",
                                                "question": "Ціни на потрібні мені товари були вищими ніж в інших торгових точках",
                                                "answer": {
                                                    "type": "checkbox"
                                                }
                                            },
                                            {
                                                "id": "dare13wecq",
                                                "question": "Ціни на сезонні фрукти та/або овочі зависокі",
                                                "answer": {
                                                    "type": "checkbox"
                                                }
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
                                "id": "qc3023c2pa",
                                "question": "Підкажіть, будь ласка, що Вам сподобалось найбільше?",
                                "answer": {
                                    "type": "input"
                                }
                            }
                        ]
                    },
                    {
                        "group": "Будь ласка, залиште відгук",
                        "questions": [
                            {
                                "id": "qc3023c2pd",
                                "question": "Можливо Ви маєте ще коментар, яким бажаєте поділитися? Залиште його тут, він обов'язково буде прочитаний",
                                "answer": {
                                    "type": "textarea"
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
            "group": "Виберіть зі списку товарів",
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